import { useMutation } from 'react-query';
import axios from 'axios';

interface Mov3dPostArgs {
  dt: number,
  r0: Array<number>,
  v0: Array<number>,
  mass: number,
  radius: number,
  drag: boolean
}

interface Mov3dGetArgs {
  id: string
}

const baseURL = 'https://flask-tasks.onrender.com';

// Define a mutation function to make the POST request
export async function makePost({dt, mass, radius, r0, v0, drag}: Mov3dPostArgs){
  const response = await axios.post(baseURL+'/task', {
    "type": "mov3d",
    "args": {
        dt,
        mass,
        radius,
        r0,
        v0,
        drag
      }
  });
  return response;
};

export async function makeGet({id}: Mov3dGetArgs){
  const response = await axios.get(baseURL+'/task/'+id);
  return response;
};

export default function MyComponent() {
  // Use the useMutation hook to wrap the mutation function
  const {data, error, mutate, isError, isSuccess, isPaused, isLoading, status, reset} = useMutation(makePost);
  // Handle the success or failure of the request
  if (isSuccess) {
    console.log('POST request successful');
    console.log(data);
    return <button>Success</button>;
    
  } else if (isError) {
    console.error(error);
    return <button>Error</button>;
  }


  // Call the mutation function when the user clicks a button
  const handleClick = () => {
    const dt = 0.001, mass = 0.1, radius = 0.3, r0 = [1,2,3], v0 = [3,2,1], drag = true;
    mutate({r0, dt, mass, radius, v0, drag});
  };

  return <button onClick={handleClick}>Make POST Request</button>;
}
