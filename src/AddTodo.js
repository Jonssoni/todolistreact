import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTodo(props) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({author: '', title: '', year: '', isbn:'', price:''});

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addTodo(todo);
    handleClose();
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        ADD BOOK
      </Button>
     <Dialog open={open}>
       <DialogTitle>New todo</DialogTitle>
       <DialogContent> 
         <TextField
            name="author"
            value={todo.author}
            onChange={inputChanged}
            margin="dense"
            label="author"
            fullWidth
          /> 
         <TextField
           name="title"
           value={todo.title}
           onChange={inputChanged}
           margin="dense"
           label="title"
           fullWidth
         /> 
         <TextField
           name="year"
           value={todo.year}
           onChange={inputChanged}
           margin="dense"
           label="year"
           fullWidth
         /> 
           <TextField
           name="isbn"
           value={todo.isbn}
           onChange={inputChanged}
           margin="dense"
           label="isbn"
           fullWidth
         /> 
           <TextField
           name="price"
           value={todo.price}
           onChange={inputChanged}
           margin="dense"
           label="price"
           fullWidth
         /> 
        
      </DialogContent>
      <DialogActions>
         <Button color="primary" onClick={handleClose}>Cancel</Button>
         <Button color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default AddTodo;