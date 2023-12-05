import {Rank} from "@/types/package" ;
import {NextRequest} from "next/server" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = Rank[]

function getMockData(): Data {
    return [
        {
            packageName: "typescript",
            version    : "5.3.0",
            count      : Math.ceil(Math.random() * 10000),
        },
        {
            packageName: "eslint",
            version    : "8.53.0",
            count      : Math.ceil(Math.random() * 10000),
        },
        {
            packageName: "next",
            version    : "14.0.2",
            count      : Math.ceil(Math.random() * 10000),
        },
        {
            packageName: "react",
            version    : "18",
            count      : Math.ceil(Math.random() * 10000),
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
            const searchParams = request.nextUrl.searchParams ;
            const realRequest = new NextRequest(
                `${process.env.URL}/api/packages/github/rank`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            searchParams.forEach((value, key) => {
                realRequest.nextUrl.searchParams.set(key, value) ;
            }) ;
            try {
                const res = await fetch(
                    realRequest.nextUrl.href, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }) ;
                data = (await res.json()).result ;
            } catch (e) {
                console.log(e) ;
                data = getMockData() ;
            }
        }
    }
    return Response.json(data) ;
}
