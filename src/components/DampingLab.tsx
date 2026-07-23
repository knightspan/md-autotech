/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SimulationParams } from '../types';
import { Play, Pause, RotateCcw, AlertCircle, Sparkles, Sliders, Activity, Zap } from 'lucide-react';

export default function DampingLab() {
  // State for simulator controls
  const [params, setParams] = useState<SimulationParams>({
    roadType: 'pothole',
    obstacleHeight: 50,
    vehicleSpeed: 30,
    springStiffness: 45,
    dampingCoefficient: 5.5,
    gasPressure: 12
  });

  const [isRunning, setIsRunning] = useState(true);
  const [impactTriggered, setImpactTriggered] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    deflection: 0,
    springForce: 0,
    dampingForce: 0,
    chassisG: 0,
    stabilizationTime: 0.0
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Physical simulation variables (persistent across frames)
  const physicsRef = useRef({
    wheelY: 0,
    chassisY: 0,
    chassisVel: 0,
    chassisAcc: 0,
    timeSinceImpact: 0,
    roadOffset: 0, // scan position along road width
    telemetryHistory: [] as Array<{ t: number; wheel: number; chassis: number }>,
    impactTimer: 0
  });

  // Handle parameter reset
  const handleReset = () => {
    setParams({
      roadType: 'pothole',
      obstacleHeight: 50,
      vehicleSpeed: 30,
      springStiffness: 45,
      dampingCoefficient: 5.5,
      gasPressure: 12
    });
    setIsRunning(true);
    setImpactTriggered(false);
    physicsRef.current.chassisY = 0;
    physicsRef.current.chassisVel = 0;
    physicsRef.current.wheelY = 0;
    physicsRef.current.roadOffset = 0;
    physicsRef.current.telemetryHistory = [];
    physicsRef.current.timeSinceImpact = 0;
  };

  // Trigger manual impact (bump)
  const triggerImpact = () => {
    physicsRef.current.impactTimer = 1; // start countdown/trigger
    setImpactTriggered(true);
    setTimeout(() => setImpactTriggered(false), 800);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localIsRunning = isRunning;
    const physics = physicsRef.current;

    const draw = () => {
      // Handle canvas resizing
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Grid Background (sleek technical aesthetic)
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Ground / Road level (y references from bottom)
      const groundY = height - 100;

      // Update simulation scan offset based on vehicle speed
      if (localIsRunning) {
        // Speed in px/frame (approx scale: 10km/h = 1px/frame, adjustable)
        const speedFactor = params.vehicleSpeed * 0.15;
        physics.roadOffset += speedFactor;
        if (physics.roadOffset > width) {
          physics.roadOffset = 0;
        }

        // Check for cyclic manual impact trigger
        if (physics.impactTimer > 0) {
          physics.impactTimer -= 0.05;
          if (physics.impactTimer <= 0) {
            // Initiate heavy vertical thrust
            const direction = params.roadType === 'pothole' ? 1 : -1;
            const push = (params.obstacleHeight / 50) * 15 * direction;
            physics.wheelY = push;
            physics.impactTimer = 0;
          }
        }
      }

      // Define static obstacle position relative to Canvas center
      const obstacleX = width / 2;

      // Calculate localized road displacement at current frame wheel contact (which is at obstacleX)
      let roadSurfaceY = 0; // relative displacement from baseline
      const speedTerm = params.vehicleSpeed;

      if (localIsRunning) {
        // Calculate ground profile shape scrolling from right to left
        // Our active tire sits at obstacleX center.
        // We simulate obstacle passing underneath tire.
        const pxOffset = (physics.roadOffset) % width;
        // Let's create an obstacle that appears periodically, say every 400px of scrolling
        const period = 450;
        const phase = (physics.roadOffset) % period;
        
        if (phase > 150 && phase < 250) {
          const normX = (phase - 200) / 50; // runs -1 to +1
          const factor = 1 - normX * normX; // parabolic profile
          if (factor > 0) {
            const hScale = params.obstacleHeight * 0.7; // size in pixels
            if (params.roadType === 'pothole') {
              roadSurfaceY = hScale * factor; // positive moves down in visual
            } else if (params.roadType === 'speed_breaker') {
              roadSurfaceY = -hScale * factor; // negative moves up
            } else if (params.roadType === 'rumble_strips') {
              roadSurfaceY = Math.sin(phase * 0.5) * (params.obstacleHeight * 0.25);
            }
          }
        }
      }

      // If wheel Y is bound, smooth wheel onto road surface in real-time
      // Wheel tracking road surface with slight tyre elasticity
      physics.wheelY += (roadSurfaceY - physics.wheelY) * 0.6;

      // --- SUSPENSION PHYSICS ENGINE ---
      // Mass-Spring-Damper Differential Equations
      // Mass (Chassis) M = 150 kg (assumed)
      // Spring Constant K = params.springStiffness in N/mm -> scaled
      // Damping term C = params.dampingCoefficient -> scaled
      // Gas boost expands initial volume (acts as passive pneumatic pressure)
      const M = 150;
      const K = params.springStiffness * 0.6;
      const C = params.dampingCoefficient * 1.5;
      const staticGasForce = params.gasPressure * 0.3; // lifts frame slightly

      // Relative deflection between Wheel and Chassis
      // Neutral position at normal spring preload height (say 180px above wheel)
      const targetPreloadHeight = 160 + staticGasForce;
      const currentHeight = (groundY - physics.chassisY) - (groundY - physics.wheelY);
      const deflection = targetPreloadHeight - currentHeight;

      // Relative velocity of chassis vs wheel
      const relativeVel = physics.chassisVel - 0; // simplify: road speed vertical is absorbed in dynamic wheelY changes

      // Calculate Forces
      const F_spring = deflection * K; 
      const F_damping = -relativeVel * C;
      
      // Total dynamic load on chassis
      const F_net = F_spring + F_damping;
      
      // Calculate acceleration (F = M*a -> a = F/M)
      physics.chassisAcc = F_net / M;

      if (localIsRunning) {
        // Integrate velocity (v = v + a*dt)
        physics.chassisVel += physics.chassisAcc;
        // Integrate position (y = y + v*dt)
        physics.chassisY += physics.chassisVel;

        // Decaying noise stabilization metric
        if (Math.abs(physics.chassisVel) > 0.05) {
          physics.timeSinceImpact += 0.016; // 60fps increments
        }
      }

      // Constrain chassis from falling below baseline earth
      if (physics.chassisY < -120) {
        physics.chassisY = -120;
        physics.chassisVel = 0;
      }

      // Convert deflection state to metric representations for panel readouts
      const liveSpringForceVal = Math.round(Math.abs(F_spring) * 4.2);
      const liveDampForceVal = Math.round(Math.abs(F_damping) * 8.5);
      const liveGForce = Math.abs(physics.chassisAcc * 3.8);

      // Record telemetry history for plotting (max 100 data points)
      if (localIsRunning && Math.random() > 0.3) {
        physics.telemetryHistory.push({
          t: Date.now(),
          wheel: groundY - physics.wheelY,
          chassis: groundY - physics.chassisY - targetPreloadHeight
        });
        if (physics.telemetryHistory.length > 120) {
          physics.telemetryHistory.shift();
        }
      }

      // Synchronize live state indicators back to React safely
      if (Math.random() > 0.5) {
        setLiveMetrics({
          deflection: Math.round(deflection),
          springForce: liveSpringForceVal,
          dampingForce: liveDampForceVal,
          chassisG: parseFloat(Math.min(3.2, liveGForce).toFixed(2)),
          stabilizationTime: parseFloat(Math.min(5.0, physics.timeSinceImpact).toFixed(1))
        });
      }

      // Reset stabilization timer if we hit a perturbation
      if (Math.abs(roadSurfaceY) > 5) {
        physics.timeSinceImpact = 0;
      }

      // === DRAW THE PARTS ===

      // 2. Draw Road Line Profile
      ctx.beginPath();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      // Draw smooth rolling road layout
      for (let rx = 0; rx < width; rx += 5) {
        let rxDiff = 0;
        const period = 450;
        const phase = (physics.roadOffset - (obstacleX - rx)) % period;
        
        if (phase > 150 && phase < 250) {
          const normX = (phase - 200) / 50;
          const factor = 1 - normX * normX;
          if (factor > 0) {
            const hScale = params.obstacleHeight * 0.7;
            if (params.roadType === 'pothole') {
              rxDiff = hScale * factor;
            } else if (params.roadType === 'speed_breaker') {
              rxDiff = -hScale * factor;
            } else if (params.roadType === 'rumble_strips') {
              rxDiff = Math.sin(phase * 0.5) * (params.obstacleHeight * 0.25);
            }
          }
        }
        
        const ry = groundY + rxDiff;
        if (rx === 0) {
          ctx.moveTo(rx, ry);
        } else {
          ctx.lineTo(rx, ry);
        }
      }
      ctx.stroke();

      // Asphalt ground block underneath the road line
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let rx = 0; rx < width; rx += 5) {
        const period = 450;
        const phase = (physics.roadOffset - (obstacleX - rx)) % period;
        let rxDiff = 0;
        if (phase > 150 && phase < 250) {
          const normX = (phase - 200) / 50;
          const factor = 1 - normX * normX;
          if (factor > 0) {
            const hScale = params.obstacleHeight * 0.7;
            if (params.roadType === 'pothole') {
              rxDiff = hScale * factor;
            } else if (params.roadType === 'speed_breaker') {
              rxDiff = -hScale * factor;
            } else if (params.roadType === 'rumble_strips') {
              rxDiff = Math.sin(phase * 0.5) * (params.obstacleHeight * 0.25);
            }
          }
        }
        ctx.lineTo(rx, groundY + rxDiff);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(241, 245, 249, 0.4)';
      ctx.fill();

      // Draw obstacle highlight (alert banner)
      const obstaclePhase = (physics.roadOffset) % 450;
      if (obstaclePhase > 150 && obstaclePhase < 250) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.fillRect(obstacleX - 60, 50, 120, groundY - 10);
        
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(obstacleX - 60, 50, 120, groundY - 10);
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText('IMPACT ZONE', obstacleX - 35, 70);
      }

      // Convert vertical positions to Canvas absolute height mapping
      const wheelPosVisualY = groundY - physics.wheelY;
      const chassisPosVisualY = groundY - physics.chassisY - targetPreloadHeight;

      const compX = obstacleX; // keep suspension centered horizontally

      // 3. DRAW THE SUSPENSION SYSTEM (THE SHOCK ABSORBER)
      
      // A. Bottom Eyelet Mounting (connected to Wheel Axle)
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      
      const wheelHubRadius = 35;
      // Draw tyre hub / wheel axle representation
      ctx.beginPath();
      ctx.arc(compX, wheelPosVisualY, wheelHubRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.stroke();

      // Chrome hub center pin
      ctx.beginPath();
      ctx.arc(compX, wheelPosVisualY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#94a3b8';
      ctx.fill();
      ctx.stroke();

      // Shock Bottom mount eyelet
      const botMountY = wheelPosVisualY - 20;
      ctx.beginPath();
      ctx.arc(compX, botMountY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#334155';
      ctx.fill();
      ctx.stroke();

      // Inner bushing pin
      ctx.beginPath();
      ctx.arc(compX, botMountY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();

      // B. Top Mount Eyelet (connected to Motorcycle Frame chassis)
      const topMountY = chassisPosVisualY + 15;
      ctx.beginPath();
      ctx.arc(compX, topMountY, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#d97706'; // Gold anodized top
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(compX, topMountY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();

      // Motorcycle Frame chassis representation (rigid structure block on top)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(compX - 90, topMountY - 14);
      ctx.lineTo(compX + 90, topMountY - 14);
      ctx.lineTo(compX + 60, topMountY - 45);
      ctx.lineTo(compX - 60, topMountY - 45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Chassis Brand Badge "MD AUTOTECH"
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.fillText('MD AUTOTECH TECH LAB', compX - 52, topMountY - 26);

      // C. Piston rod (sliding down from the top cylinder)
      const cylinderHeight = 85;
      const cylBotY = topMountY + cylinderHeight;
      const pistonRodTopY = cylBotY;
      const pistonRodBotY = botMountY - 10;

      ctx.strokeStyle = '#e2e8f0'; // bright silver steel piston rod
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(compX, pistonRodTopY);
      ctx.lineTo(compX, pistonRodBotY);
      ctx.stroke();

      // D. NITROGEN RESERVOIR PIGGYBACK CANISTER (Premium Tech item!)
      const canisterX = compX + 38;
      const canisterY = topMountY + 10;
      // Connector tube
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(compX, topMountY + 20);
      ctx.lineTo(canisterX, canisterY + 10);
      ctx.stroke();

      // Gold Canister Cylinder
      ctx.fillStyle = '#d97706'; // gold canister
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(canisterX - 10, canisterY, 20, 45, 4);
      ctx.fill();
      ctx.stroke();

      // "N2" label on canister
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px JetBrains Mono, monospace';
      ctx.fillText('N2', canisterX - 5, canisterY + 22);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '5px JetBrains Mono, monospace';
      ctx.fillText(`${params.gasPressure} BAR`, canisterX - 7, canisterY + 34);

      // E. Shock Cylinder Body (Upper part holding physical fluid)
      ctx.fillStyle = '#1e293b'; // space black cylinder body
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(compX - 18, topMountY + 12, 36, cylinderHeight - 12, 3);
      ctx.fill();
      ctx.stroke();

      // Hydraulic sealing ring block (where rod exits cylinder)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.rect(compX - 19, cylBotY - 14, 38, 14);
      ctx.fill();
      ctx.fillStyle = '#10b981'; // Green double viton oil seal indicator
      ctx.fillRect(compX - 18, cylBotY - 6, 36, 3);

      // F. COIL SPRING (Heavy-duty yellow coiled wire)
      // Visual coiled spring overlay wrapped around cylinder and piston rod
      const springTopY = topMountY + 22;
      const springBotY = botMountY - 16;
      const springLength = springBotY - springTopY;
      
      const numCoils = 8;
      const coilCurveRadius = 24;
      ctx.strokeStyle = '#ea580c'; // MD trademark premium engineering orange coil
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(compX - coilCurveRadius, springTopY);
      
      for (let i = 0; i <= numCoils; i++) {
        const fraction = i / numCoils;
        const coilY = springTopY + fraction * springLength;
        const isLeft = i % 2 === 0;
        const xPos = compX + (isLeft ? -coilCurveRadius : coilCurveRadius);

        // draw connecting coil line with continuous sine curve approximation
        ctx.lineTo(xPos, coilY);
      }
      ctx.stroke();

      // === 4. GRAPHICS OVERLAY FOR FORCE VECTORS (Facing Damping Force visual) ===
      ctx.lineWidth = 4;
      
      // Dynamic compression force arrow index (going up or down)
      if (liveSpringForceVal > 40) {
        // Red spring tension force vector pointing upward to chassis
        ctx.strokeStyle = '#ef4444';
        ctx.fillStyle = '#ef4444';
        const rawLen = Math.min(60, liveSpringForceVal * 0.15);
        ctx.beginPath();
        ctx.moveTo(compX - 35, topMountY - 2);
        ctx.lineTo(compX - 35, topMountY - 2 - rawLen);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(compX - 40, topMountY - 2 - rawLen);
        ctx.lineTo(compX - 35, topMountY - 8 - rawLen);
        ctx.lineTo(compX - 30, topMountY - 2 - rawLen);
        ctx.closePath();
        ctx.fill();

        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillText(`Fs: ${liveSpringForceVal}N`, compX - 82, topMountY - 10 - rawLen);
      }

      if (liveDampForceVal > 15) {
        // Blue hydraulic damping force vector (opposing vector direction!)
        // Points down when moving up or up when moving down
        const isCompressing = relativeVel > 0;
        const arrowDirection = isCompressing ? 1 : -1;
        ctx.strokeStyle = '#3b82f6';
        ctx.fillStyle = '#3b82f6';
        const rawLen = Math.min(50, liveDampForceVal * 0.25);
        const anchorY = cylBotY + 15;
        
        ctx.beginPath();
        ctx.moveTo(compX + 45, anchorY);
        ctx.lineTo(compX + 45, anchorY + (rawLen * arrowDirection));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(compX + 40, anchorY + (rawLen * arrowDirection));
        ctx.lineTo(compX + 45, anchorY + (rawLen * arrowDirection) + (6 * arrowDirection));
        ctx.lineTo(compX + 50, anchorY + (rawLen * arrowDirection));
        ctx.closePath();
        ctx.fill();

        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillText(`Fd: ${liveDampForceVal}N`, compX + 48, anchorY + (rawLen * arrowDirection) + (13 * arrowDirection));
      }

      // Keep running recursion if state permits
      if (localIsRunning) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    // Begin looping
    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [params, isRunning]);

  return (
    <div className="bg-white border border-zinc-200 overflow-hidden shadow-sm" id="damping-tech-lab">
      <div className="p-6 bg-zinc-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-orange-600 border border-orange-500 text-white text-[9px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> MD Tech Lab
            </span>
          </div>
          <h3 className="text-xl font-light tracking-tight mt-1.5 flex items-center gap-2">
            Dynamic Damping &amp; <span className="font-serif italic text-zinc-300">Suspension Twin</span>
          </h3>
          <p className="text-zinc-400 text-xs mt-1 font-sans">
            Real-time mechanical modeling tool evaluating shock absorption over potholes and speed breakers at variable velocities.
          </p>
        </div>

        {/* Start / Pause triggers */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`cursor-pointer px-4.5 py-2.5 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 transition-colors ${
              isRunning 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            id="btn-play-pause"
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 stroke-[2.5]" /> Pause Engine
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Run Engine
              </>
            )}
          </button>

          <button
            onClick={triggerImpact}
            className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4.5 py-2.5 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors border border-zinc-700"
            id="btn-manual-bump"
          >
            <Activity className="w-3.5 h-3.5 rotate-90 text-orange-500" /> Manual Bump
          </button>

          <button
            onClick={handleReset}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-zinc-400 px-4 py-2.5 text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            id="btn-simulation-reset"
            title="Reset to Factory Variables"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Dynamic Canvas Simulator Panel */}
        <div className="lg:col-span-8 bg-slate-50 relative flex flex-col justify-between" style={{ minHeight: '440px' }}>
          
          {/* Overlay state badge */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            <span className="p-1 px-2.5 rounded-md text-[10px] font-mono font-medium tracking-tight bg-slate-900/95 text-white shadow-md flex items-center gap-2 border border-slate-700">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              STATUS: {isRunning ? 'CALCULATING ENGINE' : 'PAUSED'}
            </span>
            <span className="p-1 px-2.5 rounded-md text-[10px] font-mono font-medium tracking-tight bg-slate-900/95 text-sky-400 shadow-md flex items-center gap-1.5 border border-slate-700">
              <Zap className="w-3 h-3 text-sky-400" />
              VEHICLE SPEED: {params.vehicleSpeed} KM/h
            </span>
          </div>

          <canvas ref={canvasRef} className="w-full flex-grow object-cover touch-none bg-[#f8fafc]" style={{ display: 'block' }} />

          {/* Quick Real-Time Telemetry telemetry Panel */}
          <div className="p-4 bg-slate-900 text-white grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-slate-800">
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">TOTAL SPRING FORCE</span>
              <span className="text-lg font-mono font-bold text-amber-500 flex items-baseline gap-0.5">
                {liveMetrics.springForce} <span className="text-xs text-slate-400">N</span>
              </span>
            </div>
            
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">DAMPING FORCE (C)</span>
              <span className="text-lg font-mono font-bold text-sky-400 flex items-baseline gap-0.5">
                {liveMetrics.dampingForce} <span className="text-xs text-slate-400">N</span>
              </span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">WHEEL DEFLECTION</span>
              <span className="text-lg font-mono font-bold text-slate-200 flex items-baseline gap-0.5">
                {liveMetrics.deflection} <span className="text-xs text-slate-400">mm</span>
              </span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">CHASSIS ACCELERATION</span>
              <span className="text-lg font-mono font-bold text-rose-500 flex items-baseline gap-0.5">
                {liveMetrics.chassisG} <span className="text-xs text-slate-400">G</span>
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">STABILIZATION SPEED</span>
              <span className="text-lg font-mono font-bold text-emerald-400 flex items-baseline gap-0.5">
                {liveMetrics.stabilizationTime} <span className="text-xs text-slate-400">s</span>
              </span>
            </div>
          </div>
        </div>

        {/* Physical parameter adjustment controls panel */}
        <div className="lg:col-span-4 p-6 bg-slate-50 border-l border-slate-100 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-amber-500" /> Physical Spec Tuning
            </h4>

            {/* Test Road selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Select Road Obstacle Profile</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'pothole', label: 'Severe Pothole', color: 'border-rose-300 focus:ring-rose-500 active:bg-rose-50' },
                  { key: 'speed_breaker', label: 'Speed Bump', color: 'border-amber-300 focus:ring-amber-500 active:bg-amber-50' },
                  { key: 'rumble_strips', label: 'Rumble Strips', color: 'border-indigo-300 focus:ring-indigo-500 active:bg-indigo-50' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setParams({ ...params, roadType: item.key as any })}
                    className={`cursor-pointer border p-2.5 rounded-lg text-center text-[11px] font-medium transition-all ${
                      params.roadType === item.key
                        ? 'bg-slate-900 border-slate-905 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Adjustment Sliders */}
            <div className="space-y-4">
              {/* Speed slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">Simulated Riding Speed</span>
                  <span className="font-mono font-bold text-slate-800">{params.vehicleSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={params.vehicleSpeed}
                  onChange={(e) => setParams({ ...params, vehicleSpeed: parseInt(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  Higher speeds multiply shock compression velocities but increase rebound frequency requirements.
                </span>
              </div>

              {/* Obstacle Height slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">Obstacle Amplitude / Depth</span>
                  <span className="font-mono font-bold text-slate-800">{params.obstacleHeight} mm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={params.obstacleHeight}
                  onChange={(e) => setParams({ ...params, obstacleHeight: parseInt(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  The depth of the road hole or peak curve of the speed bump.
                </span>
              </div>

              {/* Spring Stiffness slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">MD Spring Stiffness (K)</span>
                  <span className="font-mono font-bold text-slate-800">{params.springStiffness} N/mm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={params.springStiffness}
                  onChange={(e) => setParams({ ...params, springStiffness: parseInt(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  Controls structural load support. Soft springs ride smoothly but bottom out easily; stiff springs resist impact bottoming but transfer force.
                </span>
              </div>

              {/* Damping Coefficient slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">MD Damping Resistance (C)</span>
                  <span className="font-mono font-bold text-slate-800">{params.dampingCoefficient} Ns/mm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={params.dampingCoefficient}
                  onChange={(e) => setParams({ ...params, dampingCoefficient: parseFloat(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  Hydro-viscosity oil resistance. Low damping bounces indefinitely (no control); High damping stabilizes immediately but rides firmer.
                </span>
              </div>

              {/* Gas pressure canister booster */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">Nitrogen Gas pressure Canister</span>
                  <span className="font-mono font-bold text-slate-800">{params.gasPressure} Bar</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={params.gasPressure}
                  onChange={(e) => setParams({ ...params, gasPressure: parseInt(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  Pressurizes gas cylinder. Extinguishes oil aeration foaming and supports heavy cornering loads.
                </span>
              </div>
            </div>
          </div>

          {/* Educational Note Callout */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200/50 rounded-xl flex gap-3 text-amber-900">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold tracking-tight">Active Dynamics Insight</h5>
              <p className="text-[10px] leading-relaxed text-amber-800">
                Notice how reducing the **Damping Resistance** below `2.0` makes the chassis bounce continuously after standard bumps, ruining tire ground grip. Balancing stiffness containing `40-50 N/mm` and damping around `5-7 Ns/mm` yields the ultimate, balanced ride pattern MD AutoTech is famous for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
