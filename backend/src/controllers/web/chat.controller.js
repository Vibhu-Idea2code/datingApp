const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

/**
 * @description   Create or fetch One to One Chat
 * @route         POST /api/chat/
 * @access        Protected
 */
const accessChat = asyncHandler(async (req, res) => {
  // Destructuring the userId from the request body
  const { userId } = req.body;

  // Checking if userId is not provided
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Checking if a one-to-one chat exists between the logged-in user and the specified user
  let existingChat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  })
    // .populate("users", "-password")
    .populate("latestMessage")
    .populate({ path: "latestMessage.sender", select: "name pic email" });

  // If a chat exists, send the chat data
  if (existingChat) {
    res.send(existingChat);
  } else {
    // If no chat exists, create a new one
    const newChatData = {
      chatName: "sender", // Set a default chatName (you might want to change this)
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      // Creating a new chat
      const createdChat = await Chat.create(newChatData);

      // Fetching the newly created chat with populated user data
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // Sending the newly created chat data as a response
      res.status(200).json(fullChat);
    } catch (error) {
      // Handling errors
      res.status(400).json({ error: error.message });
    }
  }
});

module.exports = accessChat;
