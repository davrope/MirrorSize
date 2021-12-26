import comparingDistance from "./comparingDistance";

export default function realDistance(poses){

    const factor = comparingDistance(poses)

    let blazeposearray = [["11", "12"],["24", "23"],["12", "24"],["11", "23"],["14", "16"],["13", "15"]]

    let i = 0;
    let len = blazeposearray.length;
    let myRealSize = []
    let factor = null

    try {
        factor = comparingDistance(poses)
    } catch (e) {
        console.error(e.message)
    }

    for(; i<len; i++){
        var currentSize = Size(poses, blazeposearray[i][0], blazeposearray[i][1])
        
        if (typeof(currentSize)==='number'){
            myRealSize.push(currentSize*factor);
            console.log(myRealSize)
        }
        // console.log(myRealSize)

    }
    

}