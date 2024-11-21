import React, { useState, useEffect } from "react";
import axios from "axios";

function Resource({ selectedType }) {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (selectedType) {
      fetchResources(selectedType);
    }
  }, [selectedType]);

  const fetchResources = async (type) => {
    try {
      const response = await axios.get(`/api/sourcess?type=${type}`);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const addResource = async () => {
    try {
      await axios.post("/api/sourcess", {
        title,
        link,
        type: selectedType,
        category: "resource",
      });
      setTitle("");
      setLink("");
      setIsFormVisible(false); // Hide the form after submission
      fetchResources(selectedType);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return (
    <div>
      <h2>{!selectedType ? "Sources for..." : `${selectedType}`}</h2>
      {selectedType && (
        <>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="toggle-form-btn"
          >
            {isFormVisible ? "Close" : "Add Source"}
          </button>

          {isFormVisible && (
            <div className="resource-form">
              <input
                type="text"
                placeholder="Resource Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Resource Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <div className="container-btn">
              <button onClick={addResource}>Add Resource</button>
              </div>
            </div>
          )}

          <ul className="resource-list">
            {resources.map((resource) => (
              <li key={resource.id}>
                <h4>{resource.title}</h4>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.link}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Resource;
