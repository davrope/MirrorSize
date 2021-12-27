import React from 'react';
import Camera from './pose-detection/Camera';
import './App.css';


class App extends React.Component{

    render(){
        return(
            <div >
                <h1 style={{textAlign: 'center'}}>
                    Welcome to MySize!
                </h1>
                Checkout what would be your best fit!
                <Camera/>
            </div>

        )
    }
}

export default App;