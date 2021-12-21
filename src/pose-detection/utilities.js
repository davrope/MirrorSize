import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs-core';

const COLOR = 'aqua';
const LINE_WIDTH = 2;



export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints =
        posenet.getAdjacentKeyPoints(keypoints, minConfidence);
  
    // function toTuple({y, x}) {
    //   return [y, x];
      
    // }
  
    adjacentKeyPoints.forEach((keypoints) => {
      drawSegment(
          keypoints[0]["x"], keypoints[0]["y"], keypoints[1]["x"], keypoints[1]["y"], COLOR,
          scale =1, ctx);
    });


    // adjacentKeyPoints.forEach((keypoints) => {
        
    //     drawSegment(
    //         keypoints[0].position,keypoints[1].position, COLOR,
    //         scale =1, ctx);
    //   });
  

    //console.log(typeof(keypoints[0]["y"]))
}
  
  /**
   * Draw pose keypoints onto a canvas
   */
export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];
    
        if (keypoint.score < minConfidence) {
            continue;
        }
    
        //const {y, x} = keypoint;

        const x = keypoint.x;
        const y = keypoint.y;

        // Agregado reciéntemente:
        // const {y, x}  = keypoint.position

        drawPoint(ctx, y * scale, x * scale, 3, COLOR);
    }
}


export function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
  
  /**
   * Draws a line on a canvas, i.e. a joint
   */
// export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
//     ctx.beginPath();
//     ctx.moveTo(ax * scale, ay * scale);
//     ctx.lineTo(bx * scale, by * scale);
//     ctx.lineWidth = LINE_WIDTH;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// }

export function drawSegment(ax, ay, bx, by, color, scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = color;
    ctx.stroke();
}


