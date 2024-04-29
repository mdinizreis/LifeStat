/*=============================================================================
 | Purpose:  CONVERTS THE ISO 8601 FORMATTED DATE / TIME (RECEIVED BY PERIGON
 |           API) INTO A MORE USER FRIENDLY FORMAT BY COMPARING AGAINST CURRENT
 |           DATE OR JUST SHOWING THE DATE IN EN-GB FORMAT IF MORE THAN 10 DAYS
 |           AGO
 |
 | Input / Parameters:  RECEIVES ISO 8601 FORMATTED DATE AND TIME
 |                      (E.G. 2021-08-22T20:05:55+00:00) 
 |   
 | Output / Returns:  DEPENDING ON THE TIME DIFFERENCE TO CURRENT DATE DISPLAYS
 |                    LIKE THE EXAMPLE: "less than an hour ago", "1h ago", 
 |                    "Xh ago", "X days ago" or "22 Aug 2021 9:05PM".
 |
 *===========================================================================*/

import React from "react";

const FormatDate = ({ ISOdate }) => {
  // Calculate the time difference
  const date = new Date(ISOdate);
  const currentDate = new Date();
  const timeDifference = currentDate - date;

  // Convert time difference to hours
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  // Format the updatedAt string
  let updatedString = "";
  //   if (hoursDifference < 1) {
  //     updatedString = "less than an hour ago";
  //   } else if (hoursDifference === 1) {
  //     updatedString = "1h ago";
  //   } else if (hoursDifference > 1 && hoursDifference < 24) {
  //     updatedString = `${hoursDifference}h ago`;
  //   } else if (hoursDifference > 24 && hoursDifference < 240) {
  //     const daysDifference = Math.floor(hoursDifference / 24);
  //     updatedString = `${daysDifference} days ago`;
  //   } else {
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
