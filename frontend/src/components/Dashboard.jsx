import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = ({ user }) => {
  const [progress, setProgress] = useState([]);
  
  useEffect(() => {
    // Fetch user progress data
    axios.get(`/api/user/${user.id}/progress`)
      .then(response => setProgress(response.data))
      .catch(error => console.error('Error fetching user progress:', error));
  }, [user.id]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.firstName}!</h1>
      <h2>Your Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            dataKey="value" 
            isAnimationActive={false} 
            data={progress} 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8"
            label
          >
            {progress.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="game-links">
        <h2>Play a Game</h2>
        <ul>
          <li><Link to="/games/chess">Chess</Link></li>
          <li><Link to="/games/ludo">Ludo</Link></li>
          <li><Link to="/games/scrabble">Scrabble</Link></li>
          <li><Link to="/games/draft">Draft</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
