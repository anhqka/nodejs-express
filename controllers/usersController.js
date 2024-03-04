import User from "../models/user.js";
import {
  ERROR_STATUS_CODE,
  SUCCESS_STATUS_CODE,
} from "../constants/index.js";
import * as bcryptHash from "../utils/hash.js";

async function userNew(req, res, next) {
  const isEmpty = await User.findOne({
    email: req.body.email,
  });

  if (isEmpty) {
    res.status(409).json({ message: "Email already exists" });
    return;
  }

  const password =
    req.body.password && (await bcryptHash.hashPassword(req.body.password));

  const user = new User({
    username: req.body.username,
    address: req.body.address,
    avatar: req.body.avatar,
    email: req.body.email,
    password,
    fullname: req.body.fullname,
    role: req.body.role,
  });

  try {
    const { id } = await user.save();

    const data = await User.findById(id);

    res.status(201).json({ code: SUCCESS_STATUS_CODE.OK, user: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_description: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
      error: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_description: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
      error: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}

async function getUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_description: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
      error: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}

export { userNew, getUsers, getUser };
