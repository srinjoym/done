import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import preset from '@rebass/preset';
import {Box} from 'rebass'

import TaskView from './TaskView';
import './App.scss';
import TimerView from './TimerView';


const theme = {
  ...preset,
  // colors: {
  //   text: '#fff',
  //   background: '#000',
  //   primary: '#0ff',
  //   secondary: '#b0f',
  //   accent: '#f0b',
  //   muted: '#111',
  //   gray: '#999'
  // }
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        bg='background'
        sx={{
          maxWidth: 512,
          mx: 'auto',
          px: 3,
        }}>
        <TimerView/>
        <TaskView/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
