var nj = require('numjs');

let g = [0.0,-9.81,0.0];
//let r = [[0.0,0.0,0.0]];
//let v = [[5.0,5.0,0.0]];
//let dt = 0.001;
//let m = 1.0;

//linear algebra functions
function scalar_times_vector(scalar, matrix){
    let result = matrix.map(x => x * scalar);
    return result;
}

function vector_plus_vector(matrix1, matrix2){
    let x = matrix1[0] + matrix2[0];
    let y = matrix1[1] + matrix2[1];
    let z = matrix1[2] + matrix2[2];
    
    let result = [x,y,z];
    return result;
}

function get_vector_norm(matrix1){
    let x = matrix1[0];
    let y = matrix1[1];
    let z = matrix1[2];
    let norm = Math.sqrt( (x**2) + (y**2) + (z**2) );
    return norm;
}

function vector_times_vector(matrix1, matrix2){
    let x = matrix1[0] * matrix2[0];
    let y = matrix1[1] * matrix2[1];
    let z = matrix1[2] * matrix2[2];
    
    let result = x+y+z
    return result;
}

function vector_to_hat(matrix1){
    norm = get_vector_norm(matrix1);
    result = scalar_times_vector(1/norm, matrix1);
    return result;
}

//physics functions
function euler(dt,a,v,r){
    let vn = vector_plus_vector(v, scalar_times_vector(dt, a));
    let rn = vector_plus_vector(r, scalar_times_vector(dt, v));
    return [vn, rn];
}

function drag_force(air_viscosity, air_density, drag_coef, dimension_1d, dimension_2d, v){
    // drag = -(bv + cv^2)vhat

    let scalar_order2 = (0.5*air_viscosity*air_density*drag_coef*dimension_2d*vector_times_vector(v,v));
    // order1 = -b*v*vhat but vhat*v = vnorm  
    let scalar_order1 = dimension_1d*air_viscosity*get_vector_norm(v);

    let drag = scalar_times_vector(-(scalar_order1+scalar_order2), vector_to_hat(v));

    return drag;
}

function simulate(dt,m,v,r,withdragcondition){
    let air_viscosity = 1.6E-5;
    let air_density = 1.164;
    let drag_coef = 0.5;
    let radius = 0.1; //meters
    let cross_area = Math.PI*radius**2;
    let time = [0.0];
    let Fg = scalar_times_vector(m, g);
    a = []

    let i = 0;
    while (r[i][1] >= 0){
        if (withdragcondition == "with drag"){
            Fdrag = drag_force(air_viscosity, air_density, drag_coef, 2*radius, cross_area, v[i]);
            Fnet = vector_plus_vector(Fg, Fdrag);
            a_new = scalar_times_vector(1/m, Fnet);

            a.push(a_new);
        }
        else {
            a.push(Fg);
        }

        time.push(time[i]+dt)

        result = euler(dt, a[i], v[i], r[i]);
        v.push(result[0]);
        r.push(result[1]);
        i=i+1;
    };

    return [time,v,r];
}

function get_y_values(grandeza){
    let temp_array=[]
    
    for (let array of grandeza){
        temp_array.push(array[1])
    }
    
    return temp_array;
}

function get_x_values(grandeza){
    let temp_array=[]
    
    for (let array of grandeza){
        temp_array.push(array[0])
    }
    
    return temp_array;
}

function get_z_values(grandeza){
    let temp_array=[]
    
    for (let array of grandeza){
        temp_array.push(array[2])
    }
    
    return temp_array;
}