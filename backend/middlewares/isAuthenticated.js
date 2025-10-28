import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // also check header if cookie missing
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed", success: false });
  }
};

export default isAuthenticated;
