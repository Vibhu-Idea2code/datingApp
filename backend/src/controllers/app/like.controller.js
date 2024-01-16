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
  touserid,
  fromuserid
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
    const { touserid } = req.params;

    // Count the number of likes where the likedUser is the specified userId
    const likeCount = await Like.countDocuments({ touserid });
    const user = await Like.find({ touserid }).populate({
      path: "fromuserid",
      select: ["_id","first_name","age"],
    });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)
        const fromUserIds = user.map((like) => like.fromuserid);
    return res.status(200).json({ data:likeCount,fromUserIds});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


/* ------------------------------- LIST BY ID ------------------------------- */
const getSuperLikesByUserId = async (req, res) => {
  try {
    const { touserid } = req.params;

    // Count the number of likes where the likedUser is the specified userId
    const likeCount = await Like.countDocuments({ touserid });
    const user = await Like.find({ touserid }).populate({
      path: "fromuserid",
      select: ["_id","first_name","age"],
    });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)
        const fromUserIds = user.map((like) => like.fromuserid);
    return res.status(200).json({ data:likeCount,fromUserIds});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* -------------------------- LIKED ALL COMMON LIST ------------------------- */
const getAllUsersWithLikes = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    // Create an array to store user details with like counts
    const usersWithLikes = [];

    // Iterate through each user and get the like count
    for (const user of users) {
      const { _id, name, age,distance } = user;

      // Count the number of likes where the likedUser is the current user's ID
      const likeCount = await Like.countDocuments({ touserid: _id });

      // Add user details with like count to the array
      usersWithLikes.push({ _id, name, age, likeCount,distance });
    }

    // Sort the array by name, handling cases where name is undefined
    usersWithLikes.sort((a, b) => (a.distance && b.distance ? a.distance.localeCompare(b.distance) : 0));

    return res.status(200).json({ data: usersWithLikes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// const getLikesByUserId = async (req, res) => {
//   try {
//     const { touserid } = req.params;

//     // Count the number of likes where the likedUser is the specified userId
//     const likeCount = await Like.countDocuments({ touserid });

//     // Assuming you have a User model or collection
//     const user = await User.findOne({ _id: touserid });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userData = {
//       first_name: user.first_name, // Replace with the actual field name for the user's name
//       age: user.age,   // Replace with the actual field name for the user's age
//     };

//     return res.status(200).json({ data: { likeCount, user: userData } });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };





  
  
module.exports = {
  createLike,getLikesByUserId,getAllUsersWithLikes
};
