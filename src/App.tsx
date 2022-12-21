import Testando from './components/FetchAPI'
import Nav from './components/Nav'
import * as React from 'react'

import { ChakraProvider, HStack, Wrap, WrapItem, Box, Flex, Spacer, Container } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage from './routes/HomePage'
import ModelsPage from './routes/Models'

function App() {
  return (
    <ChakraProvider>
      <Box height="100%">
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/models' element={<ModelsPage />} />
        </Routes>
      </Router> 
      </Box>
    </ChakraProvider>
  )
}

export default App
