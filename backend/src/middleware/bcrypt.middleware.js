const bcrypt = require("bcryptjs");

const hashPasswordMiddleware = async function (next) {
  try {
    
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = hashPasswordMiddleware;
