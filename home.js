//let status_movimento3d_gui = true;
const status_obj = {
    movimento3d:{
        gui: true,
        api: false
    },
    rocketlaunch:{
        gui: false,
        api: false
    }
};


const data = {
    "mass": 1.0,
    "drag": true,
    "dt": 0.001,
    "radius": 0.2,
    "r0": [0,0,0],
    "v0": [10,10,0]
};

fetch('https://physicsjsapi.herokuapp.com/simulate/mov3d', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


const btn_movimento3d_gui = document.getElementById("btn_movimento3d_gui");
const btn_movimento3d_api = document.getElementById("btn_movimento3d_api");

if (status_obj.movimento3d.gui){
    btn_movimento3d_gui.className="active";
    btn_movimento3d_gui.onclick = function () {
        window.open("./movimento3D.html");
    };
}

if (status_obj.movimento3d.api){
    btn_movimento3d_api.className="active";
}



