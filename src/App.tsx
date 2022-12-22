import Testando from './components/FetchAPI'
import NavBar from './components/Header'
import * as React from 'react'

import { ChakraProvider, HStack, Wrap, WrapItem, Box, Flex, Spacer, Container } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage from './routes/HomePage'
import ModelsPage from './routes/Models'
import Mov3dPage from './routes/Models/Mov3d'

function App() {
  return (
    <ChakraProvider>
      <Box height="100%">
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/models' element={<ModelsPage />} />
          <Route path='/models/mov3d' element={<Mov3dPage />} />
        </Routes>
      </Router> 
      </Box>
    </ChakraProvider>
  )
}

export default App
