import "./globals.css" ;
import {ReactNode} from "react" ;
import type {Metadata} from "next" ;
import {Inter} from "next/font/google" ;

import Appbar from "@/components/appbar/appbar" ;
import {LocalizationProvider} from "@/third-parties/@mui/x-date-pickers" ;
import {AdapterDayjs} from "@/third-parties/@mui/x-date-pickers/AdapterDayjs" ;

const inter = Inter({subsets: ["latin"]}) ;

export const metadata: Metadata = {
    title          : "Kirov",
    description    : "Dependencies of NPM packages on Github analysis app",
    generator      : "Next.js",
    applicationName: "kirov",
    keywords       : ["Next.js", "React", "Typescript", "Cloud Computing"],
    authors        : [
        {
            name: "Hou Yuxi",
        },
        {
            name: "Zengkun",
        },
    ],
    creator        : "Hou Yuxi",
    formatDetection: {
        email    : false,
        address  : false,
        telephone: false,
    },
} ;

export default function RootLayout(
    {
        children,
    }: {
        children: ReactNode
    }) {
    console.log(process.env.NODE_ENV) ;
    return (
        <html lang="en">
        <body className={inter.className}>
        <nav>
            <Appbar/>
        </nav>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
        </body>
        </html>
    ) ;
}
