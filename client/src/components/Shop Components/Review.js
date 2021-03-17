import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Review(props) {
  const trimDate = (date) => {
    return date.split("").slice(0, 10).join("");
  };

  return (
    <Typography variant="body2">
      <Paper style={{ padding: "40px 20px" }}>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{props.user_id}</h4>
            <p style={{ textAlign: "left" }}>{props.message_text}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {trimDate(props.created_at)}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </Typography>
  );
}
