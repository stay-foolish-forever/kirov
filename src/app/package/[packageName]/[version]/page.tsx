"use client" ;
import * as React from "react" ;
import {JSX} from "react" ;
import {PackageNameAndVersion} from "@/types/package" ;

interface PackageInfoProps {
    params: PackageNameAndVersion;
}

export default function PackageInfo(props: PackageInfoProps): JSX.Element {
    const {
              params: {
                  packageName,
              },
          } = props ;

    return (
        <>
            <h1>{packageName}</h1>
        </>
    ) ;
}
