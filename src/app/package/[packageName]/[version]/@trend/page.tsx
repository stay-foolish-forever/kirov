"use client" ;

import {JSX, useEffect} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {PackageNameAndVersion, Tendency} from "@/types/package" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;
import style from "./page.module.css" ;
import {useSafeState} from "ahooks" ;

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
    ) ;
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
          } = props ;

    const request = new NextRequest(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/${version}/be-dependent-on-amount`) ;
    const searchParams = request.nextUrl.searchParams ;
    //TODO: write some interactive components to get the following values
    searchParams.set("start", "2023-01-01") ;
    searchParams.set("end", "2023-01-31") ;
    searchParams.set("timeUnitEnum", TimeUnit.DAY) ;
    searchParams.set("statTypeEnum", StatType.NPM) ;

    const [data, setData] = useSafeState<Tendency | null>(null) ;
    useEffect(() => {
        (async () => {
            setData(
                await fetch(request)
                    .then((res) => res.json()),
            ) ;
        })() ;
    }) ;

    const timeData = data ? data.tendencyUnitVOList.map(({time}) => time) : [] ;
    const countData = data ? data.tendencyUnitVOList.map(({count}) => count) : [] ;

    return (
        <div className={style.wrapper}>
            <div className={style.chart}>
                {
                    data ? <BasicLineChart x={timeData} y={countData}/> : <></>
                }
            </div>
            <h2 className={style.title}>被依赖趋势图</h2>
        </div>
    ) ;
}
