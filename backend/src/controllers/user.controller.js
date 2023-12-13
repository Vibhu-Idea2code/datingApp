const { userService } = require("../services");
const { User } = require("../models"); // use in delete many
const distance = require("../helpers/distanceCalculate");
const userHelper = require('../helpers/userHelper');

/* ------------------------ GET USER LIST (ROLE WISE) WITH AUTH ADMIN SIDE----------------------- */
const getUserListRole = async (req, res) => {
  try {
    const getList = await userService.getUserListSimple(req, res);
    const userRole = req.body.role;
    let users = [];
    if (userRole === "user") {
      for (let i = 0; i < getList.length; i++) {
        if (getList[i].role !== "admin") {
          users.push(getList[i]);
        }
      }
      console.log("users users", users);
      res.send(users);
    } else {
      res.send(getList);
    }
  } catch (err) {
    console.log("Error in getting the user list", err);
    res.status(500).send(err);
  }
};

/* ------------------------ GET USER LIST BY DISTANCE ADMIN SIDE----------------------- */
const userList = async (req, res) => {
  try {
    const getUser = await userService.getUserList();
    console.log(getUser[0]);
    var userDetailsData = [];
    for (let i = 0; i < getUser.length; i++) {
      // console.log(getUser[i].first_name, getUser[i].last_name);
      const clientId = getUser[i]._id;
      console.log(clientId)
      var userDetails = {
        first_name: getUser[i].first_name,
        age: getUser[i].age,
        distances: distance(
          getUser[i]._id,     
          37.0902,
          95.7129,
          getUser[i].lat,
          getUser[i].long,
          // getUser[i].lat1,
          // getUser[i].long2,
        ),
      };
      userDetailsData.push(userDetails);
    }
    res.status(200).json({
      success: true,
      message: "user List!",
      data: userDetailsData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* --------------- GET USER LIST  (SIMPLE) WITH AUTH ADMIN SIDE--------------- */
const getAllUser = async (req, res) => {
  try {
    const allUser = await userService.getUserList();
    // const result=await userService.getUserListSearch()
    res.status(200).json({
      success: true,
      message: "User list successfully!",
      data:allUser ,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* --------------------------- GET USER LIST BY ID Home page -------------------------- */
const getUserDetails = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }
    const { first_name,age, maxDistance } = getDetails;
    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: {
        first_name,
        age,
        maxDistance,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserDetailsAll = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }
    const { first_name,last_name,email ,phoneNumber ,birthDate,gender,sexual,showMe,school,interest,sign,pets,address,lat,long,maxAge,minAge,jobTitle,likeduser,user_img,role,
      age,
      maxDistance, } = getDetails;
    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: {
        first_name,last_name,email ,phoneNumber ,birthDate,gender,sexual,showMe,school,interest,sign,pets,address,lat,long,maxAge,minAge,jobTitle,likeduser,user_img,role,
        age,
        maxDistance,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
 /* ----------------------GET USER DETAILS FOR ADMIN PANEL-----------------------*/
 const getLikesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch all likes where the likedUser is the specified userId
    const likeList = await User.find({ likedUserId: userId });
    // Create a map to count the occurrences of each unique userId
    const likeCountMap = new Map();
    likeList.forEach(like => {
      const userId = like.userId.toString(); // Convert ObjectId to string
      likeCountMap.set(userId, (likeCountMap.get(userId) || 0) + 1);
    });
    // Extract the user IDs who liked the specified user
    const likeByUserIds = Array.from(likeCountMap.keys());
    // Fetch user details for each user who liked the specified user
    const likeByUsers = await User.find({ _id: { $in: likeByUserIds } });
    // Create a result array with user details and like count
    const result = likeByUsers.map(user => ({
      user,
      likeCount: likeCountMap.get(user._id.toString()) || 0,
    }));

    return res.status(200).json({ likeByUsers: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
// const purchasePlan=async (req,res)=>{
//   const{planType}=req.body;
//   let planPrice;
//   switch(planType){
//     case"BASIC":
//     planPrice=39;
//     break;
//     case"PREMIUM":
//     planPrice=78;
//     break;
//     default :
//     return res.status(400).send("Invalid Plan Type");
//     }
//     if(!req.userData.stripeCustomerId){
//       const customer={
//         email:req.userData.email,
//         name: `${req.userData.firstName} ${req.userData.lastName}`
//         };
//         const stripeCustomer=await stripe.customers.create(customer);
//         await User.updateOne({_id:req.userData._id},{"stripeCustomerId":stripeCustomer.id
//         ,"membership":"MEMBERSHIP_ACTIVE"});
//         }
//         const paymentMethodCreate=await stripe.paymentMethods.create({type:"card",card:req.body});
//         const invoice=await stripe.billingPortal.sessions.create({
//           customer:req.userData.stripeCustomerId,
//           return_url:`${process.env.CLOUDINARY_URL}/billing`,
//           line_items:[{price:planPrice+"","quantity":1}]
//           })
//           return res.redirect(`${process.env.STRIPE_CHECKOUT_DOMAIN}/session/${invoice.id}`)
//           }
    //  const purchasePlan=async(req,res)=>{
    //   try{
    //     const {planType}=req.params;
    //     if (!['MONTHLY','YEARLY'].includes(planType)) throw new Error('Invalid subscription type');
    //     const user=await User.findById(req.userId);
    //     if(!user)throw new Error ('No such user exists!')
    //     else if(user.membership==='FREE'){
    //   await User.findByIdAndUpdate(req.userId,{membership:'Trial',trialEnds:Date.now()
    //   +14*24*60*60})
    //   return res.status(200).json({message:'Your account has been upgraded to a free trial.'})
    //   .catch((err)=>console.log(err));
    //     }
    //     else if(user.membership!=="EXPIRED"){
    //       throw new Error ("You are already subscribed.")
    //       }
    //       req.userData = user;
    //       next();
    //       } catch(e){
    //         console.log(e);
    //         return res.status(400).send(e.message);
    //         }
    //         }
        
// app.post('/api/purchase-plan', (req, res) => {
//   const userId = req.body.userId; // Assuming you receive the userId in the request body
//   const planId = req.body.planId;
// });
/* -------------------------- GET USER UPDATE BY ID own profile------------------------- */
const updateDetails = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    console.log("🚀 ~ file: user.controller.js:133 ~ updateDetails ~ userId:", userId)
    
    const {
      first_name,
      last_name,
      gender,
      sexual,
      school,
      interest,
      sign,
      pets,
      address,
      maxDistance,
      jobTitle,
      email,
      phoneNumber,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
    if (req.file) {
      userExists.user_img = req.file.filename; // Store the path to the uploaded profile image
    }
    // Update the user's gender and other details
    userExists.gender = gender; // Update the 'gender' field
    userExists.first_name = first_name; // Update the 'firstName' field
    userExists.address = address; // Update the 'lastName' field
    userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
    userExists.last_name = last_name; // Update the 'firstName' field
    userExists.sexual = sexual; // Update the 'firstName' field
    userExists.school = school; // Update the 'firstName' field
    userExists.interest = interest; // Update the 'firstName' field
    userExists.sign = sign; // Update the 'firstName' field
    userExists.pets = pets; // Update the 'firstName' field
    userExists.maxDistance = maxDistance; // Update the 'firstName' field
    userExists.jobTitle = jobTitle; // Update the 'firstName' field
    userExists.email = email; // Update the 'firstName' field
   
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User details updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* -------------------------- GET USER UPDATE BY ID own profile with seeting------------------------- */
// const updateSetting = async (req, res) => {
//   try {
//     // const reqBody=req.body;
//     const userId = req.params.userId;
//     const {
//       showMe,
//       lat,
//       long,
//       ageRange
//       // maxAge,
//       // minAge,
//     } = req.body; // Extract the 'role' and 'gender' fields from the request body
//     const userExists = await userService.getUserById(userId);

//     if (!userExists) {
//       throw new Error("User not found!");
//     }
//     userExists.showMe = showMe; // Update the 'showMe' field
//     userExists.lat = lat; // Update the 'firstName' field
//     userExists.long = long; // Update the 'firstName' field
  
//     const [minAge, maxAge] = ageRange.split('-').map(Number);

//     // Validate if both minAge and maxAge are valid numbers
//     if (!isNaN(minAge) && !isNaN(maxAge)) {
//       userExists.minAge = minAge;
//       userExists.maxAge = maxAge;
//     } else {
//       throw new Error("Invalid age range format");
//     }
//     // if (req.file) {
//     //   userExists.profile_img = req.file.filename; // Store the path to the uploaded profile image
//     // }
//     await userService.updateUser(userId, userExists); // Save the updated user
//     res.status(200).json({
//       success: true,
//       message: "User details updated successfully!",
//       data: userExists
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

/* ------------------------ DELETE SINGLE USER BY ID ------------------------ */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }

    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User delete successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------- DELETE MANY USER BY ID ------------------------- */
const deleteManyUsers = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await User.deleteMany({ _id: { $in: _id } });
    if (result.deletedCount === 0) {
      throw new Error("No users deleted");
    }
    return res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: `${err}`,
    });
  }
};


module.exports = {
  getAllUser,
  getUserListRole,
  getLikesByUserId,
  getUserDetails,
  updateDetails,
  deleteUser,
  deleteManyUsers,
  userList,
  getUserDetailsAll,
  // purchasePlan
  // updateSetting
};
