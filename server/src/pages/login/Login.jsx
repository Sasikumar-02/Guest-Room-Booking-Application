import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  // State variables to store the login credentials
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // Retrieve the loading status, error, and dispatch function from the AuthContext
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  // Event handler for input field changes
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Event handler for login button click
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // Send a POST request to the /auth/login endpoint with the login credentials
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        // If the user is an admin, dispatch the LOGIN_SUCCESS action and navigate to the /users page
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/users");
      } else {
        // If the user is not an admin, display an error message
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      // If an error occurs during login, dispatch the LOGIN_FAILURE action with the error message
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        {/* Input fields for username and password */}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        {/* Login button */}
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {/* Display error message if there is an error */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
