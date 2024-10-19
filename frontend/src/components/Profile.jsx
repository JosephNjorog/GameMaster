import React from 'react';
import './Navbar.css'; // Make sure to import the CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <a href="#" className="nav-link">BrandName</a>
      </div>
      <nav>
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#services" className="nav-link">Services</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="profile">
      <h1>Joseph Njoroge Mwangi</h1>
      <p>
        I am based in Kenya, and I am a full stack software developer with a strong foundation in cyber security and blockchain. I love participating in hackathons and am also an Electrical & Electronics Engineering student. I have a passion for programming, singing, writing songs, poems, plays, and novels. I enjoy dancing and can talk about tech-related topics and lawn tennis for hours. Additionally, I am the sole founder of my own company, MentalSynch, handling everything from writing the code to management.
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  );
};

export default App;
