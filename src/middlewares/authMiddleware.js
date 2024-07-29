import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // For any other error
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};

export default authenticateToken;