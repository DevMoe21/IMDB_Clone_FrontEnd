import React, { useState } from 'react';
import './SignUpPage.css'; // Ensure this CSS file is correctly referenced
import { auth } from '../../FireBase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const signUpWithEmail = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful account creation here
        // You may want to save the additional user information (username, dateOfBirth, gender) to your database
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={signUpWithEmail}>
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
