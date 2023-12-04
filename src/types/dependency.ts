export interface DependencyTree {
    packageId: string;
    packageName: string;
    version: string;
    dependencies?: Array<DependencyTree>;
}
