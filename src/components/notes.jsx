// src/pages/notes.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios"; // Use Axios or fetch for API calls

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("material");
  

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
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

  return (
    <div>
      <h1>Notes</h1>
      <div>
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="material">Material</option>
          <option value="random">Random</option>
        </select>
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="notes">
        {notes.map((note) => (
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
