import React, { useState, useEffect } from "react";
import axios from "axios";

function TypeSource({ onTypeSelect }) {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState("");

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await axios.get("/api/sourcess");
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const addType = async () => {
    try {
      await axios.post("/api/sourcess", { type: newType, category: "type" });
      setNewType("");
      fetchTypes();
    } catch (error) {
      console.error("Error adding type:", error);
    }
  };

  return (
    <div>
      <h2>Types</h2>
      <ul>
        {types.map((type) => (
          <li key={type._id} onClick={() => onTypeSelect(type.type)}>
            {type.type}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="Add new type"
      />
      <button onClick={addType}>Add Type</button>
    </div>
  );
}

export default TypeSource;
