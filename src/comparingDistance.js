import Size from "./Size";
import _ from 'lodash';
import { blazeposearray, iterateSize, t_shirt_array } from "./pose-detection/utilities";
import { clothes } from "./pose-detection/utilities";
import { arm_span_arr, half_span_arr } from "./pose-detection/utilities";


export default function comparingDistance(poses, height){
    
    var size_factor = 0;
    var real_size = [];
    
    var results_arr = iterateSize(half_span_arr, poses); //using just 1 arm
    var tshirt_results_array = iterateSize(t_shirt_array, poses);

    if(results_arr.length ==3 && tshirt_results_array.length==2){ 
        const cv_distance = _.sum(results_arr)*2 + Size(poses, 11, 12);
        size_factor = ((height)/cv_distance);
        real_size= tshirt_results_array.map(x=>x*size_factor)

        const comparing=()=>{

        }

        // console.log(real_size)
    }else{
        return("Loading...")
    }



    return (
        real_size
    )
}