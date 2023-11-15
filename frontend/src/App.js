import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import Axios from 'axios';

function App() {
  console.log(process.env);

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
          console.log(position);

          showCity(position);

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

  const showCity = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)

    const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    console.log(GOOGLE_MAP_API_KEY);
    const geocoding_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`;

    fetch(geocoding_url)
      .then((response) => response.json())
      .then((data) => {
        // Parse the city name from the API response
        const city = data.results[0].address_components.find((component) =>
          component.types.includes("locality")
        ).long_name;

        console.log(`Your city is ${city}.`);
      })
      .catch((error) => console.log(error));
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
    formJson.location = {"type": "Point", "coordinates": [userLatitude, userLongitude]};
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
      location: {coordinates: [userLatitude, userLongitude]}
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

      <iframe style={{background: "#FFFFFF", border: "none", width:640, height:480}} src="https://charts.mongodb.com/charts-lantianqi-feedback-map-fjizi/embed/charts?id=65536622-d266-4d51-853b-d15cb0ef7732&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>

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
