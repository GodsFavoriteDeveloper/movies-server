// import Express Framework
const express = require('express');
// Import router feature of Express
const router = express.Router();
// Import Mongoose model that allows us to define types
const Movie = require('../models/movie');


router.post('' ,(req, res, next) => {
    const movie = new Movie({
        title: req.body.title,
        plot: req.body.plot,
        year: req.body.year,
        poster: req.body.poster,
        runtime: req.body.runtime
    });
    movie.save().then((movie)=>{
        res.status(201).json({
            movie: movie, 
            message: 'Movie added succesfully'
        });
    })
    .catch(err => {
        res.send(err);
    });
    
})

router.put('/:movieId', (req, res, next) => {
    const movie = new Movie({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    });
    // Movie.deleteOne({_id: req.body._id}).then(() => {
    //     movie.save().then((movie)=>{
    //         res.status(201).json({
    //             movie: movie, 
    //             message: 'Movie updated succesfully'
    //         });
    //     });
    // })
    Movie.updateOne({_id: req.params.movieId, movie})
    .then((res) => {
        console.log(res);
        res.status(200).json({
            message: "Movie Updated!!!"
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: err})
    })
})

router.get('', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const movieQuery = Movie.find();
    let fetchedMovies;

    if (pageSize && currentPage) {
        movieQuery
        .skip(pageSize * (currentPage -  1))
        .limit(pageSize)
        .where()
    }

    movieQuery
    .then(movies => {
        res.status(200).json(movies); 
    }).catch(err => {
        res.send('Error fetching movies')
    });    
})

router.get('/:movieId', (req, res, next) => {
    Movie.findById(req.params.movieId).then(movie => {
        console.log(movie);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({message: 'Movie not found'})
        }
    })
})

router.delete('/:movieId', (req, res, next) => {
    const pid = req.params.movieId;
    Movie.deleteOne({_id: pid}).then(() => {
        res.status(200).json({
            message: "Movie deleted successfully" 
        })
        console.log('successfully deleted')
    })
})

module.exports = router;