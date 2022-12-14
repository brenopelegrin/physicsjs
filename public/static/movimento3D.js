let g = [0.0,-9.81,0.0];

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

    let scalar_order2 = (0.5*air_density*drag_coef*dimension_2d*vector_times_vector(v,v));
    // order1 = -b*v*vhat but vhat*v = vnorm  
    let scalar_order1 = dimension_1d*air_viscosity*get_vector_norm(v);

    let drag = scalar_times_vector(-(scalar_order1+scalar_order2), vector_to_hat(v));

    return drag;
}

function gravity_force(m_body, vector_r){
    r_terra = 6371.1*1000 //m
    M_terra = 5.972e24 //kg
    G = 6.6743e-11 //gravitational constant
    r_y = vector_r[1]-r_terra
    force_y = (-G*M_terra*m_body)/(r_y*r_y)

    return [0.0, force_y, 0.0]
}

function Arrays_sum(array1, array2) 
{
  var result = [];
  var ctr = 0;
  var x=0;

  if (array1.length === 0) 
   return "array1 is empty";
  if (array2.length === 0) 
   return "array2 is empty";   

 while (ctr < array1.length && ctr < array2.length) 
  {
    result.push(array1[ctr] + array2[ctr]);
    ctr++;
  }

 if (ctr === array1.length) 
 {
    for (x = ctr; x < array2.length; x++)   {
      result.push(array2[x]);
    }
  } 
  else
  {
  for (x = ctr; x < array1.length; x++) 
    {
      result.push(array1[x]);
    }
  }
  return result;
}

function calc_energy(m, v, r){
    cinetica = []
    potencial = []
    potencialzero = r[0][1]
    for (arrayv of v){
        cinetica.push(0.5*m*get_vector_norm(arrayv)**2);
    }
    for (arrayr of r){
        potencial.push(m*get_vector_norm(g)*(arrayr[1]-potencialzero));
    }
    
    energy = Arrays_sum(cinetica, potencial);

    return [energy, cinetica, potencial];
}

function simulate(dt,m,radius,v,r,withdragcondition){
    let air_viscosity = 1.6E-5;
    let air_density = 1.164;
    let drag_coef = 0.5;
    let cross_area = Math.PI*radius**2;
    let time = [0.0];
    let Fg = scalar_times_vector(m, g);
    a = []

    let i = 0;
    while (r[i][1] >= radius){
        if (withdragcondition == "with drag"){
            Fdrag = drag_force(air_viscosity, air_density, drag_coef, 2*radius, cross_area, v[i]);
            Fnet = Arrays_sum(gravity_force(m, r[i]), Fdrag);
            a_new = scalar_times_vector(1/m, Fnet);

            a.push(a_new);
        }
        else {
            a_new = scalar_times_vector(1/m, Fg);
            a.push(a_new);
        }

        time.push(time[i]+dt)

        result = euler(dt, a[i], v[i], r[i]);
        v.push(result[0]);
        r.push(result[1]);
        i=i+1;
    };

    return [time,v,r];
}


function get_x_values(grandeza){
    let temp_array=[]
    
    for (let array of grandeza){
        temp_array.push(array[0])
    }
    
    return temp_array;
}

function get_y_values(grandeza){
    let temp_array=[]
    
    for (let array of grandeza){
        temp_array.push(array[1])
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
