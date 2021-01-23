import { User } from "./../../../types/User";
interface PubsubMessage {
  data: string;
  attributes: { [key: string]: string };
  messageId: string;
  publishTime: string;
}

export interface CloudEventsContext {
  eventId: string;
  timestamp: string;
  eventType: string;
  resource: object;
}

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

async function cf_user_signup(
  message: PubsubMessage,
  context: CloudEventsContext
) {
  const id = context.eventId;
  console.log(`${id}: ${message}`);
}

export default cf_user_signup;
