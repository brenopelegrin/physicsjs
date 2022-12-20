import { useState } from 'react'

interface TestProps{
    id: string;
};

function Test(props: TestProps) {
    return <h3>test {props.id}</h3>
}

export default Test
