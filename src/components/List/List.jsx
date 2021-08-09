import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  isLoading,
  typeValChange,
  type,
  rateValChange,
  rate,
  places,
  childNum,
}) => {
  const classes = useStyles();
  // Refs Selector
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);
  //Rate Change Value
  const rateChangeVal = (e) => {
    const rateVal = e.target.value;
    console.log(rateVal);
    rateValChange(rateVal);
  };
  //Type Change Value
  const typeChangeVal = (e) => {
    const typeVal = e.target.value;
    console.log(typeVal);
    typeValChange(typeVal);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5">
      Restaurants, Hotels and Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => typeChangeVal(e)}>
              <MenuItem value="restaurants">restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rate</InputLabel>
            <Select value={rate} onChange={(e) => rateChangeVal(e)}>
              <MenuItem value="0">all</MenuItem>
              <MenuItem value="3.0">Normall</MenuItem>
              <MenuItem value="4.0">Good</MenuItem>
              <MenuItem value="4.5">Best</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12} ref={elRefs[i]}>
                <PlaceDetails
                  place={place}
                  selected={Number(childNum) === i}
                  refProps={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
export default List;
