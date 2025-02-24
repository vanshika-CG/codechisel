import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import ThankYouScreen from './Contact3';

const GetToKnowYouForm = ({ onPrevious, userName, userEmail }) => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(''); // ✅ FIXED: Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError("Message field is required!"); // ✅ Set error if message is empty
      return;
    }
    
    setError(""); // ✅ Clear error when the user types a valid message

    const templateParams = {
      user_name: userName,   // Pass user's name
      user_email: userEmail, // Pass user's email
      message: message,      // Pass user's message
    };

    emailjs
      .send(
        'service_3tys936',   // Replace with your Email.js Service ID
        'template_u7ttqb8',  // Replace with your Email.js Template ID
        templateParams,
        'Xi9hF2ufaPNky0Pyf'  // Replace with your Email.js Public Key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSubmitted(true);
        },
        (error) => {
          console.error('FAILED...', error);
        }
      );
  };

  return submitted ? (
    <ThankYouScreen onClose={() => setSubmitted(false)} />
  ) : (
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

        {error && <p className="error-message">{error}</p>} {/* ✅ Fixed error display */}

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
