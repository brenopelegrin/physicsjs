import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    Flex,
    NumberInput,
    NumberIncrementStepper,
    NumberInputStepper,
    InputLeftAddon,
    NumberInputField,
    NumberDecrementStepper,
    InputGroup,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

import SliderCustom from '../Slider'

interface CardWithButtonProps{
    header: string,
    children: any,
    buttonText: string,
    minWidth: string
    buttonOnClick: any,
}

export default function CardWithButton(props: CardWithButtonProps) {
    return (
        <Center py={6}>
            <Box
            bg={useColorModeValue('blackAlpha.100', 'blackAlpha.500')}
            boxShadow={'1xl'}
            rounded={'md'}
            minWidth={props.minWidth}
            overflow={'hidden'}>
            <Stack
                textAlign={'center'}
                p={3}
                color={useColorModeValue('gray.800', 'white')}
                align={'center'}>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'2xl'} fontWeight={800}>
                    {props.header}
                </Text>
                </Stack>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                {props.children}
                <Box>
                <Button
                    mt={10}
                    w={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    rounded={'xl'}
                    onClick={props.buttonOnClick}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    _focus={{
                        bg: 'blue.500',
                    }}>
                    {props.buttonText}
                </Button>
                </Box>
            </Box>
            </Box>
        </Center>
    );
}