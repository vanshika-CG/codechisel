import React, { useState, useEffect } from 'react';
import './Notes.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [pinnedNotes, setPinnedNotes] = useState([]);

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
      
      // Check for pinned notes in fetched data
      const pinned = data.filter(note => note.isPinned);
      const normal = data.filter(note => !note.isPinned);
      
      setPinnedNotes(pinned);
      setNotes(normal);
    } catch (error) {
      console.error("❌ Error fetching notes:", error);
    }
  };

  // Create or Update Note
  const handleSaveNote = async () => {
    if (!noteTitle.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const url = noteId
        ? `http://localhost:4000/api/notes/${noteId}` // Update existing note
        : "http://localhost:4000/api/notes"; // Create new note

      const method = noteId ? "PUT" : "POST"; // Use PUT for updates

      // Current date for new or updated notes
      const updatedAt = new Date().toISOString();

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          title: noteTitle, 
          content: noteContent,
          tags: tags,
          updatedAt: updatedAt
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save note");
      }

      console.log("✅ Note saved successfully:", data);
      
      // Add animation class to new note
      data.isNew = true;
      
      if (noteId) {
        // If updating a note, replace it in the list
        if (data.isPinned) {
          setPinnedNotes(prevPinned => prevPinned.map(note => (note._id === noteId ? data : note)));
        } else {
          setNotes(prevNotes => prevNotes.map(note => (note._id === noteId ? data : note)));
        }
      } else {
        // If adding a new note, append it to the list
        setNotes(prevNotes => [data, ...prevNotes]);
      }

      // Reset form
      resetForm();
      
      // Remove animation class after animation completes
      setTimeout(() => {
        if (data.isPinned) {
          setPinnedNotes(prevPinned => 
            prevPinned.map(note => note._id === data._id ? {...note, isNew: false} : note)
          );
        } else {
          setNotes(prevNotes => 
            prevNotes.map(note => note._id === data._id ? {...note, isNew: false} : note)
          );
        }
      }, 500);
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

      // Remove from either pinned or regular notes
      setPinnedNotes(prevPinned => prevPinned.filter(note => note._id !== id));
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
    setTags(note.tags || []);
  };

  // Pin/Unpin a note
  const togglePinNote = async (note) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const updatedNote = { ...note, isPinned: !note.isPinned };

    try {
      const response = await fetch(`http://localhost:4000/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) throw new Error("Failed to update pin status");

      const data = await response.json();

      if (data.isPinned) {
        // Move to pinned notes
        setPinnedNotes(prev => [data, ...prev]);
        setNotes(prev => prev.filter(n => n._id !== note._id));
      } else {
        // Move to regular notes
        setNotes(prev => [data, ...prev]);
        setPinnedNotes(prev => prev.filter(n => n._id !== note._id));
      }
    } catch (error) {
      console.error("❌ Error toggling pin status:", error);
    }
  };

  // Handle tag input
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Reset form fields
  const resetForm = () => {
    setNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setTags([]);
    setTagInput("");
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const filteredPinnedNotes = pinnedNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Sort notes based on selection
  const sortNotes = (notesToSort) => {
    switch(sortBy) {
      case 'newest':
        return [...notesToSort].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case 'oldest':
        return [...notesToSort].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      case 'alphabetical':
        return [...notesToSort].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return notesToSort;
    }
  };

  const sortedPinnedNotes = sortNotes(filteredPinnedNotes);
  const sortedNotes = sortNotes(filteredNotes);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="wrapper">
      <div className="notes-container">
        <div className="notes-section">
          <h1>My Notes</h1>

          <div className="search-filter-bar">
            <div className="search-bar">
              <i>🔍</i>
              <input 
                type="text" 
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>

          {/* Pinned Notes Section */}
          {sortedPinnedNotes.length > 0 && (
            <>
              <h2 style={{ fontSize: '1.3rem', margin: '1.5rem 0 1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                📌 Pinned Notes
              </h2>
              <div className="notes-grid">
                {sortedPinnedNotes.map(note => (
                  <div key={note._id} className={`note-card ${note.isNew ? 'new' : ''}`}>
                    <div className="note-header">
                      <h3 className='title'>{note.title}</h3>
                      <div className="date">{formatDate(note.updatedAt)}</div>
                      <div className="button-group">
                        <button 
                          className="pin-button active" 
                          onClick={() => togglePinNote(note)}
                          title="Unpin note"
                        >
                          📌
                        </button>
                        <button 
                          className="edit-button" 
                          onClick={() => handleEditNote(note)}
                          title="Edit note"
                        >
                          ✎
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDeleteNote(note._id)}
                          title="Delete note"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                    <p>{note.content}</p>
                    {note.tags && note.tags.length > 0 && (
                      <div className="note-tags">
                        {note.tags.map((tag, index) => (
                          <span key={index} className="note-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Regular Notes Section */}
          {sortedPinnedNotes.length > 0 && sortedNotes.length > 0 && (
            <h2 style={{ fontSize: '1.3rem', margin: '1.5rem 0 1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              📝 Notes
            </h2>
          )}

          {sortedNotes.length > 0 ? (
            <div className="notes-grid">
              {sortedNotes.map(note => (
                <div key={note._id} className={`note-card ${note.isNew ? 'new' : ''}`}>
                  <div className="note-header">
                    <h3 className='title'>{note.title}</h3>
                    <div className="date">{formatDate(note.updatedAt || new Date())}</div>
                    <div className="button-group">
                      <button 
                        className="pin-button" 
                        onClick={() => togglePinNote(note)}
                        title="Pin note"
                      >
                        📌
                      </button>
                      <button 
                        className="edit-button" 
                        onClick={() => handleEditNote(note)}
                        title="Edit note"
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDeleteNote(note._id)}
                        title="Delete note"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                  <p>{note.content}</p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="note-tags">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="note-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !searchTerm && !pinnedNotes.length && (
              <div className="empty-state">
                <h3>No notes yet</h3>
                <p>Create your first note to get started!</p>
              </div>
            )
          )}

          {searchTerm && !sortedNotes.length && !sortedPinnedNotes.length && (
            <div className="empty-state">
              <h3>No matching notes</h3>
              <p>Try a different search term</p>
            </div>
          )}

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
            
            {/* Tags Input */}
            <div className="tags-input">
              <div className="tags-container">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <span className="remove" onClick={() => removeTag(tag)}>×</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </div>
            
            <div className="note-actions">
              <button className="add-button" onClick={handleSaveNote}>
                {noteId ? "Update Note" : "Add Note"}
              </button>
              <button
                className="delete-button"
                onClick={resetForm}
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