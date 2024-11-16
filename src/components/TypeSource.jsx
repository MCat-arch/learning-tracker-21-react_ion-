import React, { useState, useEffect } from "react";
import axios from "axios";

function TypeSource({ onTypeSelect }) {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

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
      setIsFormVisible(false); // Hide the form after submission
      fetchTypes();
    } catch (error) {
      console.error("Error adding type:", error);
    }
  };

  return (
    <div>
  <h2>Types</h2>
  <ul className="type-list">
    {types.map((type) => (
      <li 
        key={type._id} 
        onClick={() => onTypeSelect(type.type)}
        className="type-item"
      >
        {type.type}
      </li>
    ))}
  </ul>

  <button
    onClick={() => setIsFormVisible(!isFormVisible)}
    className="toggle-form-btn"
  >
    {isFormVisible ? "Close" : "Add Type"}
  </button>

  {isFormVisible && (
    <div className="type-form">
      <input
        type="text"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="Add new type"
        className="type-input"
      />
      <div className="container-btn">
      <button onClick={addType} className="add-type-btn">Add Type</button>
      </div>
    </div>
  )}
</div>

  );   
}

export default TypeSource;
