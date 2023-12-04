"use client" ;
import {JSX, ReactNode} from "react" ;

export default function Layout(
    {tree, trend, children}: {
        tree: ReactNode,
        trend: ReactNode,
        children: ReactNode,
    },
): JSX.Element {
    return (
        <>
            {children}
            {trend}
            {tree}
        </>
    ) ;

}
