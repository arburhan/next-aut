const { default: mongoose } = require("mongoose");

// schema design
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name must required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLenght: [100, "Name is too large"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
})


userSchema.methods.logger = function () {
    console.log(` Data saved for ${this.name}`);
}


// SCHEMA -> MODEL -> QUERY

const User = mongoose.model('user', userSchema)

module.exports = User;