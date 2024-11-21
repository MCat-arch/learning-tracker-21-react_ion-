'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "./noteDetail.css";

function NoteDetail() {
  const router = useRouter();
  const {id} = useParams()
  const searchParams = useSearchParams(); // Ambil query params
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) {
          throw new Error("No ID found in query parameters");
        }
  
        const response = await axios.get(`/api/notes/${id}`); // Fetch note by ID
  
        if (!response.data) {
          throw new Error("Note not found");
        }
  
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNote();
  }, [searchParams]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  const deleteNote = async(id) =>{
    const response = await fetch(`/api/notes/${id}`,{
      method: "DELETE",
    });
    const result = await response.json();
  if (response.ok) {
    window.alert("Note Deleted Succesfully")
    console.log(result.message); // "Note deleted successfully"
    router.push("/notes")
  } else {
    console.error(result.message); // Handle error messages
  }
  }

  return (
    <div className='container-detail'>
      <h1 className='title'>{note.title}</h1>
      <p className='content'>{note.content}</p>
      <div className='additional-info'>
      <p className='category'>Category: {note.category}</p>
      <p className='date'>Date: {new Date(note.date).toLocaleDateString()}</p>
      </div>
      <button onClick={() => deleteNote(note.id)} >Delete</button>
      <button onClick={() => window.history.back()} className="back-btn">
        Back
      </button>
    </div>
  );
}

export default NoteDetail;
