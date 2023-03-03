import Testando from './components/FetchAPI'
import NavBar from './components/Header'
import * as React from 'react'

import { ChakraProvider, HStack, Wrap, WrapItem, Box, Flex, Spacer, Container, useColorModeValue } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import HomePage from './routes/HomePage'
import ModelsPage from './routes/Models'
import Mov3dPage from './routes/Models/Mov3d'
import ResultsPage from './routes/Models/Mov3d/Results'

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
          <Route path='/models/mov3d/results' element={<ResultsPage />} />
          <Route path='/static/movimento3D.html' element={<Link to="/static/movimento3D.html"/>}/>
        </Routes>
      </Router> 
      </Box>
    </ChakraProvider>
  )
}

export default App
