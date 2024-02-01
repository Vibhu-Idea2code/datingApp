const express=require('express');
const {petController}=require('../../../controllers');
const router=express.Router();
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");


router.post('/create-pet',
petController.createPets);

router.get('/list',accessToken(),
petController.getPetsList);

router.get('/id/:petsId',
petController.getPetsId);

router.delete('/delete/:petsId',
petController.deletePets);

router.put('/update/:petsId',
petController.updatePets);

router.delete("/delete-many", petController.multipleDelete);

router.put("/updatePetStatus/:id",petController.updatePetStatus);


module.exports=router;