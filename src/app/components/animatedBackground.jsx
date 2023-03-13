
"use client"

// Define various 3D Backgrounds

import React, { useEffect } from 'react';
import { butterfliesBackground, neonCursor, particlesCursor, fishesBackground } from 'threejs-toys'

export function ButterFlyBackground() {

    useEffect(() => {
        butterfliesBackground({
            el: document.getElementById("animatedBg"),
            gpgpuSize: 70,
            background: 0xd4d4d4,
            material: 'basic',
            materialParams: { transparent: true, alphaTest: 0.5 },
            texture: '/butterflies.png',
            textureCount: 4,
            wingsScale: [1, 1, 1],
            wingsWidthSegments: 8,
            wingsHeightSegments: 8,
            wingsSpeed: 0.75,
            wingsDisplacementScale: 1.25,
            noiseCoordScale: 0.01,
            noiseTimeCoef: 0.0005,
            noiseIntensity: 0.0025,
            attractionRadius1: 100,
            attractionRadius2: 150,
            maxVelocity: 0.1
        });
    }, []);

    return (
        <>
            <div id="animatedBg" class="absolute -z-10 w-full h-full overflow-hidden " >
            </div>
        </>
    );
}


export function FishesBackground() {

    useEffect(() => {
        fishesBackground({
            el: document.getElementById('animatedBg'),
            gpgpuSize: 96,
            background: 0x031F48,
            fogDensity: 0.025,
            texture: '/fishes.png',
            textureCount: 8,
            material: 'phong',
            materialParams: {
                transparent: true,
                alphaTest: 0.5
            },
            fishScale: [1, 1, 1],
            fishWidthSegments: 8,
            fishSpeed: 1.5,
            noiseCoordScale: 0.01,
            noiseTimeCoef: 0.0005,
            noiseIntensity: 0.0005,
            attractionRadius1: 50,
            attractionRadius2: 150,
            maxVelocity: 0.1
        })
    }, []);

    return (
        <>
            <div id="animatedBg" class="absolute -z-10 w-full h-full overflow-hidden" >
            </div>
        </>
    );
}


export function NeonBackground() {

    useEffect(() => {
        neonCursor({
            el: document.getElementById('animatedBg'),
            shaderPoints: 16,
            curvePoints: 80,
            curveLerp: 0.5,
            radius1: 5,
            radius2: 30,
            velocityTreshold: 10,
            sleepRadiusX: 150,
            sleepRadiusY: 150,
            sleepTimeCoefX: 0.0025,
            sleepTimeCoefY: 0.0025
        })
    }, []);

    return (
        <>
            <div id="animatedBg" class="absolute -z-10 w-full h-full overflow-hidden" >
            </div>
        </>
    );
}


export function ParticleCursorBackground() {

    useEffect(() => {
        particlesCursor({
            el: document.getElementById('animatedBg'),
            gpgpuSize: 256,
            colors: [0x00ff00, 0x0000ff],
            color: 0xff0000,
            coordScale: 1.5,
            noiseIntensity: 0.001,
            noiseTimeCoef: 0.0001,
            pointSize: 5,
            pointDecay: 0.005,
            sleepRadiusX: 250,
            sleepRadiusY: 250,
            sleepTimeCoefX: 0.001,
            sleepTimeCoefY: 0.002
        })
    }, []);

    return (
        <>
            <div id="animatedBg" class="absolute -z-10 w-full h-full overflow-hidden" >
            </div>
        </>
    );
}


