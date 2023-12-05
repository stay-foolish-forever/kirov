import {Rank} from "@/types/package" ;
import {NextRequest} from "next/server" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = Rank[]

function getMockData(): Data {
    return [
        {
            packageName: "typescript",
            version    : "5.3.0",
            count      : 1000,
        },
        {
            packageName: "eslint",
            version    : "8.53.0",
            count      : 2343,
        },
        {
            packageName: "next",
            version    : "14.0.2",
            count      : 6543,
        },
        {
            packageName: "react",
            version    : "18",
            count      : 85032,
        },
    ] ;
}

export async function GET(request: NextRequest): Promise<Response> {
    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const res = await fetch(
                `${process.env.URL}/api/packages/github/rank`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            data = (await res.json()) ;
        }
    }
    return Response.json(data) ;
}
