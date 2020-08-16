import React, { useState, useMemo, useRef, useEffect } from 'react';
import {matrix, multiply } from 'mathjs';

const DEG_TO_RAD = Math.PI / 180

export function Canvas3D({colors, getCoordFromColor }) {
    let [tiltAngle, setTilt] = useState( - 33 * DEG_TO_RAD);
    let [rotAngle, setRot] = useState(30 * DEG_TO_RAD);
    let [active, setActive] = useState(false);
    const transfo = useRef(new Rotation3D(tiltAngle, rotAngle))
    useInterval(() => setRot((rotAngle + 1 * DEG_TO_RAD) % (2* Math.PI)), active ? 50 : null)

    const points = useMemo(() => {
        if(colors.length > 0){
            let newP = [];
            transfo.current.setRotation(rotAngle)
            for(let i = 0; i < colors.length; i++){
                const color = colors[i];
                let coord = transfo.current.transform(getCoordFromColor(color)).toArray();
                newP.push({
                    x: coord[0],
                    y: coord[1],
                    z: coord[2],
                    color: color,
                })
            }
            return (newP.sort((a, b) => a.z - b.z));
        }
    }, [colors, rotAngle]);

    return (
        <svg viewBox="-15 -15 30 30" onClick={() => setActive(it => !it)}>
            {
                points.length > 0 ? points.map(it => <circle key={it.color.hex+it.color.hsl.h} cx={it.x} cy={it.y} r={0.8 + it.z / 200} fill={it.color.hex}/>) : null
            }
        </svg>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

class Rotation3D {
    constructor(tilt, rot){
        let ct = Math.cos(tilt);
        let st = Math.sin(tilt);
        let cr = Math.cos(rot);
        let sr = Math.sin(rot);
        this.tiltMatrix = matrix([
            [1, 0, 0],
            [0, ct, -st],
            [0, st, ct]
        ])
        this.rotMatrix = matrix([
            [cr, 0, -sr],
            [0, 1, 0],
            [sr, 0, cr]
        ])
        this.productMatrix = multiply(this.tiltMatrix, this.rotMatrix);
    }

    setRotation(rot){
        let cr = Math.cos(rot);
        let sr = Math.sin(rot);
        this.rotMatrix = matrix([
            [cr, 0, -sr],
            [0, 1, 0],
            [sr, 0, cr]
        ]);
        this.productMatrix = multiply(this.tiltMatrix, this.rotMatrix);
    }

    transform(vec){
        return(multiply(this.productMatrix, vec))
    }
}
