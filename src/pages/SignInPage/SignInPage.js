import React, { useState } from 'react';
import './SignInPage.css';
import { auth, googleProvider, facebookProvider } from '../../FireBase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import googleIcon from '../icons8-google-30.png';
import facebookIcon from '../icons8-facebook-50.png';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signInWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/user-profile');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate('/user-profile');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        navigate('/user-profile');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert('Password reset email sent!');
        setResetEmail('');
        setShowResetModal(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const PasswordResetModal = () => (
    <div className="password-reset-modal">
      <div className="password-reset-content">
        <h2>Password Reset</h2>
        <input 
          type="email" 
          value={resetEmail} 
          onChange={(e) => setResetEmail(e.target.value)} 
          placeholder="Enter your email" 
        />
        <button onClick={handlePasswordReset}>Send Reset Email</button>
        <button onClick={() => setShowResetModal(false)}>Close</button>
      </div>
    </div>
  );

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
      <button className="social-btn google-btn" onClick={signInWithGoogle}>
        <img src={googleIcon} alt="Google sign-in" className="social-icon" />
        Sign in with Google
      </button>
      <button className="social-btn facebook-btn" onClick={signInWithFacebook}>
        <img src={facebookIcon} alt="Facebook sign-in" className="social-icon" />
        Sign in with Facebook
      </button>
      <p className="signup-link">Don't have an account? <a href="/signup">Sign Up</a></p>
      <button className="reset-password-btn" onClick={() => setShowResetModal(true)}>
        Reset Password
      </button>

      {showResetModal && <PasswordResetModal />}
    </div>
  );
}

export default SignInPage;


