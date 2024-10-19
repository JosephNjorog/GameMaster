import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Lock, UserPlus } from 'lucide-react';
import Button from '../ui/button';
import Input from '../ui/input';
import Alert from '../ui/Alert';

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await signup(email.value, password.value);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute top-3 left-3 text-gray-400" />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="pl-10"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute top-3 left-3 text-gray-400" />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="pl-10"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          <UserPlus className="mr-2 h-4 w-4" /> Sign Up
        </Button>
      </form>
    </motion.div>
  );
};

export default Signup;