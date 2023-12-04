import {NextRequest} from "next/server" ;

export function createGET<Param, Data>(
    getUrl: (params: Param) => string,
    getMockData: () => Data,
) {
    return async function GET(request: NextRequest, params: Param): Promise<Response> {
        let data: Data ;
        switch (process.env.NODE_ENV) {
            case "development":
                data = getMockData() ;
                break ;
            default:
            {
                const res = await fetch(getUrl(params)) ;
                data = (await res.json()).data ;
            }
        }
        return Response.json(data) ;
    } ;
}
