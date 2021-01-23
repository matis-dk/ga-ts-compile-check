import { Response, Request, NextFunction } from "express";
import { User } from "../../../types/User";

const userFromRequest: User = {
  id: "123123123",
  name: "Mathias",
  age: 28,
  country: "denmark",
  friendIds: ["1", "2", "3", "4"],
  settings: {
    notifications: true,
    reminders: true,
  },
};

export const getPing = (req: Request, res: Response) => {
  console.log(`Welcome ${userFromRequest.name}!`);

  if (userFromRequest.settings.notifications) {
    console.log("User have notifications enabled!");
  }

  res.status(200).send("Pong!");
};
