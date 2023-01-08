
export function setTaskData(data: any){
    localStorage.setItem("taskData", JSON.stringify(data));
}

import PlotlyPlot from 'react-plotly.js';
import { Wrap, WrapItem, Stack, Text, Button, theme, Flex, useColorMode, Alert, AlertIcon } from '@chakra-ui/react'
import { Box as ChakraBox } from '@chakra-ui/react'

import { useMediaQuery, Container } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

function getTextColor(colorMode:string){
    if(colorMode === 'dark'){
        return theme.colors.white;
    }
    else {
        return theme.colors.black;
    }
}

function Box(props:any){
    return(
        <ChakraBox>
            {props.children}
        </ChakraBox>
    )
}

function Plot(props:any){
    var layout = props.layout;

    layout["height"] = "400";
    layout["width"] = "400";

    return(
        <PlotlyPlot {...props} layout={layout}>
            {props.children}
        </PlotlyPlot>
    )
}

export default function ResultsPage(){
    const myData = String(localStorage.getItem("taskData"));
    const result = JSON.parse(myData)["result"];
    const { colorMode, toggleColorMode } = useColorMode();
    const arrayColumn = (arr: any, n: any) => arr.map( (x:any) => x[n]);
    const defaultLayout = (title2: string) => {return( {
        plot_bgcolor: theme.colors.whiteAlpha[100],
        paper_bgcolor: theme.colors.whiteAlpha[50],
        showlegend: true,
	    legend: {orientation: "h"},
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 70,
            pad: 2
        },
        title: {
            text: title2,
            font: {
                size: 18,
            },
        },
        font: {
            color: getTextColor(colorMode),
        }
    })};

    const downloadFile = ({ data, fileName, fileType }: any) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
      }
      
      const exportToJson = (e: any) => {
        e.preventDefault()
        downloadFile({
          data: JSON.stringify(result),
          fileName: 'simulation.json',
          fileType: 'text/json',
        })
      }

      const navigate = useNavigate();

      function handleClickNewSim() {
        navigate("/models/mov3d");
      }

    return(
        <Stack justify='center' align='center' spacing={4}>
            <Box >
            <Alert status='success'>
                <AlertIcon />
                Simulation performed successfully!
            </Alert>
            </Box>
            <Stack spacing={4} direction="row" justify='center' align='center'>
                <Button onClick={exportToJson}>
                    Download JSON
                </Button>
                <Button onClick={handleClickNewSim}>
                    Perform another simulation
                </Button>
            </Stack>
        <Stack justify='space-around' gridGap={4} align='center' wrap="wrap" flexDirection="row">
            <WrapItem>
                <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 0),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.red[400]},
                },
                ]}
                layout={ defaultLayout("vx (t)") }
            />
            </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 1),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.green[400]},
                },
                ]}
                layout={ defaultLayout("vy (t)") }
            />
            </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 2),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("vz (t)") }
            />
            </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 0),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'vx',
                    marker: {color: theme.colors.red[400]},
                },
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 1),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'vy',
                    marker: {color: theme.colors.green[400]},
                },
                {
                    x: result["t"],
                    y: arrayColumn(result["v"], 2),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'vz',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("vx, vy, vz (t)") }
            />
            </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
            <Plot
            data={[
            {
                x: arrayColumn(result["v"], 0),
                y: arrayColumn(result["v"], 1),
                z: arrayColumn(result["v"], 2),
                type: 'scatter3d',
                mode: 'lines',
                marker: {color: theme.colors.red[400]},
            },
            ]}
            layout={ defaultLayout("v (x,y,z)") }
            />
            </Box>
        </WrapItem> 
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["r"], 0),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.red[400]},
                },
                ]}
                layout={ defaultLayout("rx (t)") }
            />
            </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["r"], 1),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.green[400]},
                },
                ]}
                layout={ defaultLayout("ry (t)") }
                />
                </Box>
            </WrapItem>
            <WrapItem>
            <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: arrayColumn(result["r"], 2),
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("rz (t)") }
            />
            </Box>
            </WrapItem>

        <WrapItem>
        <Box shadow="md">
            <Plot
            data={[
            {
                x: arrayColumn(result["r"], 0),
                y: arrayColumn(result["r"], 1),
                z: arrayColumn(result["r"], 2),
                type: 'scatter3d',
                mode: 'lines',
                marker: {color: theme.colors.red[400]},
            },
            ]}
            layout={ defaultLayout("r (x,y,z)") }
            />
            </Box>
        </WrapItem>
        <WrapItem>
        <Box shadow="md">
                <Plot
                data={[
                {
                    x: result["t"],
                    y: result["me"],
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.red[400]},
                },
                ]}
                layout={ defaultLayout("ME (t)") }
            />
            </Box>
        </WrapItem>
        <WrapItem>
                <Plot
                data={[
                {
                    x: result["t"],
                    y: result["pe"],
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.green[400]},
                },
                ]}
                layout={ defaultLayout("PE (t)") }
            />
        </WrapItem>
        <WrapItem>
                <Plot
                data={[
                {
                    x: result["t"],
                    y: result["ke"],
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("KE (t)") }
            />
        </WrapItem>
        <WrapItem>
                <Plot
                data={[
                {
                    x: result["t"],
                    y: result["me"],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'me',
                    marker: {color: theme.colors.red[400]},
                },
                {
                    x: result["t"],
                    y: result["pe"],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'pe',
                    marker: {color: theme.colors.green[400]},
                },
                {
                    x: result["t"],
                    y: result["ke"],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'ke',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("ME, PE, KE (t)") }
            />
            </WrapItem>
            <WrapItem>
                <Plot
                data={[
                {
                    x: result["t"],
                    y: result["pe"],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'pe',
                    marker: {color: theme.colors.green[400]},
                },
                {
                    x: result["t"],
                    y: result["ke"],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'ke',
                    marker: {color: theme.colors.blue[400]},
                },
                ]}
                layout={ defaultLayout("PE, KE (t)") }
            />
            </WrapItem>
            </Stack>
      </Stack>
    )
}