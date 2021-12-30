import Size from "./Size";
import _ from 'lodash';
import { blazeposearray, iterateSize, t_shirt_array } from "./pose-detection/utilities";
import { arm_span_arr, half_span_arr } from "./pose-detection/utilities";

export default function comparingDistance(poses, height){
    // let height = 178 //cm
    var size_factor = 0;
    var real_size = [];
    

    // var results_arr  = iterateSize(arm_span_arr, poses);

    var results_arr = iterateSize(half_span_arr, poses); //using just 1 arm
    // console.log(results_arr.length)
    // var blaze_results_arr = iterateSize(blazeposearray, poses);

    var tshirt_results_array = iterateSize(t_shirt_array, poses);

    // console.log(tshirt_results_array);
    // console.log(results_arr) //Max arr.length = 5; where are the other 2?????


    // if(results_arr.length===7){
    //     console.log(results_arr)
    // }

    // if(results_arr.length===5){  //ideally length = 7
    //     const cv_distance = _.sum(results_arr);
    //     // const cv_distance = Size(poses, "19", "20")          
    //     size_factor = (height/cv_distance);
    //     // console.log(cv_distance)

    //     if(tshirt_results_array.length===2){
    //         real_size = tshirt_results_array.map(x=>x*size_factor);
    //     }
    //     // console.log(typeof(real_size))
    //     // console.log(real_size) 
    // }
    
 

    // The results_arr.length should be able to be 7. Why is this not happening?
    // console.log(results_arr)

    if(results_arr.length ===3 && tshirt_results_array.length===2){ 
        const cv_distance = _.sum(results_arr)*2 + Size(poses, 11, 12);
        size_factor = ((height)/cv_distance);
        real_size= tshirt_results_array.map(x=>x*size_factor)

        console.log(real_size)
    }
    

    // const cv_distance = Size(poses, "19", "20");
    // size_factor = height/cv_distance;
    // console.log(typeof(cv_distance))
    // console.log(size_factor)

    // if(tshirt_results_array===2){
    //     real_size = tshirt_results_array.map(x=>x*size_factor);
    //     console.log(real_size)
    // }

    // console.log(cv_distance)

    return real_size
}