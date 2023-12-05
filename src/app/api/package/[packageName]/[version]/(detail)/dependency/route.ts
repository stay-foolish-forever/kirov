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

interface Prop {
    params: PackageNameAndVersion;
}

export async function GET(request: NextRequest, props: Prop): Promise<Response> {
    const {
              params: {
                  packageName,
                  version,
              },
          } = props ;

    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const url = `${process.env.URL}/api/packages/${packageName}/versions/${version}/dependency-tree` ;
            const res = await fetch(
                url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            data = (await res.json()).result ;
            console.log(`fetch ${url} data: `, data) ;
        }
    }
    return Response.json(data) ;
};
