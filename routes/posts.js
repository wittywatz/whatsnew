const express = require('express');
const passport = require('passport');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const validatePostInput = require('../validation/posts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts); //If no post to send, it throws an error
  } catch (error) {
    res.status(404).send({ error: 'No posts found' });
  }
});

//GET POST BY ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    return res.status(404).send({ error: 'No post found with that ID' });
  }
});

// CREATE A POST
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    try {
      const post = await new Post({ ...req.body, user: req.user.id });
      await post.save();
      res.send(post);
    } catch (error) {
      return res.status(400).send({ error: "Opps can't create post" });
    }
  }
);

//LIKE A POST
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!post) {
        res.status(404).send({ error: 'No Post found' });
      }
      const Liked = post.likes.find(
        (like) => like.user.toString() === req.user.id.toString()
      );
      if (Liked) {
        return res.status(404).send({ error: "You've liked this post" });
      }
      post.likes.push({ user: req.user.id });
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send({ error: 'No post found' });
    }
  }
);

//UNLIKE A POST
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!post) {
        res.status(404).send({ error: 'No Post found' });
      }
      const Liked = post.likes.find(
        (like) => like.user.toString() === req.user.id.toString()
      );
      if (!Liked) {
        return res.status(404).send({ error: "You've not liked this post" });
      }
      post.likes = post.likes.filter(
        (post) => post.user.toString() !== req.user.id.toString()
      );
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send({ error: 'No post found' });
    }
  }
);

//CREATE NEW COMMENT ........
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const post = await Post.findById(req.params.id);
      post.comments.unshift({ ...req.body, user: req.user.id });
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send({ error: 'No post found' });
    }
  }
);
/*           DELETE ROUTES        */

//DELETE POST
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!post) {
        res.status(404).send({ error: 'No Post found' });
      }
      res.send({ success: true });
    } catch (error) {
      res.status(404).send({ error: 'No Post found' });
    }
  }
);

//DELETE COMMENT
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const Comment = post.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );
      if (!Comment) {
        return res.status(404).send({ error: 'Comment does not exist' });
      }
      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== req.params.comment_id.toString()
      );
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).send({ error: 'No post found' });
    }
  }
);

module.exports = router;
