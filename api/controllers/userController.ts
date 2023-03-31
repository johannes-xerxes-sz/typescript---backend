import { Request, Response, NextFunction } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import User, { UserDocument } from "../models/User";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filter: FilterQuery<UserDocument> = {};
    const options: QueryOptions = {};
    const users = await User.find(filter, {}, options);
    res.status(200).setHeader("Content-Type", "application/json").json(users);
  } catch (err: any) {
    next(new Error(`Error retrieving User: ${err.message}`));
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).setHeader("Content-Type", "application/json").json(user);
  } catch (err: any) {
    next(new Error(`Error deleting Users: ${err.message}`));
  }
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await User.deleteMany();
    res.status(200).setHeader("Content-Type", "application/json").json({ success: true, msg: "Deleted all User" });
  } catch (err: any) {
    next(new Error(`Error retrieving User:${err.message}`));
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).setHeader("Content-Type", "application/json").json(user);
  } catch (err: any) {
    next(new Error(`Error retrieving User with ID of: ${req.params.userId} ${err.message}`));
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });
    res.status(200).setHeader("Content-Type", "application/json").json(user);
  } catch (err: any) {
    next(new Error(`Error updating User with ID of: ${req.params.userId} ${err.message}`));
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).setHeader("Content-Type", "application/json").json({ success: true, msg: `Delete the User with id: ${req.params.userId}` });
  } catch (err: any) {
    next(new Error(`Error deleting User with ID of: ${req.params.userId} ${err.message}`));
  }
};

export { getUsers, postUser, deleteUsers, getUser, updateUser, deleteUser };