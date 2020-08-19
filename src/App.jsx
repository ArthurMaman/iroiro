import './App.css'
import React, { useState } from 'react'
import { Canvas3D } from './3D'
import Convert from './Convert';
import Color from './Color'
import Table from './Table';

const DEG_TO_RAD = Math.PI / 180;

const reset = [
    new Color('#ffffff'),
    new Color('#000000'),
]

const rgbCube = [
    new Color('#ffffff'),
    new Color('#000000'),
    new Color('#ff0000'),
    new Color('#00ff00'),
    new Color('#0000ff'),
    new Color('#ff00ff'),
    new Color('#ffff00'),
    new Color('#00ffff'),
    new Color('#888888'),
]

const hslBicone = [
    new Color('#ffffff'),
    new Color('#000000'),
    new Color({h: 300, s:0, l: 0.5 }, 'hsl'),
    new Color({h: 300, s:0.25, l: 0.5 }, 'hsl'),
    new Color({h: 300, s:0.5, l: 0.5 }, 'hsl'),
    new Color({h: 300, s:0.75, l: 0.5 }, 'hsl'),
    new Color({h: 300, s:1, l: 0.5 }, 'hsl'),
    new Color({h: 300, s:1, l: 1 }, 'hsl'),
    new Color({h: 300, s:1, l: 0.75 }, 'hsl'),
    new Color({h: 300, s:1, l: 0.25 }, 'hsl'),
    new Color({h: 300, s:1, l: 0 }, 'hsl'),
    new Color({h: 120, s:0, l: 0.5 }, 'hsl'),
    new Color({h: 120, s:0.25, l: 0.5 }, 'hsl'),
    new Color({h: 120, s:0.5, l: 0.5 }, 'hsl'),
    new Color({h: 120, s:0.75, l: 0.5 }, 'hsl'),
    new Color({h: 120, s:1, l: 0.5 }, 'hsl'),
    new Color({h: 120, s:1, l: 1 }, 'hsl'),
    new Color({h: 120, s:1, l: 0.75 }, 'hsl'),
    new Color({h: 120, s:1, l: 0.25 }, 'hsl'),
    new Color({h: 120, s:1, l: 0 }, 'hsl'),
]

const hsvCone = [
    new Color('#ffffff'),
    new Color('#000000'),
    new Color({h: 300, s:0.25, v: 1 }, 'hsv'),
    new Color({h: 300, s:0.5, v: 1 }, 'hsv'),
    new Color({h: 300, s:0.75, v: 1 }, 'hsv'),
    new Color({h: 300, s:1, v: 1 }, 'hsv'),
    new Color({h: 300, s:1, v: 0.75 }, 'hsv'),
    new Color({h: 300, s:1, v: 0.5 }, 'hsv'),
    new Color({h: 300, s:1, v: 0.25 }, 'hsv'),
    new Color({h: 120, s:0.25, v: 1 }, 'hsv'),
    new Color({h: 120, s:0.5, v: 1 }, 'hsv'),
    new Color({h: 120, s:0.75, v: 1 }, 'hsv'),
    new Color({h: 120, s:1, v: 1 }, 'hsv'),
    new Color({h: 120, s:1, v: 0.75 }, 'hsv'),
    new Color({h: 120, s:1, v: 0.5 }, 'hsv'),
    new Color({h: 120, s:1, v: 0.25 }, 'hsv'),
]

export default function App() {
    // TO DO : Select a color from the table to see it on the grap
    // TO DO : Opposite color ? 
    // TO DO : More educationnal content
    // TO DO : Remove Mathjs dependency
    // TO DO : Learn UI :(

    const [colors, setColors] = useState(rgbCube)

    const pushColor = color => {
        let flag = false;
        for (let c of colors) {
            if (c.hex === color.hex) flag = true;
        }
        if (!flag) setColors([...colors, color])
    };


    return (
        <div className="app">
            <header>
                <h1>iroiro</h1>
                <div>A simple tool to visualize color in space</div>
            </header>
            <main>
                <div className="graphiques">
                    <div className="graphiques__card">
                        <h2>RGB</h2>
                        <Canvas3D colors={colors} getCoordFromColor={getRbgCoord}/>
                    </div>
                    <div className="graphiques__card">
                        <h2>HSV</h2>
                        <Canvas3D colors={colors} getCoordFromColor={getHSVCoord}/>
                    </div>
                    <div className="graphiques__card">
                        <h2>HSL</h2>
                        <Canvas3D colors={colors} getCoordFromColor={getHSLCoord}/>
                    </div>
                </div>
                <div className='buttonbar'>
                    <button  className='button' onClick={() => setColors(rgbCube)}>RGB Set</button>
                    <button className='button' onClick={() => setColors(hsvCone)}>HSV Set</button>
                    <button className='button' onClick={() => setColors(hslBicone)}>HSL Set</button>
                    <button className='button' onClick={() => setColors(reset)}>Clear Color</button>
                </div>
                <div className="italic">Click on a graph to make it rotate !</div>
                <div className="tables">
                    <div className="tables__card">
                        <Convert push={pushColor} />
                    </div>
                    <div className="tables__card">
                        <Table colors={colors}/>
                    </div>
                </div>
                <div className="text">
                    <div>
                        <h2>A quick introduction to color spaces</h2>
                        the most simple representation of the color spectrum in softwares is the <span className="bold">Red Green Blue</span> cube. This reprensation, if simple, does not take into consideration human perception of color.
                        The <span className="bold">Hue Saturation Value</span> and <span className="bold">Hue Saturation Lightness</span> cylinders attempt to provide a better color space in this perspective, colors are represented by their polar coordinates (saturation and hue) and position along the axis of the cylinder (lightness or value).
                    </div>
                    <li>The <span className="bold">Hue</span> is the angular position of the point and represents the <span className="bold">pure pigment</span> of the color.</li>
                    <li>
                        <span className="bold">Lightness or Value ? </span>
                        Both variables are meant to describe the <span className="bold">perceived light</span> of the color point but they are defined differently.
                        In HSV, the value is the mean average of R, G and B, putting all three primary color on the same plane with the white point.
                        In HSL, the lightness is the mid-range of R, G and B (mean average of the max and the min value between R, G and B), putting the primary colors on a plane half-way between white and black.
                    </li>
                    <li>
                        <span className="bold">Two saturations ? </span>
                        The saturation is the distance from the cylinder axis to the color point. It represents the <span className="bold">colorfullness</span> of the color point according to its own lightness or value.
                        The definition of the lightness / value being different in both model, the saturation is also calculated differently.
                    </li>
                </div>
            </main>
        </div>
    )
}

const getRbgCoord = color => {
    let rgb = color.rgb;
    return ([
        (rgb.r / 25.5) - 5,
        (rgb.g / 25.5) - 5,
        (rgb.b / 25.5) - 5,
    ])
}

const getHSVCoord = color => {
    let hsv = color.hsv
    return ([
        10 * hsv.s * Math.cos(hsv.h * DEG_TO_RAD),
        10 - 10 * hsv.v,
        - 10 * hsv.s * Math.sin(hsv.h * DEG_TO_RAD)
    ])
}

const getHSLCoord = color => {
    let hsl = color.hsl
    return ([
        10 * hsl.s * Math.cos(hsl.h * DEG_TO_RAD),
        10 - 10 * hsl.l,
        - 10 * hsl.s * Math.sin(hsl.h * DEG_TO_RAD)
    ])
}
