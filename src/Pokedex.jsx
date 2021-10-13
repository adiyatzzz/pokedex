import React, { useState, useEffect } from "react";
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
  TextField,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const [nextPage, setNextPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const [hasMore, setHasMore] = useState(true);
  const [pokeIndex, setPokeIndex] = useState(0);
  useEffect(() => {
    getPokeAPI();
  }, []);

  const getPokeAPI = () => {
    axios.get(nextPage).then((response) => {
      const { data } = response;
      const { results, next } = data;
      let index = pokeIndex;
      // insert each object in array to pokemonData
      let getPokemonData = {};
      results.forEach((pokemon) => {
        getPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
        index++;
      });

      // if next is null setHasMore to false
      if (next == null) setHasMore(false);
      // set current index
      setPokeIndex(index);
      // set next link to nextPage
      setNextPage(next);
      // set new pokemon data
      setPokemonData({ ...pokemonData, ...getPokemonData });
    });
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const handleClick = () => {
    getPokeAPI(pokemonData);
  };

  const firstCharUppercase = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // return pokemon card
  const getPokemonCard = (pokemonID) => {
    const { id, name, sprite } = pokemonData[pokemonID];
    return (
      <Grid item xs={6} sm={4} md={3} key={pokemonID}>
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
        <Container>
          <Toolbar disableGutters={true}>
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon} />
              <TextField
                className={classes.searchInput}
                label="Pokemon"
                onChange={handleSearch}
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {pokemonData ? (
        <InfiniteScroll
          dataLength={Object.keys(pokemonData).length}
          next={getPokeAPI}
          hasMore={hasMore}
          loader={
            <p style={{ textAlign: "center" }}>
              <CircularProgress />
            </p>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: "none" }}
        >
          <Container className={classes.container}>
            <Grid container spacing={2}>
              {Object.keys(pokemonData).map(
                (pokemonID) =>
                  pokemonData[pokemonID].name.includes(filter) &&
                  getPokemonCard(pokemonID)
              )}
            </Grid>
          </Container>
        </InfiniteScroll>
      ) : (
        <CircularProgress
          style={{
            position: "absolute",
            left: "48%",
            top: "48%",
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Pokedex;
