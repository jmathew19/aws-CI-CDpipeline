import React, { useState } from 'react';

async function loginUser(username, password) {
    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        return true;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
    }
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

        try {
            const isLoggedIn = await loginUser(username, password);

            if (isLoggedIn) {
                // Redirect to a new page upon successful login
                window.location.href = '/dashboard';
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Login Below:</h2>
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
                    <label htmlFor="password">Password: </label>
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
