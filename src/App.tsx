import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { User } from "../types/User";

const users: User[] = [
  {
    id: "123123123",
    name: "Mathias",
    age: 28,
    country: "denmark",
    friendIds: ["1", "2", "3", "4"],
    settings: {
      notifications: true,
      reminders: true,
    },
  },
  {
    id: "52343242",
    name: "Mette",
    age: 25,
    country: "denmark",
    friendIds: ["6", "7", "8", "9"],
    settings: {
      notifications: true,
      reminders: true,
    },
  },
];

function App() {
  return (
    <div className="App">
      <h1>Users</h1>
      {users.map((u) => (
        <div style={{ border: "1px solid gray" }}>
          <h2>{u.name}</h2>
          <p>{u.age}</p>
          <p>{u.country}</p>
          <div>
            <h3>Notifications: {`${u.settings.notifications}`}</h3>
            <h3>Reminders: {`${u.settings.reminders}`}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
