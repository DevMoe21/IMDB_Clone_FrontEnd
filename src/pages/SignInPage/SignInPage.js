import React, { useState } from 'react';
import './SignInPage.css'; // Ensure this CSS file is correctly referenced
import { auth, googleProvider, facebookProvider } from '../../FireBase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import googleIcon from '../icons8-google-30.png';
import facebookIcon from '../icons8-facebook-50.png';


function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signInWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful sign-in here
      })
      .catch((error) => {
        // Update to display error messages
        setErrorMessage(error.message);
      });
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      // Handle successful sign-in
    }).catch((error) => {
      // Handle errors
    });
  };

  const signInWithFacebook = () => {
    auth.signInWithPopup(facebookProvider).then((result) => {
      // Handle successful sign-in
    }).catch((error) => {
      // Handle errors
    });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="signin-form" onSubmit={signInWithEmail}>
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
         <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
      <button type="button" className="social-btn google-btn" onClick={signInWithGoogle}>
          <img src={googleIcon} alt="Google sign-in" className="social-icon" />
          Sign in with Google
        </button>
        <button type="button" className="social-btn facebook-btn" onClick={signInWithFacebook}>
          <img src={facebookIcon} alt="Facebook sign-in" className="social-icon" />
          Sign in with Facebook
        </button>
      <p className="signup-link">Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default SignInPage;


