import React, { useState, useRef } from 'react';

import { isIn } from './convenienceFunctions';


const GenerateUrn = ({ drawnFrom, ballColors, urnDimensions, mode }) => {


    //the size of a ball, including the surrounding margin. 
    //(formally, ball_size = 2*(ball_radius + margin))
    //many other variables depend on it, such that
    //changing this parameter re-scales the entire urn
    const ball_size = 30;

    //how much space there is between a ball and the edge of the urn
    const margin = ball_size / 10;
    //the radius of a ball
    const r = (ball_size / 2) - margin;
    //the height of an urn
    const urnHeight = (ball_size) * urnDimensions[1] + margin * 2;
    //the height of the svg that contains an urn
    //const svgHeight = 1.5 * urnHeight;
    const svgHeight = urnHeight;
    //the width of an urn
    const urnWidth = ball_size * urnDimensions[0] + margin * 2;
    //the width of the svg that contains an urn
    //const svgWidth = 2 * urnWidth;
    const svgWidth = urnWidth;
    //the coordinate of the lowest ball
    //const y_start = svgHeight - 2 * ball_size;
    const y_start = svgHeight - ball_size / 2 - margin;
    const xCoords = Array.from(Array(urnDimensions[0]).keys()).map((i) => {
        return (margin + ball_size / 2 + ball_size * (i))
    });
    const yCoords = Array.from(Array(urnDimensions[1]).keys()).map((i) => {
        return (y_start - ball_size * (i))
    });
    //the coordinates of all balls in an urn
    const ball_pos = {
        //xCoords: [ball_size, ball_size + ball_size, ball_size * 3, ball_size * 4],
        xCoords: xCoords,
        //yCoords: [y_start, y_start - ball_size, y_start - 2 * ball_size, y_start - 3 * ball_size, y_start - 4 * ball_size]
        yCoords: yCoords
    }

    // the color of the border
    const border = mode === "normal" ? "3px solid black" :
        "3px solid white";

    // the background color
    const backgroundColor = mode === "normal" ? "#11bf40" :
        mode === "drawn" ? "white" :
            mode === "seen" ? "white" : NaN;


    const ids = Array.from(Array(urnDimensions[0] * urnDimensions[1]).keys());

    // test whether the balls should appear 
    const displayBalls = mode === "normal" ? 1 :
        mode === "drawn" ? (Number.isNaN(drawnFrom[0]) ? 0 : 1) :
            mode === "seen" ? (Number.isNaN(drawnFrom[0]) ? 0 : 1) : NaN;

    //draw the balls
    let circles = !displayBalls ? "" : ids.map((i) => {
        let x = i % urnDimensions[0];
        let y = Math.floor(i / urnDimensions[0]);
        let color = (mode === "drawn" | mode === "seen") ? ballColors[i] :
            (isIn(i, drawnFrom) ? backgroundColor : ballColors[i]);
        let stroke = (mode === "drawn" | mode === "seen") ? "black" :
            (isIn(i, drawnFrom) ? backgroundColor : "black");
        return (
            <circle
                cx={ball_pos.xCoords[x]} cy={ball_pos.yCoords[y]} r={r} fill={color} stroke={stroke}
            />

        )
    })

    //display the urn
    return (
        <span >
            <svg style={{ border: border, backgroundColor: backgroundColor }} width={svgWidth} height={svgHeight} id={"id"} >

                {/* <rect style={urn_style}
                ></rect> */}
                {circles}

                {/* <rect width={svgWidth} height={svgHeight} stroke={borderColor}
                    strokeWidth="4px" fill="none"></rect> */}

            </svg>
        </span>
    )
}



export default GenerateUrn;