const Like = require('../../models/like.model');
const Plan = require('../../models/plan.model');
const User = require('../../models/users.model');

/* ---------------------------- CREATE LIKE TABLE --------------------------- */
// const createLike = async (req, res) => {
//   try {
//     // const {  } = req.params;
//     const { fromuserid, touserid} = req.body;

//     const existingLike = await Like.findOne({ fromuserid, touserid });

// if (existingLike) {
//   // A like already exists, handle the situation (e.g., send an error response)
//   return res.status(400).json({ message: 'User already liked this profile' });
// }
// if (fromuserid === touserid) {
//   return res.status(400).json({ message: 'Cannot like your own ID' });
// }
// const newLike = new Like({
//   touserid,
//   fromuserid
//   });
//   const result = await newLike.save();
//       res.status(200).json({ message: 'Like successful.',  data: result});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const createLike = async (req, res) => {
  try {
    const { fromuserid, touserid, action, planid } = req.body;

    const existingLike = await Like.findOne({ fromuserid, touserid });

    if (existingLike) {
      return res.status(400).json({ message: 'User already liked this profile' });
    }

    if (fromuserid === touserid) {
      return res.status(400).json({ message: 'Cannot like your own ID' });
    }

    let newAction;
// 1-like, 2-superlike, 3-boost, 4-nope
    switch (action) {
      case "1":
        newAction = '1';
        break;
      case '2':
        newAction = '2';
        break;
      case '3':
        newAction = '3';
        if (fromuserid) {
          return res.status(400).json({ message: 'Boost action does not require fromuserid' });
        }
        break;
      case '4':
        newAction = '4';
        break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    // Check if the user has purchased a plan
    let planStatus = false;

    if (planid) {
      // If planId is provided, set planStatus to true
      planStatus = true;
    }
    if (!planStatus) {
      return res.status(400).json({ planStatus: false });
    }
    const newLike = new Like({
      touserid,
      fromuserid,
      action: newAction,
      planStatus: planStatus
    });

    const result = await newLike.save();
    
    res.status(200).json({ message: `${newAction} successful.`, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




/* ------------------------------- LIST BY ID ------------------------------- */
// const getLikesByUserId = async (req, res) => {
//   try {
//     const { touserid } = req.params;

//     // Count the number of likes where the likedUser is the specified userId
//     const likeCount = await Like.countDocuments({ touserid });
//     const user = await Like.find({ touserid }).populate({
//       path: "fromuserid",
//       select: ["_id","first_name","age"],
//     });

//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         console.log(user)
//         const fromUserIds = user.map((like) => like.fromuserid);
//     return res.status(200).json({ data:likeCount,fromUserIds});
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const getLikesByUserId = async (req, res) => {
  try {
    const { action } = req.params;

    console.log('Received action:', action,"like controller line no:-122"); // Add this line for debugging

    // Validate the action parameter
    const validActions = ["1", '2', '3', '4'];
    if (!validActions.includes(action)) {
      console.log('Invalid action parameter:', action,"like controller line no:-127"); // Add this line for debugging
      return res.status(400).json({ message: 'Invalid action parameter' });
    }

    // Assuming 'fromUserId' is the field in your Like model representing the user
    const likes = await Like.find({ action }).select('fromuserid');

    // Extracting unique fromUserIds
    const uniqueFromUserIds = [...new Set(likes.map(like => like.fromuserid))];

    // Fetching user details based on unique fromUserIds
    const users = await User.find({ _id: { $in: uniqueFromUserIds } }).select('first_name age');

    res.status(200).json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const getLikesByUser = async (req, res) => {
  try {
    // Directly destructure the 'action' from req.params
    const { action } = req.params;

    console.log('Received action:', action, "like controller line no:-122");

    // Validate the action parameter
    const validActions = ["1", '2', '3', '4'];
    if (!validActions.includes(action)) {
      console.log('Invalid action parameter:', action, "like controller line no:-127");
      return res.status(400).json({ message: 'Invalid action parameter' });
    }

    // Assuming 'fromUserId' is the field in your Like model representing the user
    const likes = await Like.find({ action }).select('fromuserid');

    // Extracting unique fromUserIds
    const uniqueFromUserIds = [...new Set(likes.map(like => like.fromuserid))];

    // Fetching user details based on unique fromUserIds
    const users = await User.find({ _id: { $in: uniqueFromUserIds } }).select('first_name age');

    // Separate users with action 3 and others
    const action3Users = users.filter(user => likes.find(like => like.fromuserid === user._id && like.action === '3'));
    const otherUsers = users.filter(user => !action3Users.includes(user));

    // Concatenate the two lists, with action 3 users first
    const finalUserList = [...action3Users, ...otherUsers];

    res.status(200).json({ data: finalUserList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
  createLike,getLikesByUserId,getAllUsersWithLikes,getLikesByUser
};
