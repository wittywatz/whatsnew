const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

//User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

//Make specific data public
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  // delete userObject.tokens;
  // delete userObject.avatar;
  return userObject;
};

//HASH PASSWORD BEFORE SAVING
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next(); //Important
});

//TOKEN GENERATION
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), name: user.name, avatar: user.avatar },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  ); //Id property enables the middle ware to have access to the ID
  // user.tokens = user.tokens.concat({ token });
  // await user.save();
  return { success: true, token: 'Bearer ' + token };
};

//VERIFY USER BEFORE LOGIN
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new Error('Unable to login');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  // console.log(passwordMatch);
  if (!passwordMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

const User = mongoose.model('users', UserSchema);

module.exports = User;
