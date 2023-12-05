"use client" ;

import {JSX, Suspense, useEffect, useRef} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {PackageNameAndVersion, Tendency} from "@/types/package" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;
import style from "./page.module.css" ;
import {useMount, useSafeState} from "ahooks" ;
import Picker from "@/components/picker/picker" ;

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

    const refRequest = useRef(new NextRequest(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/${version}/be-dependent-on-amount`)) ;
    const searchParams = refRequest.current.nextUrl.searchParams ;
    useMount(() => {
        searchParams.set("start", "2022-01-01") ;
        searchParams.set("end", "2023-12-01") ;
        searchParams.set("timeUnitEnum", TimeUnit.DAY) ;
        searchParams.set("statTypeEnum", StatType.NPM) ;
    }) ;

    const [content, setContent] = useSafeState("...Loading") ;

    const [data, setData] = useSafeState<Tendency | null>(null) ;
    const [trigger, setTrigger] = useSafeState<boolean>(true) ;
    useEffect(() => {
        (async () => {
            if (trigger) {
                const data: Tendency = await fetch(refRequest.current.nextUrl.href)
                    .then((res) => res.json()) ;
                setData(data) ;
                if (data && data.tendencyUnitVOList.length === 0) {
                    setContent("No Tendency") ;
                }
                setTrigger(false) ;
            }
        })() ;
    }, [trigger]) ;

    const timeData = data ? data.tendencyUnitVOList.map(({time}) => time) : [] ;
    const countData = data ? data.tendencyUnitVOList.map(({count}) => count) : [] ;

    return (
        <div className={style.wrapper}>
            <span className={style.title}>被依赖趋势图</span>
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
            <Suspense fallback={
                <>
                    ...Loading
                </>
            }>
                <div className={style.chart}>
                    {
                        timeData.length > 0 ? <BasicLineChart x={timeData} y={countData}/> :
                        <>
                            {
                                content
                            }
                        </>
                    }
                </div>
            </Suspense>
        </div>
    ) ;
}
