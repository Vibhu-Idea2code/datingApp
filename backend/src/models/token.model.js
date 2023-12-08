const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
    },
    expire_time: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;