import React, { useEffect, useState } from 'react';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import { Typography, Button, Form, Input, Divider, Row, Col } from 'antd';
import uploadFileToBlob, { isStorageConfigured } from '../../azureBlob';
import Axios from 'axios';
const PredictionConfig = require("./config.json");

const storageConfigured = isStorageConfigured();

function SmartSearchPage() {
    const [coverImageSelected, setCoverImageSelected] = useState(null);

    const fs = require('fs');
    const [preview, setPreview] = useState()

    

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!coverImageSelected) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(coverImageSelected)
        setPreview(objectUrl)

        
        var file = new File([coverImageSelected], "test_imag.jpg");
        console.log(file)

        let formData = new FormData();
        const config = {
            header: { 
                'content-type': 'application/json',
                'Prediction-key': "d341601d96ec4bfc992a7b36fce8f244"
            },
        };
      
        const data = {Url: "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"};
        const json = JSON.stringify({Url: "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"})


        Axios({
            method: 'post',
            url:  'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0d37058d-36ad-427e-b254-d4dc8774b10c/classify/iterations/foodTestv1/url',
            headers: {'content-type': 'application/json',
            'Prediction-key': "d341601d96ec4bfc992a7b36fce8f244"}, 
            data: {
                Url: 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg', // This is the body part
            }
          }).then((response) => {
             console.log(response);
          });

        // Axios.post(
        //     'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0d37058d-36ad-427e-b254-d4dc8774b10c/classify/iterations/foodTestv1/url',
        //     {"Url": "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"},
        //     config
        //     ).then((response) => {
        //     console.log(response)
        // });

        

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [coverImageSelected])

    const onCoverImageChange = (event) => {
        // capture file into state
        setCoverImageSelected(event.target.files[0]);
        console.log("onCoverImageChange")
        console.log(event.target.files[0])

        // const imageData = event.target.files[0]
        // var image = new File([imageData], "test_imag.jpg");

        



        // const https = require('https');

        // const customVisionPostOptions = {
        //     hostname: "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0d37058d-36ad-427e-b254-d4dc8774b10c/classify/iterations/foodTestv1/image",
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/octet-stream',
        //         'Prediction-key': "d341601d96ec4bfc992a7b36fce8f244"
        //     }             
        // };
        
        // const customVisionPostRequest = https.request(customVisionPostOptions, (predictionResponse) => {
        //     predictionResponse.on('data', function (data) {
        //         const customVisionResponse = JSON.parse(data);
        //         const predictions = customVisionResponse.predictions;
        //         console.log(predictions);
        //     });
        // });


        // customVisionPostRequest.write(fs.createWriteStream(image));
        // customVisionPostRequest.end();

      };

    // display form for cover image
    const DisplayForm = () => (
        <div>
        <input type="file" style={{ width: '200px' }} onChange={onCoverImageChange} />
        {coverImageSelected &&  <img style={{ width: '200px' }} src={preview} /> }
        </div>
    );

    const onSubmit = (event) => {
        alert("Submit Clicked")
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>
              {' '}
              What Food Material Do We Have <RocketOutlined type='rocket' />{' '}
            </h2>
          </div>
          <div>
            <label>Upload Food Material Image</label>
            {storageConfigured && DisplayForm()}
            <p style={{ color: 'red' }}>
                *drop or choose from files, choose from file again but cancel can delete the image
            </p>
          </div>
            <Button onClick={onSubmit} type='dashed' size='large'>
                Search
            </Button>
        </div>
    );
}

export default SmartSearchPage;