const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let employees = [
    {id:1, name:'Juan', employee_code:1, trade:12},
]

app.get('/', (req, res)=>{
    res.send('El servicio funciona perfectamente')
})

app.get('/api/employees', (req, res)=>{
    try{
        res.status(200).json(employees)
    }catch{
        res.status(400).json({message: 'Hubo en error al obtener los productos'})
    }
})

app.post('/api/timecards', (req, res) =>{
    try{
        nuevoProducto
    }catch(error){

    }
})

app.listen(port,()=>{
    console.log(`El servicio esta disponible en : http://localhost:${port}`)
});