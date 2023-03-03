import {
    Box,
    Center,
    Text,
    Spinner,
    Icon,
    Stack,
    List,
    ListItem,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
} from '@chakra-ui/react';

import { ReactElement, useState } from 'react';

import {
    InfoIcon
} from '@chakra-ui/icons';

interface ServerInfoProps{
    icon: any,
    title: string,
    boxText: ReactElement,
    bgColor?: string
}

export default function BoxInfoComponent(props: ServerInfoProps){
    return(
        <Box
            width="md"
            background={props.bgColor ? props.bgColor : useColorModeValue('blackAlpha.100', 'blackAlpha.500')}
            borderRadius={15}
        >
            <Flex 
                padding="1em" 
                flexDirection="column"
                gap={5}
                alignItems="left"
                alignContent="left"
            >
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    gap={4}
                >
                    {props.icon}
                    <Text as="b">{props.title}</Text>
                </Flex>
                <Box
                    borderRadius={15}
                    padding="0.5em"
                    textAlign="left"
                    background={useColorModeValue('blackAlpha.200', 'blackAlpha.400')}
                >
                    <Text margin="0.5em">{props.boxText}</Text>
                </Box>
            </Flex>
            
        </Box>
    )
}