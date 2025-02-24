import React, { useState, useEffect } from 'react';
import './Notes.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null); // Track the note being edited
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Fetch notes from backend (Runs on first load and whenever state updates)
  const fetchNotes = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/notes');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!Array.isArray(data)) throw new Error("Invalid data format received");

        setNotes(data);
    } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]); // Set to an empty array to prevent .map() errors
    }
};

  
  useEffect(() => {
    fetchNotes(); // Load notes when the component mounts
  }, []);

  // Create or Update Note
  const handleSaveNote = async () => {
    const token = localStorage.getItem("token");
    
    if (!noteTitle.trim() || !noteContent.trim()) return;
  
    const newNote = { title: noteTitle, content: noteContent, color: getRandomColor() };
  
    try {
      const res = await fetch(`http://localhost:4000/api/notes${noteId ? `/${noteId}` : ''}`, {
        method: noteId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newNote)
      });
  
      if (!res.ok) throw new Error("Failed to save note");
  
      const savedNote = await res.json();
      
      setNotes(noteId ? notes.map(n => (n._id === noteId ? savedNote : n)) : [...notes, savedNote]);
  
      setNoteId(null);
      setNoteTitle('');
      setNoteContent('');
    } catch (error) {
      console.error(error);
    }
  };
  
  

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete note");

      // Update UI immediately
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a note (Move note data to input fields)
  const handleEditNote = (note) => {
    setNoteId(note._id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  // Generate random background color for notes
  const getRandomColor = () => {
    const colors = ['#ffcce6', '#b3ffcc', '#cce6ff', '#ffffcc'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="wrapper">
    <div className="notes-container">
      <div className="notes-section">
        <h1>My Notes</h1>

        <div className="notes-grid">
          {notes.map(note => (
            <div 
              key={note._id} 
              className="note-card"
              style={{ backgroundColor: note.color }}
            >
              <div className="note-header">
                <h3 className='tittle'>{note.title}</h3>
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
