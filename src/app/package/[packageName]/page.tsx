"use client"
import {JSX} from "react" ;
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {DependencyTree} from "@/types/dependency" ;
import {useRouter} from "next/navigation";

interface PackageVersionListProps {
    params: {
        packageName: string
    };
}

function BasicList({arr, clickEvent}: { arr: DependencyTree[], clickEvent: Function }) {
    return (
        <List style={{display: 'flex', flexWrap: 'wrap'}}>
            {arr.map((item, key) => (
                <ListItem disablePadding key={key} style={{flexBasis: '33%', maxWidth: '33%'}}>
                    <ListItemButton>
                        <ListItemText
                            primary={item}
                            onClick={() => clickEvent(item)}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default async function PackageVersionList(props: PackageVersionListProps): Promise<JSX.Element> {
    const router = useRouter()

    const {
        params: {
            packageName,
        },
    } = props;

    const data: DependencyTree = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/version-list`)
        .then((res) => res.json());

    const handleClick = (ver) => {
        const url = `/package/${packageName}/${ver}`
        router.push(url)
    }
    return (
        <>
            <h3 style={{padding: '0 2rem'}}>All package version</h3>
            <div style={{padding: '0 3rem', height: '80%', overflow: 'auto'}}>
                <BasicList arr={data} clickEvent={handleClick}/>
            </div>
        </>
    );
}
