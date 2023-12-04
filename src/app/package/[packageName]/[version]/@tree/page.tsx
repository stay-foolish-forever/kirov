"use client" ;

import {JSX, ReactNode} from "react" ;

import Box from "@mui/material/Box" ;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore" ;
import ChevronRightIcon from "@mui/icons-material/ChevronRight" ;
import {TreeItem, TreeView} from "@/third-parties/@mui/x-tree-view" ;

import {DependencyTree} from "@/types/dependency" ;
import {PackageNameAndVersion} from "@/types/package" ;

function renderTree(nodes: DependencyTree): ReactNode {
    return (
        <TreeItem key={nodes.packageId} nodeId={nodes.packageId} label={nodes.packageName}>
            {
                Array.isArray(nodes.dependencies)
                ? nodes.dependencies.map((node) => renderTree(node))
                : null
            }
        </TreeItem>
    ) ;
};

function RichObjectTreeView({data}: { data: DependencyTree }): JSX.Element {
    return (
        <Box sx={{minHeight: 110, flexGrow: 1, maxWidth: 300}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpanded={["root"]}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
    ) ;
}

interface TreeProps {
    params: PackageNameAndVersion;
}

export default async function Tree(props: TreeProps): Promise<JSX.Element> {
    const {
              params: {
                  packageName,
                  version,
              },
          } = props ;

    const data: DependencyTree = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/${version}/dependency`)
        .then((res) => res.json()) ;

    return (
        <>
            <div>
                <span>{packageName}</span>:
                <span>{version}</span>
                {
                    data ? (<RichObjectTreeView data={data}/>) : (<></>)
                }
            </div>
        </>
    ) ;
}
