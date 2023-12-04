import {JSX, ReactNode} from "react" ;
import style from "./titled-container.module.css" ;

export function TitledContainer(
    {title, children}:
        {
            title: string,
            children: ReactNode
        }): JSX.Element {
    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.chart}>
                {children}
            </div>
        </div>
    ) ;
}
