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
      const res = await fetch("http://localhost:4000/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes(); // Load notes when the component mounts
  }, []);

  // Create or Update Note
  const handleSaveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
  
    if (noteId) {
      // **UPDATE Note**
      try {
        const existingNote = notes.find(note => note._id === noteId);
        const updatedNote = {
          title: noteTitle,
          content: noteContent,
          color: existingNote?.color || getRandomColor(), // Preserve color
        };
  
        const res = await fetch(`http://localhost:4000/api/notes/${noteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedNote)
        });
  
        if (!res.ok) throw new Error("Failed to update note");
  
        const savedNote = await res.json();
  
        // Update UI immediately after successful update
        setNotes(notes.map(note => (note._id === noteId ? savedNote : note)));
  
        // Clear input fields
        setNoteId(null);
        setNoteTitle('');
        setNoteContent('');
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      // **CREATE New Note**
      const newNote = { title: noteTitle, content: noteContent, color: getRandomColor() };
  
      try {
        const res = await fetch("http://localhost:4000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote)
        });
  
        if (!res.ok) throw new Error("Failed to create note");
  
        const savedNote = await res.json();
  
        // Update UI immediately
        setNotes([...notes, savedNote]);
  
        // Clear input fields
        setNoteTitle('');
        setNoteContent('');
      } catch (error) {
        console.error(error);
      }
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
                <h3>{note.title}</h3>
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
