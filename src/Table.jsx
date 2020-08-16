import React from 'react';
import './Table.css'

export default function Table({ colors }) {
    return (
        <div className="table__wrapper">
            <table>
                <thead style={{ backgroundColor: 'black', color: 'white' }}>
                    <tr>
                        <th>Hex</th>
                        <th>Red</th>
                        <th>Green</th>
                        <th>Blue</th>
                        <th>Hue</th>
                        <th>Sat (l)</th>
                        <th>Light</th>
                        <th>Sat (v)</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        colors.map((it, i) => {
                            return (
                                <tr style={{ color: it.hex }} key={it.hsl.h + it.hex}>
                                    <td>{it.hex}</td>
                                    <td>{it.rgb.r}</td>
                                    <td>{it.rgb.g}</td>
                                    <td>{it.rgb.b}</td>
                                    <td>{(it.hsl.h).toFixed(1) + ' deg'}</td>
                                    <td>{(it.hsl.s * 100).toFixed(1) + '%'}</td>
                                    <td>{(it.hsl.l * 100).toFixed(1) + '%'}</td>
                                    <td>{(it.hsv.s * 100).toFixed(1) + '%'}</td>
                                    <td>{(it.hsv.v * 100).toFixed(1) + '%'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}