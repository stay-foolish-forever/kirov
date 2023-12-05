"use client" ;

import {JSX, useEffect, useRef} from "react" ;
import {useMount, useSafeState} from "ahooks" ;
import {NextRequest} from "next/server" ;
import {useRouter} from "next/navigation" ;
import {StatType} from "@/common/enums/stat-type" ;
import Picker from "@/components/picker/picker" ;

import Box from "@mui/material/Box" ;
import Paper from "@mui/material/Paper" ;
import Table from "@mui/material/Table" ;
import TableHead from "@mui/material/TableHead" ;
import TableRow from "@mui/material/TableRow" ;
import TableCell from "@mui/material/TableCell" ;
import TableBody from "@mui/material/TableBody" ;
import TableContainer from "@mui/material/TableContainer" ;

import {Rank} from "@/types/package" ;
import {TimeUnit} from "@/common/enums/time-unit" ;

function BasicTable({rows, clickEvent}: { rows: Rank[], clickEvent: (packageName: string) => void }): JSX.Element {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">排名</TableCell>
                        <TableCell>包</TableCell>
                        <TableCell>被依赖次数</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{overflow: "visible"}}>
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

    const refRequest = useRef(new NextRequest(`${process.env.NEXT_PUBLIC_URL}/api/dashboard`)) ;
    const searchParams = refRequest.current.nextUrl.searchParams ;
    useMount(() => {
        searchParams.set("start", "2023-01-01") ;
        searchParams.set("end", "2023-01-31") ;
        searchParams.set("timeUnitEnum", TimeUnit.DAY) ;
        searchParams.set("statTypeEnum", StatType.GITHUB) ;
        searchParams.set("limit", "10") ;
    }) ;

    const [data, setData] = useSafeState([]) ;
    const [trigger, setTrigger] = useSafeState<boolean>(true) ;
    useEffect(() => {
        (async () => {
            if (trigger) {
                setData(
                    await fetch(refRequest.current.nextUrl.href)
                        .then((res) => res.json()),
                ) ;
                setTrigger(false) ;
            }
        })() ;
    }) ;

    return (
        <>
            <Box sx={{
                marginTop    : "4rem",
                width        : "100%",
                display      : "flex",
                flexDirection: "column",
                alignItems   : "center",
                overflow     : "auto",
            }}>
                <Picker
                    changeStart={(newValue: string) => {
                        searchParams.set("start", newValue) ;
                        setTrigger(true) ;
                    }}
                    changeEnd={(newValue: string) => {
                        searchParams.set("end", newValue) ;
                        setTrigger(true) ;
                    }}
                    changeType={(newValue: string) => {
                        searchParams.set("statTypeEnum", newValue) ;
                        setTrigger(true) ;
                    }}
                />
                <div
                    style={{height: "90%", width: "100%", padding: "2rem 0rem", display: "flex", flexDirection: "column"}}>
                    <h2 style={{textAlign: "center"}}>Github 热门包排名</h2>
                    <div style={{margin: "2rem 16rem", flex: 1, overflow: "visible"}}>
                        <BasicTable rows={data} clickEvent={handleClick}/>
                    </div>
                </div>
            </Box>

        </>
    ) ;
}
