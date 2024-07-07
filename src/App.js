import './App.css';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTodo from './AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://bookstore-4ccbc-default-rtdb.firebaseio.com/books.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const todosArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setTodos(todosArray);
        }
      })
      .catch(err => console.error(err));
  };

    // Add keys to the todo objects
    const addKeys = (data) => {
      const keys = Object.keys(data);
      const valueKeys = Object.values(data).map((item, index) => 
      Object.defineProperty(item, 'id', {value: keys[index]}));
      setTodos(valueKeys);
    }

  const addTodo = (newTodo) => {
    fetch('https://bookstore-4ccbc-default-rtdb.firebaseio.com/books.json',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const columnDefs = [
    { headerName: 'Author', field: 'author', sortable: true, filter: true, width: 200 },
    { headerName: 'Title', field: 'title', sortable: true, filter: true, width: 300 },
    { headerName: 'Year', field: 'year', sortable: true, filter: true, width: 100 },
    { headerName: 'ISBN', field: 'isbn', sortable: true, filter: true, width: 150 },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, width: 100 },
  ];

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
           Bookstore
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddTodo addTodo={addTodo} /> 
      <div className="ag-theme-material" style={{ height: 400, width: 1000, margin: 'auto' }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
