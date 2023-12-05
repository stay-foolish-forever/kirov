import {DependencyTree, PackageNameAndVersion} from "@/types/package" ;
import {NextRequest} from "next/server" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = DependencyTree

function getMockData(): Data {
    return {
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
}

export async function GET(request: NextRequest, params: PackageNameAndVersion): Promise<Response> {
    const {packageName, version} = params ;

    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const res = await fetch(
                `${process.env.URL}/api/packages/${packageName}/versions/${version}/dependency-tree`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            data = (await res.json()).result ;
        }
    }
    return Response.json(data) ;
};
