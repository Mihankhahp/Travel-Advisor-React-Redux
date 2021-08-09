import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles.js";

const Map = ({
  weatherD,
  places,
  coordinateVal,
  coordinates,
  boundsVal,
  mapChildClicked,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");

  //Change Coordinates Point
  const coordinateChange = (e) => {
    const lat = e.center.lat;
    const lng = e.center.lng;
    coordinateVal({ lat, lng });
  };
  //Change Bounds Point
  const boundsChange = (e) => {
    const ne = e.marginBounds.ne;
    const sw = e.marginBounds.sw;
    boundsVal({ ne, sw });
  };
  const childClick = (child) => {
    mapChildClicked(child);
  };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        BootstarpURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={16}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={(e) => {
          coordinateChange(e);
          boundsChange(e);
        }}
        onChildClick={(child) => childClick(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  variant="subtitle2"
                  className={classes.typography}
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.crushpixel.com/big-static16/preview4/empty-plate-with-spoon-fork-2327113.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherD?.list?.map((weatherD, i) => (
          <div key={i} lat={weatherD.coord.lat} lng={weatherD.coord.lon}>
            <img
              alt="weather"
              height="70px"
              src={`https://openweathermap.org/img/w/${weatherD.weather[0].icon}.png`}
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
