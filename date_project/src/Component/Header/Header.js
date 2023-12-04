import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { weekDaysAction } from "../../Slice/counterSlice";
import React, { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

const Header = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // State
  const [selectedWeek, setSelectedWeek] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [previousWeek, setPreviousWeek] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);

  const weekDays = selectedWeek.slice(1, 6);
  useEffect(() => {
    updateWeeks(moment());
  }, []);

  useEffect(() => {
    dispatch(weekDaysAction(weekDays));
  }, [weekDays]);

  const updateWeeks = (selectedDate) => {
    const currentWeek = getWeekDays(selectedDate);
    setCurrentDate(selectedDate.format("MMM D, YYYY"));
    setSelectedWeek(currentWeek);

    const previousWeekStart = selectedDate.clone().subtract(1, "week");
    setPreviousWeek(getWeekDays(previousWeekStart));

    const nextWeekStart = selectedDate.clone().add(1, "week");
    setNextWeek(getWeekDays(nextWeekStart));
  };

  const getWeekDays = (date) => {
    const startOfWeek = date.clone().startOf("week");
    const endOfWeek = date.clone().endOf("week");
    const days = [];

    let currentDay = startOfWeek.clone();
    while (currentDay.isSameOrBefore(endOfWeek, "day")) {
      days.push(currentDay.format("MMM D, YYYY"));
      currentDay.add(1, "day");
    }

    return days;
  };

  const handlePreviousWeek = () => {
    updateWeeks(moment(currentDate, "MMM D, YYYY").subtract(1, "week"));
  };

  const handleNextWeek = () => {
    updateWeeks(moment(currentDate, "MMM D, YYYY").add(1, "week"));
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        maxWidth="280px"
        width="100%"
        justifyContent="space-between"
      >
        <Button startIcon={<IoMdArrowDropleft />} onClick={handlePreviousWeek}>
          Previous Week
        </Button>
        <p> {currentDate}</p>
      </Stack>
      <Button endIcon={<IoMdArrowDropright />} onClick={handleNextWeek}>
        Next Week
      </Button>
    </Stack>
  );
};

export default Header;
