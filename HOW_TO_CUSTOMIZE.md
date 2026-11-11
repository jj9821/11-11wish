# 🌟 How to Customize "11:11 | You Are My Wish"

This website was designed with a dedicated configuration system so you can easily personalize every detail for your girlfriend without touching complex animation code.

---

## 1. Edit Names & Details
Open **`src/config/love-config.ts`**:

```typescript
names: {
  herName: "Maya",           // Replace with her real name
  myName: "Alex",            // Replace with your name
  nickname: "My Favourite Wish",
},
anniversary: {
  date: "November 11, 2024", // Your special date or anniversary
  label: "Our Special Moment",
},
```

---

## 2. Personalize The 3D Letter
In **`src/config/love-config.ts`**, update the `letter` section:

```typescript
letter: {
  salutation: "To the love of my life,",
  paragraphs: [
    "Everyone talks about 11:11 being the perfect time to make a wish...",
    // Add your own custom paragraphs or keep the poetic default!
  ],
  signOff: "Happy 11:11, my favourite wish. ❤️",
  signature: "Forever & Always, Alex",
}
```

---

## 3. Replace Photographs (Scene 05: Our Little Universe)
You can use either local images or high-resolution URLs:

### Option A: Using Local Pictures (Recommended)
1. Drop your pictures into the **`public/images/`** folder:
   - `public/images/photo1.jpg`
   - `public/images/photo2.jpg`
   - `public/images/photo3.jpg`
   - ...
2. In **`src/config/love-config.ts`**, under `memories`, update the `image` paths:
   ```typescript
   {
     id: "memory-1",
     title: "Under The Midnight Sky",
     subtitle: "Our first stargazing trip",
     caption: "Looking up at a billion stars, but my eyes always found their way back to you.",
     date: "October 14",
     location: "Blue Ridge Lookout",
     image: "/images/photo1.jpg",
     alt: "Maya smiling under starlight",
   }
   ```

### Option B: Using Web / Cloud URLs
Set `image: "https://your-photo-hosting.com/your-image.jpg"`.
*(Note: If you use an external domain, add it to `next.config.ts` under `images.remotePatterns`)*

---

## 4. Background Music & Sound Effects

### Built-in Ambient Soundscape
Out-of-the-box, the website includes a **procedural Web Audio API sound generator** that plays warm, ethereal celestial chords and crystal chimes in real-time, even with zero audio files installed!

### Using Your Own Song:
1. Place your MP3 file in:
   **`public/audio/ambient.mp3`**
2. In `love-config.ts`, verify:
   ```typescript
   audio: {
     title: "Our Song Title",
     artist: "Artist Name",
     src: "/audio/ambient.mp3",
     volume: 0.5,
     synthesizeAmbience: true, // Will fall back to synthesized pads if mp3 is not loaded
   }
   ```
3. Audio begins smoothly as soon as the visitor interacts with the page or taps the floating audio toggle.

---

## 5. Five Wishes & Grand Finale
Feel free to modify the 5 wishes in `love-config.ts` under `wishes: [...]` or the final promise in `finale: {...}` to reflect your own inside jokes, shared dreams, or specific promises.
