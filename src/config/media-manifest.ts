export interface MediaAsset {
  id: string;
  filePath: string;
  originalPath: string;
  type: "video" | "image";
  title: string;
  description: string;
  intendedScene:
    | "observatory"
    | "accelerating"
    | "awakening"
    | "galaxy"
    | "maria"
    | "wish"
    | "letter"
    | "finale"
    | "archive";
  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  dominantColors: {
    hex: string;
    description: string;
  };
  lightingAndAtmosphere: string;
  composition: string;
  recommendedPlaybackMode: "ambient-loop" | "one-time-cinematic" | "interactive-reveal" | "static";
  playbackStartTime?: number;
  playbackEndTime?: number;
  loop: boolean;
  desktopTreatment: string;
  mobileTreatment: string;
  posterImage?: string;
  isGrayscale?: boolean;
}

export interface MediaManifest {
  videos: Record<string, MediaAsset>;
  images: Record<string, MediaAsset>;
  curationMap: Array<{
    scene: string;
    recommendedAssetId: string;
    reason: string;
    playbackTreatment: string;
  }>;
}

export const mediaManifest: MediaManifest = {
  videos: {
    "maria-motion-loop": {
      id: "maria-motion-loop",
      filePath: "/videos/maria-motion-loop.mp4",
      originalPath: "assets/IMG_3659.mp4",
      type: "video",
      title: "Maria — The Living Starlight Portrait",
      description:
        "Cinematic ping-pong loop derived from Apple Live Photo. Maria smiles with warm starlight glow and natural presence.",
      intendedScene: "wish",
      dimensions: {
        width: 1308,
        height: 1744,
        aspectRatio: "3:4 (0.75)",
      },
      dominantColors: {
        hex: "#988977",
        description: "Warm champagne, golden amber, and soft candlelight skin tones",
      },
      lightingAndAtmosphere: "Warm, intimate, golden hour candle ambience with natural breathing movement",
      composition: "Close-up portrait centered on Maria's joyful expression and direct eye contact",
      recommendedPlaybackMode: "ambient-loop",
      loop: true,
      desktopTreatment:
        "Floating celestial locket / starlight viewport with feathered cosmic mask and golden rim glow",
      mobileTreatment:
        "Full-width responsive container with soft edge fade and 1:1 / 4:5 aspect ratio cropping",
      posterImage: "/videos/maria-motion-poster.jpg",
    },
    "deep-nebula-ambient": {
      id: "deep-nebula-ambient",
      filePath: "/videos/deep-nebula-ambient.mp4",
      originalPath: "generated/deep-nebula-ambient.mp4",
      type: "video",
      title: "Deep Space Nebula & Starlight Drift",
      description:
        "Organic drifting nebula clouds in nebula violet (#503B83), celestial blue (#7995CC), and absolute black (#03040A).",
      intendedScene: "observatory",
      dimensions: {
        width: 1280,
        height: 720,
        aspectRatio: "16:9 (1.78)",
      },
      dominantColors: {
        hex: "#11152F",
        description: "Midnight indigo, nebula violet, and soft starlight points",
      },
      lightingAndAtmosphere: "Immense, serene astronomical void with subtle gaseous motion",
      composition: "Dual nebula filaments framed along the celestial diagonal",
      recommendedPlaybackMode: "ambient-loop",
      loop: true,
      desktopTreatment: "Full-screen background layer underneath the astronomical dial with 0.45 opacity",
      mobileTreatment: "Full-screen background layer with centered crop and hardware acceleration",
      posterImage: "/videos/deep-nebula-poster.jpg",
    },
    "galaxy-awakening": {
      id: "galaxy-awakening",
      filePath: "/videos/galaxy-awakening.mp4",
      originalPath: "generated/galaxy-awakening.mp4",
      type: "video",
      title: "The Supernova & Living Spiral Galaxy Awakening",
      description:
        "Cinematic progression from a pulsating gravitational singularity into an expanding spiral galaxy at 11:11 PM IST.",
      intendedScene: "awakening",
      dimensions: {
        width: 1280,
        height: 720,
        aspectRatio: "16:9 (1.78)",
      },
      dominantColors: {
        hex: "#F5D9A0",
        description: "Brilliant starlight gold core, moonlight silver shockwave, and cosmic violet arms",
      },
      lightingAndAtmosphere: "High dynamic range astronomical explosion transitioning to peaceful galactic rotation",
      composition: "Central cosmic singularity expanding outward into rotating logarithmic spiral arms",
      recommendedPlaybackMode: "one-time-cinematic",
      loop: false,
      desktopTreatment: "Full-screen cinematic hero sequence triggered at 11:11:00 PM IST with GSAP timeline control",
      mobileTreatment: "Centered scale with radial vignette overlay",
      posterImage: "/videos/galaxy-awakening-poster.jpg",
    },
  },
  images: {
    "couple-sweet-selfie": {
      id: "couple-sweet-selfie",
      filePath: "/images/couple_sweet_selfie.jpg",
      originalPath: "assets/couple_sweet_selfie.jpg",
      type: "image",
      title: "Under The Midnight Sky",
      description: "Intimate candid selfie of Maria and you holding each other close.",
      intendedScene: "archive",
      dimensions: {
        width: 1024,
        height: 767,
        aspectRatio: "4:3 (1.34)",
      },
      dominantColors: {
        hex: "#7b685d",
        description: "Warm muted earth, deep shadows, and tender skin tones",
      },
      lightingAndAtmosphere: "Intimate, warm indoor/twilight lighting with relaxed, candid romance",
      composition: "Medium close-up couple portrait",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Editorial luxury memory card with 3D tilt and starlight reflection",
      mobileTreatment: "Touch swipe card with full bleed and tap-to-expand lightbox",
    },
    "img-5175": {
      id: "img-5175",
      filePath: "/images/IMG_5175.jpg",
      originalPath: "assets/IMG_5175.jpg",
      type: "image",
      title: "Golden Hour Glow",
      description: "High-resolution vertical portrait of Maria in breathtaking soft-rose lighting.",
      intendedScene: "wish",
      dimensions: {
        width: 2160,
        height: 3840,
        aspectRatio: "9:16 (0.56)",
      },
      dominantColors: {
        hex: "#886f6d",
        description: "Soft rose (#D7A6B8), warm blush, and delicate amber",
      },
      lightingAndAtmosphere: "Soft diffuse portrait lighting, radiant natural beauty, gentle warm shadows",
      composition: "Vertical portrait emphasizing Maria's warm expression and gentle smile",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Parallax depth layer in the memory universe and lightbox hero",
      mobileTreatment: "Full-height vertical portrait presentation",
    },
    "pxl-portrait-bokeh": {
      id: "pxl-portrait-bokeh",
      filePath: "/images/PXL_20230727_083312590.PORTRAIT_Original.jpg",
      originalPath: "assets/PXL_20230727_083312590.PORTRAIT_Original.jpg",
      type: "image",
      title: "Sunlit Reverie",
      description: "Google Pixel 7 portrait with optical background blur and natural daylight.",
      intendedScene: "archive",
      dimensions: {
        width: 2160,
        height: 3840,
        aspectRatio: "9:16 (0.56)",
      },
      dominantColors: {
        hex: "#7b706b",
        description: "Natural daylight, soft cream, and subtle greenery bokeh",
      },
      lightingAndAtmosphere: "Bright natural daylight with shallow depth-of-field",
      composition: "Classic vertical portrait with beautiful bokeh",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Gallery memory tableau with stardust framing",
      mobileTreatment: "High-DPI responsive image with smooth loading placeholder",
    },
    "pxl-outdoor-summer": {
      id: "pxl-outdoor-summer",
      filePath: "/images/PXL_20230826_075721772_Original.jpg",
      originalPath: "assets/PXL_20230826_075721772_Original.jpg",
      type: "image",
      title: "Summer Starlight",
      description: "Ultra-sharp 4K daylight portrait capturing Maria's carefree radiance.",
      intendedScene: "archive",
      dimensions: {
        width: 2268,
        height: 4032,
        aspectRatio: "9:16 (0.56)",
      },
      dominantColors: {
        hex: "#837d69",
        description: "Warm golden sunlight, gentle earth tones, and bright sky highlights",
      },
      lightingAndAtmosphere: "Sunny morning illumination with vibrant energy",
      composition: "Full-length outdoor portrait",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Editorial horizontal gallery card with lightbox zoom",
      mobileTreatment: "Full-width carousel card",
    },
    "moment-cherished": {
      id: "moment-cherished",
      filePath: "/images/moment_c5c4dd992bee44918803b66e575be708_1694126187177_Original.jpg",
      originalPath: "assets/moment_c5c4dd992bee44918803b66e575be708_1694126187177_Original.jpg",
      type: "image",
      title: "Timeless Moments",
      description: "Square editorial memory of a special afternoon with Maria.",
      intendedScene: "archive",
      dimensions: {
        width: 1676,
        height: 1492,
        aspectRatio: "1:1 (1.12)",
      },
      dominantColors: {
        hex: "#8c8581",
        description: "Silvery gray, warm starlight white, and crisp highlights",
      },
      lightingAndAtmosphere: "Luminous, high-key ambient lighting, nostalgic and pure",
      composition: "Candid medium shot capturing an authentic shared laugh",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Square glass panel with constellation coordinate watermark",
      mobileTreatment: "Responsive square preview",
    },
    "img-3574-bw": {
      id: "img-3574-bw",
      filePath: "/images/IMG_3574.jpg",
      originalPath: "assets/IMG_3574.jpg",
      type: "image",
      title: "Monochrome Whispers I",
      description: "Artistic black-and-white fine art capture with silver tonal balance.",
      intendedScene: "archive",
      dimensions: {
        width: 1744,
        height: 1308,
        aspectRatio: "4:3 (1.33)",
      },
      dominantColors: {
        hex: "#727272",
        description: "Moonlight silver, deep charcoal, and velvety blacks",
      },
      lightingAndAtmosphere: "Dramatic fine-art black-and-white lighting with deep contrast",
      composition: "Cinematic horizontal landscape framing",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Silver foiled frame with moonlight glow hover state",
      mobileTreatment: "Landscape card with tap-to-enlarge",
      isGrayscale: true,
    },
    "img-3578-bw": {
      id: "img-3578-bw",
      filePath: "/images/IMG_3578.jpg",
      originalPath: "assets/IMG_3578.jpg",
      type: "image",
      title: "Monochrome Whispers II",
      description: "Artistic companion black-and-white memory capturing quiet connection.",
      intendedScene: "archive",
      dimensions: {
        width: 1744,
        height: 1308,
        aspectRatio: "4:3 (1.33)",
      },
      dominantColors: {
        hex: "#787878",
        description: "Soft silver, graphite, and pure highlight points",
      },
      lightingAndAtmosphere: "Subdued, reflective, poetic atmosphere",
      composition: "Complementary frame to IMG_3574",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Silver foiled frame with moonlight glow hover state",
      mobileTreatment: "Landscape card with tap-to-enlarge",
      isGrayscale: true,
    },
    "img-3659-still": {
      id: "img-3659-still",
      filePath: "/images/IMG_3659.jpg",
      originalPath: "assets/IMG_3659.jpg",
      type: "image",
      title: "Maria's Smile",
      description: "The still portrait keyframe corresponding to the Live Photo video.",
      intendedScene: "letter",
      dimensions: {
        width: 1308,
        height: 1744,
        aspectRatio: "3:4 (0.75)",
      },
      dominantColors: {
        hex: "#988977",
        description: "Warm amber, champagne gold, and soft white highlights",
      },
      lightingAndAtmosphere: "Intimate candle-lit warmth, luminous eyes, genuine happiness",
      composition: "Classic vertical portrait with warm direct focus",
      recommendedPlaybackMode: "static",
      loop: false,
      desktopTreatment: "Embedded next to the love letter as a tangible celestial keepsake",
      mobileTreatment: "Top banner of the personal letter modal",
    },
  },
  curationMap: [
    {
      scene: "Astronomical Observatory (Countdown)",
      recommendedAssetId: "deep-nebula-ambient",
      reason:
        "Subtle, deep-space nebula motion creates anticipation without distracting from the armillary dial.",
      playbackTreatment: "Muted background loop at 0.4 opacity with dark radial vignette.",
    },
    {
      scene: "Final 60s & 10s Countdown",
      recommendedAssetId: "deep-nebula-ambient",
      reason:
        "Nebula video accelerates slightly in brightness and intensity, synchronizing with the sub-bass drone.",
      playbackTreatment: "Gradual opacity increase from 0.4 to 0.7.",
    },
    {
      scene: "11:11 Transformation (Supernova & Galaxy Awakening)",
      recommendedAssetId: "galaxy-awakening",
      reason:
        "Spectacular astronomical expansion from a golden singularity into a full spiral galaxy, perfectly matched to 11:11:00 PM IST.",
      playbackTreatment: "One-time cinematic playback coordinated with GSAP timeline and audio whoosh.",
    },
    {
      scene: "Constellation of MARIA",
      recommendedAssetId: "maria-motion-loop",
      reason:
        "Maria's living portrait awakens as the stars spell her name, grounding the astronomical cosmos in personal intimacy.",
      playbackTreatment: "Smooth fade-in inside a circular astronomical locket with feathered star edges.",
    },
    {
      scene: "The Wish Reveal ('I want to love you properly')",
      recommendedAssetId: "maria-motion-loop",
      reason:
        "Her gentle breathing and warm gaze accompany the four lines of the wish, making the confession unforgettable.",
      playbackTreatment: "Continuous seamless ping-pong loop with warm starlight glow.",
    },
    {
      scene: "The Personal Love Letter",
      recommendedAssetId: "img-3659-still",
      reason:
        "High-definition still portrait placed alongside the letter provides stillness and emotional permanence.",
      playbackTreatment: "Static parchment presentation with gold starlight border.",
    },
    {
      scene: "Memory Gallery (Our Celestial Moments)",
      recommendedAssetId: "all-curated-images",
      reason:
        "Every real photo of Maria and the couple forms a personal constellation in the interactive memory deck.",
      playbackTreatment: "Horizontal parallax scroll + full-screen cinematic lightbox.",
    },
  ],
};
