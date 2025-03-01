import React, { useState, useEffect } from 'react';
import './Notes.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please login!");
        return;
      }

      const response = await fetch("http://localhost:4000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📌 Notes fetched:", data);
      setNotes(data); // ✅ Store notes in state
    } catch (error) {
      console.error("❌ Error fetching notes:", error);
    }
  };

  // Create or Update Note
  const handleSaveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const url = noteId
        ? `http://localhost:4000/api/notes/${noteId}` // Update existing note
        : "http://localhost:4000/api/notes"; // Create new note

      const method = noteId ? "PUT" : "POST"; // Use PUT for updates

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: noteTitle, content: noteContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save note");
      }

      console.log("✅ Note saved successfully:", data);
      
      if (noteId) {
        // If updating a note, replace it in the list
        setNotes(prevNotes => prevNotes.map(note => (note._id === noteId ? data : note)));
      } else {
        // If adding a new note, append it to the list
        setNotes(prevNotes => [...prevNotes, data]);
      }

      // Reset form
      setNoteId(null);
      setNoteTitle("");
      setNoteContent("");
    } catch (error) {
      console.error("❌ Error saving note:", error);
      alert("Error saving note: " + error.message);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found, please login!");

    try {
      const res = await fetch(`http://localhost:4000/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete note");

      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error("❌ Error deleting note:", error);
    }
  };

  // Edit a note (Move note data to input fields)
  const handleEditNote = (note) => {
    setNoteId(note._id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  return (
    <div className="wrapper">
      <div className="notes-container">
        <div className="notes-section">
          <h1>My Notes</h1>

          <div className="notes-grid">
            {notes.map(note => (
              <div key={note._id} className="note-card">
                <div className="note-header">
                  <h3 className='title'>{note.title}</h3>
                  <button className="edit-button" onClick={() => handleEditNote(note)}>✎</button>
                  <button className="delete-button" onClick={() => handleDeleteNote(note._id)}>🗑</button>
                </div>
                <p>{note.content}</p>
              </div>
            ))}
          </div>

          <div className="create-note-section">
            <h2>{noteId ? "Edit Note" : "Create New Note"}</h2>
            <input
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your note content here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <div className="note-actions">
              <button className="add-button" onClick={handleSaveNote}>
                {noteId ? "Update Note" : "Add Note"}
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  setNoteId(null);
                  setNoteTitle('');
                  setNoteContent('');
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
