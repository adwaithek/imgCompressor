import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import imageCompression from 'browser-image-compression';

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = useCallback(() => {
    setIsCameraOpen(true);
  }, []);

  const captureImage = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression.getFilefromDataUrl(imageSrc, 'image/jpeg', options);
        setCapturedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      } finally {
        setIsCameraOpen(false);  // Close the camera after capturing the image
      }
    }
  }, []);

  return (
    <div>
      <h1>Camera Capture</h1>

      {isCameraOpen && (
        <div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Webcam
              audio={false}
              height={480}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              style={{ maxWidth: '100%' }}
            />
          </div>

          <button onClick={captureImage}>Capture Image</button>
        </div>
      )}

      {!isCameraOpen && !capturedImage && (
        <div>
          <button onClick={openCamera}>Open Camera</button>
        </div>
      )}

      {capturedImage && (
        <div>
          
          <img src={URL.createObjectURL(capturedImage)} alt="Captured and Compressed" style={{ maxWidth: '100%' }} />
         <br/>  <button>Submit</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
