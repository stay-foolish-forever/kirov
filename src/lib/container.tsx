import * as React from "react";
import style from "./container.module.css"

export function Container({title, children}) {
    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.chart}>
                {children}
            </div>
        </div>
    )
}
