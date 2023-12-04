"use client"
import style from './childPage.module.css'
import * as React from "react";
import {LineChart} from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {TreeView} from '@mui/x-tree-view/TreeView';
import {TreeItem} from '@mui/x-tree-view/TreeItem';

function BasicLineChart({x, y}: { x: number[], y: number[] }) {
    return (
        <LineChart
            xAxis={[{data: x}]}
            series={[
                {
                    data: y,
                },
            ]}
            height={500}
        />
    );
}

interface RenderTree {
    id: string;
    name: string;
    children?: readonly RenderTree[];
}

function RichObjectTreeView({data}) {
    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <Box sx={{minHeight: 110, flexGrow: 1, maxWidth: 300}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
    );
}

export function ChildPage({name, version}) {
    const fakeX = [1, 2, 3, 5, 8, 10]
    const fakeY = [2, 5.5, 2, 8.5, 1.5, 5]

    const fakeTreeData: RenderTree = {
        id: 'root',
        name: 'Parent',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    };

    return (
        <div style={{padding: '3rem 8rem'}}>
            <h1>{name}</h1>
            <div className={style.main}>
                <div className={style.trend}>
                    <div className={style.wrapper}>
                        <div className={style.chart}>
                            <BasicLineChart x={fakeX} y={fakeY}/>
                        </div>
                        <h2 className={style.title}>被依赖趋势图</h2>
                    </div>
                </div>
                <div className={style.detail}>
                    <div>
                        <span className={style.pkgName}>{name}</span>
                        <span className={style.pkgVer}>{version}</span>
                    </div>
                    <div className={style.tree}>
                        <RichObjectTreeView data={fakeTreeData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
