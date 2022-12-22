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
    InputGroup,
    Input,
    InputRightAddon,
    InputLeftAddon,
    SliderMark,
    List,
    ListItem,
    Slider,
    Tooltip,
    SliderThumb,
    SliderTrack,
    SliderFilledTrack,
    Link
} from '@chakra-ui/react';

import * as React from 'react';
import CardWithButton from '../../../components/CardWithButton'
import InputIncrement from '../../../components/InputIncrement';

import SliderCustom from '../../../components/Slider'

function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const backend_URL='https://flask-tasks.onrender.com'

const mov3d_URL=backend_URL.concat('/task/new')
const task_URL=backend_URL.concat('/task/')

function get_task_result(task_id: string){
    var api_endpoint = task_URL.concat(String(task_id), '/view')
    var body = {
        method: "GET", 
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return ( fetch(api_endpoint, body)
    .then((response) => response.json())
    .then((response) => response["result"]
    )
    .catch((error) => {
        console.error('Error:', error);
    }) );
}

function probe_task(task_id: string){
    var api_endpoint = task_URL.concat(String(task_id), '/view')
    var body = {
        method: "GET", 
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return ( fetch(api_endpoint, body)
    .then((response) => response.json())
    .then((response) => response["status"]
    )
    .catch((error) => {
        console.error('Error:', error);
    }) );
}

function send_api_request(data: any, api_endpoint: string){
    console.log("sent api request")
    var body = {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return ( fetch(api_endpoint, body)
    .then((response) => response.json())
    .then((response) => response["id"]
    )
    .catch((error) => {
        console.error('Error:', error);
    }) );
}

async function simulate_mov3d_api(data: any, text: any){
    //window.apistatus.innerHTML = "sending request";
    var task_id = await send_api_request(data, mov3d_URL);
    //window.apistatus.innerHTML = "received task id";
    console.log("task id: ", task_id)
    var task_status = "none";
    while (task_status != "SUCCESS"){
        task_status = await probe_task(task_id);
        //window.apistatus.innerHTML = "waiting for workers";
        await sleep(500);
    }
    var result = await get_task_result(task_id);

    //window.apistatus.innerHTML = "done"

    return result
}

function Start(mValue:any, rValue:any, vValues:any, rValues:any){
    console.log("clicou")
    console.log(mValue, rValue, vValues, rValues)
}

export default function Mov3dPage() {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const rx = 1.0;
  const ry = 1.0;
  const rz = 1.0;

  const vx = 10.0;
  const vy = 10.0;
  const vz = 10.0;

  const m = 0.5;
  const r = 0.2;

  const [vxValue, setVxValue] = React.useState(vx);
  const [vyValue, setVyValue] = React.useState(vy);
  const [vzValue, setVzValue] = React.useState(vz);

  const [rxValue, setRxValue] = React.useState(rx);
  const [ryValue, setRyValue] = React.useState(ry);
  const [rzValue, setRzValue] = React.useState(rz);
  
  const [mValue, setMValue] = React.useState(m);
  const [rValue, setRValue] = React.useState(r);

  return (
    <Center>
      <CardWithButton header="Controles" buttonText="Simular" minWidth="1vw" buttonOnClick={() => Start(mValue, rValue, [vxValue, vyValue, vzValue], [rxValue, ryValue, rzValue])}>
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
                            <SliderCustom onChangeUseState={setRValue} id="radius_slider" default={r} min={0.1} max={1.00} step={0.01} marks={true}/>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem pt={5}>
                    <Text pb={2}>
                        Velocidade inicial (m/s)
                    </Text>
                    <Flex direction="row" gap={4}>
                      <InputIncrement onChangeUseState={setVxValue} default={vx} size="sm" name="x" min={1} max={2} step={0.1} />
                      <InputIncrement onChangeUseState={setVyValue} default={vy} size="sm" name="y" min={1} max={2} step={0.1} />
                      <InputIncrement onChangeUseState={setVzValue} default={vz} size="sm" name="z" min={1} max={2} step={0.1} />    
                    </Flex>
                </ListItem>
                <ListItem pt={2}>
                    <Text pb={2}>
                        Posição inicial (m)
                    </Text>
                    <Flex direction="row" gap={4}>
                      <InputIncrement onChangeUseState={setRxValue} default={rx} size="sm" name="x" min={1} max={2} step={0.1} />
                      <InputIncrement onChangeUseState={setRyValue} default={ry} size="sm" name="y" min={1} max={2} step={0.1} />
                      <InputIncrement onChangeUseState={setRzValue} default={rz} size="sm" name="z" min={1} max={2} step={0.1} />
                    </Flex>
                </ListItem>
                </List>
      </CardWithButton>
    </Center>
  )
}