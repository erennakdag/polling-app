import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { Typography, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button } from "@mui/material";

import API from '././API';

interface PollInterface {
  id: number,
  name: string,
  description: string,
  options: OptionInterface[],
}

interface OptionInterface {
  id: number,
  poll_id: number,
  text: string,
  votes: number,
}


export default function Poll() {
  const {poll_id} = useParams();
  const [poll, setPoll] = useState<PollInterface>();
  const [value, setValue] = useState('');

  console.log(value);

  useEffect(() => {
    API.getPoll(Number(poll_id)).then((res: PollInterface) => setPoll(res));
  }, [poll_id]);

  return (
    <div className="App">
      <Typography variant="h2" component="h1" mt={5}>
        {poll?.name}
      </Typography>
      <Typography variant="h5" component="h1" mt={3} mb={5}>
        {poll?.description}
      </Typography>
      <form onSubmit={(e) => API.vote(Number(value)).then(res => console.log(res))}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue((event.target as HTMLInputElement).value);
            }}
          >
            {poll?.options.map((option) => {
              return (
                <FormControlLabel 
                key={option.id} 
                value={option.id} 
                control={<Radio />} 
                label={`${option.text} ==> ${option.votes} votes`} />
              );
            })}
          </RadioGroup>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
