import {sqrt} from 'mathjs'

function Size(poses) {

    const substract = (first, second) =>
        first.reduce((acc, curr, i) => {
            const sub = curr - second[i];
            acc.push(sub);
            return acc;
        }, []);



    const keypoints = poses["0"]["keypoints"];
    // console.log(keypoints);

    const leftShoulder = [keypoints["11"]["y"],keypoints["11"]["x"] ]
    const rightShoulder = [keypoints["12"]["y"], keypoints["12"]["x"]]
    
    const substraction = substract(leftShoulder, rightShoulder)
    const myX = substraction[1];
    const myY = substraction[0]
    const shouldersDistance = sqrt(myX^2+myY^2);

    
    console.log(shouldersDistance);
}

export default Size;