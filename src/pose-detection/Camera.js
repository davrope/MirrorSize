import React, { useRef, useState, useEffect } from "react";
import { blazeposearray, drawKeypoints, drawSkeleton } from "./utilities";
import Webcam from "react-webcam";
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import comparingDistance from "../comparingDistance";

function Camera (){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [height, setHeight] = useState(0);
    const [size, setSize] = useState()


    // Load BlazePose

    const myDetector= async ()=>{
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig = {
        runtime: 'tfjs',
        enableSmoothing: true,
        modelType: 'full'
        };
        
        const detector = await poseDetection.createDetector(model, detectorConfig);
        
        setInterval(() => {
            detect(detector);
          }, 100);
    }

    myDetector();

    const detect = async (detector)=>{
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
      
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
      
            // Make Detections
            // const pose = await net.estimateSinglePose(video);

            const estimationConfig = {flipHorizontal:true}
            const timestamp = performance.now();
            const poses = await detector.estimatePoses(video, estimationConfig, timestamp)
            
            
            // console.log(poses["0"]["keypoints"]);
            try {
              drawCanvas(poses, video, videoWidth, videoHeight, canvasRef);
              const distance = comparingDistance(poses, height);
              if(distance == 'Small'|'Medium'|'Large'|'Xlarge'){
                setSize(distance);
              }
              console.log((comparingDistance(poses, height)));
            } catch (e) {
              console.error(e.message);
            }            
          }
    }

    const drawCanvas = (poses, video, videoWidth, videoHeight, canvas)=>{
        const ctx =  canvas.current.getContext("2d");
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;

        drawKeypoints(poses["0"]["keypoints"], 0.6, ctx);
        drawSkeleton(poses["0"]["keypoints"], ctx);



    }



    return(
        <div>
          <Webcam 
            ref = {webcamRef}
            style = {{
              position: 'absolute', 
              marginLeft:"auto",
              marginRight: "auto",
              left: 0,
              right:0,
              textAlign: 'center',
              zindex: 9,
              width: 640,
              height:480
          }}
          />
    
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
          <div
            style= {{

              position:'relative',
              marginLeft:'auto',
              marginRight: "auto",
              justifyContent: 'flex-end',
              padding:500
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
            <h2>
            {size}
            </h2>
            </h2>
          </div>

          

          
        </div>
      )

}

export default Camera;