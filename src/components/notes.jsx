// src/pages/notes.jsx
"use client";
import "./style/notes.css"
import { useState, useEffect } from "react";
import axios from "axios"; // Use Axios or fetch for API calls

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("material");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

const addNote = async () => {
  if (!title || !content) return;
  try {
    const response = await axios.post('/api/notes', {
      title,
      content,
      category,
      date: new Date().toISOString(),
    });
    setNotes((prevNotes) => [...prevNotes, response.data]);
    setTitle("");
    setContent("");
    setCategory("material");
    setIsVisible(false);
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

  const filteredNote = 
  selectedCategory === "all"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);


  return (
    <div>
    <h1 style={{margin:"20px", fontWeight:"500"}}>Notes</h1>
    
    {/* Button to toggle form visibility */}
    <div className="button-container">
    <button
      className="toggle-form-btn"
      onClick={() => setIsVisible(!isVisible)}
      id="addNote"
    >
      {isVisible ? "Close Form" : "Add a New Note"}
    </button></div>

    {/* Form for adding notes */}
    {isVisible && (
      <div className="note-form-container">
      <div className="note-form">
        <h2>Add a New Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="material">Material</option>
          <option value="random">Random</option>
        </select>
        <div className="button-container">
        <button onClick={addNote}>Add Note</button>
        </div>
      </div>
      </div>
    )}

    {/* Buttons to filter by category */}
    <div className="category-buttons">
      <button
        onClick={() => setSelectedCategory("all")}
        className={selectedCategory === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => setSelectedCategory("material")}
        className={selectedCategory === "material" ? "active" : ""}
      >
        Material
      </button>
      <button
        onClick={() => setSelectedCategory("random")}
        className={selectedCategory === "random" ? "active" : ""}
      >
        Random
      </button>
    </div>

    {/* Display Notes */}
    <div className="notes">
      {filteredNote.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>Category: {note.category}</span>
          <span>Date: {new Date(note.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Notes;
