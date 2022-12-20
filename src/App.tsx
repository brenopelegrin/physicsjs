import Test from  './components/Test'
import Testando from './components/FetchAPI'
import Nav from './components/Nav'
import Card from './components/Card'
import * as React from 'react'

import { ChakraProvider, Wrap, WrapItem, Box, Flex, Spacer } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Nav/>
      <Wrap justify='center' padding='1.8em'>
        <WrapItem>
          <Card url_api='https://github.com/brenopelegrin/physicsjs/tree/master/backend'
                url_gui='/static/movimento3D.html' 
                title='mov3d' 
                subtitle='Cinemática em 3D' 
                description='Simule o movimento de uma esfera em três dimensões. Grandezas variáveis: massa, raio, velocidade inicial, posição inicial. Documentação da API no GitHub' 
                tags={['knematics', 'air resistance']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api='#'
                url_gui='#' 
                title='Indisponível' 
                subtitle='indisponível' 
                description='Ainda não há nada aqui :(' 
                tags={['none']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api='#'
                url_gui='#' 
                title='Indisponível' 
                subtitle='indisponível' 
                description='Ainda não há nada aqui :(' 
                tags={['none']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api='#'
                url_gui='#' 
                title='Indisponível' 
                subtitle='indisponível' 
                description='Ainda não há nada aqui :(' 
                tags={['none']}/>
        </WrapItem>
      </Wrap>
    </ChakraProvider>
  )
}

export default App
