import React from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
});

const getPokemonCard = () => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>Ini Item</CardContent>
      </Card>
    </Grid>
  );
};

const Pokedex = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Pokedex;
