import {StatType} from "@/common/enums/stat-type" ;
import {TimeUnit} from "@/common/enums/time-unit" ;

export interface PackageNameAndVersion {
    packageName: string;
    version: string;
}

export interface PackageIdentity extends PackageNameAndVersion {
    packageId: string;
}

export interface Rank extends PackageNameAndVersion {
    count: number;
}

export interface DependencyTree extends PackageIdentity {
    dependencies?: Array<DependencyTree>;
}

export interface Tendency extends Partial<PackageNameAndVersion> {
    statTypeEnum: StatType,
    timeUnitEnum: TimeUnit,
    unitCount: number,
    tendencyUnitVOList: Array<{
        time: number,
        count: number
    }>
}
