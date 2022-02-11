import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import comparingDistance from "../comparingDistance";


import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

import { drawKeypoints, drawSkeleton } from "./utilities";

const videoConstraints = {
    width: 640,
    height:480,
    facingMode: "user"
};

const WebcamCapture = ()=>{
    const [photo, setPhoto] = useState('');
    const [height, setHeight] = useState(0);
    const [size, setSize] = useState();
    const [myImage, setMyImage] = useState();

    const canvasRef = useRef(null);

    console.log("Height:" + height);

    // const myDetector= async ()=>{
    //     const model = poseDetection.SupportedModels.BlazePose;
    //     const detectorConfig = {
    //     runtime: 'tfjs',
    //     enableSmoothing: true,
    //     modelType: 'full'
    //     };
        
    //     const detector = await poseDetection.createDetector(model, detectorConfig);
        
    //     setInterval(() => {
    //         detect(detector);
    //       }, 100);
    // }

    useEffect(
        ()=>{
            myDetector(myImage);
        },[photo]
    )

    const myDetector = async(image)=>{
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig={
            runtime: 'tfjs',
            enableSmoothing: true,
            modelType: 'full'
        };

        const detector = await poseDetection.createDetector(model, detectorConfig);

        // setInterval(()=>{
        //     detect(detector);
        // }, 100);
        detect(detector, image);
        // console.log("My detector is being called!")
        // console.log(image)

    }

    // const image = new Image();
    // image.src = photo
    // myDetector();


    

    
    const detect = async(detector, image)=>{

        if(typeof (photo) !==""){

            const estimationConfig = {flipHorizontal:true}
            const timestamp = performance.now();

            // console.log(image);
            console.log(typeof(image))

            // console.log(webcamRef.current)
            const poses = await detector.estimatePoses(image, estimationConfig, timestamp)
            console.log(poses)
            
            
            
            try{
                console.log("Height inside detect:"+height)
                const distance = comparingDistance(poses, height);
                drawCanvas(poses, image, videoConstraints.width, videoConstraints.height, canvasRef);
                if(distance == 'Small'|'Medium'|'Large'|'Xlarge'){
                    setSize(distance);
                }
            }catch(e){
                console.log(e.message)
            }
        }

        
    }

    // const detect = async(detector)=>{
    //     if(
    //         typeof webcamRef.current !== "undefined" &&
    //         webcamRef.current !== null
    //     ){
    //         const estimationConfig = {flipHorizontal:true}
    //         const timestamp = performance.now();
    //         const poses = await detector.estimatePoses(photo, estimationConfig, timestamp)
    //         console.log(poses);
    //         try{
    //             const distance = comparingDistance(poses, height);
    //             if(distance == 'Small'|'Medium'|'Large'|'Xlarge'){
    //                 setSize(distance);
    //             }
    //         }catch(e){
    //             console.log(e.message)
    //         }
    //     }
    // }

    const webcamRef = React.useRef(null)
    const capture = React.useCallback(
        ()=>{
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log("Photo taken!")
            setPhoto(imageSrc);
            
            
            // const imageHTML = document.getElementById({photo}).src = {photo}
            
            // console.log(imageSrc)

            const image = document.createElement("img");
            image.src = imageSrc
            image.width = 640
            image.height = 480
            // myDetector(image)

            setMyImage(image);  
    
        },
        [webcamRef]
    );


    const drawCanvas = (poses, img, imgWidth, imgHeight, canvas)=>{
        const ctx =  canvas.current.getContext("2d");
        canvas.current.width = imgWidth;
        canvas.current.height = imgHeight;

        drawKeypoints(poses["0"]["keypoints"], 0.6, ctx);
        drawSkeleton(poses["0"]["keypoints"], ctx);



    }


    return(
        <div>
            <div className="webcam-container">
                <div className="webcam-img">

                    {photo == ''? <Webcam
                        audio = {false}
                        height= {480}
                        ref = {webcamRef}
                        screenshotFormat= "image/jpeg"
                        width={640}
                        videoConstraints= {videoConstraints}
                        />: <img src = {photo} id ={photo} />
                    }
                    <canvas
                        ref = {canvasRef}
                        style = {{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right:0,
                        textAlign: 'center',
                        zindex: 9,
                        width: 640,
                        height:480
                        }}
                    />
                </div>

                {/* <canvas
                    ref = {canvasRef}
                    style = {{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right:0,
                    textAlign: 'center',
                    zindex: 9,
                    width: 640,
                    height:480
                    }}
                 /> */}



            </div>

            {/* <Webcam
                audio = {false}
                height = {480}
                ref = {webcamRef}
                screenshotFormat= "image/jpeg"
                width={640}
                videoConstraints= {videoConstraints}
            /> */}
            <div
            style= {{

              position:'relative',
              marginLeft:'auto',
              marginRight: "auto",
              justifyContent: 'flex-end',
            //   padding:500
            }}  
          >
            <label>What's your height? (cm) </label>
            <input 
              type={"number"} 
              onChange={e=>setHeight(e.target.value)}
              style={{
                borderStyle: 'groove',
                borderColor: 'gray'
              }} 
            />
            <h2>
            Your size should be:
            </h2>
            <h3>
            {size}
            </h3>
          </div>
            <button onClick={capture}>Capture photo</button>
        </div>
    )
}

export default WebcamCapture;
