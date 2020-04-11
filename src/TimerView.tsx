import React from 'react';
import { connect } from "react-redux";
import { IconButton, Heading, Box, Text, Link } from "@chakra-ui/core"
import { Play, Pause, MoreVertical } from "react-feather"
import * as moment from 'moment';
import { startCountdown, pauseTimer, advanceSession, resetTimer } from './store/timer/actions';
import { AppState } from "./store";
import { Session } from './store/timer/types';
import { getCurrentTimeString, getPaused, getCurrentSession } from './store/timer/selectors'

import { remote } from 'electron'

interface TimerViewProps {
  startCountdown: typeof startCountdown;
  pauseTimer: typeof pauseTimer;
  advanceSession: typeof advanceSession;
  resetTimer: typeof resetTimer;
  currentTimeString: string;
  isPaused: boolean;
  currentSession: Session;
}

const displayMoreMenu = (advanceSession, resetTimer) => {
  const { Menu, MenuItem } = remote

  const menu = new Menu()
  menu.append(new MenuItem({ label: 'Skip Session', click: advanceSession }))
  menu.append(new MenuItem({ label: 'Reset Timer', click: resetTimer }))
  menu.popup({ window: remote.getCurrentWindow() })
}

const newTimerView: React.FC<TimerViewProps> = props => {
  const {startCountdown, pauseTimer, currentTimeString, isPaused, advanceSession, resetTimer, currentSession} = props;
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
          variant="outline"
          variantColor="purple"
          onClick={_toggleTimer}
          my={2}
          mx={1}
          isRound={true}
          icon={isPaused? Play:Pause}
          aria-label={isPaused? "Play":"Pause"}
        />

        <Box mt={4} mx={1}>
          <Link>
            <MoreVertical
              onClick={() => displayMoreMenu(advanceSession, resetTimer)}
              aria-label={"More Options"}
            />
          </Link>
        </Box>
      </Box>

      <Text textAlign="center" color="grey" my={1}>{currentSession.type}</Text>
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

