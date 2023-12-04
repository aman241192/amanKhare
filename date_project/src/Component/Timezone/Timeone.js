import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import moment from "moment/moment";
import "moment-timezone";
import { Stack, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addDataAction,
  deleteDataAction,
  timeZoneAction,
} from "../../Slice/counterSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Timeone() {
  const timeZoneMenu = [
    { label: "UTC-0", value: 0 },
    { label: "UTC-2", value: 1 },
  ];

  const dispatch = useDispatch();
  // State
  const [timeZone, setTimeZone] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [timeMenuValue, setTimeMenuValue] = useState(timeZoneMenu[0]);

  // use Selector
  const count = useSelector((state) => state.counter.weekDays);
  const time = useSelector((state) => state.counter.time);
  const timeData = useSelector((state) => state.counter.timeData);
  const firestWeekDays = useSelector((state) => state.counter.weekDays);

  useEffect(() => {
    const newArray = count.map((item, index) => {
      return {
        id: `${index + 1}`,
        date: moment(item).format("YYYY-MM-DD"),
        day: moment(item).format("dddd"),
        shiftTime: {
          morningShift: [
            `${timeMenuValue.value === 0 ? "8:00" : "10:00"} AM`,
            `${timeMenuValue.value === 0 ? "8:30" : "10:30"} AM`,
            `${timeMenuValue.value === 0 ? "9:00" : "11:00"} AM`,
            `${timeMenuValue.value === 0 ? "9:30" : "11:30"} AM`,
            `${timeMenuValue.value === 0 ? "10:00" : "12:00"} AM`,
            `${timeMenuValue.value === 0 ? "10:30" : "12:30"} AM`,
            `${timeMenuValue.value === 0 ? "11:00" : "1:00"} AM`,
            `${timeMenuValue.value === 0 ? "11:30" : "1:30"} AM`,
          ],
          noonShift: [
            `${timeMenuValue.value === 0 ? "12:00" : "02:00"} AM`,
            `${timeMenuValue.value === 0 ? "12:30" : "02:30"} AM`,
            `${timeMenuValue.value === 0 ? "01:00" : "03:00"} AM`,
            `${timeMenuValue.value === 0 ? "01:30" : "03:30"} AM`,
            `${timeMenuValue.value === 0 ? "02:00" : "04:00"} AM`,
            `${timeMenuValue.value === 0 ? "02:30" : "04:30"} AM`,
            `${timeMenuValue.value === 0 ? "03:00" : "05:00"} AM`,
            `${timeMenuValue.value === 0 ? "03:30" : "05:30"} AM`,
            `${timeMenuValue.value === 0 ? "04:00" : "06:00"} AM`,
            `${timeMenuValue.value === 0 ? "04:30" : "06:30"} AM`,
            `${timeMenuValue.value === 0 ? "05:00" : "07:00"} AM`,
            `${timeMenuValue.value === 0 ? "05:30" : "07:30"} AM`,
          ],
          eveningShift: [
            `${timeMenuValue.value === 0 ? "07:00" : "09:00"} AM`,
            `${timeMenuValue.value === 0 ? "07:30" : "09:30"} AM`,
            `${timeMenuValue.value === 0 ? "08:00" : "10:00"} AM`,
            `${timeMenuValue.value === 0 ? "08:30" : "10:30"} AM`,
            `${timeMenuValue.value === 0 ? "09:00" : "11:00"} AM`,
            `${timeMenuValue.value === 0 ? "09:30" : "11:30"} AM`,
            `${timeMenuValue.value === 0 ? "10:00" : "12:00"} AM`,
            `${timeMenuValue.value === 0 ? "10:30" : "12:30"} AM`,
            `${timeMenuValue.value === 0 ? "11:00" : "01:00"} AM`,
            `${timeMenuValue.value === 0 ? "11:30" : "01:30"} AM`,
          ],
        },
      };
    });
    setTimeZone(newArray);
  }, [count, timeMenuValue]);

  useEffect(() => {
    dispatch(timeZoneAction(timeZone));
  }, [timeZone]);

  // Modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // Add/Remove checked item from list
  const handleCheck = (event, index, idx) => {
    let findDate = count.find((item, idx) => idx == index);
    if (event.target.checked) {
      let id = `${idx + 1}${index + 1}`;
      let entry = {
        id: id,
        name: `test${id - 1}`,
        date: moment(findDate).format("YYYY-MM-DD"),
        time: event.target.value,
      };
      dispatch(addDataAction(entry));
    } else {
      let id = `${idx + 1}${index + 1}`;
      dispatch(deleteDataAction(id));
    }
  };

  const handleChange = (event) => {
    setTimeMenuValue(
      timeZoneMenu.find((item) => item.value == event.target.value)
    );
  };

  return (
    <>
      <Box>
        <Typography sx={{ textAlign: "start" }}>Time Zone:</Typography>

        <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeMenuValue.value}
              onChange={handleChange}
            >
              {timeZoneMenu.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Stack direction="row" gap="20px" width="100%">
          <Box width="100%">
            {time.length > 1 &&
              time.map((itemData, idx) => (
                <Stack direction="row" gap="20px" borderBottom="1px solid gray">
                  <Box
                    padding="10px 25px"
                    bgcolor="whitesmoke"
                    sx={{
                      ":hover": {
                        bgcolor: "lightgray",
                      },
                    }}
                  >
                    <Typography sx={{ color: "red" }}>
                      {itemData.day?.slice("0", "3")}
                    </Typography>
                    <Typography>
                      {moment(itemData.date).format("L").slice("0", "5")}
                    </Typography>
                  </Box>

                  <Stack direction="column">
                    <>
                      {moment(firestWeekDays[idx]).isBefore(moment(), "day") ? (
                        <Typography variant="h6" color="gray" paddingTop="10px">
                          PAST
                        </Typography>
                      ) : (
                        <FormGroup
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          {time[idx].shiftTime?.morningShift.length > 1 &&
                            time[idx].shiftTime?.morningShift.map(
                              (item, index) => (
                                <FormControlLabel
                                  sx={{ width: "120px" }}
                                  key={item}
                                  control={<Checkbox />}
                                  label={item}
                                  value={item}
                                  onChange={(item) =>
                                    handleCheck(item, index, idx)
                                  }
                                />
                              )
                            )}
                        </FormGroup>
                      )}
                    </>

                    {!moment(firestWeekDays[idx]).isBefore(moment(), "day") && (
                      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                        {time[idx].shiftTime.noonShift.length > 1 &&
                          time[idx].shiftTime.noonShift.map((item, index) => (
                            <FormControlLabel
                              sx={{ width: "120px" }}
                              key={item}
                              control={<Checkbox />}
                              label={item}
                              value={item}
                              onChange={(item) => handleCheck(item, index, idx)}
                            />
                          ))}
                      </FormGroup>
                    )}

                    <>
                      {!moment(firestWeekDays[idx]).isBefore(
                        moment(),
                        "day"
                      ) && (
                        <FormGroup
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          {time[idx].shiftTime.eveningShift.length > 1 &&
                            time[idx].shiftTime.eveningShift.map(
                              (item, index) => (
                                <FormControlLabel
                                  key={item}
                                  sx={{ width: "120px" }}
                                  control={<Checkbox />}
                                  label={item}
                                  value={item}
                                  onChange={(item) =>
                                    handleCheck(item, index, idx)
                                  }
                                />
                              )
                            )}
                        </FormGroup>
                      )}
                    </>
                  </Stack>
                </Stack>
              ))}
          </Box>
        </Stack>
      </Box>

      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" onClick={handleOpenModal}>
          Click Here to see JSON
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {timeData.length > 0 ? JSON.stringify(timeData) : "Nothing to show"}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Timeone;
