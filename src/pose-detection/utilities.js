import Size from '../Size';

import * as posedetection from '@tensorflow-models/pose-detection';

const COLOR = '#27d594';
const COLOR_LINE = 'gray'


// (keypoints, minConfidence, ctx, scale = 1


export function drawSkeleton(keypoints, ctx) {
    const adjacentKeyPoints =

        posedetection.util.getAdjacentPairs(posedetection.SupportedModels.BlazePose);

    adjacentKeyPoints.forEach(([
                                                                      i, j
                                                                    ]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = 0.65 || 0;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.strokeStyle = COLOR_LINE;
        ctx.stroke();
      }
    });



}
  

export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];
    
        if (keypoint.score < minConfidence) {
            continue;
        }

        const x = keypoint.x;
        const y = keypoint.y;

        drawPoint(ctx, y * scale, x * scale, 3, COLOR);
    }
}


export function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
  


export const blazeposearray = [["11", "12"],["24", "23"],["12", "24"],["11", "23"],["14", "16"],["13", "15"]]

export const t_shirt_array = [["11", "12"],["12", "24"] ]

export const arm_span_arr = [["12", "11"], ["14", "12"], ["14", "16"], ["16", "20"], ["11", "13"], ["13", "15"], ["15", "19"]]

export const half_span_arr = [["14", "12"], ["14", "16"], ["16", "20"]]


export function iterateSize(arr, poses) {

    let result_arr = []
    for(let i =0, len = arr.length; i<len; i++){
        
        let currentSize = Size(poses, arr[i][0], arr[i][1])


        try{
            result_arr.push(currentSize)
         } catch(e){
             console.log("This is an error")
         }



    } 

    return result_arr
}


export const clothes ={
    Small: [43, 70],
    Medium: [50, 76],
    Large: [56, 77],
    XLarge: [58, 80]
}


