# 🔭 The Universe at 11:11 | For Maria

An astronomical interactive digital experience dedicated to **Maria** and calibrated to **November 11, 2026, at 11:11:00 PM Asia/Kolkata (IST)**.

---

## 🌟 The Narrative Arc

> *"I wish for another chance with you, Maria. And this time, I want to love you properly."*

1. **The Celestial Observatory (Pre-11:11)**:
   - A luxury astronomical instrument / armillary sphere dial.
   - Concentric orbital rings with degree markings and rotating celestial markers.
   - Real-time countdown to 11:11:00 PM Asia/Kolkata.
   - Moon phase indicator orbiting with realistic lunar shading.

2. **The Final 60 Seconds**:
   - **T-60s**: Orbital rings accelerate, moon converges, sub-bass drone hums in the background.
   - **T-30s**: Background nebula intensifies, meteor trails ignite, dial radiates starlight gold.
   - **T-10s**: Giant cinematic numbers (10... 9... 8...), pulsing gravitational shockwaves through the stars with each second.

3. **The Great Celestial Awakening (11:11:00 PM IST)**:
   - Complete darkness → Single pulsating golden star → Supernova visual burst.
   - A living spiral galaxy forms with logarithmic arms and dust lanes.
   - Camera travels through the cosmic depth.

4. **The Constellation of MARIA**:
   - Thousands of stars migrate into astronomical coordinates spelling **MARIA**.
   - Delicate glowing cartography lines connect each star.
   - A golden shooting star sweeps across the completed name.
   - *"Out of all the stars in the universe, my wish still finds you."*

5. **The Wish Reveal**:
   - Camera follows a bright shooting star across the cosmos as the confession unfolds:
     - *"If the universe could grant me one wish tonight..."*
     - *"it would be another chance with you, Maria."*
     - *"And this time..."*
     - *"I want to love you properly."*

6. **The Personal Love Letter to Maria**:
   - A glowing celestial folio surrounded by drifting stardust containing your sincere, vulnerable words.

7. **The Final Constellation & Eternal Cosmos**:
   - An astronomical heart constellation formed by real celestial star nodes.
   - A golden shooting star cuts through the heart.
   - *"One universe. Billions of stars. One wish. Maria."*
   - *"If I get another chance, I want to love you properly this time."*

---

## ⚙️ Customization Guide

### 1. Dedicated Configuration File
All texts, coordinates, and timings are stored in **`src/config/love-config.ts`**:

```typescript
export const astronomyConfig = {
  recipient: {
    name: "Maria",
    label: "For Maria",
  },
  observatory: {
    targetTimeISO: "2026-11-11T23:11:00+05:30", // Asia/Kolkata 11:11 PM
    coordinates: {
      rightAscension: "22h 11m 11.0s",
      declination: "+11° 11' 11.0\"",
      constellation: "Pegasus-Andromeda Sector",
    },
    headline: "THE UNIVERSE IS WAITING",
    subheadline: "Some wishes deserve their own moment.",
    dedication: "For Maria.",
  },
  letter: {
    salutation: "Maria,",
    paragraphs: [
      // Edit or add your personal words
    ],
    closing: "Forever in your orbit,",
    signature: "Yours Always",
  },
  // ...
};
```

---

## 🎮 Astronomical Simulation Controls (Top Left Menu)

You can experience and verify every stage at any time without waiting for 11:11 PM:
- **Real-Time Clock (IST)**: Default real-time clock targeting 11:11 PM Asia/Kolkata.
- **Jump to T-60s**: Simulates the 60-second acceleration phase.
- **Jump to T-10s**: Simulates the final 10-second giant countdown and gravitational pulses.
- **Trigger 11:11 Awakening**: Immediately launches the Supernova, Living Spiral Galaxy, Constellation of Maria, Wish reveal, and Letter.

---

## 🎵 Sound Design

- **Celestial Drone**: 55Hz sub-bass ambient drone synthesized via the Web Audio API.
- **Gravitational Pulses**: Resonant thumps on each second of the final 10-second countdown.
- **Supernova Awakening**: Deep cosmic burst with ascending celestial harp harmonics.
- **Crystal Chimes**: Pure starlight bells for the Constellation of Maria and the Wish reveals.
