import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import comparingDistance from "../comparingDistance";

function CameraPhoto(){
    // const webcamRef = useRef(null);
    // const canvasRef = useRef(null);

    const [height, setHeight] = useState(0);
    const [size, setSize] = useState();

    const myDetector= async ()=>{
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig = {
        runtime: 'tfjs',
        enableSmoothing: false,
        modelType: 'full'
        };
        
        const detector = await poseDetection.createDetector(model, detectorConfig);
        
        setInterval(() => {
            detect(detector);
          }, 100);
    }

    const videoConstraints = {
        width: 640,
        height:480,
        facingMode: "user"
    };
    
    const WebcamCapture = ()=>{
        const webcamRef = React.useRef(null)
        const capture = React.useCallback(
            ()=>{
                const imageSrc = webcamRef.current.getScreenshot();
                console.log("Photo taken!")
            },
            [webcamRef]
        );
    
        return(
            <div>
                <Webcam
                    audio = {false}
                    height = {480}
                    ref = {webcamRef}
                    screenshotFormat= "image/jpeg"
                    width={640}
                    videoConstraints= {videoConstraints}
                />
                <button onClick={capture}>Capture photo</button>
            </div>
        )
    }
    const detect= async(detector)=>{

    }


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

            const estimationConfig = {flipHorizontal:true}
            const timestamp = performance.now();
            const poses = await detector.estimatePoses(imageSrc, estimationConfig, timestamp)
            
        
            try {
              drawCanvas(poses, video, videoWidth, videoHeight, canvasRef);
              const distance = comparingDistance(poses, height);
              if(distance == 'Small'|'Medium'|'Large'|'Xlarge'){
                setSize(distance);
              }
              
            } catch (e) {
              console.error(e.message);
              
            }            
          }
    }


}
