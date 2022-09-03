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

    data1 = simulate(0.001, massa, raio, [[parseFloat(vx.value), parseFloat(vy.value), parseFloat(vz.value)]], [[parseFloat(rx.value),parseFloat(ry.value),parseFloat(rz.value)]], "without drag");

    r1_x = get_x_values(data1[2])
    r1_y = get_y_values(data1[2])
    r1_z = get_z_values(data1[2])

    v1_x = get_x_values(data1[1])
    v1_y = get_y_values(data1[1])
    v1_z = get_z_values(data1[1])
    t1 = data1[0]

    data2 = simulate(0.001, massa, raio, [[parseFloat(vx.value), parseFloat(vy.value), parseFloat(vz.value)]], [[parseFloat(rx.value),parseFloat(ry.value),parseFloat(rz.value)]], "with drag");

    r2_x = get_x_values(data2[2])
    r2_y = get_y_values(data2[2])
    r2_z = get_z_values(data2[2])

    v2_x = get_x_values(data2[1])
    v2_y = get_y_values(data2[1])
    v2_z = get_z_values(data2[1])
    t2 = data2[0]

    var config = {responsive: true};
    div_trajetoria = document.getElementById('g_trajetoria');
    div_velocidade = document.getElementById('g_velocidade');

    div_vx = document.getElementById('g_vx');
    div_vy = document.getElementById('g_vy');
    div_vz = document.getElementById('g_vz');

    div_rx = document.getElementById('g_rx');
    div_ry = document.getElementById('g_ry');
    div_rz = document.getElementById('g_rz');

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

    var trace_r1_x = {
        name: 'rx sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: r1_x,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_r1_y = {
        name: 'ry sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: r1_y,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_r1_z = {
        name: 'rz sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: r1_z,
        line: {
            width: 4,
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

    var trace_r2_x = {
        name: 'rx com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: r2_x,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_r2_y = {
        name: 'ry com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: r2_y,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    var trace_r2_z = {
        name: 'rz com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: r2_z,
        line: {
            width: 4,
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

    var trace_v1_z = {
        name: 'vz sem resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t1,
        y: v1_z,
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

    var trace_v2_z = {
        name: 'vz com resistência do ar',
        type: 'scatter',
        mode: 'lines',
        opacity: 1.0,
        x: t2,
        y: v2_z,
        line: {
            width: 4,
            reversescale: false,
        },
    };

    traces_trajetoria = [trace_r1, trace_r2];
    traces_v = [trace_v1_x, trace_v1_y, trace_v1_z, trace_v2_x, trace_v2_y, trace_v2_z];

    traces_rx = [trace_r1_x, trace_r2_x];
    traces_ry = [trace_r1_y, trace_r2_y];
    traces_rz = [trace_r1_z, trace_r2_z];

    traces_vx = [trace_v1_x, trace_v2_x];
    traces_vy = [trace_v1_y, trace_v2_y];
    traces_vz = [trace_v1_z, trace_v2_z];

    var layout_vx_t = {
        title: 'Gráfico de vx (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'vx (m/s)'
        },
    };

    var layout_vy_t = {
        title: 'Gráfico de vy (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'vy (m/s)'
        },
    };

    var layout_vz_t = {
        title: 'Gráfico de vz (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'vz (m/s)'
        },
    };

    var layout_rx_t = {
        title: 'Gráfico de rx (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'rx (m)'
        },
    };

    var layout_ry_t = {
        title: 'Gráfico de ry (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'ry (m)'
        },
    };

    var layout_rz_t = {
        title: 'Gráfico de rz (t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'rz (m)'
        },
    };

    var layout_trajetoria = {
        title: 'Gráfico da trajetória r(x,y,z)',
        scene: {
            xaxis: {
                title: 'x (m)'
            },
            yaxis: {
                title: 'y (m)'
            },
            zaxis: {
                title: 'z (m)'
            }
        },
    };

    var layout_velocidade = {
        title: 'Gráfico das velocidades em função do tempo, v(t)',
        xaxis: {
            title: 'tempo (s)'
        },
        yaxis: {
            title: 'v (m/s)'
        },
    };
    

    Plotly.newPlot(div_trajetoria, traces_trajetoria, layout_trajetoria, config);
    Plotly.newPlot(div_rx, traces_rx, layout_rx_t, config);
    Plotly.newPlot(div_ry, traces_ry, layout_ry_t, config);
    Plotly.newPlot(div_rz, traces_rz, layout_rz_t, config);

    Plotly.newPlot(div_velocidade, traces_v, layout_velocidade, config);
    Plotly.newPlot(div_vx, traces_vx, layout_vx_t, config);
    Plotly.newPlot(div_vy, traces_vy, layout_vy_t, config);
    Plotly.newPlot(div_vz, traces_vz, layout_vz_t, config);

    return 0;
}

document.getElementById("clickMe").onclick = iniciar;
