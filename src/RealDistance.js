import Size from "./Size";

export default function realDistance(poses){
    let height = 178 //cm
    let arm_span_arr = [["12", "11"], ["14", "12"], ["14", "16"], ["16", "20"], ["11", "13"], ["13", "15"], ["15", "19"]]

    
    let i = 0;
    let arm_span_len = arm_span_arr.length;
    let results_arr = []

    for (; i<arm_span_len; i++){
        var currentSize = Size(poses, arm_span_arr[i][0], arm_span_arr[i][1])

        results_arr.push(currentSize);
        console.log(typeof(results_arr))
    }

    const accumulate = arr =>arr.map((sum=>value=>sum+=value)(0));

    const real_height = accumulate(results_arr);

    // console.log(real_height);

}