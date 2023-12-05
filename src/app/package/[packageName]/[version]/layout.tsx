"use client";
import {JSX, ReactNode} from "react" ;
import * as React from "react";

export default function Layout(
    {tree, trend, children}: {
        tree: ReactNode,
        trend: ReactNode,
        children: ReactNode,
    },
): JSX.Element {
    return (
        <div style={{padding: '4rem 8rem'}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '60%', padding: '0 2rem'}}>
                    {trend}
                </div>
                <div>
                    {tree}
                </div>
            </div>
        </div>
    );
}
