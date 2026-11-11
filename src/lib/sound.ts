"use client";

import { loveConfig } from "@/config/love-config";

class SoundManager {
  private static instance: SoundManager;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomAudioPlaying: boolean = false;
  private chordInterval: NodeJS.Timeout | null = null;
  private twinkleInterval: NodeJS.Timeout | null = null;
  private currentChordIndex: number = 0;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();

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

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(loveConfig.audio.volume, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // Check if custom audio can be played
      if (loveConfig.audio.src) {
        this.customAudio = new Audio(loveConfig.audio.src);
        this.customAudio.loop = true;
        this.customAudio.volume = loveConfig.audio.volume;
      }

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

    // Smooth fade in
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 1.2);
    }

    // Try playing custom audio if present
    if (this.customAudio) {
      this.customAudio
        .play()
        .then(() => {
          this.isCustomAudioPlaying = true;
        })
        .catch(() => {
          // If custom audio fails (e.g., file not found), fall back to procedural synthesizer
          this.isCustomAudioPlaying = false;
          this.startProceduralAmbience();
        });
    } else {
      this.startProceduralAmbience();
    }
  }

  public pause() {
    this.isMuted = true;
    this.notify();

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
    }

    if (this.customAudio && this.isCustomAudioPlaying) {
      this.customAudio.pause();
      this.isCustomAudioPlaying = false;
    }

    this.stopProceduralAmbience();
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  /**
   * Generates a lush, ethereal procedural celestial pad and crystal stars
   * using Web Audio API oscillators and biquad filters.
   */
  private startProceduralAmbience() {
    if (this.chordInterval || !this.ctx || !this.ambientGain) return;

    // Celestial chords (frequencies in Hz):
    // 1: Dmaj9 (D3, F#3, A3, C#4, E4)
    // 2: F#m7 (F#2, A3, C#4, E4)
    // 3: Bm9 (B2, D3, F#3, A3, C#4)
    // 4: Gmaj7 (G2, B3, D4, F#4)
    const chords: number[][] = [
      [146.83, 185.0, 220.0, 277.18, 329.63],
      [92.5, 220.0, 277.18, 329.63, 440.0],
      [123.47, 146.83, 185.0, 220.0, 277.18],
      [98.0, 246.94, 293.66, 369.99, 440.0],
    ];

    const playChord = () => {
      if (this.isMuted || !this.ctx || !this.ambientGain) return;
      const notes = chords[this.currentChordIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % chords.length;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 3);
      filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 7.5);

      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0, this.ctx.currentTime);
      chordGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);
      chordGain.gain.setValueAtTime(0.12, this.ctx.currentTime + 5.5);
      chordGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 8.0);

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        // Micro-detuning for lush analog shimmer
        osc.detune.setValueAtTime((idx - 2) * 4, this.ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((idx - 2) * 0.35, this.ctx.currentTime);
          osc.connect(panner);
          panner.connect(filter);
        } else {
          osc.connect(filter);
        }

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 8.2);
      });

      filter.connect(chordGain);
      chordGain.connect(this.ambientGain);
    };

    // Play first chord immediately
    playChord();
    this.chordInterval = setInterval(playChord, 7800);

    // Random gentle crystal twinkling bell notes
    const crystalPentatonic = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66]; // D5, E5, F#5, A5, B5, D6
    this.twinkleInterval = setInterval(() => {
      if (this.isMuted || !this.ctx || !this.ambientGain) return;
      if (Math.random() > 0.45) {
        const note = crystalPentatonic[Math.floor(Math.random() * crystalPentatonic.length)];
        this.playCrystalNote(note, 0.04);
      }
    }, 1800);
  }

  private stopProceduralAmbience() {
    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.twinkleInterval) {
      clearInterval(this.twinkleInterval);
      this.twinkleInterval = null;
    }
  }

  private playCrystalNote(frequency: number, maxGain: number = 0.05) {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(maxGain, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(this.ambientGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 2.3);
    } catch {
      // AudioCtx might be unready
    }
  }

  // --- Sound Effects for Key Interactions ---

  /** Gentle starlight chime (used on countdown, button clicks) */
  public playChime(freq = 880) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);
    } catch {
      // Ignore
    }
  }

  /** Shimmering stardust burst when countdown reaches 1 */
  public playWishBurst() {
    if (!this.ctx || this.isMuted) return;
    const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
    notes.forEach((n, i) => {
      setTimeout(() => {
        this.playCrystalNote(n, 0.08);
      }, i * 90);
    });
  }

  /** Soft tactile paper shimmer when opening the 3D letter */
  public playLetterOpen() {
    if (!this.ctx || this.isMuted) return;
    try {
      // White noise burst filtered as paper slide
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      this.playChime(1046.5); // high C6 bell
    } catch {
      // Ignore
    }
  }
}

export const soundManager = SoundManager.getInstance();
