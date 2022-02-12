import Size from "./Size";
import _ from 'lodash';
import { blazeposearray, iterateSize, t_shirt_array } from "./pose-detection/utilities";
import { clothes } from "./pose-detection/utilities";
import { arm_span_arr, half_span_arr } from "./pose-detection/utilities";
import { string } from "mathjs";

// Returns a string

export default function comparingDistance(poses, height){
    
    let size_factor = 0;
    let real_size = [];
    let size_str = "First loading..."
    
    let results_arr = iterateSize(half_span_arr, poses); //using just 1 arm
    let tshirt_results_array = iterateSize(t_shirt_array, poses);
    console.log("tshirt2: "+tshirt_results_array.length)
    console.log("results3: "+results_arr.length)
    console.log("Comparing height:"+height)
// *********************************************************
// What if we do not use the filter of the whole pose?

//     const cv_distance = _.sum(results_arr)*2 + Size(poses, 11, 12);
//     size_factor = ((height)/cv_distance);
//     real_size= tshirt_results_array.map(x=>x*size_factor);


//     const comparing=(clothes, real_size)=>{
//         for (const property in clothes){
//             const w = clothes[property][0]-real_size[0];
//             const h = clothes[property][1]-real_size[1];

//             if(w<0 && h<0)
//                 continue;
//             const property_name = property;
//             return property_name
//         }
//     }

//     size_str = comparing(clothes, real_size);

//     if(typeof(size_str)==='string'){
//         return size_str
//     }else{
//         size_str = "Loading"
//     }

// ****************************************************************
    
    // por qué nunca se cumple results_arr.length ===3 && tshirt_results_array.length ==2???????
    // resuelto: por la condición de solo agregar al array si el punto es del tipo número.

    if(results_arr.length ===3 && tshirt_results_array.length===2){ 
        const cv_distance = _.sum(results_arr)*2 + Size(poses, 11, 12);
        // size_factor = ((height)/cv_distance);
        size_factor= 178/cv_distance

        real_size= iterateSize(t_shirt_array, poses).map(x=>x*size_factor)

        // console.log("height:" + height)
        console.log("cv_distance:" +cv_distance)

        console.log("Size factor:" + size_factor)

        console.log("Real size:"+ real_size);

        const comparing=(clothes, real_size)=>{
            for (const property in clothes){
                const w = clothes[property][0]-real_size[0];
                const h = clothes[property][1]-real_size[1];

                if(w<0 || h<0){
                    continue;
                }
                const property_name = property;
                return property_name
            }
        }

        size_str = comparing(clothes, real_size);

        if(typeof(size_str)==='string'){
            return size_str
        }
        // console.log(real_size)
    }else{
        size_str = "Loading"
    }

    // console.log(size_str)
    return size_str;

}