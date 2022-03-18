import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";

//context
import useAuth from "./../../context/useAuth";

const DateList = () => {
  const [dates, setDates] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);

  const { currentUser } = useAuth();
  const currentUserID = currentUser._id;

  useEffect(() => {
    apiHandler
      .get("/date")
      .then((dbResponse) => {
        // console.log("reponse db", dbResponse);
        setDates(dbResponse.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    console.log("ta mere la date ? :", dates);
    setFilteredDates(
      dates.filter((c) => {
        return c.creator === currentUserID;
      })
    );
    console.log("filtered dates", filteredDates);
  }, [dates]);

  return (
    <>
      <h1>DateList</h1>
      <div className="dateListe">
        <h1>Full List</h1>
        {filteredDates.map((date) => {
          return (
            <div key={date._id}>
              <p>{date.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DateList;
