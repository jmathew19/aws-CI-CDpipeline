import React, { useState } from 'react';

// Frontend code to call the backend API
async function checkUsernameValidity(username) {
    const response = await fetch('https://your-api-gateway-url/dev/check-username', {
        method: 'POST',
        body: JSON.stringify({ username }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    
    return data.isValid;
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Call the function to check username validity
    const isValidUsername = await checkUsernameValidity(username);
    
    // Use the result to perform further actions
    if (!isValidUsername) {
      alert("Invalid username!");
      return;
    }
    
    // Continue with the login process
    // You can add your authentication logic here
  };

  return (
    <div>
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
          <p>Already have an account? <a href='/signup'>Sign up here</a></p>
      </div>
    </div>
  );
}

export default Login;
