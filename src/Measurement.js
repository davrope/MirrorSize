
import Size from './Size';


export default function Measurement(poses) {

    let blazeposearray = [["11", "12"],["24", "23"],["12", "24"],["11", "23"],["14", "16"],["13", "15"]]

    let i = 0;
    let len = blazeposearray.length;
    let mysize = []

    for(; i<len; i++){
        var currentSize = Size(poses, blazeposearray[i][0], blazeposearray[i][0])
        mysize.push(currentSize);

        console.log(mysize)
    }

}