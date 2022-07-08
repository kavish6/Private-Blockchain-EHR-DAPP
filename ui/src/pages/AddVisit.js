import React ,{useState} from 'react'
import Button from '@mui/material/Button';

const AddVisit = ({addNewVisit}) => {
    const [date,setDate]=useState('');
    const [doctor,setDoctor]=useState('');
    const [description,setDescription]=useState('');
    const [test,setTest]=useState('');
    const [diagnosis,setDiagnosis]=useState('');
    const [prescription,setPrescription]=useState('');
    const onSubmit=(e)=>{
      e.preventDefault();
      if(!date)
      {
          alert('please add Date');
          return
      }
      addNewVisit({
        Date:date,
        Doctor:doctor,
        Description:description,
        Testpeformed:test,
        Diagnosis:diagnosis,
        Prescription:prescription,
        Testreports:'../images'});
      setDate('');
      setDoctor('');
      setPrescription('');
      setTest('');
      setDiagnosis('');
      setDescription('');
    }
    return (
      <form onSubmit={onSubmit} >
        <div className='form-control'>
          <label>Date</label>
          <input type={'text'} placeholder='Add Date' value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
        </div>
        <div className='form-control'>
          <label>Doctor</label>
          <input type={'text'} placeholder='Add Doctor' value={doctor} onChange={(e)=>{setDoctor(e.target.value)}}></input>
        </div>
        <div className='form-control'>
          <label>Reason</label>
          <input type={'text'} placeholder='Add Reason' value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
        </div>
        <div className='form-control'>
          <label>Test Performed</label>
          <input type={'text'} placeholder='Add Tests Performed' value={test} onChange={(e)=>{setTest(e.target.value)}}></input>
        </div>
        <div className='form-control'>
          <label>Diagnosis</label>
          <input type={'text'} placeholder='Add Diagnosis' value={diagnosis} onChange={(e)=>{setDiagnosis(e.target.value)}}></input>
        </div>
        <div className='form-control'>
          <label>Prescription</label>
          <input type={'text'} placeholder='Add Prescription' value={prescription} onChange={(e)=>{setPrescription(e.target.value)}}></input>
        </div>
        <Button variant="contained" color="success">
        <input className='remove' type={'submit'} value={'Add Record'} ></input>
        </Button>
      </form>
    );
}

export default AddVisit