import {
    NumberInput,
    NumberIncrementStepper,
    NumberInputStepper,
    Flex,
    Box,
    InputLeftAddon,
    Text,
    InputLeftElement,
    Wrap,
    WrapItem,
    FormControl,
    NumberInputField,
    FormHelperText,
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
    value: any
    onChangeUseState: any
}

export default function InputIncrement(props: InputIncrementProps){
    const isError = props.value < props.min || props.value > props.max ? true : false;

    const handleChange = (value: any) => {
        console.log(value);
        props.onChangeUseState(value);
    }

    return(
        <FormControl isInvalid={isError}>
        <InputGroup size={props.size}>
            <InputLeftAddon><Box>{props.name}</Box></InputLeftAddon>
            <NumberInput
                defaultValue={props.default}
                max={props.max}
                min={props.min}
                value={props.value}
                step={props.step}
                size={props.size}   
                onChange={(value) => props.onChangeUseState(value)}
                keepWithinRange={true}
                clampValueOnBlur={true}
                allowMouseWheel
            >

                <NumberInputField/>
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                
            </NumberInput>
            {isError ? (
                 <FormHelperText color="red.400">
                    O valor deve estar entre {props.min} e {props.max}
                 </FormHelperText>             
            ) : null}

        </InputGroup>
        </FormControl>
    )
}