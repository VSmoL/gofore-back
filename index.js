// server/index.js

const express = require("express");
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/movies", (req, res) => {
  (async () => {
    
    const genre = req.query.genre ?? false
    const rating = parseInt(req.query.rating) ?? false
    
    let jsonFile = fs.readFileSync('movies-compact copy.json');
    let allMovies = JSON.parse(jsonFile);
    let filteredMovies = allMovies;

    if(genre){
      filteredMovies = filteredMovies.filter(function(movie){
        return movie.genres ? movie.genres.includes(genre) : false
      })
    }
    if(rating){
      filteredMovies = filteredMovies.filter(function(movie){
        return movie.rating ? movie.rating >= rating : false
      })
    }
    res.json({movies: filteredMovies});
  })();
});


app.post("/add-movie", (req, res) => {
  (async () => {
    const movieData = req.body;
    console.log(movieData)
    let jsonFile = fs.readFileSync('movies-compact copy.json');
    let allMovies = JSON.parse(jsonFile);
    allMovies.push(movieData)
    fs.writeFileSync('movies-compact copy.json', JSON.stringify(allMovies));
  })();
});

app.get("/genres", (req, res) => {
  let genres = ["Adventure", "Sci-fi", "Animation", "Comedy", "Drama", "Mystery", "Fantasy", "Action", "Biography", "War", "Romance", "Thriller", "Crime", "Horror", "Family"]
  res.json({genres: genres});
});