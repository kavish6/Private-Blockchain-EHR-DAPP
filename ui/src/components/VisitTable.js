import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const VisitTable = ({visits}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Doctor</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Tests</TableCell>
            <TableCell align="right">Diagnosis</TableCell>
            <TableCell align='right'>Prescription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map((visit,index) => (

          <TableRow
              style={{display:'table-row'}}
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {visit.Date}
              </TableCell>
              <TableCell align="right">{visit.Doctor}</TableCell>
              <TableCell align="right">{visit.Description}</TableCell>
              <TableCell align="right">{visit.Testperformed}</TableCell>
              <TableCell align="right">{visit.Diagnosis}</TableCell>
              <TableCell align='right'>{visit.Prescription}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VisitTable