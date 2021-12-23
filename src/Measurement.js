
import Size from './Size';
import realDistance from './RealDistance';


export default function Measurement(poses) {

    let blazeposearray = [["11", "12"],["24", "23"],["12", "24"],["11", "23"],["14", "16"],["13", "15"]]

    let i = 0;
    let len = blazeposearray.length;
    let mysize = []

    for(; i<len; i++){
        var currentSize = Size(poses, blazeposearray[i][0], blazeposearray[i][1])
        mysize.push(currentSize);

        // console.log(mysize)

    }

    const height = 178;

    // const poses_height = Size(poses, "20", "19")
    const poses_height = realDistance(poses)

    // console.log(poses_height);

}
