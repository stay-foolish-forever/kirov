"use client";
import * as React from "react" ;
import {JSX} from "react" ;
import {LineChart} from "@/third-parties/@mui/x-charts" ;
import {PackageNameAndVersion} from "@/types/package" ;
import {DependencyTree} from "@/types/dependency" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;
import style from './page.module.css'

function BasicLineChart({x, y}: { x: number[], y: number[] }): JSX.Element {
    return (
        <LineChart
            xAxis={[{scaleType: 'time', data: x}]}
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

export default async function Trend(props: TrendProps): Promise<JSX.Element> {
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

    const data: DependencyTree = await fetch(request)
        .then((res) => res.json());

    const fakeX = [
        new Date('2022-10-01'),
        new Date('2022-10-02'),
        new Date('2022-10-03'),
        new Date('2022-10-05'),
        new Date('2022-10-07'),
        new Date('2022-10-11'),
        new Date('2022-10-13'),
        new Date('2022-10-17'),
        new Date('2022-10-19'),
        new Date('2022-10-23'),
        new Date('2022-10-29'),
        new Date('2022-10-31'),
    ];
    const fakeY = [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5];

    return (
        <div className={style.wrapper}>
            <div className={style.chart}>
                <BasicLineChart x={fakeX} y={fakeY}/>
            </div>
            <h2 className={style.title}>被依赖趋势图</h2>
        </div>
    );
}
