const sendToken = (user, statuscode, res) => {
  // creating JWT
  const Token = user.getJwtToken();

  // cookie part
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", Token, options).json({
    sucess: true,
    Token,
    user,
  });
};


module.exports = sendToken;
