const IsAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res
      .status(401)
      .json({ message: "Unauthorized: You do not have access." });
  }
  next();
};

module.exports = {
  IsAuthenticated,
};
