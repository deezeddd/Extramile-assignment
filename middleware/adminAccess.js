const AdminAccess = (permissions) => {
  return (req, _res, next) => {
    console.log(req.body.email);
    next();
  };
};

export default AdminAccess;
