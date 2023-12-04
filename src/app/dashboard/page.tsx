"use client"

import {JSX} from "react" ;
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useRouter} from "next/navigation";

interface Rank {
    rank: number,
    name: string,
    count: number,
}

const fakeRank: Rank[] = [
    {rank: 1, name: 'User A', count: 100},
    {rank: 2, name: 'User B', count: 97},
    {rank: 3, name: 'User C', count: 91},
    {rank: 4, name: 'User D', count: 89},
    {rank: 5, name: 'User E', count: 83},
    {rank: 6, name: 'User F', count: 79},
    {rank: 7, name: 'User G', count: 73},
    {rank: 8, name: 'User H', count: 71},
    {rank: 9, name: 'User I', count: 67},
    {rank: 10, name: 'User J', count: 61},
    {rank: 11, name: 'User K', count: 59},
    {rank: 12, name: 'User L', count: 53},
    {rank: 13, name: 'User M', count: 47},
    {rank: 14, name: 'User N', count: 43},
    {rank: 15, name: 'User O', count: 41},
];


function BasicTable({rows, clickEvent}: { rows: Rank[], clickEvent: Function }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Rank</TableCell>
                        <TableCell>Package name</TableCell>
                        <TableCell>Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow hover onClick={() => clickEvent(row.name)}
                                  key={row.name}
                                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align='center'>
                                {row.rank}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}}>{row.name}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Dashboard(): JSX.Element {
    const router = useRouter()
    const handleClick = (pkg) => {
        const url = '/package/' + pkg
        router.push(url)
    }
    return (
        <div style={{height: '90%', padding: '2rem 3rem', display: "flex", flexDirection: 'column'}}>
            <h2 style={{textAlign: 'center'}}>Github 热门包排名</h2>
            <div style={{margin: '2rem 16rem', flex: 1, overflow: 'auto'}}>
                <BasicTable rows={fakeRank} clickEvent={handleClick}/>
            </div>
        </div>
    );
}
