import { Response, Request, NextFunction } from "express";
import { User } from "../../../types/User";

const userFromRequest: User = {
  id: "123123123",
  name: "Mathias",
  age: 28,
  country: "denmark",
  friendIds: ["1", "2", "3", "4"],
  settings: {
    notifications: false,
    reminders: false,
  },
};

export const getPing = (req: Request, res: Response) => {
  console.log(`Welcome ${userFromRequest.name}!`);

  res.status(200).send("Pong!");
};
