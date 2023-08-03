import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.displayName} to your dashboard!</p>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          {/* Add other menu items as needed */}
        </ul>
      </nav>

      <section>
        <h2>AI Tutor</h2>
        <p>This is where the AI tutor will be developed.</p>
        {/* Replace the above paragraph with your AI tutor component when it is ready */}
      </section>
    </div>
  );
};

export default Dashboard;
