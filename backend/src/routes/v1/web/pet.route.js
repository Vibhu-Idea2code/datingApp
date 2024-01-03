const express=require('express');
const {petController}=require('../../../controllers');
const router=express.Router();

router.post('/create-pet',
petController.createPets);

router.get('/list',
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