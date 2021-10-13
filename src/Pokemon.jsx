import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Button,
  Link,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokeContainer: {
    paddingTop: "16px",
    [theme.breakpoints.up("md")]: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: "0",
    },
  },
  imgCenter: {
    maxWidth: "300px",
    maxHeight: "300px",
    margin: "10px auto",
    display: "block",
  },
  pokeTitle: {
    position: "relative",
    display: "inline-block",
    margin: "0 auto",
    textTransform: "capitalize",
    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
  },
}));

const Pokemon = (props) => {
  const { history } = props;
  const classes = useStyles();
  const pokemonID = props.match.params.pokemonID;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
      .then((response) => setPokemon(response.data))
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokemonID]);
  /**
   * return card that contains pokemon information
   */
  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const { front_default, other } = sprites;
    const fullImg = other.dream_world.front_default;
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
              <Typography variant="h2" className={classes.pokeTitle}>
                {name}
                <img
                  src={front_default}
                  alt={name}
                  style={{ position: "absolute", top: "-25px", right: "100%" }}
                />
              </Typography>
              <img src={fullImg} alt={name} className={classes.imgCenter} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Pokemon Info
              </Typography>
              <Typography variant="h6">ID : {id}</Typography>
              <Typography variant="h6">Species : {species.name}</Typography>
              <Typography variant="h6">Height : {height}</Typography>
              <Typography variant="h6">Weight : {weight}</Typography>
              <Typography variant="h6">Types : {types[0].type.name}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/");
            }}
            style={{
              marginTop: "10px",
            }}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    );
  };

  const notFoundComp = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" align="center">
          Pokemon Not Found
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </Link>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" classes={{ root: classes.pokeContainer }}>
        {pokemon === undefined && (
          <p style={{ textAlign: "center" }}>
            <CircularProgress />
          </p>
        )}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && notFoundComp()}
      </Container>
    </React.Fragment>
  );
};

export default Pokemon;
