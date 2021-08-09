import React, { useReducer, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { INITIALSTATE, reducer } from './ActionsCenter/Reducer';
import {
  rateInputChanged,
  typeInputchanged,
  placesData,
  coordinatesValChanged,
  boundsValChanged,
  mapChildChanged,
  changeLoading,
  weatherData
} from './ActionsCenter/Action';
import { getPlacesData, getWeatherData } from './api';

function App() {
  const [{
    type,
    rate,
    data,
    wdata,
    coordinates,
    bounds,
    selectedChild,
    isLoading
  }, dispatch] = useReducer(reducer, INITIALSTATE)
  //Selected Child change
  const childClicked = (child) => {
    dispatch(mapChildChanged(child))
  }
  //Rate Change Value Dispatch Function
  const rateAction = (rateVal) => {
    dispatch(rateInputChanged(rateVal))
  }
  //Type Change Value Dispatch Function
  const typeAction = (typeVal) => {
    dispatch(typeInputchanged(typeVal))
  }
  //Dispatch Coordinates
  const coordinatesChanged = ({ lat, lng }) => {
    dispatch(coordinatesValChanged({ lat, lng }))
  }
  //Dispatch Bounds 
  const BoundsChanged = ({ ne, sw }) => {
    dispatch(boundsValChanged({ ne, sw }))
    console.log(ne, sw);
  }
  //User Current Location Coordinate
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (
        { coords: { latitude, longitude } }) => {
        dispatch(coordinatesValChanged({ lat: latitude, lng: longitude }))
        console.log(latitude);
      }
    )
  }, [])
  //Places Data Dispatch Function
  useEffect((isLoading, coordinates) => {
    dispatch(changeLoading(isLoading));
    if (coordinates && bounds) {
      getWeatherData(coordinates.lat, coordinates.lng)
        .then(
          (data) => {
            dispatch(weatherData(data));
            console.log('weather data:' + data)
          });
      getPlacesData(type, bounds.sw, bounds.ne)
        .then(
          (data) => {
            dispatch(placesData(data));
            dispatch(changeLoading(isLoading));
          }
        );
    }
  }, [type, bounds])
  useEffect(
    (data) => {
      if (data) {
        const filterPlace = data.filter((place) => place.rating > rate)
        dispatch(placesData(filterPlace))
      }
    }
    , [rate]
  )
  return (
    <>
      <CssBaseline />
      <Header
        coordinateVal={coordinatesChanged}
      />
      <Grid container spacing={3} style={{ with: '100%' }}>
        <Grid xs={12} md={4}>
          <List
            isLoading={isLoading}
            childNum={selectedChild}
            places={data}
            rateValChange={rateAction}
            rate={rate}
            typeValChange={typeAction}
            type={type}
          />
        </Grid>
        <Grid xs={12} md={8}>
          <Map
            weatherD={wdata}
            mapChildClicked={childClicked}
            coordinateVal={coordinatesChanged}
            coordinates={coordinates}
            boundsVal={BoundsChanged}
            places={data}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
