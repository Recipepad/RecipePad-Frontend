import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import FileUpload from '../../components/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const category = [
  { key: 1, value: 'Appetizer' },
  { key: 2, value: 'Entrée' },
  { key: 3, value: 'Dessert' },
  { key: 4, value: 'Drink' },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [stepsValue, setstepsValue] = useState('');
  const [ingredientsValue, setingredientsValue] = useState('');
  const [categoryValue, setcategoryValue] = useState(1);
  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const oningredientsChange = (event) => {
    setingredientsValue(event.currentTarget.value);
  };

  const onstepsChange = (event) => {
    setstepsValue(event.currentTarget.value);
  };

  const oncategorySelectChange = (event) => {
    setcategoryValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !TitleValue ||
      !DescriptionValue ||
      !categoryValue ||
      !ingredientsValue ||
      !stepsValue ||
      !Images
    ) {
      return alert('fill all the fields first!');
    }
    if (
      !props.user.userData.email ||
      !props.user.userData.nickname
    ) {
      return alert('complete your profile before you can post!');
    }

    const variables = {
      author: props.user.userData._id,
      useremail: props.user.userData.email,
      username: props.user.userData.username,
      title: TitleValue,
      steps: stepsValue,
      ingredients: ingredientsValue,
      description: DescriptionValue,
      images: Images,
      category: categoryValue,
    };

    const posthistory = (recipe) => {
      Axios.post('/successPost', recipe).then((response) => {
        if (response.data.success) {
          alert('Product Successfully Uploaded');
        } else {
          alert('Failed to upload Product');
        }
      });
    };

    Axios.post('/uploadRecipe', variables).then((response) => {
      if (response.data.success) {
        posthistory(response.data.recipe);
        alert('Recipe Successfully Uploaded');
        props.history.push('/recipe');
      } else {
        alert('Failed to upload recipe');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>
          {' '}
          Upload My Recipe <UploadOutlined type='book' />
        </Title>
      </div>
      <Form onSubmit={onSubmit}>
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Steps and Details</label>
        <TextArea onChange={onstepsChange} value={stepsValue} />
        <br />
        <br />
        <label>Ingredients</label>
        <TextArea onChange={oningredientsChange} value={ingredientsValue} />
        <br />
        <br />
        <label>Category: </label>
        <select onChange={oncategorySelectChange}>
          {category.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{' '}
            </option>
          ))}
        </select>
        <br />
        <br />
        {/* DropZone */}
        <label>Upload images for each step</label>
        <FileUpload style={{ cursor: 'pointer' }} refreshFunction={updateImages} />
        <p style={{ color: 'red' }}>
          *drop or choose from files, left click image to delete on right area
        </p>
        <Button onClick={onSubmit} type='dashed' size='large'>
          Post
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
