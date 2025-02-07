import React from "react";
import { useRecoilValue } from "recoil";
import { question, MCQoptions, matchPairs, multilingual } from "../../atoms";
import ReactTagInput from "@pathofdev/react-tag-input";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ReviewQuestion = ({ qType }) => {
  const ques = useRecoilValue(question);
  const mcqs = useRecoilValue(MCQoptions);
  const matchFields = useRecoilValue(matchPairs);
  const multi = useRecoilValue(multilingual);
  const tagz = mcqs.map((m) => m.option);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {ques.title.length ? (
          <TextField
            required
            id="title"
            name="title"
            label={multi.question}
            fullWidth
            variant="outlined"
            value={ques.title}
            disabled
          />
        ) : (
          <math-field read-only>{localStorage.getItem("mathInput")}</math-field>
        )}
      </Grid>
      {qType === "a" ? (
        <Grid item xs={12}>
          <TextField
            required
            id="corr-option"
            name="corr-option"
            label={multi.correctOption}
            value={tagz[0]}
            fullWidth
            variant="standard"
            disabled
          />
          <Box sx={{ mt: 4 }}>
            <div>{multi.wrongOpts}</div>
            <ReactTagInput
              tags={tagz.splice(1)}
              placeholder={multi.wrongOption}
              readOnly
            />
          </Box>
        </Grid>
      ) : qType === "c" || qType === "b" ? (
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label={multi.answer}
            fullWidth
            variant="outlined"
            value={ques.options[0].option}
            disabled
          />
        </Grid>
      ) : (
        <div className="container">
          {matchFields.map((data, index) => {
            const { key, value } = data;
            return (
              <div className="row my-3" key={index}>
                <Box className="form-group" sx={{ mt: 2, ml: 3 }}>
                  <TextField
                    label={multi.key}
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                    className="form-control"
                    value={key}
                    name="Key"
                    sx={{ mt: 1 }}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <TextField
                    label={multi.value}
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                    className="form-control"
                    value={value}
                    name="value"
                    placeholder={multi.value}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </div>
            );
          })}
        </div>
      )}
    </Grid>
  );
};

export default ReviewQuestion;
