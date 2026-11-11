"use client";

import React, { useState, useCallback } from "react";
import DeepSpaceCanvas, { AstronomyPhase } from "@/components/astronomy/DeepSpaceCanvas";
import AstronomicalClock from "@/components/astronomy/AstronomicalClock";
import AwakeningSequence from "@/components/astronomy/AwakeningSequence";
import CelestialControls from "@/components/astronomy/CelestialControls";
import CustomCursor from "@/components/animation/CustomCursor";

export default function Home() {
  const [phase, setPhase] = useState<AstronomyPhase>("observatory");
  const [isAwakened, setIsAwakened] = useState<boolean>(false);
  const [overrideSeconds, setOverrideSeconds] = useState<number | null>(null);

  // Progressive parameters for canvas constellations & galaxy
  const [mariaProgress, setMariaProgress] = useState<number>(0);
  const [heartProgress, setHeartProgress] = useState<number>(0);
  const [awakeningProgress, setAwakeningProgress] = useState<number>(0);

  const handlePhaseChange = useCallback((newPhase: AstronomyPhase) => {
    setPhase(newPhase);
  }, []);

  const handleAwaken = useCallback(() => {
    setIsAwakened(true);
    setPhase("awakening");
  }, []);

  const handlePhaseUpdate = useCallback(
    (
      newPhase: AstronomyPhase,
      mariaProg: number,
      heartProg: number,
      awakenProg: number
    ) => {
      setPhase(newPhase);
      setMariaProgress(mariaProg);
      setHeartProgress(heartProg);
      setAwakeningProgress(awakenProg);
    },
    []
  );

  const handleReset = useCallback(() => {
    setIsAwakened(false);
    setPhase("observatory");
    setOverrideSeconds(null);
    setMariaProgress(0);
    setHeartProgress(0);
    setAwakeningProgress(0);
  }, []);

  const handleSimulate = useCallback((seconds: number | null) => {
    setOverrideSeconds(seconds);
    if (seconds === null) {
      setIsAwakened(false);
      setPhase("observatory");
    }
  }, []);

  const handleTriggerAwakeningDirectly = useCallback(() => {
    setOverrideSeconds(0);
    handleAwaken();
  }, [handleAwaken]);

  return (
    <main className="relative min-h-screen bg-[#03040A] text-[#E4E7F3] selection:bg-[#503B83] selection:text-[#F5D9A0] overflow-hidden">
      {/* Dynamic Multi-Layered Astronomical Canvas */}
      <DeepSpaceCanvas
        phase={phase}
        mariaProgress={mariaProgress}
        heartProgress={heartProgress}
        awakeningProgress={awakeningProgress}
      />

      {/* Floating Astronomical Instrument Controls & Cursor */}
      <CustomCursor />
      <CelestialControls
        onSimulate={handleSimulate}
        onTriggerAwakening={handleTriggerAwakeningDirectly}
        isAwakened={isAwakened}
      />

      {/* Primary Narrative Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
        {!isAwakened ? (
          /* PRE-AWAKENING: Full-Screen Astronomical Observatory & Clock */
          <AstronomicalClock
            onPhaseChange={handlePhaseChange}
            onAwaken={handleAwaken}
            overrideSeconds={overrideSeconds}
          />
        ) : (
          /* POST-11:11: The Great Celestial Awakening Sequence */
          <AwakeningSequence
            onPhaseUpdate={handlePhaseUpdate}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
