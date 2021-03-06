import axios from 'axios';
import { submitConfidenceScore } from './axios';
import { baseURL, apiKey } from '../config/facesConfig';
// import dotenv from 'dotenv'
// const env = dotenv.config().parsed;

// const baseURL = process.env.SECRET_URL
// const apiKey = process.env.API_KEY

const detectFacesEndpoint = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': apiKey
    },
    withCredentials: false,
    validateStatus: () => true,
});

const verifyFacesEndpoint = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
    },
    withCredentials: false,
    validateStatus: () => true,
});

async function uploadFace(image) {
    const response = await detectFacesEndpoint.post('/detect', image);

    return response.data.length ? response.data[0].faceId : false;
}

async function verifyFace(faceId1, faceId2) {
    const response = await verifyFacesEndpoint.post('/verify', { faceId1, faceId2 });
    return response.data.confidence;
}

async function uploadReferenceImage(image) {
    const result = uploadFace(image);

    if (!result) {
        throw new Error('Could not find a face in the given image.');
    }
    
    return result;
}

async function checkForStudent(testAttendanceId, referenceImageId, imageForFacesAPI, imageForStorage) {
    const faceId2 = await uploadFace(imageForFacesAPI);
    const confidenceScore = faceId2 ? await verifyFace(referenceImageId, faceId2) : 0;

    return submitConfidenceScore(testAttendanceId, confidenceScore, imageForStorage);
}

export { uploadReferenceImage, checkForStudent };