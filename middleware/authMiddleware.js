const candidateModel = require("../model/candidate");

exports.authMiddleware1 = async (req, res, next) => {
  console.log("cookie ", req.cookies);

  //if user cookie present
  if (req.cookies.user) {
    const user = await candidateModel.findOne({ 'email': req.cookies.user });
    console.log(user)
    //if user is present in database.
    if (user) {
      //include user in the req object so the user will be available in the api.
      req.user= user;
      //go to next middlware or controller
      next();
    } else {
      //if user is not present in database.
      res.status(401).json({
        messsage: "Unauthorised",
      });
    }
  } else {
    //if user cookie is not present.
    res.status(401).json({
      message: "Unauthorised",
    });
  }
};
