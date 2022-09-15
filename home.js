let status_movimento3d_gui = true;

const btn_movimento3d_gui = document.getElementById("btn_movimento3d_gui");

if (status_movimento3d_gui){
    btn_movimento3d_gui.className="active";
    btn_movimento3d_gui.onclick = function () {
        window.open("./movimento3D.html");
    };
}



