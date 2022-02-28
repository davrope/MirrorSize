import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>
            Welcome to Mirror Size!
        </h1>
        <section className='hero'>
            <img src = "https://i.postimg.cc/k5qHRc5H/video.png" alt = "Testing img" className='hero-img' />
            <div className='hero-txt'>
                <h2 className='info-title'>
                    Check out what would be your best size
                </h2>
                <p className='info-subtitle'>
                    Have you ever bought clothes that didn't fit you well? This is one of the most common problems that fashion e-commerce stores have.
                    <br/>
                    <br/>
                    This app is using the Tensorflow pose detection API to estimate what would be your best size compared to an array where the real measures are saved
                </p>
            </div>
        </section>

        <section className='how-to'>
            <h2 className='info-title'>
                How to use it?
            </h2>
            <ul className='info-subtitle'>
                <li>Write your height in cm</li>
                <li>Click the capture button</li>
                <li>You'll have 10 seconds to pose like this</li>
                <li>That's it! you'll probably have to wait a few seconds to visualize your size</li>
            </ul>
            <img src = "https://i.postimg.cc/k5qHRc5H/video.png" alt = "Testing img" className='tutorial-img' />

        </section>
        <button className='go-button'>
            <Link to = "/MirrorSize/demo" className='go-button'>
                Give it a try!
            </Link>
        </button>

    </div>
  )
}

export default Landing