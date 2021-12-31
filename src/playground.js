// const clothes = {
//     small: [43, 70],
//    medium: [50, 76],
//    large: [56, 77],
//    xlarge: [58, 80]
// }

// const real_size = [51, 76]


// const comparing=(clothes, real_size)=>{
//  var i = 0;
 
//  for (const property in clothes) {
   
//    const w = clothes[property][0]-real_size[0];
//    const h = clothes[property][1]-real_size[1];
   
//    if(w>0 && h>=0){
//      break;
//    }
//    i++;
//    //console.log(i)
//  }
 
//  return i
// }

// comparing(clothes, real_size);

// var mysize

// switch(comparing(clothes, real_size)){
//  case 1:
//    mysize = "Your size is small";
//  case 2: 
//    mysize ="Your size is m";
//  case 3:
//    mysize ="your Size is l";
//  case 4:
//    mysize = "your size is xl";}


// // Cuando se itera con el for const property in clothes se imprimen los resultados hasta que sucede el break.
// // De qué manera puedo usar el último resultado antes del break?:


// const clothes = {
//     small: [43, 70],
//    medium: [50, 76],
//    large: [56, 77],
//    xlarge: [58, 80]
// }

// const real_size = [47, 66]


// const comparing=(clothes, real_size)=>{
//  //var i = 0;
 
//  for (const property in clothes) {
//    const property_name = property;
   
//    const w = clothes[property][0]-real_size[0];
//    const h = clothes[property][1]-real_size[1];
   
//    if(w<0 && h<0)
//      continue;
   
   
//   //  if(w>0 && h>=0){
//   //    break;
//   //  }
//    //i++;
//    //console.log(i)
//    console.log(property)

//    return property_name
//  }
 
 
// }

// comparing(clothes, real_size);