const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Meeting } = require("../models/meeting.model")

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide the required info" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();
    return res.status(200).json({ token });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide the required info" });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // 409 = Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};

const getUserHistory = async (req, res)=> {
  const {token} = req.query;
  try {
    const user = await User.findOne({token: token})
    const meetings = await Meeting.findOne({user_id: user.username})
    res.json(meetings)
  } catch (err) {
    res.json({message: `Something went wrong ${err}`})
  }
}

const addToHistory = async (req, res) => {
  const {token, meeting_code} = req.body;
  try {
    const user = await User.findOne({token: token})
    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    })
    await newMeeting.save()
    res.status(201).json({message: "Added code to History"})
  } catch (error) {
    res.jso({message: `Something went wrong ${err}`})
  }
}

module.exports = { login, register, getUserHistory, addToHistory };
