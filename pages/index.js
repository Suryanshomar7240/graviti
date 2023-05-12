import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Home.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import Map from "../components/map";
import LocationSearch from "../components/LocationSearch";

const Homepage = () => {
  const [origin,setOrigin]=useState(null);
  const [destination,setDestination]=useState(null);
  const [stopslocation,setStopsLocation]=useState([]);
  const [stops, setstops] = useState([<LocationSearch />]);
  const [windowWidth, setWidth] = useState(0);
  const handleStops = (e) => {
    setstops((stops) => [...stops, <LocationSearch />]);
  };



  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial window width
    setWidth(window.innerWidth);



  }, []);

  const [response, setResponse] = useState(null);

  const calculateDistance=()=>{
      const directionsService = new google.maps.DirectionsService();
      console.log(origin,destination);
      directionsService.route(
        {
          origin:origin,
          destination:destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setResponse(result);
            console.log(response);
            // ReactDOM.render(<Map response={response}/>,document.getElementsByClassName(styles.map)[0])
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
              <div className={styles.locations}>
                <div className={styles.loctionSrc}>
                  <div className={styles.LocationText}>Origin</div>
                  <LocationSearch onSelect={(location)=> setOrigin(location)}/>
                </div>
                <div className={styles.LocationStop}>
                  <div className={styles.LocationText}>Stops</div>
                  <div className={styles.locationStops}>
                    {stops.map((item, idx) =>{
                      return <LocationSearch key={idx} item={item}/>;
                    })}
                  </div>
                  <div className={styles.addStops} onClick={handleStops}>
                    Add another stop <IoMdAddCircleOutline size={20} />
                  </div>
                </div>
                <div className={styles.LocationDest}>
                  <div className={styles.LocationText}>Destination</div>
                  <LocationSearch  onSelect={(location)=> setDestination(location)}/>
                </div>
              </div>
              <div className={styles.calculate}>
                <button className={styles.calculateButton} onClick={calculateDistance}>Calculate</button>
              </div>
            </div>
            <div className={styles.distanceBox}>
              <div className={styles.distanceWrapper}>
                <div className={styles.distanceText}>Distance</div>
                <div className={styles.distance}>1,427 Kms</div>
              </div>
              <div className={styles.caption}>
                The distance between <b>Mumbai</b> and <b>Delhi</b> via the
                seleted route is <b>1,427 kms.</b>
              </div>
            </div>
          </div>
          <div className={styles.map}>
            <Map response={response}/>
          </div>
        </div>
      </div>
    </section>
  );

}

const AddingStop = (props) => {
  return (
    <>
      <props.Parent />
      <LocationSearch />
    </>
  );
};
export default Homepage;
