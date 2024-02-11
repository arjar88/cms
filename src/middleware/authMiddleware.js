const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: "Unauthorized" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { requireAuth };
