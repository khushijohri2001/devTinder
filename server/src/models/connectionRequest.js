const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:  ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} invalid status value`
        }
    }
}, { timestamps: true });

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

// check to not sedn request to yourself
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to youself. Dumbo!")
    }

    next()
})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema)

module.exports = ConnectionRequest