import React from 'react';
// import Camera from './pose-detection/Camera';
import './App.css';
// import Webcam from 'react-webcam';
import WebcamCapture from './pose-detection/WebcamExample'; 



class App extends React.Component{

    render(){
        return(
            <div >
                <h1 style={{textAlign: 'center'}}>
                    Welcome to Mirror Size!
                </h1>
                Checkout what would be your best fit!
                {/* <Camera/> */}
                <WebcamCapture/>
                
            </div>

        )
    }
}

export default App;