import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
//Register WebGL backend

import '@tensorflow/tfjs-backend-webgl';

// Create detector

const model = poseDetection.SupportedModels.BlazePose;
const detectorConfig = {
  runtime: 'tfjs',  
  enableSmoothing: true,
  modelType: 'lite'
};
detector = await poseDetection.createDetector(model, detectorConfig);


// Run inference

const estimationConfig = {flipHorizontal: true};
const timestamp = performance.now();
const poses = await detector.estimatePoses(image, estimationConfig, timestamp);