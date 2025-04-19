import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Leaderboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/leaderboard');
      const data = await res.json();
      console.log('🚀 Leaderboard data:', data);

      if (Array.isArray(data)) {
        // Sort by user.score in descending order
        const sortedData = data.sort((a, b) => (b.user?.score || 0) - (a.user?.score || 0));
        setLeaderboard(sortedData);
      } else {
        console.warn('⚠️ Data is NOT an array:', data);
        setLeaderboard([]);
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <motion.div
        className="leaderboard-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="leaderboard-header">
          <h2 className="leaderboard-title">🏆 Leaderboard</h2>
        </div>

        {loading ? (
          <div className="loading">Loading leaderboard...</div>
        ) : leaderboard.length === 0 ? (
          <div className="no-data">No leaderboard data found.</div>
        ) : (
          <motion.ul
            className="leaderboard-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {leaderboard.map((entry, index) => {
              if (!entry.user || !entry.user.username) {
                console.warn('⚠️ Invalid user data:', entry);
                return null;
              }

              const profileImage =
                entry.user.profileImage ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
              
              // Get the score from the user object
              const score = entry.user.score || 0;

              return (
                <motion.li
                  key={entry._id || index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="leaderboard-item"
                >
                  <div className="leaderboard-item-content">
                    <div className="rank">#{index + 1}</div>
                    
                    <div className="user-info">
                      <motion.img
                        src={profileImage}
                        alt={entry.user.username}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="profile-img"
                      />
                      
                      <div className="username-details">
                        <h3>{entry.user.username}</h3>
                        <p>Quizzes Solved: <span>{entry.quizzesSolved || 0}</span></p>
                      </div>
                    </div>
                    
                    <motion.div
                      className="score-container"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="score">
                        <span>{score}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

export default Leaderboard;