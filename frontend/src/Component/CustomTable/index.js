import React from "react";
import {
    Link
} from "react-router-dom";
import instance from "../../apiInstance";
import './table.scss';

export default function CustomTable({ title, header, data }) {

    return (
        <>
            {title && <h1>{title}</h1>}

            <table className="zigzag">
                {header && <thead>
                    <tr>
                        {header.map(h => <th className="header">{h}</th>)}
                    </tr>
                </thead>}
                {data && <tbody>
                    {data.map(d => <tr>
                        {d.map(insideData => <td>{insideData}</td>)}
                    </tr>)}
                </tbody>}
            </table></>
    );
}
