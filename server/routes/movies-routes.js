const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');


router.post('' ,(req, res, next) => {
    console.log(req);
    const movie = new Movie({
        title: req.body.title,
        plot: req.body.plot,
        year: req.body.year,
        poster: req.body.poster,
        runtime: req.body.runtime,
        genre: req.body.genre,
        creator: req.body.creator,
        createdDate: req.body.createdDate
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
    const response = res;
    const movie = {
        //_id: req.body._id,
        title: req.body.title,
        plot: req.body.plot,
        year: req.body.year,
        poster: req.body.poster,
        runtime: req.body.runtime,
        genre: req.body.genre,
        createdDate: req.body.createdDate
    };
    // Movie.deleteOne({_id: req.body._id}).then(() => {
    //     movie.save().then((movie)=>{
    //         res.status(201).json({
    //             movie: movie, 
    //             message: 'Movie updated succesfully'
    //         });
    //     });
    // })
    Movie.updateOne(
        {createdDate: req.body.createdDate},
        {$set: movie},
        (err, raw) => {
            console.log(err);
            console.log(raw)
            if (raw) {
                response.status(200).send(raw)
            } else {
                response.status(500).send('error');
            }
        }
        )
    // .then((res) => {
    //     console.log(res);
    //     res.status(200).json({
    //         message: "Movie Updated!!!"
    //     })
    // }).catch(err => {
    //     console.log(err);
    //     res.status(500).json({message: err})
    // })
})

router.get('', (req, res, next) => {
    const genre = req.query.genre;
    const creator = req.query.creator;
    const movieQuery = Movie.find();
    let fetchedMovies;

    if (genre) {
        movieQuery.where({genre: genre})
    }

    if (creator) {
        movieQuery.where({creator: creator})
    }

    movieQuery.sort({createdDate: 'descending'});

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
    const movieID = req.params.movieId;
    Movie.findByIdAndDelete(movieID).then(() => {
        res.status(200).json({
            message: "Movie deleted successfully" 
        })
        console.log('successfully deleted')
    }).catch(() => {
        res.send('Failed To Delete')
    })
})

module.exports = router;