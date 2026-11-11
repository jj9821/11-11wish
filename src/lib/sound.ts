"use client";

import { astronomyConfig } from "@/config/love-config";

class SoundManager {
  private static instance: SoundManager;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private chordInterval: NodeJS.Timeout | null = null;
  private twinkleInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public subscribe(callback: (isPlaying: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(!this.isMuted);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(!this.isMuted));
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  public async toggle(): Promise<boolean> {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (this.isMuted) {
      await this.play();
    } else {
      this.pause();
    }
    return !this.isMuted;
  }

  public async play(): Promise<void> {
    if (!this.isInitialized) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isMuted = false;
    this.notify();

    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.7, this.ctx.currentTime + 1.5);
    }

    this.startDeepSpaceDrone();
    this.startHarmonicAmbience();
  }

  public pause() {
    this.isMuted = true;
    this.notify();

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
    }

    this.stopDrone();
    this.stopHarmonicAmbience();
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  /**
   * Low-frequency deep space drone (55Hz / 110Hz sub-bass with lowpass resonance)
   */
  public startDeepSpaceDrone(frequency = astronomyConfig.audio.frequency) {
    if (!this.ctx || this.droneOsc || !this.masterGain) return;
    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneOsc.type = "sine";
      this.droneOsc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.droneGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 3);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc.start();
    } catch {
      // AudioCtx not ready
    }
  }

  public stopDrone() {
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch {
        // Ignore
      }
      this.droneOsc = null;
    }
  }

  /**
   * Harmonic celestial chords cycling slowly
   */
  private startHarmonicAmbience() {
    if (this.chordInterval || !this.ctx || !this.masterGain) return;

    // F#m9 -> Bm7 -> Dmaj9 -> C#m7
    const chords = [
      [185.0, 220.0, 277.18, 329.63, 440.0],
      [123.47, 146.83, 185.0, 220.0, 277.18],
      [146.83, 185.0, 220.0, 277.18, 369.99],
      [138.59, 164.81, 207.65, 246.94, 329.63],
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const notes = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 4);
      filter.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 8.5);

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.detune.setValueAtTime((idx - 2) * 5, this.ctx.currentTime);
        osc.connect(filter);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 8.8);
      });

      filter.connect(gain);
      gain.connect(this.masterGain);
    };

    playChord();
    this.chordInterval = setInterval(playChord, 8000);

    const crystalNotes = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51];
    this.twinkleInterval = setInterval(() => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) {
        const note = crystalNotes[Math.floor(Math.random() * crystalNotes.length)];
        this.playCrystalNote(note, 0.04);
      }
    }, 2200);
  }

  private stopHarmonicAmbience() {
    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.twinkleInterval) {
      clearInterval(this.twinkleInterval);
      this.twinkleInterval = null;
    }
  }

  public playCrystalNote(frequency: number, maxGain = 0.05) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(maxGain, this.ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Ignore
    }
  }

  /** Gravitational Pulse Shockwave (T-10s countdown tick) */
  public playGravitationalPulse(freq = 65) {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.75);

      // Subtle high shimmer
      this.playCrystalNote(freq * 16, 0.03);
    } catch {
      // Ignore
    }
  }

  /** Supernova Awakening burst */
  public playSupernovaAwakening() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    try {
      // Low sub bass swell
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.frequency.setValueAtTime(45, this.ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 2.5);
      subGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.5);
      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start();
      subOsc.stop(this.ctx.currentTime + 4.6);

      // Celestial harp arpeggio
      const harp = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0, 1174.66, 1479.98];
      harp.forEach((note, i) => {
        setTimeout(() => {
          this.playCrystalNote(note, 0.08);
        }, i * 140);
      });
    } catch {
      // Ignore
    }
  }

  public playChime(freq = 880) {
    if (!this.ctx || this.isMuted) return;
    this.playCrystalNote(freq, 0.08);
  }

  public playWishBurst() {
    this.playSupernovaAwakening();
  }

  public playLetterOpen() {
    if (!this.ctx || this.isMuted) return;
    this.playCrystalNote(739.99, 0.07);
    setTimeout(() => this.playCrystalNote(1174.66, 0.09), 120);
  }
}

export const soundManager = SoundManager.getInstance();
