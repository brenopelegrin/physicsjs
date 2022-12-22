import {
    SliderMark,
    Slider,
    Tooltip,
    Box,
    SliderThumb,
    SliderTrack,
    SliderFilledTrack,
    Link
} from '@chakra-ui/react';

import {useState} from 'react';

interface SliderCustomProps{
    id: string,
    min: number,
    max: number,
    step: number,
    marks: boolean,
    default: number,
    onChangeUseState: any
}

function GetMarks(props: SliderCustomProps){
  var max=props.max
  var min=props.min
  if(props.marks){
  return(
    <>
    <SliderMark value={min} {...labelStyles}>
      {min}
    </SliderMark>
    <SliderMark value={min + 0.25*(max-min)} {...labelStyles}>
      {min + 0.25*(max-min)}
    </SliderMark>
    <SliderMark value={min + 0.50*(max-min)} {...labelStyles}>
      {min + 0.50*(max-min)}
    </SliderMark>
    <SliderMark value={min + 0.75*(max-min)} {...labelStyles}>
      {min + 0.75*(max-min)}
    </SliderMark>
    <SliderMark value={max} {...labelStyles}>
      {max}
    </SliderMark>
    </>
  )
  }
}

const labelStyles = {
  mt: '2',
  ml: '-1',
  fontSize: 'xs',
  color: 'black.400'
}

export default function SliderCustom(props: SliderCustomProps) {
  const [sliderValue, setSliderValue] = useState(props.default)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Box pt={2.5} pb={0}>
      <Slider 
        aria-label='slider-ex-6'
        id={props.id}
        min={props.min}
        max={props.max}
        step={props.step}
        colorScheme='cyan'
        onChange={(v) => setSliderValue(v)}
        onChangeEnd={(val) => props.onChangeUseState(val)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        >
        {GetMarks(props)}
        <SliderTrack>
        <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={sliderValue}
        >
        <SliderThumb />
      </Tooltip>
      </Slider>
    </Box>
  )
}