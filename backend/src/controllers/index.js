/* ------------------------------ APP CONTOLLER ----------------------------- */
module.exports.userController = require("./app/user.controller");
module.exports.authController = require("./app/auth.controller");
module.exports.listingController = require("./app/listing.controller");
module.exports.UpdateController = require("./app/update.controller");
module.exports.likeController = require("./app/like.controller");

/* -----------------------------(ADMIN) WEB CONTROLLER ----------------------------- */

module.exports.authAdminController = require("./web/admin.auth.controller");
module.exports.adminController = require("./web/admin.controller");
module.exports.adminUserController = require("./web/admin.create.user.controller");
module.exports.hobbiesController = require("./web/interet.controller");
module.exports.petController = require("./web/pets.controller");
module.exports.planController = require("./web/plan.controller");
module.exports.sexualController = require("./web/sexual.controller");
module.exports.zodiacSignController = require("./web/sign.controller");

/* ----------------------------- DEMO CONTROLLER ---------------------------- */
// module.exports.tokenController = require("./demo/token.controller");
// // module.exports.apiController = require("../controllers/create.user.controller");
// module.exports.numberController = require("./demo/number.controller");
// module.exports.locationController = require("./demo/location.controller");
