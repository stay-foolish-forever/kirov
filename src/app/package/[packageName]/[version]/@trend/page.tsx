"use client" ;
import * as React from "react" ;
import {JSX} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {TitledContainer} from "@/components/titled-container/titled-container" ;
import {PackageNameAndVersion} from "@/types/package" ;

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

export default function Trend(props: TrendProps): JSX.Element {
    const {
              params: {
                  packageName,
              },
          } = props ;

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
