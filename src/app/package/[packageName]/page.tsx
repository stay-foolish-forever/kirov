import {JSX} from "react" ;
import {DependencyTree} from "@/types/dependency" ;

interface PackageVersionListProps {
    params: {
        packageName: string
    };
}

export default async function PackageVersionList(props: PackageVersionListProps): Promise<JSX.Element> {
    const {
              params: {
                  packageName,
              },
          } = props ;

    const data: DependencyTree = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/version-list`)
        .then((res) => res.json()) ;

    return (
        <>
            {
                "Place Package Version List Here!!!"
            }
        </>
    ) ;
}
