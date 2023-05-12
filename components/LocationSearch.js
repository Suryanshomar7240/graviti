import React, { useState } from "react";
import styles from '../styles/LocationSearch.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-autocomplete";

const LocationSearch = ({onSelect}) => {

  return (
    <PlacesAutocomplete
    className={styles.searchBar}
      apiKey={process.env.NEXT_PUBLIC_API_KEY}
      onPlaceSelected={(place)=>{
        onSelect(place["formatted_address"]);
      }}

    />
  );
};

export default LocationSearch;
