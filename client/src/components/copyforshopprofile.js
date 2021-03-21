<Box mx="auto" bgcolor="background.paper" p={15}>
<ShopContact
  name={state.shop[0].name}
  id={state.shop[0].id}
  description={state.shop[0].description}
  photo={state.shop[0].photo}
  phoneNumber={state.shop[0].phone_number}
  social={state.shop[0].social}
  delivery={state.shop[0].delivery}
  pickup={state.shop[0].pickup}
  shipping={state.shop[0].shipping}
/>

<Grid container alignItems="center">
  <Grid item xs={7}>
    {state.shop[0].user_id === props.user.id && (
      <AddAPhotoIcon
        onClick={() =>
          history.push(`/shops/${state.shop[0].id}/addphoto`)
        }
      />
    )}
    <ShopPhotos />
  </Grid>

  <Grid item xs={5}>
    <ShopMap
      name={state.shop[0].name}
      lat={state.shop[0].latitude}
      lon={state.shop[0].longitude}
    />
  </Grid>
  {/* )} */}
</Grid>

<Grid item xs={12}>
  <ShopMessageBoard user={props.user} />
</Grid>
</Box>
</div>
);
