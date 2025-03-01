import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png"; // Adjust path if needed
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const navLinks = document.querySelector(".navbar-links");
      const mobileToggle = document.querySelector(".mobile-menu-toggle");
      
      if (menuOpen && navLinks && mobileToggle) {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
          setMenuOpen(false);
        }
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close menu when a link is clicked
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      
      <div className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/courses" onClick={closeMenu}>Courses</Link>
        <Link to="/tutorials" onClick={closeMenu}>Tutorials</Link>
        <Link to="/about" onClick={closeMenu}>About Us</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>
      
      <div className="navbar-auth">
        {username ? (
          <>
            <Link to="/profile" className="username-link" onClick={closeMenu}>
              Welcome, {username}
            </Link>
            <button className="logout" onClick={() => { handleLogout(); closeMenu(); }}>
              Logout
            </button>
          </>
        ) : (
          <button className="login" onClick={() => { navigate("/login"); closeMenu(); }}>
            SignUp/LogIn
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;