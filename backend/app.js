import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import bodyParser from 'body-parser';
import multer from 'multer';
import cloudinary from "cloudinary";
import cors from "cors";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://0.0.0.0:27017/dribbleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userName: String,
  img: String,
  address: String,
  choice: String,
});

// User Model
const User = mongoose.model('User', userSchema);

// Multer Configurations
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
});

// Cloudinary Configurations
cloudinary.config({
  cloud_name: 'YOUR_CLOUDINARY_CLOUD_NAME',
  api_key: 'YOUR_CLOUDINARY_API_KEY',
  api_secret: 'YOUR_CLOUDINARY_API_SECRET',
});

// Routes
// Signup route
app.post('/signup', async (req, res) => {
  const {name,email,userName,password}=req.body.user;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      userName: userName
    });
    // Save the user to the database
    const savedUser = await newUser.save();
    // Find the user by email
    const user = await User.findOne({ email: email });
    res.status(201).json({ id: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const {email,password}=req.body.user;
  try {
    // Find the user by email
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Send user ID as response
    res.json({ id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all usernames route
app.get('/usernames', async (req, res) => {
  try {
    const usernames = await User.find().select('userName');
    res.json(usernames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user route
app.post('/user/:id', upload.single('img'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Find user by ID and update fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        img: result.secure_url,
        address: req.body.address,
        choice: req.body.choice,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send email route
app.get('/user-email/:id', async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    (async function () {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Welcome to Dribbble',
        html: '<strong>You have been successfully subscribed!</strong>',
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
    })();
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
