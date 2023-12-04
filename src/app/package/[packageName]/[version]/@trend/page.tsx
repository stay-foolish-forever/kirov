"use client" ;
import * as React from "react" ;
import {JSX} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {TitledContainer} from "@/components/titled-container/titled-container" ;
import {PackageNameAndVersion} from "@/types/package" ;
import {DependencyTree} from "@/types/dependency" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;

function BasicLineChart({x, y}: { x: number[], y: number[] }): JSX.Element {
    return (
        <LineChart
            xAxis={[{data: x}]}
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

export default async function Trend(props: TrendProps): Promise<JSX.Element> {
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

    const data: DependencyTree = await fetch(request)
        .then((res) => res.json()) ;

    const fakeX = [1, 2, 3, 5, 8, 10] ;
    const fakeY = [2, 5.5, 2, 8.5, 1.5, 5] ;

    return (
        <>
            <div>
                <div>
                    <TitledContainer title={packageName + "被依赖趋势"}>
                        <BasicLineChart x={fakeX} y={fakeY}/>
                    </TitledContainer>
                </div>
            </div>
        </>
    ) ;
}
