/**
 * This file was automatically generated – do not edit it.
 */

import { Entity } from "@blockprotocol/graph";

export type BlockEntity = TestInputField;

export type BlockEntityOutgoingLinkAndTarget =
  TestInputFieldOutgoingLinkAndTarget;

/**
 * A True or False value
 */
export type Boolean = boolean;

/**
 * A word or set of words by which something is known, addressed, or referred to.
 */
export type NamePropertyValue = Text;

/**
 * An arithmetical value (in the Real number system)
 */
export type Number = number;

export type TestInputField = Entity<TestInputFieldProperties>;

/**
 * The attributes for a Test Input Field; Test Input Field Label, Description, and if applicable, Test Input Field Placeholder
 */
export type TestInputFieldAttributesPropertyValue = {
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-placeholder/"?: TestInputFieldPlaceholderPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-label/"?: TestInputFieldLabelPropertyValue;
};

/**
 * If a validation error occurs on a Test Input Field blur this validation error will be displayed below the Test Input Field
 */
export type TestInputFieldErrorPropertyValue = Text;

/**
 * An input label for the Test Input Field
 */
export type TestInputFieldLabelPropertyValue = Text;

/**
 * For text fields, specifies the maximum number of characters allowed
 */
export type TestInputFieldMaximumPropertyValue = Number;

/**
 * For Test Input Fields, specifies the minimum number of characters allowed
 */
export type TestInputFieldMinimumPropertyValue = Number;

export type TestInputFieldOutgoingLinkAndTarget = never;

export type TestInputFieldOutgoingLinksByLinkEntityTypeId = {};

/**
 * For text fields, a regular expression specifying the allowed input
 */
export type TestInputFieldPatternPropertyValue = Text;

/**
 * If the Test Input Field Type supports a placeholder you may provide one for your input field
 */
export type TestInputFieldPlaceholderPropertyValue = Text;

export type TestInputFieldProperties = {
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-value/": TestInputFieldValuePropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-type/": TestInputFieldTypePropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-attributes/"?: TestInputFieldAttributesPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-validations/"?: TestInputFieldValidationsPropertyValue;
  "https://blockprotocol.org/@blockprotocol/types/property-type/name/": NamePropertyValue;
};

/**
 * Requires the field to be completed
 */
export type TestInputFieldRequiredPropertyValue = Boolean;

/**
 * For Test Input Fields, you can specify the type of input that should be expected (text|email|password|number|checkbox)
 */
export type TestInputFieldTypePropertyValue = Text;

/**
 * For each Test Input Field, you can add validation options that must be passed otherwise an error label appears on blur
 */
export type TestInputFieldValidationsPropertyValue = {
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-minimum/"?: TestInputFieldMinimumPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-maximum/"?: TestInputFieldMaximumPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-pattern/"?: TestInputFieldPatternPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-required/"?: TestInputFieldRequiredPropertyValue;
  "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-error/"?: TestInputFieldErrorPropertyValue;
};

/**
 * A value for Test Input Field
 */
export type TestInputFieldValuePropertyValue = Text;

/**
 * An ordered sequence of characters
 */
export type Text = string;
