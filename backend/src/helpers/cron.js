const CronJob = require("cron").CronJob;
// const { start } = require("repl");
const cron = require('node-cron');
// const config = require("../config/config");
const userService = require('../services/user.service'); // Import your user service module
// const registerRoute = require('./routes/registerRoute'); // Import your registration route module

new CronJob('0 0 * * *', async () => {
  try {
    const usersWithExpiredPlans = await userService.findUsersWithExpiredPlans();

    for (const user of usersWithExpiredPlans) {
      await userService.deactivateUser(user._id);
    }

    console.log('Cron job executed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

/** It's running on every 1 seconds. */
// new CronJob(
//   "*/3 * * * * *",
//   function () {
//     console.log("It's running on every 1 seconds.");
//   },
//   null,
//   false,
//   "Asia/Kolkata"
// ).start();

/** It's running on when clock time is 7:45 of 24 hours */
// new CronJob(
//   "36 6 * * *",
//   function () {
//     console.log("It's running on when clock time is 7:45");
//   },
//   null,
//   false,
//   //   "America/Sao_Paulo"
//   "Asia/Kolkata"
// ).start();

/** Send email */
// new CronJob(
//   "33 6 * * *",
//   function () {
//     emailService.sendMail(
//       "sheladiyavibha0667@gmail.com",
//       "Morning message",
//       "Good morning vibhu! Have a nice day :)"
//     );
//   },
//   null,
//   false,
//   "Asia/Kolkata"
// ).start();
