import Size from "./Size";
import _ from 'lodash';
import {iterateSize, t_shirt_array } from "./pose-detection/utilities";
import { clothes } from "./pose-detection/utilities";
import {half_span_arr } from "./pose-detection/utilities";


// Returns a string

export default function comparingDistance(poses, height){
    
    let size_factor = 0;
    let real_size = [];
    let size_str = "First loading..."
    
    let results_arr = iterateSize(half_span_arr, poses); //using just 1 arm
    let tshirt_results_array = iterateSize(t_shirt_array, poses);



    if(results_arr.length ===3 && tshirt_results_array.length===2){ 
        const cv_distance = _.sum(results_arr)*2 + Size(poses, 11, 12);
        size_factor = ((height)/cv_distance);

        real_size= iterateSize(t_shirt_array, poses).map(x=>x*size_factor)


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

        if(size_str !== undefined){
            return size_str
        }else{
            size_str = "Sorry we don't have it in your size :("
            
        }

    }

    return size_str;

}