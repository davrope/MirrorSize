
import Size from './Size';
import comparingDistance from './comparingDistance';
import { blazeposearray, iterateSize } from './pose-detection/utilities';


export default function Measurement(poses) {

    // let blazeposearray = [["11", "12"],["24", "23"],["12", "24"],["11", "23"],["14", "16"],["13", "15"]]

    // let i = 0;
    // let len = blazeposearray.length;
    // let mysize = []

    let mysize = iterateSize(blazeposearray, poses);

    // console.log(mysize)

    // for(; i<len; i++){
    //     var currentSize = Size(poses, blazeposearray[i][0], blazeposearray[i][1])
    //     mysize.push(currentSize);

    //     // console.log(mysize)

    // }

    const height = 178;

    // const poses_height = Size(poses, "20", "19")
    const poses_height = comparingDistance(poses)

    // console.log(typeof(poses_height));

}
