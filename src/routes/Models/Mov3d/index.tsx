import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    VStack,
    HStack,
    Spacer,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Center,
    WrapItem,
    Flex,
    Wrap,
    InputGroup,
    Input,
    InputRightAddon,
    InputLeftAddon,
    SliderMark,
    List,
    ListItem,
    Slider,
    Tooltip,
    Checkbox,
    SliderThumb,
    SliderTrack,
    SliderFilledTrack,
    Spinner,
    Link
} from '@chakra-ui/react';

import * as React from 'react';
import CardWithButton from '../../../components/CardWithButton'
import InputIncrement from '../../../components/InputIncrement';
import axios from 'axios';

import { makePost, makeGet } from '../../../components/Mov3dFetch';

import SliderCustom from '../../../components/Slider';

import { useMutation, useQuery } from 'react-query';

import { useNavigate } from "react-router-dom";

import { setTaskData } from "./Results"

function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Mov3dPage() {

  const [buttonText, setButtonText] = React.useState(<Text>Simular</Text>);
  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [dragBool, setDragBool] = React.useState(true);

  const handleDragCheck = (e:any) => {
    setDragBool(e.target.checked);
  }

  const isEmpty = (obj: Object) => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
  }

  const navigate = useNavigate();
  const {mutate: mutateGet, data: dataGet, error: errorGet, isError: isErrorGet, isSuccess: isSuccessGet} = useMutation(makeGet, {
    onSuccess: async (data, variables) => {
        const id = data["data"]["id"];
        const status = data["data"]["status"];

        if(status != 'SUCCESS'){
            await sleep(500);
            mutateGet({id});
        }
        else{
            setButtonText(<Text>Tarefa terminada</Text>);
            if (!isEmpty(data["data"]["result"])){
                const taskData = data["data"];
                setTaskData(taskData);
                navigate('/models/mov3d/results');
            } else {
                await sleep(500);
                mutateGet({id}); 
            }

        }
    },
    onError: (data, variables) => {
        console.log("error - get");
    }
  });

  const {mutate: mutatePost, data: dataPost, error: errorPost, isError: isErrorPost, isSuccess: isSuccessPost} = useMutation(makePost,
    {
        onSuccess: (data, variables) => {
            const id = data["data"]["id"];
            setButtonText(<HStack><Spinner/><Text>Aguardando execução...</Text></HStack>);
            mutateGet({id});
            setButtonDisable(true);
        },
        onError: (data, variables) => {
            console.log("error - post");
        }
    });

  const [showTooltip, setShowTooltip] = React.useState(false);
  const r = 0.2;
  const [rx, ry, rz] = [r, r, r];
  const [vx, vy, vz] = [10.0, 10.0, 10.0];
  const m = 0.5;
  

  const [vxValue, setVxValue] = React.useState(vx);
  const [vyValue, setVyValue] = React.useState(vy);
  const [vzValue, setVzValue] = React.useState(vz);

  const [rxValue, setRxValue] = React.useState(rx);
  const [ryValue, setRyValue] = React.useState(ry);
  const [rzValue, setRzValue] = React.useState(rz);
  
  const [mValue, setMValue] = React.useState(m);
  const [rValue, setRValue] = React.useState(r);

  const [postResult, setPostResult] = React.useState('');

  const myButton = () => {
    return(
        <Button
            mt={10}
            w={'full'}
            bg={'blue.400'}
            color={'white'}
            rounded={'xl'}
            onClick={handleButtonClick}
            _hover={{
                bg: 'blue.500',
            }}
            disabled={buttonDisable}
            _focus={{
                bg: 'blue.500',
            }}>
            {buttonText}
        </Button>
    )
  }
  
  const handleButtonClick = () => {
    setButtonText(<HStack><Spinner/><Text>Enviando pedido à API</Text></HStack>);
    const dt = 0.001;
    const r0 = [rxValue, ryValue, rzValue];
    const v0 = [vxValue, vyValue, vzValue];
    const mass = mValue;
    const radius = rValue;
    const drag = dragBool;
    console.log("sending to API");
    mutatePost({dt, r0, v0, mass, radius, drag});
  }

  const setPosByRadius = (val: number) => {
    setRValue(val); 
    if (rxValue < val) {
        setRxValue(val);
    }
    if (ryValue < val) {
        setRyValue(val);
    }
    if (rzValue < val) {
        setRzValue(val);
    }
  }

  return (
    <Center>
      <CardWithButton header="Controles" minWidth="1vw" customButton={myButton}>
      <List spacing={3}>
                <ListItem>
                    <List spacing={-2}>
                        <ListItem>
                            Massa (kg)
                        </ListItem>
                        <ListItem>
                            <SliderCustom onChangeUseState={setMValue} id="mass_slider" default={m} min={0.01} max={1.00} step={0.01} marks={true}/>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem pt={3}>
                    <List spacing={-2}>
                        <ListItem>
                            Raio (m)
                        </ListItem>
                        <ListItem>
                            <SliderCustom onChangeUseState={setPosByRadius} id="radius_slider" default={r} min={0.1} max={1.00} step={0.01} marks={true}/>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem pt={5}>
                    <Text pb={2}>
                        Velocidade inicial (m/s)
                    </Text>
                    <Flex direction="row" gap={4}>
                      <InputIncrement value={vxValue} onChangeUseState={(value: string) => setVxValue(parseFloat(value))} default={vx} size="sm" name="x" min={0} max={1000} step={0.1} />
                      <InputIncrement value={vyValue} onChangeUseState={(value: string) => setVyValue(parseFloat(value))} default={vy} size="sm" name="y" min={0} max={1000} step={0.1} />
                      <InputIncrement value={vzValue} onChangeUseState={(value: string) => setVzValue(parseFloat(value))} default={vz} size="sm" name="z" min={0} max={1000} step={0.1} />    
                    </Flex>
                </ListItem>
                <ListItem pt={2}>
                    <Text pb={2}>
                        Posição inicial (m)
                    </Text>
                    <Flex direction="row" gap={4}>
                      <InputIncrement value={rxValue} onChangeUseState={(value: string) => setRxValue(parseFloat(value))} default={rx} size="sm" name="x" min={rValue} max={1000} step={0.1} />
                      <InputIncrement value={ryValue} onChangeUseState={(value: string) => setRyValue(parseFloat(value))} default={ry} size="sm" name="y" min={rValue} max={1000} step={0.1} />
                      <InputIncrement value={rzValue} onChangeUseState={(value: string) => setRzValue(parseFloat(value))} default={rz} size="sm" name="z" min={rValue} max={1000} step={0.1} />
                    </Flex>
                </ListItem>
                <ListItem>
                    <Checkbox isChecked={dragBool} onChange={(e) => handleDragCheck(e)}>Considerar resistência do ar</Checkbox>
                </ListItem>
                </List>
      </CardWithButton>
    </Center>
  )
}