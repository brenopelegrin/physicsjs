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
    buttonText?: string,
    minWidth: string
    buttonOnClick?: any,
    customButton?: any
}

function buttonFunction(props: CardWithButtonProps){
    if('customButton' in props){
        return(
            <Box>
                <props.customButton/>
            </Box>
        )
    }
    else {
        return (
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
        );
    }
}

export default function CardWithButton(props: CardWithButtonProps) {
    return (
        <Center>
            <Box
            bg={useColorModeValue('blackAlpha.100', 'blackAlpha.500')}
            boxShadow={'1xl'}
            rounded={'md'}
            minWidth={props.minWidth}
            overflow={'hidden'}>
            <Stack
                textAlign={'center'}
                p={2}
                color={useColorModeValue('gray.800', 'white')}
                align={'center'}>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'xl'} fontWeight={800}>
                    {props.header}
                </Text>
                </Stack>
            </Stack>

            <Flex 
                flexDirection="column" 
                bg={useColorModeValue('gray.50', 'gray.900')}
                padding="1em"
                gap={0}
            >
                {props.children}
                {buttonFunction(props)}
            </Flex>
            </Box>
        </Center>
    );
}