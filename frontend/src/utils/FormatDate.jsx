import React from "react";

const FormatDate = ({ ISOdate }) => {
  const date = new Date(ISOdate);

  // Format the updatedAt string
  let updatedString = "";

  if (date) {
    // Format the date in "23 Mar 2024 4:31PM" format like
    const dateFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-GB", dateFormatOptions);
    const formattedTime = date.toLocaleTimeString("en-GB", timeFormatOptions);

    updatedString = `${formattedDate} ${formattedTime}`;
  }
  return <span>{updatedString}</span>;
};

export default FormatDate;
