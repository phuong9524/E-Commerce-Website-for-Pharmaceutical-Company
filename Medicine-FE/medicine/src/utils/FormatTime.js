import { differenceInDays, format } from "date-fns";
import formatISO from "date-fns/formatISO";

export const formatToFulldatetime = (time) => {
  if (time === null) {
    return time;
  }
  const date = Date.parse(time);
  const result = format(date, "HH:mm, EEE dd-MM-yyyy");
  return result;
};

export const formatToDate = (time) => {
  if (time === null) {
    return time;
  }
  const date = Date.parse(time);
  const result = format(date, "dd-MM-yyyy");
  return result;
};

export const formatDaySince = (time) => {
  if (time === null) {
    return time;
  }
  const current = formatISO(new Date());
  return differenceInDays(new Date(current), new Date(time));
};
