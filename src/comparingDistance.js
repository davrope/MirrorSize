import Size from "./Size";
import _ from 'lodash';

export default function comparingDistance(poses){
    let height = 178 //cm
    let arm_span_arr = [["12", "11"], ["14", "12"], ["14", "16"], ["16", "20"], ["11", "13"], ["13", "15"], ["15", "19"]]

    
    let i = 0;
    let arm_span_len = arm_span_arr.length;
    let results_arr = []
    var real_distance_factor = 0;

    for (; i<arm_span_len; i++){
        var currentSize = Size(poses, arm_span_arr[i][0], arm_span_arr[i][1])

        if (typeof(currentSize)==='number'){
            results_arr.push(currentSize);
        }
        
        // accumulate = arr =>arr.map((sum=>value=>sum+=value)(0));
        // console.log(results_arr)
    }
    const cv_distance = _.sum(results_arr);

    if(results_arr.length==5){  
        // console.log(cv_distance);

          
        real_distance_factor = (height/cv_distance);
        
    }

    return real_distance_factor;
    

    

    // const real_height = accumulated
    // return real_height;
    // // console.log(real_height);

}