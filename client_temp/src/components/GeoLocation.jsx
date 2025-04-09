import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";

const GeoLocation = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376, 
    zoom: 8,
  });

  useEffect(() => {
    // Solicitar la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Actualizar el estado con la ubicación obtenida
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12, 
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación", error);
        }
      );
    } else {
      console.log("La geolocalización no es compatible con este navegador.");
    }
  }, []); 

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="your-mapbox-access-token"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default GeoLocation;
