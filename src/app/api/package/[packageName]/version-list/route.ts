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

interface Prop {
    params: PackageNameAndVersion;
}

export async function GET(request: NextRequest, props: Prop): Promise<Response> {
    const {
              params: {
                  packageName,
              },
          } = props ;

    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const url = `${process.env.URL}/api/packages/${packageName}/versions` ;
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
    return Response.json(data.toReversed()) ;
}
