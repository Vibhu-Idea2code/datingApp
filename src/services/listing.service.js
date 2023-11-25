const { Pets, Hobbies, Sexual, Sign } = require("../models");

/**get Pets list */
const getPetsList = async (req, res) => {
  return Pets.find();
};

/**get Hobbies list */
const getHobbiesList = async (req, res) => {
  return Hobbies.find();
};

/**get Sign list */
const getSignList = async (req, res) => {
  return Sign.find();
};

/**get Sexual list */
const getSexualList = async (req, res) => {
  return Sexual.find();
};

/**get home page list  */
const getHomePage=async (req,res)=>{
   return  Location.find({ });
}
module.exports = { getPetsList, getHobbiesList, getSignList, getSexualList };
