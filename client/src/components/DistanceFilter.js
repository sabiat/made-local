import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Slider from '@material-ui/core/Slider';
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
    label: "30km"
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
    label: "0km"
  }
];

function valuetext(value) {
  return `${value}km`;
}

export default function DistanceFilter(props) {
  const classes = useStyles();

  return (
    <div>
      {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Distance</InputLabel>
        <NativeSelect value={props.distance}
        onChange={props.setDistance}>

          <option aria-label="None" value="" />
          <option value={50}>50 km</option>
          <option value={30}>30 km</option>
          <option value={20}>20 km</option>
          <option value={10}>10 km</option>
        </NativeSelect>
        <FormHelperText>Filter by Distance</FormHelperText>
      </FormControl> */}
      
      <div className={classes.root} style={{paddingTop: "4em"}}>
        <Slider
          defaultValue={10}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={1}
          marks={marks}
          valueLabelDisplay="auto"
          max={30}
          onChange={(event, value) => {
            props.setDistance(value)
          }}
          />
          <Typography variant="body2">
            Filter by distance
          </Typography>
      </div>
    </div>
  );
}
