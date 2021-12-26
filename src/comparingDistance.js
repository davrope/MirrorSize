import Size from "./Size";
import _ from 'lodash';
import { blazeposearray, iterateSize } from "./pose-detection/utilities";
import { arm_span_arr } from "./pose-detection/utilities";

export default function comparingDistance(poses){
    let height = 178 //cm
    var size_factor = 0;
    var real_size = [];

    var results_arr  = iterateSize(arm_span_arr, poses);
    var blaze_results_arr = iterateSize(blazeposearray, poses);

    if(results_arr.length==5){  //ideally length = 7
        const cv_distance = _.sum(iterateSize(arm_span_arr, poses));          
        size_factor = (height/cv_distance);

        if(blaze_results_arr.length==5){
            real_size = blaze_results_arr.map(x=>x*size_factor);
        }
        // console.log(typeof(real_size))
        console.log(real_size) 
    }

    return real_size
}