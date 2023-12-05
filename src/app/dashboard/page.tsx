"use client" ;

import {JSX, useEffect} from "react" ;
import {useRouter} from "next/navigation" ;
import {Rank} from "@/types/package" ;

import TableContainer from "@mui/material/TableContainer" ;
import Paper from "@mui/material/Paper" ;
import Table from "@mui/material/Table" ;
import TableHead from "@mui/material/TableHead" ;
import TableRow from "@mui/material/TableRow" ;
import TableCell from "@mui/material/TableCell" ;
import TableBody from "@mui/material/TableBody" ;
import {useSafeState} from "ahooks" ;

function BasicTable({rows, clickEvent}: { rows: Rank[], clickEvent: (packageName: string) => void }): JSX.Element {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Rank</TableCell>
                        <TableCell>Package name</TableCell>
                        <TableCell>Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((rank, index) => (
                        <TableRow hover onClick={() => void clickEvent(rank.packageName)}
                                  key={`${rank.packageName}:${rank.version}`}
                                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            <TableCell align="center">
                                {index + 1}
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}}>{rank.packageName}</TableCell>
                            <TableCell>{rank.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) ;
}

export default function Dashboard(): JSX.Element {
    const router = useRouter() ;
    const handleClick = (pkg: string) => {
        const url = "/package/" + pkg ;
        router.push(url) ;
    } ;

    const [data, setData] = useSafeState([]) ;
    useEffect(() => {
        (async () => {
            setData(
                await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard`)
                    .then((res) => res.json()),
            ) ;
        })() ;
    }) ;

    return (
        <div style={{height: "90%", padding: "2rem 3rem", display: "flex", flexDirection: "column"}}>
            <h2 style={{textAlign: "center"}}>Github 热门包排名</h2>
            <div style={{margin: "2rem 16rem", flex: 1, overflow: "auto"}}>
                <BasicTable rows={data} clickEvent={handleClick}/>
            </div>
        </div>
    ) ;
}
