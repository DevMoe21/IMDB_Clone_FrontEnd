import React, { useState } from 'react';
import './SignUpPage.css';
import { auth } from '../../FireBase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const createUserInMongoDB = (userId, email, username, dateOfBirth, gender) => {
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userId,
        email,
        username,
        dateOfBirth,
        gender
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('User created in MongoDB Atlas:', data);
      navigate('/user-profile'); // Redirect after successful sign-up
    })
    .catch((error) => {
      setError('Error creating user in MongoDB: ' + error.message);
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  
    // Check if username or email already exists in MongoDB
    fetch('http://localhost:5000/api/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        setError('Username or email already exists. Please use a different one.');
        return;
      }
  
      // If not exists, proceed with Firebase authentication
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
          createUserInMongoDB(userId, email, username, dateOfBirth, gender);
        })
        .catch((firebaseError) => {
          if (firebaseError.code === 'auth/email-already-in-use') {
            setError('Email already in use. Please use a different email.');
          } else {
            setError('Sign-up Error: ' + firebaseError.message);
          }
        });
    })
    .catch((error) => {
      setError('Error checking user existence: ' + error.message);
    });
  };


  return (
    <div className="signup-container">
          {error && <p className="error-message">{error}</p>} {/* Display the error message */}
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
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
