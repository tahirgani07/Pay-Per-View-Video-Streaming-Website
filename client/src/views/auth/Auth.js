import React, { useState } from 'react';
import useOverlayStore from '../../stores/overlayStore';
import { backendReq } from '../../axios';
import userStore from '../../stores/userStore';
import './Auth.css';

const initialState = { name: "", email: "", password: "", confirmPassword: "" };

function Auth() {
  const toggleShowAuthOverlay = useOverlayStore(state => state.toggleShowAuthOverlay);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const setUser = userStore(state => state.setUser);
  const [loading, setLoading] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    
    try {
      let res;
      setLoading(true);
      console.log(formData)
      if(isSignup) {
        res = await backendReq.post("/user/signup", formData);
      } else {
        res = await backendReq.post("/user/signin", formData);
      }

      localStorage.setItem("user-profile", JSON.stringify({ ...res?.data}));
      setUser(res?.data.result);
      toggleShowAuthOverlay();
    } catch(e) {
      console.log(e);
      alert(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth" >
        <div className="container">
          <div className="auth_header">
            <h2 className="auth_title" >{isSignup ? "Create an Account" : "Sign In"}</h2>
            <button className="dismissButton" onClick={() => toggleShowAuthOverlay()}>x</button>
          </div>
          <form className="auth_form" onSubmit={submitForm}>
            { isSignup && <input type="text" className="auth_input" name="name" onChange={onChange} autoFocus placeholder="Name *" /> }
            <input type="text" className="auth_input" name="email" onChange={onChange} placeholder="Email Address *" autoFocus />
            <input type="password" className="auth_input" name="password" onChange={onChange} placeholder= "Password *" />
            { isSignup && <input type="password" className="auth_input" name="confirmPassword" onChange={onChange} placeholder= "Confirm Password *" /> }

            <button type="submit" className="auth_submitButton" disabled={loading}>
              {loading ? <div className="loader"></div> : (isSignup ? "SIGN UP" : "SIGN IN")}
            </button>
            <input type="button" className="auth_toggleForms_button"
              onClick={() => setIsSignUp(!isSignup)} 
              value={isSignup ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "CREATE AN ACCOUNT"} />
          </form>
        </div>
    </div>
  )
}

export default Auth