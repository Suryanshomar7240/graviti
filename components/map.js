import React, { useState, useEffect } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";

const Map = ({response}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  });

  const [CurrentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [directions, setDirections] = useState(null);
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    localStorage.setItem('apiLoaded',isLoaded);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting the current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    setDirections(response);
    console.log(response);  
  }, [response]);

  if (isLoaded) {
    return (
      <>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={CurrentLocation}
          zoom={5}
        >
          {directions && (
            <DirectionsRenderer directions={directions} map={Map} />
          )}
        </GoogleMap>
      </>
    );
  }
  else{
    <>Loading...</>
  }
};

export default Map;
