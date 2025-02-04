import React, { useState } from 'react';
import './Notes.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'JavaScript Basics',
      content: 'Objects, Functions and basic operations in JavaScript. Other topics: Variables, Loops, Basic operators',
      color: '#ffcce6'
    },
    {
      id: 2,
      title: 'React Hooks',
      content: 'Understanding React Hooks and their use cases: useState, useEffect, useContext, useReducer',
      color: '#b3ffcc'
    }
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleCreateNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteContent,
        color: getRandomColor()
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getRandomColor = () => {
    const colors = ['#ffcce6', '#b3ffcc', '#cce6ff', '#ffffcc'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="notes-container">

      <div className="notes-section">
        <h1>My Notes<button className="add-button">+</button></h1>
        
        <div className="notes-grid">
          {notes.map(note => (
            <div 
              key={note.id} 
              className="note-card"
              style={{ backgroundColor: note.color }}
            >
              <div className="note-header">
                <h3>{note.title}</h3>
                <button className="edit-button">✎</button>
              </div>
              <p>{note.content}</p>
            </div>
          ))}
        </div>

        <div className="create-note-section">
          <h2>Create New Notes</h2>
          <input
            type="text"
            placeholder="Note Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Write Your note content here...."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          />
          <div className="note-actions">
            <button className="share-button">Share</button>
            <button 
              className="delete-button"
              onClick={() => {
                setNewNoteTitle('');
                setNewNoteContent('');
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h3>Learning Paths</h3>
          <ul>
            <li>Web Development</li>
            <li>Python</li>
            <li>React</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Documentation</li>
            <li>Community</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>support@codemaster.com</p>
          <p>+1(555) 123-4567</p>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CodeMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotesApp;