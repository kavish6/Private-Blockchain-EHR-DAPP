import Table from "./components/Table";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import AddRecord from "./pages/AddRecord";
import Record from "./pages/Record";
function App() {
const [records,setRecords]=useState([]);
useEffect(()=>{
  const getData=async()=>{
    console.log('get req made');
    const res= await fetch('http://localhost:3001');
    const data=await res.json();
    const rc=JSON.parse(data);
    setRecords(rc);
  }
  getData();
},[])
const addNewRecord=async(data)=>{
  console.log('came here to make post req');
const res= await fetch('http://localhost:3001',{
method:'POST',
// mode:'cors',
headers:{
  'Content-Type':'application/json'
},
body:JSON.stringify(data)
});
const dt=await res.json();
// console.log(dt);
// const fn=JSON.parse(dt);
setRecords([...records,dt]);
}
const deleterecord=async(id)=>{
  console.log('call to delete');
  const res=await fetch(`http://localhost:3001/record/${id}`,{
    method:'DELETE',
  });
  setRecords(records.filter((record)=>record.ID!==id));
}
  return (
    <BrowserRouter>
    <div className="fb">
      <h1 className="heading" ><Link to='/'><button>Health Records</button></Link></h1>
     <Routes>
      <Route path="/" element={<>
        <div style={{textAlign:'end',paddingTop:'2%'}}>
        <Link to="/addRecord"><button type="button" className="btn btn-primary btn-lg">Add Record</button></Link>
              </div> 
              <div style={{paddingTop:'2%'}}>
              <Table records={records} deleterecord={deleterecord}/> 
              
              </div>
      </>}/>
      <Route path='/addRecord' element={<AddRecord addNewRecord={addNewRecord}/>}/>
      <Route path='/record/:id/*' element={<Record records={records}/>} />
      </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
