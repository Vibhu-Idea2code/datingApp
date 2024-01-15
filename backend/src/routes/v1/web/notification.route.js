const express=require('express');
const {NotificationController}=require('../../../controllers');
const { notificationService } = require('../../../services');
const router=express.Router();

router.post('/create-notification',
NotificationController.createNotification
);

router.get('/list',
NotificationController.getNotificationList);

router.get('/id/:notificationId',
NotificationController.getNotificationId);

router.delete('/delete/:notificationId',
NotificationController.deleteNotification);

router.put('/update/:notificationId',
NotificationController.updateNotification
);

router.delete("/delete-many", NotificationController.multipleDelete);

router.put("/updateNotificationStatus/:id",NotificationController.updateNotificationStatus);


module.exports=router;