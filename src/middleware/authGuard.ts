import { Request, Response, NextFunction } from "express";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  // TODO: check if sessionId from cookie exists in the db and hasnt expired
  if (req.user) {
    return next();
  }
  res.status(401).send({ message: "Not authenticated" });
};

export default authGuard;
