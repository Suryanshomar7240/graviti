import React, { useState, useEffect } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const Map = ({response}) => {
  const [CurrentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [directions,setDirections]=useState(null);
  const mapContainerStyle=  {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    console.log("in map");
    console.log(response);
    setDirections(response);

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


  }, [response]);

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={CurrentLocation}
          zoom={5}
        >
          <Marker position={CurrentLocation} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
