const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol."
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/045/944/199/small/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using this app.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.index({firstName: 1 , lastName: 1});
UserSchema.methods.getJwt = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "Anurag@pandey1234", {
    expiresIn: "1h",
  });
  return token;
};
UserSchema.methods.validatePassword = async function (passwordEnterbyUser) {
  const user = this;
  const hashedPassword = user.password;
  const isValidate = await bcrypt.compare(passwordEnterbyUser, hashedPassword);
  return isValidate;
};
const User = mongoose.model("User", UserSchema);


module.exports = User;
