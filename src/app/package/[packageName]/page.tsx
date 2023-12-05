"use client" ;
import {JSX, useEffect} from "react" ;
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material" ;
import {useRouter} from "next/navigation" ;
import {useSafeState} from "ahooks" ;

interface PackageVersionListProps {
    params: {
        packageName: string
    };
}

function BasicList({versionList, clickEvent}: { versionList: string[], clickEvent: Function }) {
    return (
        <List style={{display: "flex", flexWrap: "wrap"}}>
            {versionList.map((version) => (
                <ListItem disablePadding key={version} style={{flexBasis: "33%", maxWidth: "33%"}}>
                    <ListItemButton>
                        <ListItemText
                            primary={version}
                            onClick={() => clickEvent(version)}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    ) ;
}

export default function PackageVersionList(props: PackageVersionListProps): JSX.Element {
    const router = useRouter() ;

    const {
              params: {
                  packageName,
              },
          } = props ;

    const [data, setData] = useSafeState<string[]>([]) ;
    useEffect(() => {
        const func = async (packageName: string) => {
            setData(
                await fetch(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/version-list`)
                    .then((res) => res.json()),
            ) ;
        } ;
        func(packageName) ;
    }, []) ;

    const handleClick = (version: string) => {
        const url = `/package/${packageName}/${version}` ;
        router.push(url) ;
    } ;
    return (
        <>
            <h3 style={{padding: "0 2rem", margin: "0 auto"}}>package {packageName} versions</h3>
            <div style={{padding: "0 3rem", height: "80%", overflow: "auto"}}>
                <BasicList versionList={data} clickEvent={handleClick}/>
            </div>
        </>
    ) ;
}
