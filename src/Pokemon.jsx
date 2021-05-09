import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { RestaurantMenu } from "@material-ui/icons";
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
      .catch((error) => setPokemon(false));
  }, [pokemonID]);
  console.log(pokemon);
  /**
   * return card that contains pokemon information
   */
  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`;
    const { front_default } = sprites;
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
                  style={{ position: "absolute", top: "-35px", right: "-80px" }}
                />
              </Typography>
              <img src={fullImgUrl} alt={name} className={classes.imgCenter} />
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
        </CardContent>
      </Card>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" classes={{ root: classes.pokeContainer }}>
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && generatePokemonJSX()}
        {pokemon === false && <Typography>Pokemon Not Found</Typography>}
        {pokemon !== undefined && (
          <Button
            variant="contained"
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </Button>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Pokemon;
