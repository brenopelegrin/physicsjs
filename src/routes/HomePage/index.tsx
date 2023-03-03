import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Spacer,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Center,
  WrapItem,
  Flex,
  Wrap,
  Link
} from '@chakra-ui/react';

import { Link as RouteLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Center width={"100vw"} height={"85vh"}>
        
    <Wrap justify='center' padding='1.8em'>
    
        <Flex justify="center" align="center" textAlign="center">
            <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'100%'}>
                Physics simulations <br />
                <Text as={'span'} color={'blue.400'}>
                available on web
                </Text>
            </Heading>
        </Flex>
        <Box padding='2em' margin="auto" textAlign="center" maxWidth='80vw'>
            <Text>
                The "physicsjs" project aims to make simulations of various physical phenomena available on the internet. Each type of physical model has a graphical interface, which can help people understand the concepts involved in that phenomenon, and an API that enables users to obtain raw data about the simulations.
            </Text>
        </Box>
        <Box>
            <Center>
                <Button
                colorScheme={'green'}
                bg={'blue.400'}
                rounded={'full'}
                _hover={{
                    bg: 'blue.500',
                }}>
                    <RouteLink to="/models">
                        View models
                    </RouteLink>
                </Button>
            </Center>
            <Spacer h={4}/>
            <Center>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    <Link href={'https://github.com/brenopelegrin/physicsjs'} isExternal>
                        View the source code on GitHub
                    </Link>
                </Button>
            </Center>
        </Box>

    </Wrap>
    </Center>
  );
}