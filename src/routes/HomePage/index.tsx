import { FaGithub } from 'react-icons/fa';
import { Link as RouteLink } from 'react-router-dom';

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Center width={"100vw"} height={"85vh"}>
    <Flex justify='center' padding='1.8em' direction='column'>
        <Box justifyContent="center" alignItems="center" textAlign="center">
            <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'100%'}>
                Physics simulations <br />
                <Text as={'span'} color={'blue.400'}>
                available on web
                </Text>
            </Heading>
        </Box>
        <Box padding='2em' margin="auto" textAlign="center" maxWidth='80vw'>
            <Text>
                The "physics on web" project aims to make simulations of various physical phenomena available on the internet. You can explore physical models thorugh a graphical interface to understand the concepts involved in that phenomenon, and can obtain raw data thorugh the API.
            </Text>
        </Box>
        <Box padding='1em'>
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
                        <HStack><Icon as={FaGithub} boxSize={5}/><Text>View the source code on GitHub</Text></HStack>
                    </Link>
                </Button>
            </Center>
        </Box>
    </Flex>
    </Center>
  );
}