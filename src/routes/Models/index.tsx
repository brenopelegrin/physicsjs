import Card from '../../components/Card'
import { Wrap, WrapItem } from '@chakra-ui/react'

export default function ModelsPage(){
    return(
        <Wrap justify='center' padding='1.8em'>
        <WrapItem>
        <Card   url_api='https://github.com/brenopelegrin/physicsjs/tree/master/backend'
                url_gui='/models/mov3d' 
                title='mov3d' 
                subtitle='Knematics in em 3D' 
                description='Simulate the motion of a sphere in three dimensions considering or not the air resistance. Variable quantities: mass, radius, initial velocity, initial position. API documentation on GitHub.' 
                tags={['knematics', 'air resistance']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api=''
                url_gui='' 
                title='Unavailable' 
                subtitle='unavailable' 
                description='There is nothing here yet :(' 
                tags={['none']}/>
        </WrapItem>
        <WrapItem>
        <Card   url_api=''
                url_gui='' 
                title='Unavailable' 
                subtitle='unavailable' 
                description='There is nothing here yet :(' 
                tags={['none']}/>
        </WrapItem>
      </Wrap>
    )
}