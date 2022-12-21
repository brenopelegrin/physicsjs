import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  HStack,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import LoginMenu from './LoginMenu'

import { Link as RouteLink } from "react-router-dom";

const Links = [ ['Home', '/'], ['Models', '/models']];

const NavLink = ({ children }: { children: any }) => (
  <RouteLink to={children[1]}>
    <Link
      px={2}
      py={2}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children[0]}
    </Link>
  </RouteLink>

);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Text as="i" fontWeight="bold" fontSize='lg'>physicsjs</Text>
            </Box>
          </HStack>

          <Flex alignItems={'center'}>
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link[0]}>{link}</NavLink>
                ))}
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </HStack>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}