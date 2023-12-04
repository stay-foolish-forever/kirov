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
        <div style={{padding: '0 8rem'}}>
            <div>{children}</div>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', padding: '0 2rem'}}>
                    {trend}
                </div>
                <div>
                    {tree}
                </div>
            </div>
        </div>
    );
}
