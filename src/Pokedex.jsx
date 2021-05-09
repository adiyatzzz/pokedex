import React, { useState } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// API
import mockData from "./mockData";

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
  pokeSprite: {
    margin: "auto",
  },
  pokeCard: {
    "&:hover": {
      background: "#ddd",
      cursor: "pointer",
    },
  },
});

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState(mockData);
  const firstCharUppercase = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // return pokemon card
  const getPokemonCard = (pokemonID) => {
    const { id, name } = pokemonData[pokemonID];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
      <Grid item xs={12} sm={4} key={pokemonID}>
        <Card
          onClick={() => history.push(`/${pokemonID}`)}
          className={classes.pokeCard}
        >
          <CardMedia
            image={sprite}
            style={{ width: "130px", height: "130px" }}
            className={classes.pokeSprite}
          />
          <CardContent>
            <Typography align="center">{firstCharUppercase(name)}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Container className={classes.container}>
          <Grid container spacing={2}>
            {Object.keys(pokemonData).map((pokemonID) =>
              getPokemonCard(pokemonID)
            )}
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};

export default Pokedex;
