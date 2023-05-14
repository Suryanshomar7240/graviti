import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Home.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import Map from "../components/map";
import LocationSearch from "../components/LocationSearch";

const Homepage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stops, setstops] = useState([null]);
  const [windowWidth, setWidth] = useState(0);
  const handleStops = (e) => {
    setstops((stops) => [...stops, <LocationSearch />]);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial window width
    setWidth(window.innerWidth);
    setLoading(localStorage.getItem("apiLoaded"));
  }, []);

  const [response, setResponse] = useState(null);
  const [dist, setDist] = useState(null);

  const calculateDistance = () => {
    setDist(null);
    setResponse(null);
    const directionsService = new google.maps.DirectionsService();
    console.log(origin, destination);
    const wayLocations = [];
    stops.forEach((element) => {
      if(element!==null)
      wayLocations.push({ location: element });
    });
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: wayLocations,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setResponse(result);
          console.log(result);
          let dist = 0;
          result["routes"][0]["legs"].map((val) => {
            dist += val["distance"]["value"];
          });
          dist /= 1000;
          setDist(dist + " Kms");
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  return (
    <section className={styles.homepage}>
      <div className={styles.header}>
        <Image
          src="/logo.png"
          alt="graviti logo"
          width={windowWidth > 768 ? 160 : 100}
          height={windowWidth > 768 ? 69 : 40}
        ></Image>
      </div>
      <div className={styles.homebody}>
        <div className={styles.tagLine}>
          Let's calulate <b>distance</b> from Google maps
        </div>
        <div className={styles.homeContent}>
          <div className={styles.locationSetter}>
            <div className={styles.locationWrapper}>
              {!loading ? (
                <></>
              ) : (
                <div className={styles.locations}>
                  <div className={styles.loctionSrc}>
                    <div className={styles.LocationText}>Origin</div>
                    <LocationSearch
                      onSelect={(location) => setOrigin(location)}
                    />
                  </div>
                  <div className={styles.LocationStop}>
                    <div className={styles.LocationText}>Stops</div>
                    <div className={styles.locationStops}>
                      {stops.map((item, idx) => {
                        return (
                          <LocationSearch
                            key={idx}
                            item={item}
                            onSelect={(newval) =>
                              setstops((prevItems) => {
                                return prevItems.map((prevval, i) => {
                                  if (i === idx) {
                                    return newval;
                                  }
                                  return prevval;
                                });
                              })
                            }
                          />
                        );
                      })}
                    </div>
                    <div className={styles.addStops} onClick={handleStops}>
                      Add another stop <IoMdAddCircleOutline size={20} />
                    </div>
                  </div>
                  <div className={styles.LocationDest}>
                    <div className={styles.LocationText}>Destination</div>
                    <LocationSearch
                      onSelect={(location) => setDestination(location)}
                    />
                  </div>
                </div>
              )}{" "}
              <div className={styles.calculate}>
                <button
                  className={styles.calculateButton}
                  onClick={calculateDistance}
                >
                  Calculate
                </button>
              </div>
            </div>
            <div className={styles.distanceBox}>
              <div className={styles.distanceWrapper}>
                <div className={styles.distanceText}>Distance</div>
                <div className={styles.distance}>{dist}</div>
              </div>
              <div className={styles.caption}>
                {origin != null && destination != null ? (
                  <>
                    The distance between <b>{origin}</b> and{" "}
                    <b>{destination}</b> via the seleted route is <b>{dist}</b>
                  </>
                ) : (
                  <>Enter origin and destination</>
                )}
              </div>
            </div>
          </div>
          <div className={styles.map}>
            <Map response={response} />
          </div>
        </div>
      </div>
    </section>
  );
};

const AddingStop = (props) => {
  return (
    <>
      <props.Parent />
      <LocationSearch />
    </>
  );
};
export default Homepage;
