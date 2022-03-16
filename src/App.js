import { useState } from "react";
import "./App.css";

import users from "./data/users.js";
// console.log(users);

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");

  let filteredUsers = users.filter((user) => {
    let lowerCaseName = user.name.toLowerCase();
    let lowerCaseInput = searchInput.toLowerCase();

    return lowerCaseName.includes(lowerCaseInput);
  });

  let preprocessing;
  if (sortInput) {
    preprocessing = filteredUsers.map((user) => {
      let formatedCurrency = Number(String(user.currency).replace(/[$]/, ""))
      user.currency = formatedCurrency
      return user;
    });

    preprocessing.sort((a, b) => {
      if (a[sortInput] < b[sortInput]) {
        return -1;
      }
      if (a[sortInput] > b[sortInput]) {
        return 1;
      }
      return 0;
    });
  } else {
    preprocessing = filteredUsers;
  }

  // converts from array of objects to an array of jsx
  let renderUsers = preprocessing.map((user, index) => {
    // evaluates anything in jsx as js in the braces
    return (
      <li key={index}>
        {user.name} - {user.currency}
      </li>
    );
  });

  const handleSearchInput = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  const handleSortDropdown = (event) => {
    setSortInput(event.target.value);
  };

  return (
    <div>
      <h1>Users Filter Sort</h1>
      <form>
        <label>Search Name: </label>
        <input value={searchInput} onChange={handleSearchInput} />
        <div>
          <select onChange={handleSortDropdown}>
            <option>--Sort--</option>
            <option value="name">Name</option>
            <option value="currency">Currency</option>
          </select>
        </div>
      </form>
      <ul>{renderUsers}</ul>
    </div>
  );
};

export default App;
