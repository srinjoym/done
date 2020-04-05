import React, {Component} from 'react';
import { connect } from "react-redux";
import { Button, IconButton, Heading, Box, Progress, Text } from "@chakra-ui/core"
import { Play, Pause, ChevronsRight } from "react-feather"
import * as moment from 'moment';

import { startCountdown, pauseTimer, resetTimer, advanceSession } from './store/timer/actions';
import { AppState } from "./store";
import { TimerState, Session } from './store/timer/types';
import { getCurrentTimeString, getPaused, getSessionId, getCurrentSession } from './store/timer/selectors'



interface TimerViewProps {
  startCountdown: typeof startCountdown;
  pauseTimer: typeof pauseTimer;
  resetTimer: typeof resetTimer;
  advanceSession: typeof advanceSession;
  currentTimeString: string;
  isPaused: boolean;
  currentSession: Session;
}

const newTimerView: React.FC<TimerViewProps> = props => {
  const {startCountdown, pauseTimer, resetTimer, currentTimeString, isPaused, advanceSession, currentSession} = props;
  const currentTime = moment.duration(currentTimeString)

  const _toggleTimer = () => isPaused ? startCountdown() : pauseTimer()
  const _resetTimer = () => resetTimer(moment.duration(25, 'minutes'))

  return (
    <Box pt={4} px={4}>
      <Box display="flex">
        <Heading
          flexGrow={1}
          my={0}
          mx={1}
          size="2xl"
          fontSize="50px"
          color='primary'>
          {moment.utc(currentTime.asMilliseconds()).format("mm:ss")}
        </Heading>

        <IconButton
          onClick={_toggleTimer}
          my={2}
          mx={1}
          isRound={true}
          icon={isPaused? Play:Pause}
          aria-label={isPaused? "Play":"Pause"}
        />

        <IconButton
          onClick={advanceSession}
          my={2}
          mx={1}
          isRound={true}
          icon={ChevronsRight}
          aria-label={"Skip"}
        />
      </Box>

      <Text textAlign="center" color="grey" my={1}>{currentSession.type}</Text>
      {/* <Button onClick={_resetTimer} m={2} variant='outline'>Reset</Button> */}
      {/* <Button display="block" onClick={advanceSession} m={2}>Advance</Button> */}
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  currentTimeString: getCurrentTimeString(state),
  isPaused: getPaused(state),
  currentSession: getCurrentSession(state)
});

export default connect(
  mapStateToProps,
  {startCountdown, pauseTimer, resetTimer, advanceSession}
)(newTimerView);
