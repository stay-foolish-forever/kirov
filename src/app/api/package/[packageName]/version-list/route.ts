import {PackageNameAndVersion} from "@/types/package" ;
import {NextRequest} from "next/server" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = string[];

function getMockData(): Data {
    return [
        "v1.0",
        "v2.0-alpha",
        "v2.0",
        "v3.0-alpha",
        "v3.0-beta",
        "v3.0-rc",
        "v4.0",
    ] ;
}

export async function GET(request: NextRequest, params: PackageNameAndVersion): Promise<Response> {
    const {packageName} = params ;

    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const res = await fetch(
                `${process.env.URL}/api/packages/${packageName}/versions`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            data = (await res.json()).result ;
        }
    }
    return Response.json(data) ;
}
