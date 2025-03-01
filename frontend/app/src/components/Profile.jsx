import React, { useState, useEffect } from 'react';
import './Profile.css';

const UserProfile = () => {
  // Initial user state
  const [user, setUser] = useState({
    username: 'Priyasha_14',
    email: 'priyasha.yadav.cg@gmail.com',
    bio: 'Frontend developer passionate about creating beautiful user interfaces',
    location: 'Ahmedabad , gujarat',
    joinDate: 'January 2023',
    socialLinks: {
      twitter: 'twitter.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe'
    },
    profilePhoto: 'https://via.placeholder.com/150',
    
    enrolledCourses: [
      { id: 1, title: 'Introduction to React', completed: true, progress: 100, icon: '⚛️' },
      { id: 2, title: 'Advanced JavaScript', completed: false, progress: 68, icon: '🟨' },
      { id: 3, title: 'CSS Mastery', completed: false, progress: 42, icon: '🎨' },
      { id: 4, title: 'UI/UX Design Fundamentals', completed: false, progress: 15, icon: '🖌️' }
    ],
    badges: [
      { id: 1, name: 'Early Adopter', icon: '🌟', date: '2023-01-15' },
      { id: 2, name: 'Course Completer', icon: '🏆', date: '2023-03-22' },
      { id: 3, name: 'Fast Learner', icon: '🚀', date: '2023-05-10' },
      { id: 4, name: 'Problem Solver', icon: '🧩', date: '2023-07-05' }
    ],
    achievements: [
      { id: 1, name: '5-Day Streak', icon: '🔥', level: 1 },
      { id: 2, name: 'Code Reviewer', icon: '👁️', level: 2 },
      { id: 3, name: 'Quiz Master', icon: '🧠', level: 3 }
    ],
    skills: [
      { name: 'React', level: 85 },
      { name: 'JavaScript', level: 92 },
      { name: 'CSS', level: 78 },
      { name: 'HTML', level: 95 },
      { name: 'Node.js', level: 65 }
    ]
  });

  // States for form editing and UI
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    location: user.location
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Animation effect on load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Save profile changes
  const saveProfileChanges = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      location: formData.location
    });
    setIsEditingProfile(false);
    showNotification('Profile updated successfully!', 'success');
  };
  
  // Save password changes
  const savePasswordChanges = (e) => {
    e.preventDefault();
    // Here you would typically send the password change to an API
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    showNotification('Password changed successfully!', 'success');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };
  
  // Handle image upload for profile
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePhoto: reader.result
        });
        showNotification('Profile photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle image upload for cover
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          coverPhoto: reader.result
        });
        showNotification('Cover photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Show notification
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };
  
  // Handle logout
  const handleLogout = () => {
    showNotification('Logging out...', 'info');
    // Here you would typically clear session/local storage and redirect
    setTimeout(() => {
      alert('You have been logged out.');
    }, 1000);
  };

  return (
    <div className={`user-profile-container ${isDarkMode ? 'dark-theme' : ''} ${isPageLoaded ? 'page-loaded' : ''}`}>
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="cover-photo-container">
        <div className="cover-photo-overlay">
          <label htmlFor="cover-upload" className="cover-upload-button">
            <i className="icon1">📷</i> Change Cover
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleCoverImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
      
      <div className="profile-header">
        <div className="profile-photo-section">
          <div className="profile-photo-container">
            <img src={user.profilePhoto} alt="Profile" className="profile-photo pulse" />
            <div className="photo-upload-overlay animated-overlay">
              <label htmlFor="photo-upload" className="upload-button">
                <i className="icon1">📷</i>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          {isEditingProfile ? (
            <form onSubmit={saveProfileChanges} className="edit-form slide-in">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleProfileChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleProfileChange}
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-button">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="user-details fade-in">
              <h2 className="user-name">{user.username}</h2>
              <p className="user-email">{user.email}</p>
              <p className="user-bio">{user.bio}</p>
              <div className="user-meta">
                <span className="user-location"><i className="icon1">📍</i> {user.location}</span>
                <span className="user-joined"><i className="icon1">📅</i> Joined {user.joinDate}</span>
              </div>
              <div className="social-links">
                <a href={`https://${user.socialLinks.twitter}`} className="social-link twitter" target="_blank" rel="noopener noreferrer">
                  <i className="icon1">🐦</i>
                </a>
                <a href={`https://${user.socialLinks.linkedin}`} className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                  <i className="icon1">💼</i>
                </a>
                <a href={`https://${user.socialLinks.github}`} className="social-link github" target="_blank" rel="noopener noreferrer">
                  <i className="icon1">🐙</i>
                </a>
              </div>
              <button 
                className="edit-button animated-button" 
                onClick={() => setIsEditingProfile(true)}
              >
                <i className="icon1">✏️</i> Edit Profile
              </button>
            </div>
          )}
        </div>
        
        <div className="profile-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button 
            className="password-button animated-button" 
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            <i className="icon1">🔒</i> Change Password
          </button>
          <button className="logout-button animated-button" onClick={handleLogout}>
            <i className="icon1">🚪</i> Logout
          </button>
        </div>
      </div>
      
      {isChangingPassword && (
        <div className="password-change-section slide-in">
          <h3><i className="icon1">🔑</i> Change Password</h3>
          <form onSubmit={savePasswordChanges} className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              {passwordData.newPassword !== passwordData.confirmPassword && 
                passwordData.confirmPassword && 
                <span className="password-mismatch">Passwords don't match!</span>}
            </div>
            
            <div className="password-strength">
              <label>Password Strength:</label>
              <div className="strength-meter">
                <div 
                  className={`strength-bar ${
                    passwordData.newPassword.length > 8 ? 'strong' : 
                    passwordData.newPassword.length > 5 ? 'medium' : 
                    passwordData.newPassword ? 'weak' : ''
                  }`}
                  style={{ width: `${Math.min(passwordData.newPassword.length * 10, 100)}%` }}
                ></div>
              </div>
              <span className="strength-text">
                {passwordData.newPassword.length > 8 ? 'Strong' : 
                 passwordData.newPassword.length > 5 ? 'Medium' : 
                 passwordData.newPassword ? 'Weak' : 'Enter password'}
              </span>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="save-button"
                disabled={passwordData.newPassword !== passwordData.confirmPassword}
              >
                Update Password
              </button>
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`} 
          onClick={() => setActiveTab('courses')}
        >
          <i className="icon1">📚</i> Courses
        </button>
        <button 
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`} 
          onClick={() => setActiveTab('badges')}
        >
          <i className="icon1">🏆</i> Badges
        </button>
        <button 
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`} 
          onClick={() => setActiveTab('achievements')}
        >
          <i className="icon1">🌟</i> Achievements
        </button>
        <button 
          className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`} 
          onClick={() => setActiveTab('skills')}
        >
          <i className="icon1">📊</i> Skills
        </button>
      </div>
      
      <div className="tab-content fade-in">
        {activeTab === 'courses' && (
          <div className="courses-section">
            <h3><i className="icon1">📚</i> Enrolled Courses</h3>
            <div className="courses-grid">
              {user.enrolledCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-icon">{course.icon}</div>
                  <h4 className="course-title">{course.title}</h4>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                  <span className={`course-status ${course.completed ? 'completed' : 'in-progress'}`}>
                    {course.completed ? 'Completed' : 'In Progress'}
                  </span>
                  <button className="course-action">
                    {course.completed ? 'Review' : 'Continue'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="badges-section">
            <h3><i className="icon1">🏆</i> Badges</h3>
            <div className="badges-grid">
              {user.badges.map(badge => (
                <div key={badge.id} className="badge-card">
                  <div className="badge-icon">{badge.icon}</div>
                  <h4 className="badge-name">{badge.name}</h4>
                  <p className="badge-date">Awarded on {new Date(badge.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <h3><i className="icon1">🌟</i> Achievements</h3>
            <div className="achievements-grid">
              {user.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-level">Level {achievement.level}</div>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4 className="achievement-name">{achievement.name}</h4>
                  <div className="achievement-stars">
                    {[...Array(achievement.level)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                    {[...Array(3 - achievement.level)].map((_, i) => (
                      <span key={i} className="star-empty">☆</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div className="skills-section">
            <h3><i className="icon1">📊</i> Skills</h3>
            <div className="skills-grid">
              {user.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-container">
                    <div 
                      className="skill-bar" 
                      style={{ width: `${skill.level}%` }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;