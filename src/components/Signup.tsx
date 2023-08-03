import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { auth } from '../firebase';

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      if(user) {
        await updateProfile(user, {
          displayName: `${name} ${surname}`
        });

        console.log('New user created: ', user);
        navigate('/dashboard');
      }
    } catch(error: any) {
      setError(error.message);
      console.log('Error: ', error.code, error.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup}>
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
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
