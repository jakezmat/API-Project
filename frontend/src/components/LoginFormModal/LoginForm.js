import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './LoginForm.css'
function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    history.push('/songs')
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.message) {
          setErrors([data.message]);
        }
      }
    );
  };

  return (
    <div id="login-container">

    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, idx) => (
          <h4 key={idx}>{error}</h4>
          ))}
      </div>
      <div id='input-container'>
        <div id='login-logo'>

      <img  src='https://i.imgur.com/OHysOUL.png'></img>
        </div>
      <label id='user-label'>
        Username or Email
        <input
          id='user'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label id='pass-label'>
        Password
        <input
          id='pass'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <button id='submit-btn' type="submit">Log In</button>
      </div>
    </form>
          </div>
  );
}

export default LoginForm;
