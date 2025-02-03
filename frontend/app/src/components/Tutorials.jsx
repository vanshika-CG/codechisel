import React from 'react';
import './Tutorials.css';
import tuto1 from "../assets/pythontuto.png";
import tuto2 from "../assets/jstuto.png";
import tuto3 from "../assets/csstuto.png";
import tuto4 from "../assets/reacttuto.png";
import tuto5 from "../assets/c++tuto.png";
import tuto6 from "../assets/ctuto.png";
import tuto7 from "../assets/sqltuto.png";
import tuto8 from "../assets/mongotuto.png";
import tuto9 from "../assets/htmltuto.png";
import tuto10 from "../assets/javatuto.png";

const TutorialCard = ({ title, logo, description, color }) => (
  <div className="card" style={{ background: color || '#2a2a2a' }}>
    <div className="card-content">
      <img src={logo} alt={title} className="card-logo" />
      <div className="card-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
    <button className="watch-button">Watch Now</button>
  </div>
);

const App = () => {
  const tutorials = [
    {
  
      logo: tuto1, 
      title: 'PYTHON TUTORIAL',
      description: 'Introduction to python',
      color: '#1e293b'
    },
    {
      title: 'JavaScript',
      logo: tuto2,
      description: 'JavaScript Essentials',
      color: '#fbbf24'
    },
    {
      title: 'CSS',
      logo:tuto3 ,
      description: 'Introduction to python',
      color: '#2563eb'
    },
    {
      title: 'React Tutorials',
      logo: tuto4,
      description: 'JavaScript Essentials',
      color: '#1e293b'
    },
    {
      title: 'C++ PROGRAMMING',
      logo: tuto5,
      description: 'Introduction to python',
      color: '#1e293b'
    },
    {
      title: 'C Programming Tutorial',
      logo: tuto6,
      description: 'JavaScript Essentials',
      color: '#1e293b'
    },
    {
      title: 'SQL Tutorial',
      logo: tuto7,
      description: 'Database fundamentals',
      color: '#1e293b'
    },
    {
      title: 'MONGODB TUTORIAL',
      logo: tuto8,
      description: 'NoSQL database basics',
      color: '#1e293b'
    },
    {
      title: 'HTML',
      logo: tuto9,
      description: 'Web fundamentals',
      color: '#1e293b'
    },
    {
      title: 'JAVA TUTORIAL',
      logo: tuto10,
      description: 'Java programming basics',
      color: '#1e293b'
    }
  ];

  return (
    <div className="app">
      <header>
        <nav>
          <div className="nav-right">
            <div className="search-container">
              <input type="search" placeholder="Search" className="search-input" />
              <button className="notes-button">
                <span className="book-icon">📚</span>
                Make notes
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="tutorial-grid">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} {...tutorial} />
        ))}
      </main>

      <footer>
        <div className="footer-section">
          <h4>Learning Paths</h4>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Python</a></li>
            <li><a href="#">React</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
         <p className='feedback'>Learn to code with interactive tutorials and real-time feedback.</p>
         <h2>Learning Paths</h2>
        </div>
      </footer>
    </div>
  );
};

export default App;