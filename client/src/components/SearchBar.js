import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SearchBar(props) {
  const classes = useStyles();

  console.log(props);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Category</InputLabel>
        <NativeSelect value={props.category} onChange={props.setCategory}>
          <option aria-label="None" value="" />
          <option value={1}>Food & Catering</option>
          <option value={2}>Jewellery & Accessories</option>
          <option value={3}>Tattoo Artists</option>
          <option value={4}>Clothing</option>
          <option value={5}>Events & Planning</option>
          <option value={6}>Home & Living</option>
          <option value={7}>Health & Wellness</option>
        </NativeSelect>
        <FormHelperText>Filter by Category</FormHelperText>
      </FormControl>
    </div>
  );
}
