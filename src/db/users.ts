import mongoose from "mongoose";

// Create schema
// authSchema needed, require does not work on nested property
// const authSchema = new mongoose.Schema({
//   password: { type: String, required: true, select: false },
//   salt: { type: String, required: true, select: false },
//   sessionToken: { type: String, select: false },
// });

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   authentication: { type: authSchema, required: true },
// });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Create Model
export const UserModel = mongoose.model("user", UserSchema);

// Implementation
export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
