import { validateToken } from "../service/authJwt.js";

async function restrictToLoggedInUserOnly(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next();
  }

  const token = authHeader.split("Bearer ")[1];
  console.log(token);
  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.end("User Not Logged-in");
    if (!roles.includes(req.user.role)) {
      return res.status(401).end("Unauthorized");
    }
    return next();
  };
}

export { restrictToLoggedInUserOnly, restrictTo };
