import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('http://localhost:3000/home');
        console.log(result);
        if (result.data !== 'success') {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to the Dashboard</h1>
        <p className="text-lg text-gray-600 text-center mb-8">You have successfully logged in!</p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}


