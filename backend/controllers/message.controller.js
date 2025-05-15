import { cloudinary } from "../lib/cloudinary.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


const getUsersForSidebar = async (req, res)=>{
    try {
        const filter = req.query.filter || "";

        const loggedInUserId = req.user._id;
        const filterdUsers = await User.find({
            _id: {$ne: loggedInUserId},
            fullName: {$regex: filter, $options: 'i'}
        }).select("-password");
        res.status(200).json(filterdUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const getMessages = async(req, res)=>{
    try {
        const { id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: userToChatId, receiverId: myId},
                { senderId: myId, receiverId: userToChatId},
            ]
        });

        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in getMessages controller ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const sendMessage = async (req, res)=>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        await newMessage.save();

        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error in Send Message controller : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export { getUsersForSidebar, getMessages, sendMessage };