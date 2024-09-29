// App.js
import { useState } from "react";
import './App.css'; // Import the CSS file

function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is authenticated
  const [message, setMessage] = useState(""); // Success or error message
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleLoginSignup = async () => {
    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const url = isLogin
      ? "https://6q0dzr40-5000.uks1.devtunnels.ms/api/auth/login" // Replace with your login API
      : "https://6q0dzr40-5000.uks1.devtunnels.ms/api/auth/signup"; // Replace with your signup API

    const requestBody = {
      email,
      password,
    };

    setIsLoading(true); // Start loading
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setIsAuthenticated(true);
          setMessage("You are logged in!");
        } else {
          setMessage("Signup successful! Please login.");
          setIsLogin(true); // Switch to login after signup success
        }
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again." , error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="container">
      {isAuthenticated ? (
        <h2>{message}</h2> // Show success message after login
      ) : (
        <div>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button onClick={handleLoginSignup} disabled={isLoading}>
            {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
          <br />
          <button onClick={() => setIsLogin(!isLogin)} style={{marginTop:"10px"}}>
            {isLogin ? "Switch to Sign Up" : "Switch to Login"}
          </button>

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
