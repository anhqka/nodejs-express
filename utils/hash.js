import bcrypt from "bcrypt";
const saltRounds = 10;

async function hashPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

function comparePassword(plainPasswordToCheck, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      plainPasswordToCheck,
      hashedPassword,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export { hashPassword, comparePassword };
