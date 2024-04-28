import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

const Landing = () => {
  return (
    <Grid>
      <img
        src="/src/assets/lifeStat_Landing.svg"
        style={{ display: "block", margin: "auto" }}
      ></img>

      <Grid container>
        <Grid item xs={12}>
          <h3>LifeStat</h3>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Typography variant="body1" className="large">
            Your comprehensive solution for tracking in ONE PLACE various
            aspects of your life, combining manual input with automatic syncing
            from other services so you can access a holistic view of your
            behaviors and habits.
            <br />
            <br />
            <strong>Relationships in your data?</strong> We will help you find
            correlations so you can have a deeper understanding on what drive
            your happiness, activity levels, productivity, and more. Run
            experiments on your behavior, leveraging LifeStat to confirm or
            refute your assumptions and uncover meaningful insights.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Typography variant="body1" className="large" align="right">
            <Button
              href="" //change to open modal
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#0db38e", color: "black" }}
            >
              <i className="ico icon-question-c"></i> Sign up now!
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container>
        <Grid item xs={12}>
          <h3>Connected Services</h3>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Typography variant="body1" className="large">
            We can understand more about your life when you bring the data you
            already have by connecting services from this list.
          </Typography>
          <Typography variant="body1" className="large">
            Find out how useful LifeStat is with the apps you already use.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <img
            src="/src/assets/logo_oura.png"
            style={{ display: "block", margin: "auto" }}
          ></img>
        </Grid>
        <Grid item md={6}>
          <img
            src="/src/assets/logo_fitbit.png"
            style={{ display: "block", margin: "auto" }}
          ></img>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
