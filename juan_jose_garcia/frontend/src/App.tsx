import { useEffect, useState } from "react"

interface Employee {
  id:number,
  name:string,
  employee_code:number,
  trade:number
}

function App(){

const [employees, setEmployees] = useState <Employee[]>([]);
const [laoding, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
  const fetchEmployees = async()=>{
    try{
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/employees')
      if(!response.ok){
        throw new Error('Hubo un error al obtener productos')
      }

      const data: Employee[] = await response.json();
      setEmployees(data)
    
    }catch(error:any){
      setError(error.message || 'Hubo un error inesperado')
    }finally{
      setLoading(false)
    }
  }

  fetchEmployees()
}, []);




  
}
