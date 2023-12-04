import {PackageNameAndVersion} from "@/types/package" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;
import {Tendency} from "@/types/dependency" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = Tendency

function getMockData(): Data {
    return {
        statTypeEnum      : StatType.NPM,
        timeUnitEnum      : TimeUnit.DAY,
        unitCount         : 31,
        tendencyUnitVOList: [
            //TODO: need to supplement data
        ],
    } ;
}

export interface APIBeDependentOnAmountQuery {
    start: string,
    end: string,
    timeUnitEnum: TimeUnit,
    statTypeEnum: StatType
}

export async function GET(request: NextRequest, params: PackageNameAndVersion): Promise<Response> {
    const {
              packageName,
              version,
          } = params ;

    let data: Data ;
    switch (process.env.NODE_ENV) {
        case "development":
            data = getMockData() ;
            break ;
        default:
        {
            const searchParams = request.nextUrl.searchParams ;
            searchParams.set("packageName", packageName) ;
            searchParams.set("version", version) ;

            const realRequest = new NextRequest(`${process.env.URL}/api/packages/tendency`) ;
            searchParams.forEach((value, key) => {
                realRequest.nextUrl.searchParams.set(key, value) ;
            }) ;

            const res = await fetch(realRequest) ;
            data = (await res.json()).result ;
        }
    }
    return Response.json(data) ;
};
