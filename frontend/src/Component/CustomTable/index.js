import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CustomTable({ title, header, data, onClick }) {

    return (
        <>
            {title && <h1>{title}</h1>}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {header && <TableHead>
                        <TableRow>
                            {header.map(h => <TableCell align="center">{h}</TableCell>)}
                        </TableRow>
                    </TableHead>}
                    {data && <TableBody>
                        {data.map(d => <TableRow
                            key={data.insideData}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {d.map(insideData => <TableCell align="center" style={{ cursor: onClick ? 'pointer' : 'default' }} onClick={() => onClick && onClick(d)}>{insideData}</TableCell>)}
                        </TableRow>)}
                    </TableBody>}
                </Table>
            </TableContainer></>
    );
}
