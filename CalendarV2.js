import React, { useState, useEffect } from "react";

import "./CalendarV2.css";

import {
  BiChevronLeft as IconLeft,
  BiChevronRight as IconRight,
} from "react-icons/bi";

export const CalendarV2 = () => {
  let currentDate = new Date();
  const [currentDay] = useState(
    parseInt(String(currentDate.getDate()).padStart(2, "0"))
  );
  const currentYear = currentDate.getFullYear();

  const [year, setYear] = useState(currentDate.getFullYear());
  const [days, setDays] = useState([]);

  const [previousMonthDays, setPreviousMonthDays] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [month, setMonth] = useState(monthNames[currentDate.getMonth()]);
  const currentMonth = monthNames[currentDate.getMonth()];

  let weekdays = ["mon", "tue", "wed", "thu", "fru", "sat", "sun"];

  const isToday = (day) => {
    if (day === currentDay && month === currentMonth && year === currentYear)
      return true;

    return false;
  };

  const increaseMonth = () => {
    const currIndex = monthNames.indexOf(month);
    if (currIndex >= monthNames.length - 1) {
      setMonth(monthNames[0]);
      setYear(year + 1);
      return;
    }
    setMonth(monthNames[currIndex + 1]);
  };

  const decreateMonth = () => {
    const currIndex = monthNames.indexOf(month);
    if (currIndex === 0) {
      setMonth(monthNames[monthNames.length - 1]);
      setYear(year - 1);
      return;
    }
    setMonth(monthNames[currIndex - 1]);
  };

  const computePrevious = (startingDay, currentMonthDays) => {
    let m_nextMonthDays = 0;
    let m_prevMonthDays = 0;
    let m_remainingDays = 35 - currentMonthDays;

    if (startingDay > 0) {
      m_prevMonthDays = startingDay - 1;
    } else {
      m_prevMonthDays = 6;
    }
    m_nextMonthDays = m_remainingDays - m_prevMonthDays;
    console.log("Previous month days - " + m_prevMonthDays);
    console.log("Remainigng days - " + m_remainingDays);
    console.log("Next month days - " + m_nextMonthDays);

    let arr = [];
    if (m_prevMonthDays > 0) {
      //calc prev month

      let previousMonth = monthNames.indexOf(month);
      if (previousMonth - 1 === -1) {
        let daysInMonth = new Date(year - 1, previousMonth + 1, 0).getDate();
        console.log(" >0 All days in prev month - " + daysInMonth);
        let allDaysInPrevMonth = Array.from(Array(daysInMonth).keys()).map(
          (i, index) => i + 1
        );
        console.log(allDaysInPrevMonth);

        allDaysInPrevMonth = allDaysInPrevMonth.slice(
          Math.max(allDaysInPrevMonth.length - m_prevMonthDays, 0)
        );
        console.log(allDaysInPrevMonth);

        arr = allDaysInPrevMonth;
      } else {
        let daysInMonth = new Date(year, previousMonth, 0).getDate();
        console.log(" else All days in prev month - " + daysInMonth);
        console.log(daysInMonth); //liczba dni w grudniu
        let allDaysInPrevMonth = Array.from(Array(daysInMonth).keys()).map(
          (i, index) => i + 1
        );

        allDaysInPrevMonth = allDaysInPrevMonth.slice(
          Math.max(allDaysInPrevMonth.length - m_prevMonthDays, 0)
        );
        arr = allDaysInPrevMonth;
        console.log("Wszedlem tu");
      }

      //arr = Array.from(Array(m_prevMonthDays).keys()).map((i, index) => i + 1);

      setPreviousMonthDays(arr);
    } else {
      setPreviousMonthDays([]);
    }
    if (m_nextMonthDays > 0) {
      arr = Array.from(Array(m_nextMonthDays).keys()).map((i, index) => i + 1);
      console.log("Kolejny miesiac to " + m_nextMonthDays + " dni");
      setNextMonthDays(arr);
    } else setNextMonthDays([]);
  };

  useEffect(() => {
    //console.log("months set " + month);
    //console.log("Current day" + String(currentDate.getDate()).padStart(2, "0"));
    //console.log("Current month" + currentDate.getMonth());
    //console.log("Current year" + currentDate.getFullYear());

    const daysInMonth = new Date(
      year,
      monthNames.indexOf(month) + 1,
      0
    ).getDate();
    console.log(daysInMonth + " dni w miesiacu - " + month);
    const firstDay = new Date(year, monthNames.indexOf(month), 1).getDay();
    console.log("First day is " + firstDay);
    const daysArray = Array.from(Array(daysInMonth).keys()).map(
      (i, index) => i + 1
    );

    setDays(daysArray);

    computePrevious(firstDay, daysInMonth);
  }, [month, year, currentDay]);

  return (
    <>
      <div className="calendar">
        <div className="calendar-navigation">
          <span className="month year">
            {month} {year}
          </span>
          <div>
            <IconLeft size="1.5rem" onClick={decreateMonth} />

            <IconRight size="1.5rem" onClick={increaseMonth} />
          </div>
        </div>
      </div>
      <div className="calendar-content">
        <div className="calendar-labels">
          {weekdays.map((day, index) => (
            <span key={day + index}>{day}</span>
          ))}
        </div>

        <div className="calendar-days">
          {previousMonthDays.map((day, index) => (
            <span key={index + day} className="calendar-other-month gray">
              {day}
            </span>
          ))}
          {days.map((day, index) =>
            isToday(day) ? (
              <span className="calndar-current-month today">{day}</span>
            ) : (
              <span className="calendar-current-month">{day}</span>
            )
          )}
          {nextMonthDays.map((day, index) => (
            <span
              key={index + day + index}
              className="calendar-other-month gray"
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
