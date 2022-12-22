import {
    NumberInput,
    NumberIncrementStepper,
    NumberInputStepper,
    Flex,
    Box,
    InputLeftAddon,
    Text,
    InputLeftElement,
    NumberInputField,
    InputGroup,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import * as React from 'react';

interface InputIncrementProps{
    max: number,
    min: number,
    step: number,
    name: string,
    default: number,
    size: string,
    onChangeUseState: any
}

export default function InputIncrement(props: InputIncrementProps){
    const [value, setValue] = React.useState(props.default)
    return(
        <InputGroup size={props.size}>
            <InputLeftAddon><Box>{props.name}</Box></InputLeftAddon>
            <NumberInput
                defaultValue={props.default}
                max={props.max}
                min={props.min}
                step={props.step}
                size={props.size}
                onChange={(value) => props.onChangeUseState(value)}
                keepWithinRange={false}
                clampValueOnBlur={false}
                allowMouseWheel
            >
                
                <NumberInputField/>
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                
            </NumberInput>
        </InputGroup>
    )
}