var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("demo1");
output1.innerHTML = slider1.value;
var vx = document.getElementById("vx");
var vy = document.getElementById("vy");
var vz = document.getElementById("vz");

var rx = document.getElementById("rx");
var ry = document.getElementById("ry");
var rz = document.getElementById("rz");
rx.value = slider1.value*0.01;
ry.value = slider1.value*0.01;
rz.value = slider1.value*0.01;

slider1.oninput = function() {
    output1.innerHTML = this.value;
    rx.value = this.value*0.01;
    ry.value = this.value*0.01;
    rz.value = this.value*0.01;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
    output2.innerHTML = this.value;
}

function iniciar(){
    massa = slider2.value*0.001;
    raio = slider1.value*0.01;
    ri = [[parseFloat(rx.value), parseFloat(ry.value), parseFloat(rz.value)]];
    //vi = [[parseFloat(vx.value), parseFloat(vy.value), parseFloat(vz.value)]];

    data1 = simulate(0.001, massa, raio, [[5.0,5.0,0.0]], [[parseFloat(rx.value),parseFloat(ry.value),parseFloat(rz.value)]], "without drag");

    r1_x = get_x_values(data1[2])
    r1_y = get_y_values(data1[2])
    r1_z = get_z_values(data1[2])

    v1_x = get_x_values(data1[1])
    v1_y = get_y_values(data1[1])
    v1_z = get_z_values(data1[1])
    t1 = data1[0]
    console.log(data1);

    data2 = simulate(0.001, massa, raio, [[5.0,5.0,0.0]], [[parseFloat(rx.value),parseFloat(ry.value),parseFloat(rz.value)]], "with drag");

    r2_x = get_x_values(data2[2])
    r2_y = get_y_values(data2[2])
    r2_z = get_z_values(data2[2])

    v2_x = get_x_values(data2[1])
    v2_y = get_y_values(data2[1])
    v2_z = get_z_values(data2[1])
    t2 = data2[0]
    console.log(data2);

    var config = {responsive: true};
    TESTER1 = document.getElementById('tester1');
    TESTER2 = document.getElementById('tester2');
    var trace_r1 = {
        name: 'sem resistência do ar',
        type: 'scatter3d',
        mode: 'lines',
        opacity: 1.0,
        x: r1_x,
        y: r1_y,
        z: r1_z, 
        line: {
            width: 6,
            reversescale: false,
        },
    };

    var trace_r2 = {
        name: 'com resistência do ar',
        type: 'scatter3d',
        mode: 'lines',
        opacity: 1.0,
        x: r2_x,
        y: r2_y,
        z: r2_z, 
        line: {
            width: 6,
            reversescale: false,
        },
    };

    var trace_v1_x = {
        name: 'vx sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: v1_x,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_v1_y = {
        name: 'vy sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: v1_y,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_v2_x = {
        name: 'vx com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: v2_x,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_v2_y = {
        name: 'vy com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: v2_y,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    traces_r = [trace_r1, trace_r2];
    traces_v = [trace_v1_x, trace_v1_y, trace_v2_x, trace_v2_y];

    var layout1 = {
        title: 'Gráfico da trajetória',
        scene: {
            xaxis: {
                title: 'trajetoria x'
            },
            yaxis: {
                title: 'trajetoria y'
            },
            zaxis: {
                title: 'trajetoria z'
            }
        },
    };

    var layout2 = {
        title: 'Gráfico da velocidade',
        scene: {
            xaxis: {
                title: 'tempo'
            },
            yaxis: {
                title: 'velocidade'
            },
        },
    };
    

    Plotly.newPlot(TESTER1, traces_r, layout1, config);
    Plotly.newPlot(TESTER2, traces_v, layout2, config);

    return 0;
}

document.getElementById("clickMe").onclick = iniciar;
