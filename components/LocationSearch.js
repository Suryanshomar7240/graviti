import React, { useState } from "react";
import styles from '../styles/LocationSearch.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-autocomplete";

const LocationSearch = () => {

  return (
    <PlacesAutocomplete
    className={styles.searchBar}
      apiKey='AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ'
      onPlaceSelected={(place) => {
        console.log(place);
      }}
    />
  );
};

export default LocationSearch;
