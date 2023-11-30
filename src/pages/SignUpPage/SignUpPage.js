import React, { useState } from 'react';
import './SignUpPage.css'; // Ensure this CSS file is correctly referenced
import { auth } from '../../FireBase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database } from '../../FireBase/firebaseConfig';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate(); // import useNavigate from 'react-router-dom'

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Store additional user data in Realtime Database
    const userId = userCredential.user.uid;
    set(ref(database, 'users/' + userId), {
      username: username,
      dateOfBirth: dateOfBirth,
      gender: gender
    }).then(() => {
      navigate('/dashboard'); // Redirect to dashboard or home page after successful sign-up
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={createUserWithEmailAndPassword}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <input 
          type="date" 
          value={dateOfBirth} 
          onChange={(e) => setDateOfBirth(e.target.value)} 
          required 
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <p className="signin-link">Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
}

export default SignUpPage;
