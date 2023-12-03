import Image from 'next/image'
import styles from './page.module.css'

import * as React from 'react';
import {ChildPage} from "./childPage";


export default function Home() {
    const fakePackage = 'abc'
    const fakeVersion = 'v1.2.3'
    return (
        <ChildPage name={fakePackage} version={fakeVersion}/>
    )
}
