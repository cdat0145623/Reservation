import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "default.jpeg",
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
