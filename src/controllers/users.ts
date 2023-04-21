import { deleteUserById, getUserById, getUsers } from "../db/users";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("GET ALL USERS");

    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log("param", req.params.id);
    console.log("body", req.body.id);

    const user = await getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user!.username = username;
    await user!.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
