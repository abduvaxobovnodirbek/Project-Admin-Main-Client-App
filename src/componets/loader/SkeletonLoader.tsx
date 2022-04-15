import React from "react";
// @ts-ignore
import Table from "react-skeleton"
import "./loader.css"

interface Props {
    heigthLoader?: string;
}

export default function SkeletonLoader({heigthLoader}: Props) {
    return (
        <div className="mb-2 d-flex justify-content-between text-center align-items-center ml-3">
            <Table width={"90%"} height={heigthLoader}/>
        </div>
    )
}
