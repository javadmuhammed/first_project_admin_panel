import React, { useEffect, useState } from 'react';
import ImageCrop from 'react-image-crop-component';
import 'react-image-crop-component/style.css';
import { uploadFile } from '../../api/api_endpoint';

function DemoCropping() {
  const [imageUrl, setImageUrl] = useState('');
  let [croppedImages, setCroppedImage] = useState("");

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  // Function to fetch the image from the server
  const fetchImage = async () => {
    try {
      const response = await fetch('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg');
      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
      setCroppedImage(URL.createObjectURL(blob))
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  let _onCropped = function (e) {
    let image = e.image;
    let image_data = e.data;
    console.log(e.image)
    setCroppedImage(e.image)
  };
 
  useEffect(() => {
    fetchImage();
  }, []);

  function croppeImage() {

    const blobImage = dataURItoBlob(croppedImages);

    uploadFile(blobImage, 100).then((dt) => {
      console.log(dt)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>

      <div style={{ width: '300px', height: '300px' }}>
        {imageUrl && (
          <ImageCrop
            src={imageUrl}
            setWidth={300}
            setHeight={300}
            square={false}
            resize={true}
            border={'dashed #ffffff 2px'}
            onCrop={_onCropped}
            watch={_onCropped}
          />
        )}

        <img style={{ height: "180px", marginTop: "20px" }} src={croppedImages} width={"300px"} height={"300px"} alt="" />
        <button onClick={croppeImage}>Save</button>
      </div>
    </div>
  );
}

export default DemoCropping;
