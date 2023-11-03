import { BlockEntity } from "./types/generated/block-entity";

export const blockEntity: BlockEntity = {
  metadata: {
    recordId: {
      entityId: "test-entity",
      editionId: new Date().toISOString(),
    },
    entityTypeId:
      "https://blockprotocol.org/@blockprotocol/types/entity-type/thing/v/2",
  },
  properties: {
    "https://blockprotocol.org/@blockprotocol/types/property-type/name/":
      "github profile",
    "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-value/":
      "",
    "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-type/":
      "text",
    "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-attributes/":
      {
        "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-placeholder/":
          "https://github.com/jerlendds",
        "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-label/":
          "Github Profile",
      },
      "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-validations/": {
      "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-minimum/": 3,
      "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-maximum/": 120,
      "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-required/": true,
        "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-pattern/": "^https:\/\/github.com\/([A-z\W\d]).*",
        "https://blockprotocol.org/@jerlendds/types/property-type/test-input-field-error/": "Please enter a valid Github profile url"
      }
  },
} as const;

const exampleGraph = {
  blockEntityRecordId: blockEntity.metadata.recordId,
  entities: [blockEntity],
};

export default exampleGraph;
