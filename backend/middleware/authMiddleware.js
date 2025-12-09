export const isAdmin = (req, res, next) => {
  const role = req.header("x-role");

  if (role !== "admin")
    return res.status(403).json({ message: "Admin access required" });

  next();
};
