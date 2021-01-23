export type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  friendIds: string[];
  settings: {
    notifications: boolean;
    reminders: boolean;
  };
};
