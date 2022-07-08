import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';




export default function simpleTable({records,deleterecord}) {
  console.log('records')
  console.log(records);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Contact No</TableCell>
            <TableCell align="right">Blood Group</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (

          <TableRow
              style={{display:'table-row'}}
              key={record.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <Link to={`/record/${record.ID}`} style={{color:'black'}}> {record.Name}</Link>
              </TableCell>
              <TableCell align="right">{record.Age}</TableCell>
              <TableCell align="right">{record.Gender}</TableCell>
              <TableCell align="right">{record.ContactNo}</TableCell>
              <TableCell align="right">{record.BloodGrp}</TableCell>
              <TableCell align='right'><IconButton onClick={()=>{
                deleterecord(record.ID);
              }}><DeleteIcon/></IconButton></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
