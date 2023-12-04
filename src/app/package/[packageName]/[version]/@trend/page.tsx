"use client" ;
import * as React from "react" ;
import {JSX} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {TitledContainer} from "@/components/titled-container/titled-container" ;

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

export default function ChildPage(
    {
        params: {packageName, version},
    }: {
        params: {
            packageName: string,
            version: string
        }
    }): JSX.Element {
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
