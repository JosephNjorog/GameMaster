import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sun, Moon, Calendar, Gamepad2 as GameController, Trophy, TrendingUp } from 'lucide-react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Badge from '../components/ui/badge';
import CardHeader from '../components/ui/CardHeader';
import CardTitle from '../components/ui/CardTitle';
import CardContent from '../components/ui/CardContent';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const games = [
  { name: 'Chess', icon: '♟️' },
  { name: 'Ludo', icon: '🎲' },
  { name: 'Scrabble', icon: '🔤' },
  { name: 'Draft', icon: '🏁' },
];

const Dashboard = ({ user }) => {
  const [progress, setProgress] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mockProgress = [
      { name: 'Chess', value: 30 },
      { name: 'Ludo', value: 45 },
      { name: 'Scrabble', value: 20 },
      { name: 'Draft', value: 5 },
    ];
    setProgress(mockProgress);
  }, []);

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>
        <Button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={progress}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {progress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GameController className="mr-2" />
              Available Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {games.map((game) => (
                <Button key={game.name} variant="outline" className="h-20 text-lg">
                  <span className="mr-2 text-2xl">{game.icon}</span>
                  {game.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Chess Master</Badge>
              <Badge variant="secondary">Ludo Champion</Badge>
              <Badge variant="secondary">Word Wizard</Badge>
              <Badge variant="secondary">Draft Prodigy</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Chess Tournament - Next Friday</li>
              <li>Scrabble Night - This Saturday</li>
              <li>Ludo Championship - In 2 weeks</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
