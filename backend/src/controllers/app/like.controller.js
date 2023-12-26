const Like = require('../../models/like.model');
const User = require('../../models/users.model');

/* ---------------------------- CREATE LIKE TABLE --------------------------- */
const createLike = async (req, res) => {
  try {
    // const {  } = req.params;
    const { fromuserid, touserid} = req.body;

    const existingLike = await Like.findOne({ fromuserid, touserid });

if (existingLike) {
  // A like already exists, handle the situation (e.g., send an error response)
  return res.status(400).json({ message: 'User already liked this profile' });
}
if (fromuserid === touserid) {
  return res.status(400).json({ message: 'Cannot like your own ID' });
}
const newLike = new Like({
  fromuserid,
  touserid
  });
  const result = await newLike.save();
      res.status(200).json({ message: 'Like successful.',  data: result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* ------------------------------- LIST BY ID ------------------------------- */
const getLikesByUserId = async (req, res) => {
  try {
    const { fromuserid } = req.params;

    // Count the number of likes where the likedUser is the specified userId
    const likeCount = await Like.countDocuments({ fromuserid });

    return res.status(200).json({ data:likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



  
  
module.exports = {
  createLike,getLikesByUserId
};
