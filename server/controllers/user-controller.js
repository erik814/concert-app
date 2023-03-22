const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {

  async getAllUsers(req, res) {
    User.find()
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  
  async createUser({ body }, res) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(body.password, salt) // <--- salt replaces the 10 that we used to use

    const userToInsert = {email: body.email, password: password, name: body.name, location: body.location }  // <--- putting in the encrypted password
    const user = await User.create(userToInsert);

    if (!user) return res.status(400).json({ message: 'Unable to create user' });
    res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location });
  },


  async updateUser({ body, params }, res) {
    let userToUpdate = { email: body.email, name: body.name, location: body.location }

    if( body.password?.length ){
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(body.password, salt)
      userToUpdate = {...userToUpdate, password: password }
    }

    // if ( body.name ) {
    //   userToUpdate = {...userToUpdate, name: body.name }
    // }

    // if ( body.location ) {
    //   userToUpdate = {...userToUpdate, location: body.location }
    // }

    const user = await User.updateOne(
      { _id: params.id },
      userToUpdate,
      { new: true }
    );

    if (!user) return res.status(400).json({ message: 'Unable to update user' });
    res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location });
  },


  async authUser({ body }, res) {

    // Find the user by the email address
    const user = await User.findOne({
      email: body.email
    });

    if (!user) return res.status(400).json({ message: 'Unable to authenticate user' });

    // We want to verify the password & kick them out if it fails
    const isValid = await bcrypt.compare(body.password, user.password)
    if( !isValid ) return res.status(400).json({ message: 'Unable to authenticate user' });

    // create a token. can use whatever data you want. gary recommends id and one other thing
    const token = jwt.sign({
      email: user.email,
      id: user._id
    }, process.env.JWT_SECRET)  // <---- secret key is optional, but makes it a little more secure

    res.header("auth-token", token).json({ error: null, data: { user, token }}) // <--- normally you would not send the token back, but we are for testing purposes
  },


  async verifyUser(req, res){
    const token = req.headers["auth-token"]

    if( !token ) return res.status(401).json({msg: "un-authorized"})

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if( !isVerified ) return res.status(401).json({msg: "un-authorized"})

    const user = await User.findById(isVerified.id)
    if( !user ) return res.status(401).json({msg: "authorized"})
    
    return res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location })
  }
};