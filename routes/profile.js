const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const Profile = require('../models/Profile');
const isEmpty = require('../validation/isEmpty');
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const profile = await Profile.findOne({
        user: req.user._id,
      }).populate('user', ['name', 'avatar']); //Populate profile with users name and avatar
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.send(profile);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

//GET USER BY HANDLE
router.get('/handle/:handle', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.send(profile);
  } catch (error) {
    res.status(404).json({ error: 'There is no profile for this User' });
  }
});

//GET USER BY ID
router.get('/user/:user_id', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.send(profile);
  } catch (error) {
    res.status(404).json({ error: 'There is no profile for this User' });
  }
});

//GET ALL USERS
router.get('/all', async (req, res) => {
  const errors = {};
  try {
    const profiles = await Profile.findOne().populate('user', [
      'name',
      'avatar',
    ]);
    if (!profiles) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    res.send(profiles);
  } catch (error) {
    res.status(404).json({ error: 'There are no profiles' });
  }
});

//CREATE AND UPDATE USER PROFILE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;
    const profilekeys = Object.keys(req.body).filter(
      (key) => isEmpty(req.body[key]) !== true
    );
    // console.log(profilekeys);
    profilekeys.forEach((key) => {
      const social = [
        'youtube',
        'twitter',
        'facebook',
        'linkedin',
        'instagram',
      ];
      if (social.includes(key)) {
        profileFields.social[key] = req.body[key];
      } else if (key.toString() === 'skills') {
        profileFields.skills = req.body.skills.split(',');
      } else {
        profileFields[key] = req.body[key];
      }
    });

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        const profileUpdate = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profileUpdate);
      } else {
        const checkHandle = await Profile.findOne({
          handle: profileFields.handle,
        });
        if (checkHandle) {
          errors.handle = 'That handle already exists';
          return res.status(400).json(errors);
        }
        // Save Profile
        const createProfile = new Profile(profileFields);
        await createProfile.save();
        res.json(createProfile);
      }
    } catch (error) {
      res.send({ error: 'failed' });
    }
  }
);

//CREATE NEW EXPERIENCE
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(req.body);
      await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(400).json({ error: 'Can not add new experience' });
    }
  }
);

//CREATE NEW EDUCATION
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(req.body);

      await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(400).send({ error: 'Unable to create new experience' });
    }
  }
);

//DELETE EXPERIENCE BY ID
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience = profile.experience.filter((experience) => {
        return experience._id.toString() !== req.params.exp_id.toString();
      });
      await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(404).json({ error: 'An error occurred while deleting' });
    }
  }
);

//DELETE EDUCATION BY ID
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education = profile.education.filter((education) => {
        return education._id.toString() !== req.params.edu_id.toString();
      });
      await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(404).json({ error: 'An error occurred while deleting' });
    }
  }
);
//Delete Profile and User from DB
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.send({ success: true });
  }
);
module.exports = router;
