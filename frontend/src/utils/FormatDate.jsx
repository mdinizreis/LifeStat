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
