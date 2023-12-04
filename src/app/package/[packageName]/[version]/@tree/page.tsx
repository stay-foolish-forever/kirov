import {DependencyTree} from "@/types/dependency" ;
import * as React from "react" ;
import {JSX, ReactNode} from "react" ;
import Box from "@mui/material/Box" ;
import {TreeItem, TreeView} from "@/third-parties/@mui/x-tree-view" ;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore" ;
import ChevronRightIcon from "@mui/icons-material/ChevronRight" ;

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

const fakeTreeData: DependencyTree = {
    packageId   : "root",
    packageName : "Parent",
    version     : "1.0",
    dependencies: [
        {
            packageId  : "1",
            packageName: "Child - 1",
            version    : "1.0",
        },
        {
            packageId   : "3",
            packageName : "Child - 3",
            version     : "1.0",
            dependencies: [
                {
                    packageId  : "4",
                    packageName: "Child - 4",
                    version    : "1.0",
                },
            ],
        },
    ],
} ;

export default function Tree(
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
            <div>
                <span>{packageName}</span>
                <span>{version}</span>
                <RichObjectTreeView data={fakeTreeData}/>
            </div>
        </>
    ) ;
}
