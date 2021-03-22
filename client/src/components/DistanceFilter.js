import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 270,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const marks = [
  {
    value: 30,
    label: "30km",
  },
  {
    value: 20,
    // label: "20km"
  },
  {
    value: 10,
  },
  {
    value: 0,
    label: "0km",
  },
];

function valuetext(value) {
  return `${value}km`;
}

export default function DistanceFilter(props) {
  return (
    <div>
      <Slider
        defaultValue={10}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="auto"
        max={30}
        style={{ width: "15rem" }}
        onChange={(event, value) => {
          props.setDistance(value);
        }}
      />
    </div>
  );
}
