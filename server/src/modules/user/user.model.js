import mongoose, { Schema} from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z\s]+$/,
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 50,
        // select: false
    },

    profilePic: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
        default: ""
    }
}, { timestamps: true})

//  Password hashing (pre-save hook)
userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Password comparison
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;