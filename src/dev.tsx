import { MockBlockDock } from "mock-block-dock";
import { createRoot } from "react-dom/client";

import packageJson from "../package.json";
import exampleGraph from "./example-graph";
import Component from "./index";

const node = document.getElementById("app");

const DevApp = () => {
  return (
    <MockBlockDock
      blockDefinition={{ ReactComponent: Component }}
      blockEntityRecordId={exampleGraph.blockEntityRecordId}
      blockInfo={packageJson.blockprotocol}
      initialData={{
        initialEntities: exampleGraph.entities,
      }}
      simulateDatastoreLatency={{
        min: 50,
        max: 200,
      }}
      debug
    />
  );
};

if (node) {
  createRoot(node).render(<DevApp />);
} else {
  throw new Error("Unable to find DOM element with id 'app'");
}
