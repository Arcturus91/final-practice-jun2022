

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true, //[true, "DEbes de agregar un email"]
      unique: true, //[...custom]
    },
    username: {
      type: String,
      //unique: true, -> Ideally, should be unique, but its up to you
    },
    password: {
      type: String,
      required: true, //[true, "DEbes de agregar un email"]
    },
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg",
    },
    role:{
     type:String,
     enum:["ADMIN","STAFF","USER"],
     default:"USER"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

