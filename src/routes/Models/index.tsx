import Card from '../../components/Card'
import { Wrap, WrapItem } from '@chakra-ui/react'

export default function ModelsPage(){
    return(
        <Wrap justify='center' padding='1.8em'>
        <WrapItem>
          <Card url_api='https://github.com/brenopelegrin/physicsjs/tree/master/backend'
                url_gui='/static/movimento3D.html' 
                title='mov3d (legacy)' 
                subtitle='Cinemática em 3D' 
                description='Simule o movimento de uma esfera em três dimensões. Grandezas variáveis: massa, raio, velocidade inicial, posição inicial. Documentação da API no GitHub' 
                tags={['knematics', 'air resistance']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api='#'
                url_gui='/models/mov3d' 
                title='mov3d (new - dev)' 
                subtitle='Cinemática em 3D' 
                description='Simule o movimento de uma esfera em três dimensões. Grandezas variáveis: massa, raio, velocidade inicial, posição inicial. Documentação da API no GitHub' 
                tags={['knematics', 'air resistance', 'dev']}/>
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
    )
}