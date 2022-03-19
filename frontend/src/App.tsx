import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI imports
import { Typography, TextField, Grid, Box, Button } from '@mui/material';

import './App.css';

import API from '././API';

function handleSubmit(event: React.FormEvent<HTMLFormElement>, optionCount: number) {

  event.preventDefault();

  const data = new FormData(event.currentTarget);
  // Get the form data
  const postData = {
    name: data.get('name')?.toString() || '',
    description: data.get('description')?.toString() || '',
  };

  // Get the options created
  const options: string[] = [];
  for (let i = 0; i < optionCount; i++) {
    options.push(data.get(`option${i}`)?.toString() || '');
  }

  // Create a new poll and get the poll_id
  let poll_id: number;
  API.createPoll(postData).then(res => {
    poll_id = res.id;
    console.log(res);
  });

  // Create the options for the newly created poll
  setTimeout(() => API.createOptions({poll_id: poll_id, texts: options}).then(res => console.log(res)), 0);
};


function App() {
  const [ optionCount, setOptionCount ] = useState(0);

  return (
    <div className="App">
      <Typography variant="h2" component="h1" mt={5}>
        CREATE NEW POLLS
      </Typography>
      <Typography variant="h5" component="h1" mt={5}>
        Fill in the blanks, Share the link!
      </Typography>
      <Box component="form" onSubmit={
          (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e, optionCount)} noValidate sx={{textAlign: 'left'}
        }>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12}>
            <TextField
            variant="outlined"
            label="Give Your Poll A Name"
            id="name"
            name="name"
            autoComplete='off'
            required
            sx={{width: '25%'}}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
            variant="outlined"
            label="Describe Your Poll"
            id="description"
            name="description"
            autoComplete='off'
            fullWidth
            required
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <div style={{width: "100%"}}>
              {Array.from({ length: optionCount }).map((_,id) => (
                  <Grid key={id} item xs={12}>
                    <TextField
                    variant="outlined"
                    label={`Option ${id}`}
                    id={`option${id}`}
                    name={`option${id}`}
                    autoComplete='off'
                    required
                    sx={{width: '25%'}}
                    />
                  </Grid>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button 
            variant='contained'
            onClick={(e) => {
              setOptionCount(optionCount + 1);
            }}
            sx={{width: '25%'}}
            >
              Add Option
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
            variant='contained'
            onClick={(e) => {
              setOptionCount(Math.max(optionCount - 1, 0));
            }}
            sx={{width: '25%'}}
            >
              Delete Last Option
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
            type="submit"
            variant="contained"
            sx={{width: '25%'}}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
