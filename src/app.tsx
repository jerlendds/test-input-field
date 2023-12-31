import {
  type BlockComponent,
  useEntitySubgraph,
  useGraphBlockModule,
} from "@blockprotocol/graph/react";
import { useRef, useEffect, FocusEvent, ChangeEvent, useState } from "react";

import styles from "./base.module.scss";
import {
  BlockEntity,
  BlockEntityOutgoingLinkAndTarget,
  TestInputFieldAttributesPropertyValue,
  TestInputFieldProperties,
  TestInputFieldValidationsPropertyValue,
} from "./types/generated/block-entity";

interface ValidateInputEventRules {
  fieldMinimum: number | undefined
  fieldMaximum: number | undefined
  fieldPattern: string | undefined
  validationError: string | undefined
  fieldRequired: boolean | undefined
}

const testInputFieldName: keyof BlockEntity["properties"] = "https://blockprotocol.org/@blockprotocol/types/property-type/name/";
const testInputFieldType: keyof BlockEntity["properties"] = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-type/";
const testInputFieldValue: keyof BlockEntity["properties"] = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-value/";
const inputFieldAttributes: keyof BlockEntity["properties"] = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-attributes/";
const inputFieldValidations: keyof BlockEntity["properties"] = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-validations/";

const testInputFieldRequired: keyof TestInputFieldValidationsPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-required/"
const testInputFieldMinimum: keyof TestInputFieldValidationsPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-minimum/"
const testInputFieldMaximum: keyof TestInputFieldValidationsPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-maximum/"
const testInputFieldPattern: keyof TestInputFieldValidationsPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-pattern/"
const testInputValidationError: keyof TestInputFieldValidationsPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-error/"

const testInputFieldLabel: keyof TestInputFieldAttributesPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-label/"
const testInputFieldPlaceholder: keyof TestInputFieldAttributesPropertyValue = "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-placeholder/"

export const App: BlockComponent<BlockEntity> = ({
  graph: { blockEntitySubgraph, readonly },
}) => {
  const blockRootRef = useRef<HTMLLabelElement>(null);
  const { graphModule } = useGraphBlockModule(blockRootRef);
  const { rootEntity: blockEntity } = useEntitySubgraph<
    BlockEntity,
    BlockEntityOutgoingLinkAndTarget[]
  >(blockEntitySubgraph);
  const {
    metadata: {
      recordId: { entityId },
      entityTypeId,
    },
    properties
  } = blockEntity



  const inputName = properties[testInputFieldName];
  const inputType = properties[testInputFieldType];
  const inputValue = properties[testInputFieldValue];
  const [value, setValue] = useState(inputValue);

  const attributes = properties[inputFieldAttributes];
  const validations = properties[inputFieldValidations];

  let inputFieldError = "Validation error";
  if (validations) inputFieldError = validations["https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-error/"] ?? "Validation error"
  const [inputError, setInputError] = useState(inputFieldError)
  const [isValidationError, setIsValidationError] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setIsValidationError(false)
    if (inputType === "checkbox") {
      setValue(`${event.currentTarget.checked}`)
      return
    }
    setValue(event.currentTarget.value)
  };

  const validateCheckbox = (event: any, fieldRequired: boolean | undefined) => {
    if (inputType === "checkbox" && fieldRequired && !event.currentTarget.checked) {
      setInputError(`The ${inputName} field is required`)
      setIsValidationError(true)
    }
  }

  const validateInputEvent = (event: FocusEvent<HTMLInputElement, Element>, rules: ValidateInputEventRules) => {
    validateCheckbox(event, rules.fieldRequired)
    if (inputType === "checkbox") return

    const dirtyValue = event.currentTarget.value
    if (rules.fieldRequired && dirtyValue.length === 0) {
      setInputError(`The ${inputName} field is required`)
      setIsValidationError(true)
      return
    }
    if (rules.fieldMinimum && dirtyValue.length < rules.fieldMinimum) {
      setInputError(`A minimum of ${rules.fieldMinimum} characters are required`)
      setIsValidationError(true)
      return
    }
    if (rules.fieldMaximum && dirtyValue.length > rules.fieldMaximum) {
      setInputError(`A maximum of ${rules.fieldMaximum} characters are allowed`)
      setIsValidationError(true)
      return
    }
    if (rules.fieldPattern) {
      const rulePattern = new RegExp(rules.fieldPattern)
      if (!rulePattern.test(dirtyValue)) {
        setInputError(inputFieldError)
        setIsValidationError(true)
        return
      }
    }
    setIsValidationError(false)
  }

  const handleInputValidation = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (validations) {
      const fieldRequired = validations[testInputFieldRequired]
      const fieldMinimum = validations[testInputFieldMinimum]
      const fieldMaximum = validations[testInputFieldMaximum]
      const fieldPattern = validations[testInputFieldPattern]
      const validationError = validations[testInputValidationError]

      validateInputEvent(event, {
        fieldMinimum,
        fieldMaximum,
        fieldPattern,
        fieldRequired,
        validationError
      })
    }
    if (!isValidationError) {
      graphModule.updateEntity({
        data: {
          entityId,
          entityTypeId: blockEntity.metadata.entityTypeId,
          properties: {
            ...blockEntity.properties,
            [testInputFieldValue]: value
          },
        },
      }).then(({ data, errors }) => {
        if (data?.properties) console.log("data!", value, inputValue, data.properties)
        if (errors) console.log("errors!", errors)
      })
    }
  };

  const placeholder = attributes?.[testInputFieldPlaceholder];
  const label = attributes?.[testInputFieldLabel];

  return (
    <label ref={blockRootRef} className={styles["test-input-field"]} htmlFor={inputName.toLowerCase().replace(/\s/, "-")}>
      {label ?? ""}
      <input
        type={inputType}
        id={inputName.toLowerCase().replace(/\s/, "-")}
        name={inputName.toLowerCase().replace(/\s/, "-")}
        placeholder={placeholder ?? ""}
        onBlur={(event) => handleInputValidation(event)}
        onClick={(event) => validateCheckbox(event, validations?.["https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-required/"])}
        onChange={(event) => handleInputChange(event)}
        value={value}
        readOnly={readonly}
      />
      {isValidationError && <span>{inputError}</span>}
    </label>
  );
};
