import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 640,
    height:480,
    facingMode: "user"
};

const WebcamCapture = ()=>{
    const [photo, setPhoto] = useState();

    const webcamRef = React.useRef(null)
    const capture = React.useCallback(
        ()=>{
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log("Photo taken!")
            setPhoto(imageSrc);
            
        },
        [webcamRef]
    );

    // Aquí puedo hacer algo con la foto
    console.log(photo);

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

export default WebcamCapture;
