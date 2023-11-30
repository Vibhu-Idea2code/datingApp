const Like = require('../models/like.model');
const User = require('../models/users.model');

const createLike = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otherUserId } = req.body;

    // Check if the like already exists
    const existingLike = await Like.findOne({ userId, likedUserId: otherUserId });

    if (existingLike) {
      if (existingLike.likeStatus) {
        return res.status(400).json({ message: 'You already liked this user.' });
      } else {
        // If likeStatus is false, update it to true (user is liking again)
        existingLike.likeStatus = true;
        await existingLike.save();
        return res.status(200).json({ message: 'Like status updated successfully.', like: existingLike });
      }
    }

    // Create a new like
    const newLike = await Like.create({ userId, likedUserId: otherUserId });
    await newLike.save();

    // Update the likedBy array in the liked user's document
    await User.findByIdAndUpdate(otherUserId, { $push: { likedUser: userId } });

    res.status(200).json({ message: 'Like successful.', like: newLike, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const getLikesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all likes where the likedUser is the specified userId
    const likeList = await Like.find({ likedUserId: userId });

    // Extract the user IDs who liked the specified user
    const likeByUserIds = likeList.map(like => like.userId);

    // Fetch user details for each user who liked the specified user
    const likeByUsers = await User.findByIdAndUpdate({ _id: { $in: likeByUserIds } });

    return res.status(200).json({ likeByUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
  
module.exports = {
  createLike,getLikesByUserId
};
