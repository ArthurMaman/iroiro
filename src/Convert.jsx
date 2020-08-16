import React, { useState } from 'react';
import Color from './Color'
import './Convert.css'

export default function Convert({push}) {
    const [color, setColor] = useState(new Color("#abcdef"))
    const rgb = color.rgb;
    const hsv = color.hsv;
    const hsl = color.hsl;

    const setRgb = (value, colorLetter) => {
        let nv = parseFloat(value)
        const newRgb = color.rgb;
        if (nv >= 0 && nv < 256) {
            newRgb[colorLetter] = nv;
            setColor(new Color(newRgb, 'rgb'))
        } else {
            newRgb[colorLetter] = 0;
        }
        setColor(new Color(newRgb, 'rgb'))
    }

    const setHSV = (value, colorLetter, type) => {
        let nv = parseFloat(value);
        const newHSV = color[type];
        if (colorLetter === 'h') {
            if (nv >= 0 && nv < 361) {
                newHSV.h = nv;
                setColor(new Color(newHSV, type))
            } else {
                newHSV.h = 0;
                setColor(new Color(newHSV, type))
            }
        } else {
            if (nv >= 0 && nv < 101) {
                newHSV[colorLetter] = nv / 100;
                setColor(new Color(newHSV, type))
            } else {
                newHSV[colorLetter] = 0;
                setColor(new Color(newHSV, type))
            }
        }
    }

    const setHex = value => setColor(new Color('#' + value))

    return (
        <div>
            <div className="convertbox__header">
                <h2>
                    Quick Conversion
                </h2>
                <div className="convertbox__header__hex">
                    <span>#</span>
                    <input type="text" className="convertbox__input convertbox__input-header" value={color.hex.slice(1)} onChange={it => setHex(it.target.value)} />
                </div>
            </div>
            <div className="convertbox__table">
                <div className="convertbox__col">
                    <h3>RGB</h3>
                    <div className="convertbox__li">
                        <span>R</span>
                        <input type='range' className="convertbox__range" value={rgb.r} min={0} max={255} onChange={it => setRgb(it.target.value, 'r')} />
                        <input type="text" className="convertbox__input" value={rgb.r} onChange={it => setRgb(it.target.value, 'r')} />
                    </div>
                    <div className="convertbox__li">
                        <span>G</span>
                        <input type='range' className="convertbox__range" value={rgb.g} min={0} max={255} onChange={it => setRgb(it.target.value, 'g')}/>
                        <input type="text" className="convertbox__input" value={rgb.g} onChange={it => setRgb(it.target.value, 'g')} />
                    </div>
                    <div className="convertbox__li">
                        <span>B</span>
                        <input type='range' className="convertbox__range" value={rgb.b} min={0} max={255} onChange={it => setRgb(it.target.value, 'b')}/>
                        <input type="text" className="convertbox__input" value={rgb.b} onChange={it => setRgb(it.target.value, 'b')} />
                    </div>
                </div>
                <div className="convertbox__col">
                    <h3>HSL</h3>
                    <div className="convertbox__li">
                        <span>H</span>
                        <input type='range' className="convertbox__range" value={hsl.h} min={0} max={360} onChange={it => setHSV(it.target.value, 'h', 'hsl')}/>
                        <input type="text" className="convertbox__input" value={hsl.h.toFixed(0)} onChange={it => setHSV(it.target.value, 'h', 'hsl')} />
                    </div>
                    <div className="convertbox__li">
                        <span>Sl</span>
                        <input type='range' className="convertbox__range" value={hsl.s * 100} min={0} max={100} onChange={it => setHSV(it.target.value, 's', 'hsl')}/>
                        <input type="text" className="convertbox__input" value={(hsl.s * 100).toFixed(0)} onChange={it => setHSV(it.target.value, 's', 'hsl')} />
                    </div>
                    <div className="convertbox__li">
                        <span>L</span>
                        <input type='range' className="convertbox__range" value={hsl.l * 100} min={0} max={100} onChange={it => setHSV(it.target.value, 'l', 'hsl')}/>
                        <input type="text" className="convertbox__input" value={(hsl.l * 100).toFixed(0)} onChange={it => setHSV(it.target.value, 'l', 'hsl')} />
                    </div>
                </div>
                <div className="convertbox__col">
                    <h3>HSV</h3>
                    <div className="convertbox__li">
                        <span>H</span>
                        <input type='range' className="convertbox__range" value={hsv.h} min={0} max={360} onChange={it => setHSV(it.target.value, 'h', 'hsv')}/>
                        <input type="text" className="convertbox__input" value={hsv.h.toFixed(0)} onChange={it => setHSV(it.target.value, 'h', 'hsv')} />
                    </div>
                    <div className="convertbox__li">
                        <span>Sv</span>
                        <input type='range' className="convertbox__range" value={hsv.s * 100} min={0} max={100} onChange={it => setHSV(it.target.value, 's', 'hsv')}/>
                        <input type="text" className="convertbox__input" value={(hsv.s * 100).toFixed(0)} onChange={it => setHSV(it.target.value, 's', 'hsv')} />
                    </div>
                    <div className="convertbox__li">
                        <span>V</span>
                        <input type='range' className="convertbox__range"  value={hsv.v * 100} min={0} max={100} onChange={it => setHSV(it.target.value, 'v', 'hsv')}/>
                        <input type="text" className="convertbox__input" value={(hsv.v * 100).toFixed(0)} onChange={it => setHSV(it.target.value, 'v', 'hsv')} />
                    </div>
                </div>
            </div>
            <div className="convertbox__buttoncontainer" onClick={() => push(new Color(color.hex))}>
                <div className='convertbox__button' style={{ borderColor: color.hex }}>
                    <span>
                        Add to the list
                </span>
                    <svg width={52} height={26} viewBox={"-26 0 104 52"}>
                        <circle cx={26} cy={26} r={20} fill={color.hex} />
                        <path d="M 26 12 v 28 M 12 26 h 28" fill={"none"} stroke={"white"} strokeWidth={5} />
                    </svg>
                </div>
            </div>
        </div>
    )
}