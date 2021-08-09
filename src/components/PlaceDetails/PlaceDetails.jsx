import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

const PlaceDetails = ({ place, refProps, selected }) => {
  const classes = useStyles();
  if (selected) {
    refProps?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.crushpixel.com/big-static16/preview4/empty-plate-with-spoon-fork-2327113.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography variant="subtitle1">
            out of {place.num_reviews}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Rank</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.Chip} />
        ))}
        {place?.address && (
          <Typography
            variant="body2"
            gutterBottom
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            variant="body2"
            gutterBottom
            color="textSecondary"
            className={classes.subtitle}
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url,"_blank")}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website,"_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};
export default PlaceDetails;
