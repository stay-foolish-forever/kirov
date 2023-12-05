"use client";

import {JSX, useState, useEffect} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {PackageNameAndVersion, Tendency} from "@/types/package" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;
import style from "./page.module.css" ;
import {useSafeState} from "ahooks" ;
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

function BasicLineChart({x, y}: { x: number[], y: number[] }): JSX.Element {
    return (
        <LineChart
            xAxis={[{scaleType: "time", data: x}]}
            series={[
                {
                    data: y,
                },
            ]}
            height={500}
        />
    );
}

interface TrendProps {
    params: PackageNameAndVersion;
}

export default function Trend(props: TrendProps): JSX.Element {
    const {
        params: {
            packageName,
            version,
        },
    } = props;

    const request = new NextRequest(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/${version}/be-dependent-on-amount`);
    const searchParams = request.nextUrl.searchParams;
    //TODO: write some interactive components to get the following values
    searchParams.set("start", "2023-01-01");
    searchParams.set("end", "2023-01-31");
    searchParams.set("timeUnitEnum", TimeUnit.DAY);
    searchParams.set("statTypeEnum", StatType.NPM);

    const [data, setData] = useSafeState<Tendency | null>(null);
    useEffect(() => {
        (async () => {
            setData(
                await fetch(request)
                    .then((res) => res.json()),
            );
        })();
    });

    const timeData = data ? data.tendencyUnitVOList.map(({time}) => time) : [];
    const countData = data ? data.tendencyUnitVOList.map(({count}) => count) : [];

    return (
        <div className={style.wrapper}>
            <span className={style.title}>被依赖趋势图</span>
            <div className={style.chart}>
                {
                    data ? <BasicLineChart x={timeData} y={countData}/> : <></>
                }
            </div>
            <Picker
                changeStart={(newValue: Dayjs) => {
                    searchParams.set("start", newValue.format('YYYY-MM-DD'))
                }}
                changeEnd={(newValue: Dayjs) => {
                    searchParams.set("end", newValue.format('YYYY-MM-DD'))
                }}
                changeTime={(newValue: string) => {
                    searchParams.set("timeUnitEnum", newValue)
                }}
                changeType={(newValue: string) => {
                    searchParams.set("statTypeEnum", newValue)
                }}
            />
        </div>
    );
}

function Picker({changeStart, changeEnd, changeTime, changeType}: {
    changeStart: Function,
    changeEnd: Function,
    changeTime: Function,
    changeType: Function,
}) {
    const [startDay, setStartDay] = useState<Dayjs>(dayjs('2022-12'));
    const [endDay, setEndDay] = useState<Dayjs>(dayjs('2023'));
    const [time, setTime] = useState<string>(TimeUnit.DAY);
    const [type, setType] = useState<string>(StatType.NPM);

    const handleStart = (newValue: Dayjs | null) => {
        if (newValue) {
            setStartDay(newValue)
            console.log(newValue.format('YYYY-MM-DD'))
            changeStart(newValue)
        }
    };
    const handleEnd = (newValue: Dayjs | null) => {
        if (newValue) {
            setEndDay(newValue)
            console.log(newValue.format('YYYY-MM-DD'))
            changeEnd(newValue)
        }
    };
    const handleTime = (event: SelectChangeEvent) => {
        setTime(event.target.value);
        console.log(time)
        changeTime(time)
    };
    const handleType = (event: SelectChangeEvent) => {
        setType(event.target.value);
        console.log(type)
        changeType(type)
    };
    return (
        <div style={{display: "flex"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker label="Start date"
                                value={startDay}
                                onChange={(value) => handleStart(value)}/>
                    <DatePicker label="End date"
                                value={endDay}
                                onChange={(value) => handleEnd(value)}/>
                    {/*<Select*/}
                    {/*    value={time}*/}
                    {/*    label="TimeUnit"*/}
                    {/*    onChange={handleTime}*/}
                    {/*>*/}
                    {/*    <MenuItem value={TimeUnit.DAY}>DAY</MenuItem>*/}
                    {/*    <MenuItem value={TimeUnit.MONTH}>MONTH</MenuItem>*/}
                    {/*    <MenuItem value={TimeUnit.YEAR}>YEAR</MenuItem>*/}
                    {/*</Select>*/}
                    <Select
                        value={type}
                        label="StatType"
                        onChange={handleType}
                    >
                        <MenuItem value={StatType.NPM}>NPM</MenuItem>
                        <MenuItem value={StatType.GITHUB}>GITHUB</MenuItem>
                    </Select>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}
