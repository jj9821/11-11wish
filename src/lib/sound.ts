"use client";

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export const AVAILABLE_TRACKS: AudioTrack[] = [
  {
    id: "night-we-met",
    title: "The Night We Met",
    artist: "Lord Huron",
    url: "/audio/TheNightWeMet.mp3",
  },
  {
    id: "apocalypse",
    title: "Apocalypse",
    artist: "Cigarettes After Sex",
    url: "/audio/Apocalypse.mp3",
  },
  {
    id: "our-song",
    title: "Our Song",
    artist: "For Maria & Joel",
    url: "/audio/our_song.mp3",
  },
  {
    id: "wanna-be-yours",
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    url: "/audio/IWannaBeYours.mp3",
  },
  {
    id: "cloud-9",
    title: "Cloud 9",
    artist: "Beach Bunny",
    url: "/audio/Cloud9.mp3",
  },
];

class SoundManager {
  private static instance: SoundManager;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentTrack: AudioTrack = AVAILABLE_TRACKS[0];
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private listeners: Set<(isPlaying: boolean, track: AudioTrack) => void> = new Set();

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public subscribe(callback: (isPlaying: boolean, track: AudioTrack) => void): () => void {
    this.listeners.add(callback);
    callback(!this.isMuted, this.currentTrack);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(!this.isMuted, this.currentTrack));
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }

      this.audioElement = new Audio();
      this.audioElement.src = this.currentTrack.url;
      this.audioElement.loop = true;
      this.audioElement.preload = "auto";
      this.audioElement.volume = 0.75;

      this.isInitialized = true;
    } catch (e) {
      console.warn("SoundManager initialization warning:", e);
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
    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isMuted = false;
    this.notify();

    if (this.audioElement) {
      try {
        await this.audioElement.play();
      } catch (err) {
        console.warn("Audio playback pending user interaction:", err);
      }
    }
  }

  public pause() {
    this.isMuted = true;
    this.notify();

    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public setTrack(track: AudioTrack) {
    this.currentTrack = track;
    if (this.audioElement) {
      const wasPlaying = !this.isMuted;
      this.audioElement.src = track.url;
      this.audioElement.currentTime = 0;
      if (wasPlaying) {
        this.audioElement.play().catch(() => {});
      }
    }
    this.notify();
  }

  public getCurrentTrack(): AudioTrack {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  // --- Sound Effects (Synthesized into SFX Gain Node) ---

  public playCrystalNote(frequency: number, maxGain = 0.05) {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(maxGain, this.ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Ignore
    }
  }

  /** Gravitational Pulse Shockwave (T-10s countdown tick) */
  public playGravitationalPulse(freq = 65) {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.75);

      this.playCrystalNote(freq * 16, 0.03);
    } catch {
      // Ignore
    }
  }

  /** Supernova Awakening burst */
  public playSupernovaAwakening() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    try {
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

  // Backwards compatibility alias
  public startDeepSpaceDrone(freq = 55) {
    void freq;
  }

  public stopDrone() {}
}

export const soundManager = SoundManager.getInstance();
