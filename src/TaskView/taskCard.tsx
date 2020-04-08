
import React from 'react';
import { Box, Text, IconButton } from '@chakra-ui/core';
import { Check, Plus } from 'react-feather'

const taskCard = (item, isFocused, onCheckClick, onFocusClick) => (
    <Box
    display="flex"
    py={1}
    px={3}
    m={4}
    rounded="lg"
    borderWidth="1px"
    borderStyle="solid"
    alignItems="center"
    >

    <IconButton
        size="xs"
        isRound={true}
        variant="outline"
        icon={item.completed ? (() => <Check size={15}/>):undefined }
        onClick={onCheckClick}
        _focus={undefined} // remove focus highlighting
        aria-label="Complete Task"
    />

    <Box display="flex" flexDirection="column" flexGrow={1} alignContent="center">

        <Text
        mt={2}
        mb={(isFocused && item.timeSpent > 0) ? 1:2}
        mx={3}
        color={item.completed? "grey":undefined}
        as={item.completed? "s":"p"}>
        {item.title}
        </Text>

        {item.timeSpent > 0 &&
        <Text
        fontSize="10px"
        color={"grey"}
        mx={3}
        mb={2}>
        Time: {item.timeSpent.humanize()}
        </Text>
        }
    </Box>

    { !isFocused &&
    <IconButton
        size="xs"
        isRound={true}
        variant="outline"
        icon={() => <Plus size={15}/>}
        onClick={onFocusClick}
        _focus={undefined} // remove focus highlighting
        aria-label="Complete Task"
    />
    }
    </Box>
)

export default taskCard