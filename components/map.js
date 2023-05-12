import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  // DirectionsService,
  // DirectionsRenderer,
  // Marker,
  // useLoadScript,
  // useMemo,
  // ComboBox
} from "@react-google-maps/api";

const Map = () => {
  const [windowWidth, setWidth] = useState(1220);
  const [CurrentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: "100%",
    height: "100%",
  });

  const origin = "San Francisco, CA";
  const destination = "Los Angeles, CA";

  useEffect(() => {
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

    const handleResize = () => {
      console.log("changing width");
      setWidth(window.innerWidth);
      // setMapContainerStyle({
      //   width: windowWidth > 768 ? "39vw" : "100vw",
      //   height: windowWidth > 768 ? "70vh" : "60vh",
      // });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial window width
    setWidth(window.innerWidth);

    // setMapContainerStyle({
    //   width: windowWidth > 768 ? "39vw" : "100vw",
    //   height: windowWidth > 768 ? "70vh" : "50vh",
    // });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const [response, setResponse] = useState(null);
  // const calcDistance=()=>{

  //   const script = document.createElement('script2');
  //   script.src = `https://maps.googleapis.com/maps/api/directions/json
  //   ?destination=Montreal
  //   &origin=Toronto
  //   &key=AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ`;
  //   script.async = true;
  //   script.onload = (err) => {
  //     console.log(err);
  //     const directionsService = new google.maps.DirectionsService();
  //     directionsService.route(
  //       {
  //         origin,
  //         destination,
  //         travelMode: google.maps.TravelMode.DRIVING
  //       },
  //       (result, status) => {
  //         if (status === google.maps.DirectionsStatus.OK) {
  //           setResponse(result);
  //         } else {
  //           console.error(`Directions request failed due to ${status}`);
  //         }
  //       }
  //     );
  //   };
  // document.head.appendChild(script);
  // }

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
  };

  const calcLocation = () => {
    console.log("heyy");
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ"
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={CurrentLocation}
          zoom={8}
        >
          <Marker position={CurrentLocation} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
