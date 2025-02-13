import * as React from "react";
import Question from "./Question";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { useRecoilValue } from "recoil";
import { multilingual } from "../../atoms";

//MUI
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VOTES_THRESHOLD from "../../utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CheckUnvettedQuestion({ ques }) {
  const multi = useRecoilValue(multilingual);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = ques.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const getVettedQuestions = () => {
    const allAqes = ques.map((qs) =>
      !(qs.total_votes >= VOTES_THRESHOLD && qs.upvote > VOTES_THRESHOLD / 2)
        ? qs
        : null
    );
    const nonVettedQues = allAqes.filter((q) => q !== null);
    console.log({ nonVettedQues });
    const nonVettedJsx = nonVettedQues.map((qs, index) => (
      <Box key={index} sx={{ m: 0, p: 0 }}>
        {Math.abs(activeStep - index) <= 2 && (
          <Question
            q={qs}
            qkey={index}
            key={index}
            showCheckbox={false}
            showvote={false}
          />
        )}
      </Box>
    ));
    return nonVettedJsx;
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "330px",
          sm: "550px",
          md: "850px",
          lg: "1150px",
          xl: "1500px",
        },
      }}
    >
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {getVettedQuestions()}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {multi.next}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {multi.back}
          </Button>
        }
      />
    </Box>
  );
}

export default CheckUnvettedQuestion;
