import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User, updateProfile, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if(user) {
      try {
        await updateProfile(user, {
          displayName: `${name} ${surname}`
        });

        console.log('User profile updated: ', user);
      } catch(error: any) {
        setError(error.message);
        console.log('Error: ', error.code, error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate('/login');
    } catch(error: any) {
      setError(error.message);
      console.log('Error: ', error.code, error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        
        if(user && user.displayName) {
          const names = user.displayName.split(" ");
          if(names.length >= 2) {
            setName(names[0]);
            setSurname(names[1]);
          }
        }
      } else {
        // No user is signed in.
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>

      <form onSubmit={handleUpdate}>
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>{error}</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;