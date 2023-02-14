const Users = require('../models/signUpModel');

module.exports = {
  setUser: async (req, res, next) => {
    const auth = req.cookies.Auth;

    if (auth) {
      const currentUser = await Users.findOne({ email: auth });

      req.user = currentUser;

      next();
    } else {
      req.user = null;

      next();
    }
  },
};
