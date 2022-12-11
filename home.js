const backend_URL='http://physicsjsapi.herokuapp.com'

var status_obj = {
    movimento3d:{
        gui: true,
        api: true
        //still needs to implement ping request to mov3d api
    },
    rocketlaunch:{
        gui: false,
        api: false
    }
};

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
    btn_movimento3d_api.onclick = function () {
        window.open("https://github.com/brenopelegrin/physicsjs/tree/master/api");
    };
}



