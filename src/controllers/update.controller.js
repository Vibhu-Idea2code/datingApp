const { userService } = require("../services");
// const { User } = require("../models"); // use in delete many
// const distance = require("../helpers/distanceCalculate");
const userHelper = require('../helpers/userHelper');


const updatePhone = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      phoneNumber,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User phone Number updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

 const updateMaxMinAge = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      ageRange,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
    const [minAge, maxAge] = ageRange.split('-').map(Number);
    // Validate if both minAge and maxAge are valid numbers
    if (!isNaN(minAge) && !isNaN(maxAge)) {
      userExists.minAge = minAge;
      userExists.maxAge = maxAge;
    } else {
      throw new Error("Invalid age range format");
    }
  
   const result= await userService.updateUser(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User age range like min and max age updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateMaxDistance = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      maxDistance
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
 // Update the 'maxDistance' property
    userExists.maxDistance = maxDistance;
   
    // userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User max distance updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateShowMe = async (req, res) => {
  try {
     // 0-men,
    // 1-woman,
    // 2-all
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      showMe
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }



  // // Update the 'gender' property based on the input
  if (showMe === "2") {
    // Allow both "0" and "1" when gender is "2" (everyone)
    userExists.showMe = showMe;
  } else if (showMe === "0") {
    // Set "1" if gender is "0" (men)
    userExists.showMe = "0";
  } else if (showMe === "1") {
    // Set "0" if gender is "1" (women)
    userExists.showMe = "1";
  } else {
    throw new Error("Invalid showMe value!");
  }const updatePhone = async (req, res) => {
    try {
      // const reqBody=req.body;
      const userId = req.params.userId;
      const {
        phoneNumber,
      } = req.body; // Extract the 'role' and 'gender' fields from the request body
      const userExists = await userService.getUserById(userId);
  
      if (!userExists) {
        throw new Error("User not found!");
      }
      userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
      await userService.updateUser(userId, userExists); // Save the updated user
  
      res.status(200).json({
        success: true,
        message: "User phone Number updated successfully!",
        data: userExists,
      });const updatePhone = async (req, res) => {
        try {
          // const reqBody=req.body;
          const userId = req.params.userId;
          const {
            phoneNumber,
          } = req.body; // Extract the 'role' and 'gender' fields from the request body
          const userExists = await userService.getUserById(userId);
      
          if (!userExists) {
            throw new Error("User not found!");
          }
          userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
          await userService.updateUser(userId, userExists); // Save the updated user
      
          res.status(200).json({
            success: true,
            message: "User phone Number updated successfully!",
            data: userExists,
          });const updatePhone = async (req, res) => {
            try {
              // const reqBody=req.body;
              const userId = req.params.userId;
              const {
                phoneNumber,
              } = req.body; // Extract the 'role' and 'gender' fields from the request body
              const userExists = await userService.getUserById(userId);
          
              if (!userExists) {
                throw new Error("User not found!");
              }
              userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
              await userService.updateUser(userId, userExists); // Save the updated user
          
              res.status(200).json({
                success: true,
                message: "User phone Number updated successfully!",
                data: userExists,
              });
            } catch (error) {
              res.status(400).json({ success: false, message: error.message });
            }const updatePhone = async (req, res) => {
              try {
                // const reqBody=req.body;
                const userId = req.params.userId;
                const {
                  phoneNumber,
                } = req.body; // Extract the 'role' and 'gender' fields from the request body
                const userExists = await userService.getUserById(userId);
            
                if (!userExists) {
                  throw new Error("User not found!");
                }
                userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
                await userService.updateUser(userId, userExists); // Save the updated user
            
                res.status(200).json({
                  success: true,
                  message: "User phone Number updated successfully!",
                  data: userExists,
                });
              } catch (error) {
                res.status(400).json({ success: false, message: error.message });
              }
            };
            
          };
          
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      };
      
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // Save the updated user
  const result = await userService.updateUser(userId, userExists);

   res.status(200).json({
     success: true,
     message: "User showMe gender updated successfully!",
     data: result,
   });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const updateGender = async (req, res) => {
  try {
    // 0-men,
    // 1-woman,
    // 2-other
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      gender
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    // userExists.gender = gender;
// // Update the 'gender' property based on the input
  if (gender === "2") {
    // Allow both "0" and "1" when gender is "2" (everyone)
    userExists.gender = "2";
  } else if (gender === "0") {
    // Set "1" if gender is "0" (men)
    userExists.gender = "0";
  } else if (gender === "1") {
    // Set "0" if gender is "1" (women)
    userExists.gender = "1";
  } else {
    throw new Error("Invalid gender value!");
  }
  // Save the updated user
  const result = await userService.updateUser(userId, userExists);

   res.status(200).json({
     success: true,
     message: "User gender updated successfully!",
     data: result,
   });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateAboutMe = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      aboutMe,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    if (aboutMe && aboutMe.length > 500) {
      throw new Error("AboutMe should not exceed 500 characters!");
    }
    userExists.aboutMe = aboutMe; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User aboutMe updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateJobTitle = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      jobTitle,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.jobTitle = jobTitle; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User jobTitle updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      company,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.company = company; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User company updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      school,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.school = school; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User school updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      address,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.address = address; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User address updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateLivingIn = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      city,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.city = city; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User address updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateFirstName = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      first_name,
      last_name
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    userExists.first_name = first_name; 
    userExists.last_name = last_name;
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User firs and last name updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateInterest = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      interest,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    if (interest.length < 3) {
      throw new Error("At least 3 out of 5 interests are required.");
    }
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.interest = interest; // Update the 'phoneNumber'
    await userService.updateDetailsInte(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User interest updated successfully!",
      data: interest,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports ={
    updatePhone,
    updateMaxDistance,
    updateMaxMinAge,
    updateGender,
    updateShowMe,
    updateAboutMe,
    updateJobTitle,
    updateCompany,
    updateSchool,
    updateLivingIn,
    updateAddress,
    updateFirstName,
    updateInterest
}