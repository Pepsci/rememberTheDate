import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateDate from "./date/CreateDate";
import DateList from "./date/DateList";

const Home = () => {
  const { logOut, isLoggedIn, currentUser } = useContext(AuthContext);
  const [dates, setDates] = useState([]);

  return (
    <div>
      <h1>Home page \o/</h1>
      {isLoggedIn && (
        <>
          <h1>Je suis connecté avec {currentUser && currentUser.name}</h1>
          <button onClick={logOut}>LogOut</button>
          <CreateDate />
          <DateList dates={dates} />
        </>
      )}
    </div>
  );
};

export default Home;
