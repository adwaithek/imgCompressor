import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const ImageUploader = () => {
  const [compressedImage, setCompressedImage] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 4,
          maxWidthOrHeight: 1920,  
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setCompressedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image file here, or click to select one</p>
      </div>

      {compressedImage && (
        <div>
          <h2>Compressed Image</h2>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
