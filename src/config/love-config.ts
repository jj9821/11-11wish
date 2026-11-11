export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  date: string;
  location: string;
  image: string;
  alt: string;
}

export interface WishItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  iconName: "sun" | "sparkles" | "compass" | "heart" | "infinity";
}

export interface CelestialPalette {
  absoluteBlack: string;
  deepCosmicNavy: string;
  midnightIndigo: string;
  nebulaViolet: string;
  celestialBlue: string;
  starlightGold: string;
  moonlightSilver: string;
  softRose: string;
}

export interface UnifiedAstronomyConfig {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  recipient: {
    name: string;
    label: string;
  };
  names: {
    herName: string;
    myName: string;
    nickname: string;
  };
  anniversary: {
    date: string;
    label: string;
  };
  observatory: {
    targetTimeISO: string;
    targetTimeLabel: string;
    coordinates: {
      rightAscension: string;
      declination: string;
      constellation: string;
      epoch: string;
    };
    headline: string;
    subheadline: string;
    dedication: string;
  };
  countdown: {
    statusWaiting: string;
    statusSixtySeconds: string;
    statusThirtySeconds: string;
    statusTenSeconds: string;
    statusAwakening: string;
  };
  narrative: {
    tagline: string;
    introLine1: string;
    introLine2: string;
    wishPromptTitle: string;
    wishPromptSubtitle: string;
    countdownNumber: number;
    wishConfirmationQuestion: string;
    wishConfirmationButton: string;
    revealHook: string;
    revealPremise: string;
    revealStagger1: string;
    revealStagger2: string;
    revealStagger3: string;
    revealClimax: string;
    revealSubtitle: string;
  };
  constellationMaria: {
    title: string;
    subtext: string;
  };
  wishReveal: {
    lines: string[];
    climax: string;
  };
  letter: {
    floatingPill: string;
    openButtonText: string;
    closeButtonText: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
    signature: string;
  };
  memoriesHeader: {
    badge: string;
    title: string;
    subtitle: string;
  };
  memories: MemoryItem[];
  wishesHeader: {
    badge: string;
    title: string;
    subtitle: string;
  };
  wishes: WishItem[];
  finale: {
    time: string;
    line1: string;
    line2: string;
    heading: string;
    stanza1: string;
    stanza2: string;
    stanza3: string;
    name: string;
    promise: string;
    signoff: string;
    restartButtonText: string;
  };
  palette: CelestialPalette;
  audio: {
    ambientDrone: boolean;
    frequency: number;
    title: string;
    artist: string;
    src: string;
    volume: number;
    synthesizeAmbience: boolean;
  };
}

