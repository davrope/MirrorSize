import Size from "./Size";
import _ from 'lodash';
import { blazeposearray, iterateSize } from "./pose-detection/utilities";
import { arm_span_arr } from "./pose-detection/utilities";

export default function comparingDistance(poses){
    let height = 178 //cm
    // let arm_span_arr = [["12", "11"], ["14", "12"], ["14", "16"], ["16", "20"], ["11", "13"], ["13", "15"], ["15", "19"]]

    
    // let i = 0;
    // let arm_span_len = arm_span_arr.length;
    // let results_arr = []
    var size_factor = 0;

    // for (; i<arm_span_len; i++){
    //     var currentSize = Size(poses, arm_span_arr[i][0], arm_span_arr[i][1])

    //     if (typeof(currentSize)==='number'){
    //         results_arr.push(currentSize);
    //     }
        
    // }

    var real_size = [];



    var results_arr  = iterateSize(arm_span_arr, poses);

    if(results_arr.length==5){  
        // console.log(cv_distance);
        
        const cv_distance = _.sum(iterateSize(arm_span_arr, poses));

        // console.log(cv_distance)
        // console.log("5 keypoints Found ")
          
        size_factor = (height/cv_distance);

        // real_size = iterateSize(blazeposearray, poses)*size_factor

        real_size = results_arr.map(x=>x*size_factor);

        // console.log(typeof(real_size))

        console.log(real_size)

        
        
    }

    // return real_distance_factor;
    

    

    // const real_height = accumulated
    // return real_height;
    // // console.log(real_height);

}