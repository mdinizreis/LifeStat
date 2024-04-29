import React from "react";
import Profile from "../components/Profile";

const Account = () => {
  return (
    <div>
      {/* show user profile for update */}
      <Profile></Profile>
      <br />
      {/* TBD - Add addicitonal account details like Plan, Payments, card info, account close */}
    </div>
  );
};

export default Account;
