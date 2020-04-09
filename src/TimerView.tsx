import React from 'react';
import { connect } from "react-redux";
import { IconButton, Icon, Heading, Box, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core"
import { Play, Pause, MoreVertical } from "react-feather"
import * as moment from 'moment';

import { startCountdown, pauseTimer, advanceSession, resetTimer } from './store/timer/actions';
import { AppState } from "./store";
import { Session } from './store/timer/types';
import { getCurrentTimeString, getPaused, getCurrentSession } from './store/timer/selectors'



interface TimerViewProps {
  startCountdown: typeof startCountdown;
  pauseTimer: typeof pauseTimer;
  advanceSession: typeof advanceSession;
  resetTimer: typeof resetTimer;
  currentTimeString: string;
  isPaused: boolean;
  currentSession: Session;
}

const newTimerView: React.FC<TimerViewProps> = props => {
  const {startCountdown, pauseTimer, currentTimeString, isPaused, advanceSession, currentSession} = props;
  const currentTime = moment.duration(currentTimeString)

  const _toggleTimer = () => isPaused ? startCountdown() : pauseTimer()

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

        <Menu>
          <Box mt={4} ml={1}>
            <MenuButton as={MoreVertical}/>
          </Box>

          <MenuList placement="bottom">
            <MenuItem onClick={advanceSession}>Skip Session</MenuItem>
            <MenuItem onClick={resetTimer}>Reset session</MenuItem>
          </MenuList>
        </Menu>
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
  {startCountdown, pauseTimer, advanceSession, resetTimer}
)(newTimerView);

