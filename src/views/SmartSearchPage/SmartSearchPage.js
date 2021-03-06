import React, { useEffect, useState } from 'react';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import { Upload, Button, Form, Input, Divider, Row, Col, Tag, Tooltip } from 'antd';
import uploadFileToBlob, { isStorageConfigured } from '../../azureBlob';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
const PredictionConfig = require("./config.json");

const storageConfigured = isStorageConfigured();

function SmartSearchPage(props) {
    const [coverImageSelected, setCoverImageSelected] = useState(null);
    const [predictedTags, setpredictedTags] = useState([]);
    const [preview, setPreview] = useState();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState();
    const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
    const TrainingApi = require("@azure/cognitiveservices-customvision-training");
    const msRest = require("@azure/ms-rest-js");

    const trainingKey = "358a625c3bd04ebf9bdb3e75403d00a2";
    const trainingEndpoint = "https://eastus.api.cognitive.microsoft.com/";
    const predictionKey = "358a625c3bd04ebf9bdb3e75403d00a2";
    const predictionEndpoint = "https://eastus.api.cognitive.microsoft.com/";

    const credentials = new msRest.ApiKeyCredentials({ inHeader: { "Training-key": trainingKey } });
    const trainer = new TrainingApi.TrainingAPIClient(credentials, trainingEndpoint);
    const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
    const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!coverImageSelected) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(coverImageSelected)
        setPreview(objectUrl)

        
        var file = new File([coverImageSelected], "test_imag.jpg");

        // SampleProject.id
        predictor.classifyImage("75e311fd-f234-4c63-8351-51e96a561f27", "Freshfoodv3", file).then(
            (results) => {

                const possibleTags = results.predictions.filter(
                    (item) => item.probability > 0.5
                ).map(
                    (item) => item.tagName
                );
                console.log(possibleTags)
                setpredictedTags(possibleTags)
            }
        );

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [coverImageSelected])

    const onCoverImageChange = (info) => {
        // capture file into state
        console.log(info.file);
        setCoverImageSelected(info.file.originFileObj);
      };

    const uploadButton = (
    <div>
        { <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    );

    // display form for cover image
    const DisplayForm = () => (
        <div>
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={onCoverImageChange}>
        {coverImageSelected ?  <img style={{ width: '200px' }} src={preview} /> : uploadButton }
        </Upload>
        </div>
    );

    const onSubmit = (event) => {
        

        if (predictedTags.length === 0) {
            alert("Waiting More Tags for Search")
        } else {
            console.log(predictedTags)
            trainer.getTags("75e311fd-f234-4c63-8351-51e96a561f27").then(
                (response) => {
                    const tagNames = response.map(
                        (item) => item.name
                    );
                    const existingTags = response.filter(
                        (item) => predictedTags.includes(item.name)
                    );
                    const nonExistingTagNames = predictedTags.filter(
                        (item) => !tagNames.includes(item)
                    )
    
                    var file = new File([coverImageSelected], "test_imag.jpg");
    
                    if (nonExistingTagNames.length > 0) {
                        trainer.createTag("75e311fd-f234-4c63-8351-51e96a561f27", nonExistingTagNames[0]).then(
                            (response) => {
                                existingTags.push(response)
                                trainer.createImagesFromData(
                                    "75e311fd-f234-4c63-8351-51e96a561f27",
                                    file,
                                    { tagIds: existingTags.map((item) => item.id) }
                                ).then( (response) => {
                                    console.log(response)
                                    }  
                                )
                            }
                        )
                    } else {
                        trainer.createImagesFromData(
                            "75e311fd-f234-4c63-8351-51e96a561f27",
                            file,
                            { tagIds: existingTags.map((item) => item.id) }
                        ).then( (response) => {
                            console.log(response)
                            }  
                        )
                    }
                }
            )
            props.history.push('/recipe', {tags: predictedTags});
        }
    }

    const handleClose = (removedTag) => {
        const updatedTags = predictedTags.filter(tag => tag !== removedTag);
        console.log(updatedTags)
        setpredictedTags(updatedTags)
    }

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }

    const handleInputConfirm = () => {
        setpredictedTags([...predictedTags, inputValue] )
        setInputVisible(false)
        setInputValue("")
    }

    const showInput = () => {
        setInputVisible(true);
    }

    const renderTags = predictedTags.map((tag, index) => {
        return (
            <Tag 
                key={tag}
                closable={true} 
                onClose={() => handleClose(tag)}
                >
                {tag} 
            </Tag>
        );
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>
              {' '}
              What Food Material Do We Have <CameraOutlined type='camera' />{' '}
            </h2>
          </div>
          <div>
            <label>Upload Food Material Image</label>
            {storageConfigured && DisplayForm()}
          </div>
        <div>
            {renderTags}
            {inputVisible && (
            <Input
                // ref={saveInputRef}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
            )}
            {!inputVisible && 
            (<Tag className="site-tag-plus" onClick={showInput}>
                <PlusOutlined /> New Tag
            </Tag>)
            }
            
        </div>

        <br>
        </br>

            <Button onClick={onSubmit} type='dashed' size='large'>
                Search
            </Button>
        </div>
    );
}

export default SmartSearchPage;