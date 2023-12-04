import {redirect} from "react-router" ;
import {ReactNode} from "react" ;


export default function Home(): ReactNode {
    const fakePackage = "abc" ;
    const fakeVersion = "v1.2.3" ;
    // return (
    //     <ChildPage name={fakePackage} version={fakeVersion}/>
    // ) ;
    redirect(`/package/${fakePackage}/${fakeVersion}`) ;
    return null ;
}
