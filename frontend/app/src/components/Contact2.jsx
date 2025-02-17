import React, { useState } from 'react';
import './Contact.css';

const GetToKnowYouForm = ({ onPrevious }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted message:', message);
  };

  return (
    <div className="form-container">
      <h1>We want to get to know you</h1>
      <form onSubmit={handleSubmit}>
        <div className="message-section">
          <label>Message here!</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
        </div>
        <div className="button-container">
          <button type="button" className="previous-btn" onClick={onPrevious}>
            Previous
          </button>
          <button type="submit" className="send-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetToKnowYouForm;
