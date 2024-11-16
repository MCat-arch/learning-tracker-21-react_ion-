import React, { useState } from "react";
import Resource from "./Resource";
import TypeSource from "./TypeSource";
import "./style/sources.css";

function Sources() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="sources-container">
      <h1>Sources</h1>
      <div className="sources-content">
        <div className="type-section">
          <TypeSource onTypeSelect={setSelectedType} />
        </div>
        <div className="resource-section">
          <Resource selectedType={selectedType} />
        </div>
      </div>
    </div>
  );
}

export default Sources;
