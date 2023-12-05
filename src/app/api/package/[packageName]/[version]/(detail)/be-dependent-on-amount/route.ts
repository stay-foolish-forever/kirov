import {PackageNameAndVersion, Tendency} from "@/types/package" ;
import {NextRequest} from "next/server" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {StatType} from "@/common/enums/stat-type" ;

export const dynamic = "force-dynamic" ; // defaults to force-static

type Data = Tendency

const fakeX = [
    new Date("2022-10-01"),
    new Date("2022-10-02"),
    new Date("2022-10-03"),
    new Date("2022-10-05"),
    new Date("2022-10-07"),
    new Date("2022-10-11"),
    new Date("2022-10-13"),
    new Date("2022-10-17"),
    new Date("2022-10-19"),
    new Date("2022-10-23"),
    new Date("2022-10-29"),
    new Date("2022-10-31"),
] ;
const fakeY = [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5] ;

function getMockData(): Data {
    const list: Tendency["tendencyUnitVOList"] = [] ;
    for (let i = 0 ;i < fakeX.length ;i++) {
        list.push({
                      time : fakeX[i].getTime(),
                      count: fakeY[i],
                  }) ;
    }

    return {
        statTypeEnum      : StatType.NPM,
        timeUnitEnum      : TimeUnit.DAY,
        unitCount         : 31,
        tendencyUnitVOList: list,
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

            const realRequest = new NextRequest(
                `${process.env.URL}/api/packages/tendency`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) ;
            searchParams.forEach((value, key) => {
                realRequest.nextUrl.searchParams.set(key, value) ;
            }) ;

            const res = await fetch(realRequest) ;
            data = (await res.json()).result ;
        }
    }
    return Response.json(data) ;
};
