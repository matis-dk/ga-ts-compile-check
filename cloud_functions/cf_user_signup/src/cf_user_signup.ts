import { User } from "./../../../types/User";

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

async function cf_user_signup() {
  const { notifications, reminders } = userFromRequest.settings;

  if (notifications && reminders) {
    console.log("BIG PARTY 🎉");
  }
}

cf_user_signup();

export default cf_user_signup;
