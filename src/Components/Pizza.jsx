import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';

const AddPizzaForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pizzas, setPizzas] = useState([]);

  //fetch data

  useEffect(() => {
    axios.get('http://localhost:8080/viewp')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, []);

  //remove data

  const deleteValue = (id) => {
    console.log(id)
    axios.delete(`http://localhost:8080/removep/${id}`)
      .then((response) => {
        alert(response.data)
        window.location.reload(false)
      })
      .catch((err) => console.log(err))
  }

  //add data
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/addpizza', { title, description, imageUrl });
      setTitle('');
      setDescription('');
      setImageUrl('');
      alert('Pizza order added successfully!');
      window.location.reload(false)
    } catch (error) {
      console.error('Error adding pizza order:', error);
      alert('Error adding pizza order. Please try again.');
    }
  };

  return (
    <>
      <br /><br /><br /><br />
      <Typography variant='h3'>PIZZA</Typography>
      <TextField
        id='title'
        label='Enter Title'
        variant='outlined'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)} /><br /><br />
      <TextField
        id='description'
        label='Enter description'
        variant='outlined'
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)} /><br /><br />
      <TextField
        id='imageUrl'
        label='Enter imageUrl'
        variant='outlined'
        name='imageUrl'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)} /><br /><br />
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>ImageUrl</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((pizza) => (
            <TableRow key={pizza._id}>
              <TableCell>{pizza.title}</TableCell>
              <TableCell>{pizza.description}</TableCell>
              <TableCell>{pizza.imageUrl}</TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteValue(pizza._id)}
                  size="small"
                  variant='contained'
                  color='secondary'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AddPizzaForm;
