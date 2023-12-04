"use client" ;
import * as React from "react" ;
import {JSX} from "react" ;

export default function ChildPage(
    {
        params: {packageName, version},
    }: {
        params: {
            packageName: string,
            version: string
        }
    }): JSX.Element {

    return (
        <>
            <h1>{packageName}</h1>
        </>
    ) ;
}
