import {StatType} from "@/common/enums/stat-type" ;
import {TimeUnit} from "@/common/enums/time-unit" ;

export interface PackageBaseInfo {
    packageId: string;
    packageName: string;
    version: string;
}

export interface DependencyTree extends PackageBaseInfo {
    dependencies?: Array<DependencyTree>;
}

export interface Tendency {
    statTypeEnum: StatType,
    timeUnitEnum: TimeUnit,
    unitCount: number,
    tendencyUnitVOList: Array<{
        time: string,
        count: number
    }>
}
