import Nav from "./components/navBar/Nav";
import Header from "./components/header/Header";
import Action from "./components/action/Action";
import Goals from "./components/Goals";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Donation } from "./pages/Donation";
import { useEffect, useState } from "react";
import { setToken } from "./services/requests";

export default function App() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const userIn = JSON.parse(loggedUser);
      setUser(userIn);
      setToken(userIn.token);
    }
  }, []);
  return (
    <div>
      <Nav />
      <Header />
      <Action head='Donations' action='donates' target='donation' />
      <Action head='Demand' action='demand' target='recipient' />
      <Goals />
      <Register />
      <Login />
      <Donation />
    </div>
  );
}
