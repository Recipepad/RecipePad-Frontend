import React, { useEffect, useState } from 'react';
import { Upload, Typography, Button, Form, Input, Divider, Row, Col } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import uploadFileToBlob, { isStorageConfigured } from '../../azureBlob';
import Axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Alert } from 'antd';


const { Title } = Typography;
const { TextArea } = Input;
const storageConfigured = isStorageConfigured();

function UploadRecipePage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [StepsValue, setStepsValue] = useState([{
    topost: {
      title: "", detail: "", imgid: ""
    },
    file: null,
    countStep: 1
   }]);
  const [IngredientsValue, setIngredientsValue] = useState([{ ingredient: "", amount: "" }]);
  const [countStep, setCountStep] = useState(1);

  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [coverImageSelected, setCoverImageSelected] = useState(null);
  const [StepImages, setStepImages] = useState([]);

  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!coverImageSelected) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(coverImageSelected)
    setPreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [coverImageSelected])

  const onCoverImageChange = (event) => {
    // capture file into state
    setCoverImageSelected(event.file.originFileObj);
  };

  const onStepImageChange = (event) => {
    // capture file into state
    console.log("onStepImageChange")
    const stepIndex = StepsValue.length - 1; // Always fill the last step
    setStepImages([...StepImages, event.file.originFileObj]);
    
    // event.target.getAttribute('countStep') - 1
    console.log(stepIndex)
    StepsValue[stepIndex]['file'] = event.file.originFileObj
    console.log(event.file.originFileObj)
  };

  const getFileUrl = (file) => {
    if (file) {
      return URL.createObjectURL(file)
    } else {
      return ""
    }
  }

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
            showUploadList={false}
            onChange={onCoverImageChange}>
        {coverImageSelected ?  <img style={{ width: '200px' }} src={preview} /> : uploadButton }
        </Upload>
        </div>
  );

  // display form for step images
  const DisplayStepForm = ({y}) => (
    <div>
        <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            onChange={onStepImageChange}>
        {getFileUrl(y.file) != "" ?  <img style={{ width: '200px' }} src={getFileUrl(y.file)} /> : uploadButton }
        </Upload>
        </div>
    // <div>
    //   <input key={y} countStep={y.countStep} type="file" style={{ width: '200px' }} onChange={onStepImageChange} />
    //   <img style={{ width: '200px' }} src={getFileUrl(y.file)} />
    // </div>
  );

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !TitleValue ||
      !DescriptionValue ||
      !IngredientsValue ||
      !StepsValue 
      // !StepImages
    ) {
      return alert('fill all the fields first!');
    }

    var convertIngredientsValue = IngredientsValue.reduce(
      (obj, item) => Object.assign(obj, { [item.ingredient]: item.amount }), {});

    const variables = {
      uid: window.localStorage.userId,
      title: TitleValue,
      steps: StepsValue.map((item) => {
        return {
          title: item.topost.title,
          detail: item.topost.detail,
          imgid: item.topost.imgid,
        }
      }),
      ingredients: convertIngredientsValue,
      description: DescriptionValue,
      // images: StepImages
    };

    console.log(window.localStorage)
    console.log(JSON.stringify(variables))
    Axios.post('/recipe', variables).then((response) => {
      console.log(response)
      // To Do ...
      console.log(response.data.cover_image_id)
      console.log(response.data.step_image_id)

      var coverImage = new File([coverImageSelected], response.data.cover_image_id);
      console.log(coverImage)

      // *** UPLOAD TO AZURE STORAGE ***
      
      // Upload step images
      StepsValue.forEach(function (value, i) {
        console.log('%d: %s', i, value);
        console.log(response.data.step_image_id[i])
        var stepImage = new File([value.file], response.data.step_image_id[i])
        uploadFileToBlob(stepImage);
      });

      uploadFileToBlob(coverImage).then(
        _ => {
          props.history.push('/recipe');
        }
      );

      // reset state/form
      setCoverImageSelected(null);
      setStepImages([]);

      if (response.data.success) {
        console.log("Success")
      } else {
        alert('Failed to upload recipe');
      }
    });
  };

  // <------------  Ingredients onChange Start ------------>

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...IngredientsValue];
    list[index][name] = value;
    setIngredientsValue(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...IngredientsValue];
    list.splice(index, 1);
    setIngredientsValue(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setIngredientsValue([...IngredientsValue, { ingredient: "", amount: "" }]);
  };

  // <------------  Ingredients onChange End------------>

  // <------------  Steps onChange Start ------------>
  // handle input change
  const handleInputStepChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...StepsValue];
    list[index]['topost'][name] = value;
    setStepsValue(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveStepClick = index => {
    const list = [...StepsValue];
    list.splice(index, 1);
    setStepsValue(list);
    setCountStep(countStep - 1);
  };
  
  // handle click event of the Add button
  const handleAddStepClick = () => {
    setStepsValue([...StepsValue, {
      topost: {
        title: "", detail: "", imgid: ""
      },
      file: null,
      countStep: countStep + 1
     }]);
     setCountStep(countStep + 1);
    
    console.log("handleAddStepClick")
  };
  // <------------  Steps onChange End ------------>

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>
          {' '}
          Upload My Recipe <UploadOutlined type='book' />
        </Title>
      </div>
      <Form onSubmit={onSubmit}>
        <Divider>Cover Image</Divider>
        <div>
          <label>Upload cover image</label>
          {storageConfigured && DisplayForm()}
        </div>
        <br />
        <Divider>Title</Divider>
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <Divider>Ingredients</Divider>
        <label>Ingredients</label>
        <div>
          {IngredientsValue.map((x, i) => {
            return (
              <div key={i}>
                <Input.Group>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        name="ingredient"
                        placeholder="Enter Ingredient Name"
                        value={x.ingredient}
                        onChange={e => handleInputChange(e, i)}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        style={{ marginLeft: 20 }}
                        name="amount"
                        placeholder="Enter Amount"
                        value={x.amount}
                        onChange={e => handleInputChange(e, i)}
                      />
                    </Col>
                  </Row>
                </Input.Group>
                <div>
                  {IngredientsValue.length !== 1 && <Button
                    style={{ marginRight: 20 }}
                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                  {IngredientsValue.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
                </div>
              </div>
            );
          })}
          {/* <div style={{ marginTop: 20 }}>{JSON.stringify(IngredientsValue)}</div> */}
        </div>
        <Divider> Methods </Divider>
        <div>
          {StepsValue.map((y, j) => {
            return (
              <div key={y.countStep}>
                <Divider orientation="left"> Step {y.countStep} </Divider>
                <div>
                  <label>Upload image for the current step</label>
                  {storageConfigured && DisplayStepForm({y})}
                </div>
                <br />
                <label>Step Sub-title</label>
                <Input name="title" value={y.topost.title} onChange={e => handleInputStepChange(e, j)}/>
                <br />
                <br />
                <label>Step description</label>
                <TextArea name="detail" value={y.topost.detail} onChange={e => handleInputStepChange(e, j)}/>
                <br />
                <br />
                <div>
                  {StepsValue.length !== 1 && <Button
                    style={{ marginRight: 20 }}
                    onClick={() => handleRemoveStepClick(j)}>Remove</Button>}
                  {StepsValue.length - 1 === j && <Button onClick={handleAddStepClick}>Add</Button>}
                </div>
              </div>
            );
          })}
          {/* <div style={{ marginTop: 20 }}>{JSON.stringify(StepsValue)}</div> */}
        </div>
        <Divider>Post</Divider>
        <Button onClick={onSubmit} type='dashed' size='large'>
          Post
        </Button>
      </Form>
    </div>
  );
}

export default UploadRecipePage;
