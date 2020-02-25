// import Express Framework
const express = require('express');
// Import router feature of Express
const router = express.Router();
// Import Mongoose model that allows us to define types
const Post = require('../models/post');


router.post('' ,(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((post)=>{
        res.status(201).json({
            post: post, 
            message: 'Post added succesfully'
        });
    });
    
})

router.put('/:postId', (req, res, next) => {
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    });
    // Post.deleteOne({_id: req.body._id}).then(() => {
    //     post.save().then((post)=>{
    //         res.status(201).json({
    //             post: post, 
    //             message: 'Post updated succesfully'
    //         });
    //     });
    // })
    Post.updateOne({_id: req.params.postId, post})
    .then((res) => {
        console.log(res);
        res.status(200).json({
            message: "Post Updated!!!"
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: err})
    })
})

router.get('', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;

    if (pageSize && currentPage) {
        postQuery
        .skip(pageSize * (currentPage -  1))
        .limit(pageSize)
    }
    

    postQuery
    .then(posts => {
        fetchedPosts = posts;
        return Post.countDocuments()
    })
    .then((count) => {
        res.status(200).json({
            message: "Posts successfully fetched!!!",
            posts: fetchedPosts,
            count: count
        }); 
    }).catch();    
})

router.get('/:postId', (req, res, next) => {
    Post.findById(req.params.postId).then(post => {
        console.log(post);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found'})
        }
    })
})

router.delete('/:postId', (req, res, next) => {
    const pid = req.params.postId;
    Post.deleteOne({_id: pid}).then(() => {
        res.status(200).json({
            message: "Post deleted successfully" 
        })
        console.log('successfully deleted')
    })
})

module.exports = router;