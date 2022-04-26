import React, { useState } from 'react';
import { Typography, Button, Form, Input, Divider, Row, Col } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import FileUpload from '../../components/FileUpload';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from '../../azureBlob';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const storageConfigured = isStorageConfigured();

function UploadRecipePage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [stepsValue, setstepsValue] = useState([{ title: "", detail: "", imgid: "" }]);
  const [ingredientsValue, setingredientsValue] = useState([{ ingredient: "", amount: "" }]);
  const [Images, setImages] = useState([]);
  const [countStep, setCountStep] = useState(1);
  const baseURL = 'https://recipepadblob.blob.core.windows.net/images/'

  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
    console.log(event.target.files[0])
  };

  // const onFileUpload = async () => {
  //   // prepare UI
  //   setUploading(true);

  //   // *** UPLOAD TO AZURE STORAGE ***
  //   const blobsInContainer = await uploadFileToBlob(fileSelected);

  //   // prepare UI for results
  //   setBlobList(blobsInContainer);

  //   // reset state/form
  //   setFileSelected(null);
  //   setUploading(false);
  //   setInputKey(Math.random().toString(36));
  // };

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      {/* <button type="submit" onClick={onFileUpload}>
        Upload!
      </button> */}
    </div>
  );

  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h2>Container items</h2>
      <ul>
        {blobList.map((item) => {
          return (
            <li key={item}>
              <div>
                {Path.basename(item)}
                <br />
                {/* <img src={item} alt={item} height="200" /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !TitleValue ||
      !DescriptionValue ||
      !ingredientsValue ||
      !stepsValue 
      // !Images
    ) {
      return alert('fill all the fields first!');
    }

    var convertIngredientsValue = ingredientsValue.reduce(
      (obj, item) => Object.assign(obj, { [item.ingredient]: item.amount }), {});

    const variables = {
      uid: window.localStorage.userId,
      title: TitleValue,
      steps: stepsValue,
      ingredients: convertIngredientsValue,
      description: DescriptionValue,
      // images: Images
    };

    console.log(fileSelected)
    console.log(window.localStorage)
    console.log(JSON.stringify(variables))
    Axios.post('/recipe', variables).then((response) => {
      console.log(response)
      // baseURL + each of cover image id
      // for loop -> step image ids --> baseURL + each of the step image id --> to blob storage (n + 1)
      // To Do ...
      
      console.log(response.data.cover_image_id)

      var new_file = new File([fileSelected], response.data.cover_image_id);
      console.log(new_file)

      // prepare UI
      setUploading(true);

      // *** UPLOAD TO AZURE STORAGE ***
      const blobsInContainer = uploadFileToBlob(new_file);

      // prepare UI for results
      setBlobList(blobsInContainer);

      // reset state/form
      setFileSelected(null);
      setUploading(false);
      setInputKey(Math.random().toString(36));

      if (response.data.success) {
        alert('Recipe Successfully Uploaded');
        // props.history.push('/recipe');
      } else {
        alert('Failed to upload recipe');
      }
    });
  };

  // <------------  Ingredients onChange Start ------------>

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredientsValue];
    list[index][name] = value;
    setingredientsValue(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...ingredientsValue];
    list.splice(index, 1);
    setingredientsValue(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setingredientsValue([...ingredientsValue, { ingredient: "", amount: "" }]);
  };

  // <------------  Ingredients onChange End------------>

  // <------------  Steps onChange Start ------------>
  // handle input change
  const handleInputStepChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stepsValue];
    list[index][name] = value;
    setstepsValue(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveStepClick = index => {
    const list = [...stepsValue];
    list.splice(index, 1);
    setstepsValue(list);
    setCountStep(countStep - 1);
  };
  
  // handle click event of the Add button
  const handleAddStepClick = () => {
    setstepsValue([...stepsValue, { title: "", detail: "", imgid: ""}]);
    setCountStep(countStep + 1);
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
        {/* DropZone
        <label>Upload cover image</label>
        <FileUpload style={{ cursor: 'pointer' }} refreshFunction={updateImages} />
        <p style={{ color: 'red' }}>
          *drop or choose from files, left click image to delete on right area
        </p> */}
        <div>
          <h1>Upload file to Azure Blob Storage</h1>
          {storageConfigured && !uploading && DisplayForm()}
          {storageConfigured && uploading && <div>Uploading</div>}
          <hr />
          {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
          {!storageConfigured && <div>Storage is not configured.</div>}
        </div>
        <br />
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
          {ingredientsValue.map((x, i) => {
            return (
              <div key={x}>
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
                  {ingredientsValue.length !== 1 && <Button
                    style={{ marginRight: 20 }}
                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                  {ingredientsValue.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 20 }}>{JSON.stringify(ingredientsValue)}</div>
        </div>
        <Divider> Methods </Divider>
        <div>
          {stepsValue.map((y, j) => {
            return (
              <div key={y}>
                <Divider orientation="left"> Step {countStep} </Divider>
                {/* DropZone
                <label>Upload Step Image</label>
                <FileUpload style={{ cursor: 'pointer' }} refreshFunction={updateImages} />
                <p style={{ color: 'red' }}>
                  *drop or choose from files, left click image to delete on right area
                </p> */}
                {/* <div>
                  <h1>Upload file to Azure Blob Storage</h1>
                  {storageConfigured && !uploading && DisplayForm()}
                  {storageConfigured && uploading && <div>Uploading</div>}
                  <hr />
                  {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
                  {!storageConfigured && <div>Storage is not configured.</div>}
                </div> */}
                <br />
                <br />
                <label>Step Sub-title</label>
                <Input name="title" value={y.title} onChange={e => handleInputStepChange(e, j)}/>
                <br />
                <br />
                <label>Step description</label>
                <TextArea name="detail" value={y.detail} onChange={e => handleInputStepChange(e, j)}/>
                <br />
                <br />
                <div>
                  {stepsValue.length !== 1 && <Button
                    style={{ marginRight: 20 }}
                    onClick={() => handleRemoveStepClick(j)}>Remove</Button>}
                  {stepsValue.length - 1 === j && <Button onClick={handleAddStepClick}>Add</Button>}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 20 }}>{JSON.stringify(stepsValue)}</div>
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
