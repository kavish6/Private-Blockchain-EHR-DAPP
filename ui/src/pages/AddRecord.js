import React, { useState } from 'react'
import Button from '@mui/material/Button';
const AddRecord = ({addNewRecord}) => {
  const [id,setId]=useState('');
  const [name,setName]=useState('');
  const [age,setAge]=useState(0);
  const [bloodgrp,setBloodGrp]=useState('');
  const [contactno,setContacNo]=useState('');
  const [address,setAddress]=useState('');
  const [gender,setGender]=useState('');
  const onSubmit=(e)=>{
    e.preventDefault();
    if(!id)
    {
        alert('please add ID');
        return
    }
    addNewRecord({
      ID:id,
      Name:name,
      Age:age,
      BloodGrp:bloodgrp,
      ContactNo:contactno,
      Address:address,
      Gender:gender});
    setAddress('');
    setId('');
    setAge(0);
    setBloodGrp('');
    setContacNo('');
    setName('');
    setGender('');
  }
  return (
    <form onSubmit={onSubmit} >
      <div className='form-control'>
        <label>Id</label>
        <input type={'text'} placeholder='Add Id' value={id} onChange={(e)=>{setId(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Name</label>
        <input type={'text'} placeholder='Add Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Age</label>
        <input type={'number'} placeholder='Add Age' value={age} onChange={(e)=>{setAge(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Blood Group</label>
        <input type={'text'} placeholder='Add Blood Group' value={bloodgrp} onChange={(e)=>{setBloodGrp(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Gender</label>
        <input type={'text'} placeholder='Add Gender' value={gender} onChange={(e)=>{setGender(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Contact No</label>
        <input type={'text'} placeholder='Add Contact Number' value={contactno} onChange={(e)=>{setContacNo(e.target.value)}}></input>
      </div>
      <div className='form-control'>
        <label>Address</label>
        <input type={'text'} placeholder='Add Address' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
      </div>
      <Button variant="contained" color="success">
      <input className='remove' type={'submit'} value={'Add Record'} ></input>
      </Button>
    </form>
  )
}

export default AddRecord