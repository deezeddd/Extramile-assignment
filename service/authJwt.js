import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

function setTokenForUser(user) {
  const payload = {
    id: user.employeeId,
    email: user.email,
    role: user.role,
    name: user.name
  };
  return jwt.sign(payload, secret, { expiresIn: "5h" }); //Create JWT Token with payload given as follows
}

function validateToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret); //Token Verification
  } catch (error) {
    return null;
  }
}


export { setTokenForUser, validateToken };
