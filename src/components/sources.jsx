import React, { useState } from "react";
import TypeSource from "./TypeSource";
import Resource from "./Resource";

function Sources() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div>
      <TypeSource onTypeSelect={(type) => setSelectedType(type)} />
      <Resource selectedType={selectedType} />
    </div>
  );
}

export default Sources;
