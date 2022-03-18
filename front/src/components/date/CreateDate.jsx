import React, { useRef, useState } from "react";
import apiHandler from "../../api/apiHandler";

//Context
import useAuth from "./../../context/useAuth";

const CreateDate = () => {
  const { currentUser } = useAuth();

  const currentUserID = currentUser._id;

  const [people, setPeople] = useState({
    date: "",
    name: "",
    creator: currentUserID,
    surname: "",
    email: "",
  });

  const pictureRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, name, surname, email, creator } = people;
    const fd = new FormData();

    fd.append("date", date);
    fd.append("name", name);
    fd.append("surname", surname);
    fd.append("email", email);
    fd.append("creator", creator);
    fd.append("picture", pictureRef.current.files[0]);

    try {
      const { newPeople } = await apiHandler.post("/date", fd);
      setPeople(newPeople);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dateList">
      <h1>Add a new people</h1>
      <form className="form-date" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-date-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-date-input"
          placeholder="Enter a name"
          onChange={(e) => setPeople({ ...people, name: e.target.value })}
        />

        <label htmlFor="surname" className="form-date-label">
          Surname
        </label>
        <input
          type="text"
          name="surname"
          id="surname"
          className="form-date-input"
          placeholder="Enter a surname"
          onChange={(e) => {
            setPeople({ ...people, surname: e.target.value });
          }}
        />

        <label htmlFor="email" className="form-date-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-date-input"
          placeholder="Enter an email"
          onChange={(e) => {
            setPeople({ ...people, email: e.target.value });
          }}
        />

        <label htmlFor="picture">Picture</label>
        <input ref={pictureRef} type="file" name="picture" id="picture" />

        <label htmlFor="date" className="form-date-label">
          Anniversary date
        </label>
        <input
          type="date"
          onChange={(e) => {
            setPeople({ ...people, date: e.target.value });
          }}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default CreateDate;
