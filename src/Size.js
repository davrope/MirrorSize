import {sqrt} from 'mathjs'

export default function Size(poses, pointIndex, adjacentPointIndex) {

    const substract = (first, second) =>
        first.reduce((acc, curr, i) => {
            const sub = curr - second[i];
            acc.push(sub);
            return acc;
        }, []);



    const keypoints = poses["0"]["keypoints"];


    const point = [keypoints[pointIndex]["y"],keypoints[pointIndex]["x"] ]
    

    const adjacentPoint = [keypoints[adjacentPointIndex]["y"], keypoints[adjacentPointIndex]["x"]]


    // Score avg:
    // const score = keypoints[pointIndex]["score"]
    // const adjacentScore = keypoints[adjacentPointIndex]["score"]
    // const score_avg = (score+adjacentScore)/2
    // console.log(score_avg)
    
    const substraction = substract(point, adjacentPoint)
    
    const myX = substraction[1];
    const myY = substraction[0]
    const elementDistance = sqrt(myX^2+myY^2);



    if(typeof(elementDistance) === 'number'){
        return elementDistance
    }

}









