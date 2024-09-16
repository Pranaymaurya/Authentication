import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  axios.defaults.withCredentials = true;
  const url = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { email, password });

      // If login is successful, store the JWT token in localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');  // Redirect to home page
      } else {
        setErr(true); // Handle invalid login response
      }
    } catch (err) {
      console.log(err);
      setErr(true);  // Show error message if login fails
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        className="bg-gray-800 rounded-lg shadow-xl overflow-hidden justify-center"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
          <form method="POST" onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          {err && (
            <div className="mt-4 text-center text-red-500">
              Invalid email or password
            </div>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Don't have an account?</span>
          <Link className="font-medium text-indigo-500 hover:text-indigo-400" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


