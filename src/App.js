import React from 'react';
// import Camera from './pose-detection/Camera';
import './App.css';
import Landing from './Landing';
import { Routes, Route } from 'react-router-dom';
// import Webcam from 'react-webcam';
import WebcamCapture from './pose-detection/WebcamCapture'; 



class App extends React.Component{

    render(){
        return(
            
            <Routes >

                {/* <Camera/> */}
                {/* <WebcamCapture/> */}
                <Route path = "/MirrorSize" element = {<Landing/>}/>
                <Route path = "/MirrorSize/demo" element = {<WebcamCapture/>}/>
                
                
            </Routes>

        )
    }
}

export default App;