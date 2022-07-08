import { useEffect, useState } from "react";
import { Link, Route, useParams,Routes,useLocation } from "react-router-dom"
import Table from '../components/Table';
import VisitTable from "../components/VisitTable";
import AddVisit from "./AddVisit";
const Record = ({records}) => {
    const {id}=useParams();
    const record=records.filter((record)=>record.ID===id);
    const [medicalvisits,setMedicalVisits]=useState([]);
    useEffect(()=>{
        setMedicalVisits(record[0].Medicalvisits);
    })
    const addNewVisit=async(data)=>{
            var sd={...data,ID:id};
            console.log(sd);
            setMedicalVisits([...medicalvisits,data]);
            const res=await fetch('http://localhost:3001/record',{
                method:'POST',
                // mode:'cors',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(sd)
                });
                const dt=await res.json();
                
    }
    const loc=useLocation();
  return (
    <Routes> 
        <Route path='/' element={<>
            <div>
        <Table records={record}/>
        <br/>
        <br/>
        <h2>Medical Visits</h2>
        <div style={{textAlign:'end',paddingTop:'2%'}}>
        <Link to={`${loc.pathname}/addvisit`}><button type="button" className="btn btn-primary btn-lg">Add Medical Visit</button></Link>
              </div> 
              <div style={{paddingTop:'2%'}}>
                <VisitTable visits={medicalvisits}/>
              </div>
    </div>
        </>}/>
        <Route path={`/addvisit`} element={<AddVisit addNewVisit={addNewVisit} />} />
    </Routes>
    
 
  )
}

export default Record