import User from "../models/user.js";
import {
  AUTHEN_STATUS_CODE,
  AUTHEN_STATUS_DESCRIPTION,
  ERROR_STATUS_CODE,
  SUCCESS_STATUS_CODE,
  ERROR_STATUS_DESCRIPTION
} from "../constants/index.js";
import * as bcryptHash from "../utils/hash.js";

async function signIn(req, res, next) {
  const { password: reqPassword } = req.body;

  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    const isCorrect = await bcryptHash.comparePassword(
      reqPassword,
      user.password
    );

    if (isCorrect) {
      res.status(200).json({ data: user, code: SUCCESS_STATUS_CODE.OK });
    } else {
      res.status(200).json({
        error_desscription: AUTHEN_STATUS_DESCRIPTION.INCORRECT_PASSWORD,
        error: AUTHEN_STATUS_CODE.INCORRECT_PASSWORD,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        error_desscription: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
      });
  }
}

export { signIn };
