import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import Axios from 'axios';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // what to do once we have the position
          const { latitude, longitude } = position.coords;

          setUserLocation(position);

          setUserLatitude(latitude);
          setUserLongitude(longitude);

          // console.log(userLocation);
        },
        (error) => {
          // display an error if we cant get the users position
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // display an error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    // prevent the browser from reloading the page
    e.preventDefault();

    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_TO_BACKEND_URL);

    // read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    
    const base_url = process.env.REACT_APP_TO_BACKEND_URL;
    const port = process.env.REACT_APP_TO_BACKEND_PORT;
    const backend_base_url = `${base_url}:${port}`;
    const post_url = `${backend_base_url}/insert`;
    console.log(post_url);
    Axios.post(post_url, {
      displayName: userDisplayName,
      message: userMessage,
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    }).then(function (response) {
      console.log(response);
    });

    console.log("Axios request sent!");
  };

  const reset = () => {
    console.log(userLocation);
    setUserLocation(null);
    setUserLatitude("");
    setUserLongitude("");
    setUserDisplayName("");
    setUserMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <form method="post" onSubmit={handleSubmit}>
        <h2>Get Your Location!</h2>
        <button type="button" onClick={getUserLocation}>
          Get
        </button>
        {/* {userLocation && (
              <div>
                <h2>User Location</h2>
                <p>Latitude: {userLocation.latitude}</p>
                <p>Longitude: {userLocation.longitude}</p>
              </div>
            )} */}

        <input type="checkbox" name="myCheckbox" />
        <hr />
        <label>
          Latitude
          <input
            type="text"
            value={userLatitude}
            name="userLatitude"
            readOnly
          />
        </label>
        <hr />
        <label>
          Longitude
          <input
            type="text"
            value={userLongitude}
            name="userLongitude"
            readOnly
          />
        </label>
        <label>
          <h2>Enter Your Name!</h2>
          <input
            value={userDisplayName}
            name="displayName"
            onChange={(e) => setUserDisplayName(e.target.value)}
          />
        </label>
        <label>
          <h2>Leave Your Message!</h2>
          <textarea
            value={userMessage}
            name="message"
            rows={4}
            cols={40}
            onChange={(e) => setUserMessage(e.target.value)}
          />
        </label>
        <hr />
        <button type="reset" onClick={reset}>
          Reset
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
