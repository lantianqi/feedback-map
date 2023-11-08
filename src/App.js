import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
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

  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = (e) => {
    // prevent the browser from reloading the page
    e.preventDefault();

    // read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  const reset = () => {
    console.log(userLocation)
    setUserLocation(null);
    setUserLatitude("")
    setUserLongitude("")
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
        <label>
          <label>
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
              <input type="text" value={userLatitude} name="userLatitude" readOnly />
            </label>
            <hr />
            <label>
              Longitude 
              <input type="text" value={userLongitude} name="userLongitude" readOnly />
            </label>
          </label>
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
