import PropTypes from "prop-types";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { ThemeProvider, Typography } from "@mui/material";
import { authTheme } from "../../styles/Theme";
import { formatToFulldatetime } from "../../utils/FormatTime";
import { orderStatuses } from "../../utils/mappingData";
export const OrderTimeLine = (props) => {
  const { timeline } = props;
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <ThemeProvider theme={authTheme}>
        {timeline?.map((item) => {
          return (
            <TimelineItem key={item.id}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector sx={{ bgcolor: "primary.main" }} />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h7" component="span">
                  {orderStatuses[item.status.status]}
                </Typography>
                <Typography variant="body2">
                  {formatToFulldatetime(item.createdAt)}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </ThemeProvider>
    </Timeline>
  );
};

OrderTimeLine.propTypes = {
  timeline: PropTypes.array,
};
