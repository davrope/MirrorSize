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
    const [timer, setTimer] = useState(null);
    

    const canvasRef = useRef(null);


    useEffect(
        ()=>{
            myDetector(myImage);
            

        },[photo]
    )

    useEffect(
        ()=>{
            
            if (timer ===0){
                setTimer(null);
            }

            if(!timer) return;

            const intervalId = setInterval(()=>{
                setTimer(timer-1);
            }, 1000);

            return ()=>clearInterval(intervalId);
        }, [timer]);



    const myDetector = async(image)=>{
        const model = poseDetection.SupportedModels.BlazePose;
        const detectorConfig={
            runtime: 'tfjs',
            enableSmoothing: true,
            modelType: 'full'
        };

        const detector = await poseDetection.createDetector(model, detectorConfig);

        detect(detector, image);


    }
    

    
    const detect = async(detector, image)=>{

        if( photo !==null){

            const estimationConfig = {flipHorizontal:true}
            const timestamp = performance.now();

            const poses = await detector.estimatePoses(image, estimationConfig, timestamp)

            try{
                const distance = comparingDistance(poses, height);
                console.log(distance)
                
                drawCanvas(poses, image, videoConstraints.width, videoConstraints.height, canvasRef);

                setSize(distance)
            }catch(e){
                console.log(e.message)
            }
        }

        
    }


    const webcamRef = React.useRef(null)

    const handleClick =()=>{

        if (photo != null){
            setPhoto('');
            setMyImage(null)
            clearCanvas(canvasRef)
        }
        setTimer(10);

        setTimeout(()=>{            
            capture();
        }, 10000)
    }
    
    const capture = React.useCallback(
        
        ()=>{
            
            
            const imageSrc = webcamRef.current.getScreenshot();
            
            
            
            const image = document.createElement("img");
            image.src = imageSrc
            image.width = 640
            image.height = 480
            
            
            setMyImage(image);  
            setPhoto(imageSrc);
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

    const clearCanvas = (canvas)=>{

        const ctx =  canvas.current.getContext("2d");
        console.log(canvas)
        
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }


    return(
        <div>
            <h2>Say cheese! :)</h2>
            <h3 style={{fontSize:32}}>{timer}</h3>
            <div className="webcam-container">
                <div className="webcam-img">

                    {photo === ''? <Webcam
                        audio = {false}
                        height= {480}
                        ref = {webcamRef}
                        screenshotFormat= "image/jpeg"
                        width={640}
                        videoConstraints= {videoConstraints}
                        />: <img src = {photo} id ={photo} alt = 'loading'/>
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

            </div>


            <div
            style= {{

              position:'relative',
              marginLeft:'auto',
              marginRight: "auto",
              justifyContent: 'flex-end',
           
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
            <button onClick={handleClick}>Capture photo</button>
        </div>
    )
}

export default WebcamCapture;