export const astronomyConfig: UnifiedAstronomyConfig = {
  meta: {
    siteTitle: "11:11 | For Maria — The Celestial Observatory",
    siteDescription:
      "An astronomical journey through the cosmos dedicated to 11/11 at 11:11 PM. For Maria.",
  },
  recipient: {
    name: "Maria",
    label: "For Maria",
  },
  names: {
    herName: "Maria",
    myName: "Yours Always",
    nickname: "My Wish",
  },
  anniversary: {
    date: "November 11, 2026",
    label: "11:11 PM IST",
  },
  observatory: {
    targetTimeISO: "2026-11-11T23:11:00+05:30",
    targetTimeLabel: "11:11:00 PM IST",
    coordinates: {
      rightAscension: "22h 11m 11.0s",
      declination: "+11° 11' 11.0\"",
      constellation: "Pegasus-Andromeda Sector",
      epoch: "J2026.86",
    },
    headline: "THE UNIVERSE IS WAITING",
    subheadline: "Some wishes deserve their own moment.",
    dedication: "For Maria.",
  },
  countdown: {
    statusWaiting: "CELESTIAL HARMONICS SYNCHRONIZING",
    statusSixtySeconds: "GRAVITATIONAL LENSING ACCELERATING",
    statusThirtySeconds: "STELLAR CORONA EXPANDING",
    statusTenSeconds: "TIME DILATION INITIATED",
    statusAwakening: "CELESTIAL AWAKENING IN PROGRESS",
  },
  narrative: {
    tagline:
      "At 11:11, everyone makes a wish. But I don't have to. Because you're the wish I'd make, every single time.",
    introLine1: "Some moments are meant to be wished upon.",
    introLine2: "Some wishes are meant to come true.",
    wishPromptTitle: "It's 11:11.",
    wishPromptSubtitle: "Close your eyes. Take a breath. Make a wish.",
    countdownNumber: 11,
    wishConfirmationQuestion: "Did you make a wish?",
    wishConfirmationButton: "I DID ✨",
    revealHook: "Can I tell you something, Maria?",
    revealPremise: "Everyone makes a wish at 11:11.",
    revealStagger1: "Some wish for happiness.",
    revealStagger2: "Some wish for success.",
    revealStagger3: "Some wish for a perfect future.",
    revealClimax: "BUT I WISH FOR YOU.",
    revealSubtitle:
      "Because out of eight billion souls and an infinite cosmos, you are the only wish I'll ever need.",
  },
  constellationMaria: {
    title: "MARIA",
    subtext: "Out of all the stars in the universe, my wish still finds you.",
  },
  wishReveal: {
    lines: [
      "If the universe could grant me one wish tonight...",
      "it would be another chance with you, Maria.",
      "And this time...",
      "I want to love you properly.",
    ],
    climax: "I want to love you properly.",
  },
  letter: {
    floatingPill: "A little something from me to you, Maria.",
    openButtonText: "OPEN CELESTIAL LETTER",
    closeButtonText: "FOLD LETTER",
    date: "11:11 PM IST — A Quiet Universe",
    salutation: "Maria,",
    paragraphs: [
      "If I could make one wish tonight, it would be for another chance with you.",
      "A chance to do things differently.",
      "A chance to understand you better, appreciate you more, and show you the kind of love I wish I had given you all along.",
      "I don't expect the universe to promise me anything.",
      "But if there is one thing I could ask for, it would be the opportunity to love you properly this time.",
      "To create new memories, to laugh together, to be there through ordinary days, and to make the little moments matter.",
      "I don't know what the future holds.",
      "But tonight, at 11:11, this is my wish.",
      "One more chance with you, Maria.",
      "And this time, I want to get it right.",
    ],
    closing: "Forever in your orbit,",
    signOff: "Happy 11:11, Maria. ❤️",
    signature: "Yours Always",
  },
  memoriesHeader: {
    badge: "ARCHIVE // OUR CELESTIAL MOMENTS",
    title: "If I could collect moments, I'd collect them with you.",
    subtitle:
      "Stargazed evenings, whispered dreams, and ordinary days turned timeless.",
  },
  memories: [
    {
      id: "memory-1",
      title: "Under The Midnight Sky",
      subtitle: "The night we lost track of time",
      caption:
        "Looking up at a billion stars, but my eyes always found their way back to you.",
      date: "Autumn Evening",
      location: "Stargazer's Hill",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
      alt: "Starry starry night sky over mountain silhouette",
    },
    {
      id: "memory-2",
      title: "Golden Hour Glow",
      subtitle: "When the light caught your smile",
      caption:
        "Some smiles can illuminate an entire universe. Yours is my favourite one, Maria.",
      date: "Late Afternoon",
      location: "The Coastline",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      alt: "Golden sunset over calm ocean waves",
    },
    {
      id: "memory-3",
      title: "Quiet Coffee & Soft Whispers",
      subtitle: "The ordinary turned extraordinary",
      caption:
        "No grand gestures needed—just your hand in mine, warm mugs, and endless laughter.",
      date: "Sunday Morning",
      location: "Our Corner Table",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80",
      alt: "Warm coffee and morning light",
    },
    {
      id: "memory-4",
      title: "Roads To Nowhere",
      subtitle: "Every adventure is better with you",
      caption:
        "Windows down, music on, headlights carving through the dark. Anywhere is home with you.",
      date: "Twilight Drive",
      location: "The Open Road",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
      alt: "Misty mountains and winding road into the forest",
    },
    {
      id: "memory-5",
      title: "Constellations in the City",
      subtitle: "Surrounded by millions, seeing only you",
      caption:
        "The whole city glittering beneath us, but none of its lights shine as bright as your eyes.",
      date: "Midnight",
      location: "The Rooftop",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
      alt: "City lights glittering at night",
    },
    {
      id: "memory-6",
      title: "Aurora Of Our Dreams",
      subtitle: "When the sky dances for us",
      caption:
        "Proof that magic exists in this world. And having you is the greatest magic of all.",
      date: "Winter Night",
      location: "The Northern Horizon",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80",
      alt: "Green and purple northern lights aurora in starry sky",
    },
  ],
  wishesHeader: {
    badge: "CELESTIAL PRAYERS // FIVE WISHES",
    title: "If I could make five wishes for us...",
    subtitle:
      "Not for wealth, not for things that fade—just these simple, eternal truths.",
  },
  wishes: [
    {
      id: 1,
      number: "01",
      title: "More sunsets together.",
      subtitle: "Watching the sky change colors beside you.",
      description:
        "To pause time at dusk, breathing in the amber and rose horizon, knowing there's nowhere else in this world I'd rather be.",
      accent: "#F5D9A0",
      iconName: "sun",
    },
    {
      id: 2,
      number: "02",
      title: "More laughter over the smallest things.",
      subtitle: "The kind of laughter that makes our stomachs hurt.",
      description:
        "For inside jokes that only we understand, midnight giggles that wake the house, and the effortless lightness of being your person.",
      accent: "#503B83",
      iconName: "sparkles",
    },
    {
      id: 3,
      number: "03",
      title: "More places to explore together.",
      subtitle: "New horizons, shared compasses, hand in hand.",
      description:
        "To get delightfully lost in unfamiliar cobblestone streets, climb misty viewpoints, and stamp our memories across the globe together.",
      accent: "#7995CC",
      iconName: "compass",
    },
    {
      id: 4,
      number: "04",
      title: "More memories that we'll talk about years later.",
      subtitle: "Stories woven from quiet golden threads.",
      description:
        "For chapters filled with silly mishaps, quiet triumphs, warm blankets on rainy afternoons, and love that grows deeper with every season.",
      accent: "#D7A6B8",
      iconName: "heart",
    },
    {
      id: 5,
      number: "05",
      title: "More tomorrows with you.",
      subtitle: "Every single one of them. For all of time.",
      description:
        "To wake up to your voice, to fall asleep holding your hand, and to choose you with certainty every ordinary, beautiful day to come.",
      accent: "#E4E7F3",
      iconName: "infinity",
    },
  ],
  finale: {
    time: "11:11",
    line1: "One universe.",
    line2: "Billions of stars.",
    heading: "Maria.",
    stanza1: "One universe.",
    stanza2: "Billions of stars.",
    stanza3: "One wish.",
    name: "Maria.",
    promise:
      "If I get another chance, I want to love you properly this time.",
    signoff: "11:11 ❤️",
    restartButtonText: "RETURN TO OBSERVATORY ✨",
  },
  palette: {
    absoluteBlack: "#03040A",
    deepCosmicNavy: "#080D20",
    midnightIndigo: "#11152F",
    nebulaViolet: "#503B83",
    celestialBlue: "#7995CC",
    starlightGold: "#F5D9A0",
    moonlightSilver: "#E4E7F3",
    softRose: "#D7A6B8",
  },
  audio: {
    ambientDrone: true,
    frequency: 55,
    title: "Celestial Mechanics at 11:11",
    artist: "Starlight & Space",
    src: "/audio/ambient.mp3",
    volume: 0.5,
    synthesizeAmbience: true,
  },
};

export const loveConfig = astronomyConfig;
