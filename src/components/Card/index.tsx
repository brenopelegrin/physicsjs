import {
    Heading,
    Avatar,
    Box,
    Center,
    HStack,
    Icon,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    ListItemProps,
  } from '@chakra-ui/react';

import { Link as RouteLink } from "react-router-dom";

import {ExternalLinkIcon} from "@chakra-ui/icons";

import { BiBook } from "react-icons/bi";
  
interface CardProps{
    title: string;
    subtitle: string;
    description: string;
    url_gui: string;
    url_api: string;
    tags: Array<string>;
};

function GetTags(props: CardProps){
    var returns = []
    for (var tag of props.tags){
        returns.push(
            <Badge
                px={2}
                py={1}
                key={Math.floor(Math.random() * 100)}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                {tag}
            </Badge>
        );
    }
    return returns;
}

export default function Card(props: CardProps) {
    return (
        <Center py={6}>
        <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
                {props.title}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
                {props.subtitle}
            </Text>
            <Text
                textAlign={'center'}
                color={useColorModeValue('gray.700', 'gray.400')}
                px={3}>

                {props.description}
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                {GetTags(props)}
            </Stack>

            <Stack mt={8} direction={'row'} spacing={4}>
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                disabled={props.url_api ? false : true}
                _focus={{
                bg: 'gray.200',
                }}>
                {props.url_api ? (
                <Link href={props.url_api} isExternal>
                    <HStack alignContent="center"><Icon as={BiBook} boxSize={4}/> <Text>Docs/API</Text></HStack>
                </Link>) : <HStack alignContent="center"><Icon as={BiBook} boxSize={4}/> <Text>Docs/API</Text></HStack>}
            </Button>
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                disabled={props.url_gui ? false : true}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                bg: 'blue.500',
                }}
                _focus={{
                bg: 'blue.500',
                }}>
                {props.url_gui ? (
                <RouteLink to={props.url_gui}>
                    <HStack alignContent="center"><ExternalLinkIcon boxSize={4}/> <Text>Access</Text></HStack>
                </RouteLink>) : <HStack alignContent="center"><ExternalLinkIcon boxSize={4}/> <Text>Access</Text></HStack>}

            </Button>
            </Stack>
        </Box>
        </Center>
    );
}