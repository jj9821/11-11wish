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

export interface LoveConfig {
  meta: {
    siteTitle: string;
    siteDescription: string;
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
  letter: {
    floatingPill: string;
    openButtonText: string;
    closeButtonText: string;
    date: string;
    salutation: string;
    paragraphs: string[];
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
    promise: string;
    restartButtonText: string;
  };
  audio: {
    title: string;
    artist: string;
    src: string; // If set and file exists, will play this audio file. Otherwise Web Audio API generates ambient pads.
    volume: number;
    synthesizeAmbience: boolean;
  };
}

export const loveConfig: LoveConfig = {
  meta: {
    siteTitle: "11:11 | You Are My Wish",
    siteDescription:
      "At 11:11, everyone makes a wish. But I don't have to. Because you're the wish I'd make, every single time.",
  },
  names: {
    herName: "My Love",
    myName: "Yours Always",
    nickname: "My Favourite Wish",
  },
  anniversary: {
    date: "November 11",
    label: "Our Special Moment",
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
    revealHook: "Can I tell you something?",
    revealPremise: "Everyone makes a wish at 11:11.",
    revealStagger1: "Some wish for happiness.",
    revealStagger2: "Some wish for success.",
    revealStagger3: "Some wish for a perfect future.",
    revealClimax: "BUT I WISH FOR YOU.",
    revealSubtitle:
      "Because out of eight billion souls and an infinite cosmos, you are the only wish I'll ever need.",
  },
  letter: {
    floatingPill: "A little something from me to you.",
    openButtonText: "OPEN YOUR LETTER",
    closeButtonText: "FOLD LETTER",
    date: "11:11 PM — A Quiet Evening",
    salutation: "To the love of my life,",
    paragraphs: [
      "Everyone talks about 11:11 being the perfect time to make a wish.",
      "They say the universe listens a little closer at this moment.",
      "But if I could make a thousand wishes, I think I'd end up making the same one every single time.",
      "You.",
      "I'd wish for more memories with you, more laughter, more random conversations, more adventures, and all those little moments that somehow become my favourite memories.",
      "I'd wish for the days when everything feels perfect and even the days when everything feels a little difficult.",
      "I'd wish to keep choosing you.",
      "Not just today. Not just at 11:11.",
      "Every ordinary morning, every random afternoon, and every quiet night.",
      "Maybe I don't need to make a wish anymore.",
      "Because somehow, the universe gave me you.",
      "And if I get to keep wishing for anything, let it always be us.",
    ],
    signOff: "Happy 11:11, my favourite wish. ❤️",
    signature: "Forever & Always,",
  },
  memoriesHeader: {
    badge: "SCENE 05 // OUR LITTLE UNIVERSE",
    title: "If I could collect moments, I'd collect them with you.",
    subtitle:
      "A gallery of stargazed evenings, whispered dreams, and ordinary days turned timeless.",
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
        "Some smiles can illuminate an entire universe. Yours is my favourite one.",
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
    badge: "SCENE 06 // FIVE LITTLE WISHES",
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
      accent: "#EBD5A5", // champagne gold
      iconName: "sun",
    },
    {
      id: 2,
      number: "02",
      title: "More laughter over the smallest things.",
      subtitle: "The kind of laughter that makes our stomachs hurt.",
      description:
        "For inside jokes that only we understand, midnight giggles that wake the house, and the effortless lightness of being your person.",
      accent: "#C4A6FF", // lavender
      iconName: "sparkles",
    },
    {
      id: 3,
      number: "03",
      title: "More places to explore together.",
      subtitle: "New horizons, shared compasses, hand in hand.",
      description:
        "To get delightfully lost in unfamiliar cobblestone streets, climb misty viewpoints, and stamp our memories across the globe together.",
      accent: "#93C5FD", // soft celestial blue
      iconName: "compass",
    },
    {
      id: 4,
      number: "04",
      title: "More memories that we'll talk about years later.",
      subtitle: "Stories woven from quiet golden threads.",
      description:
        "For chapters filled with silly mishaps, quiet triumphs, warm blankets on rainy afternoons, and love that grows deeper with every season.",
      accent: "#D99CB7", // muted rose
      iconName: "heart",
    },
    {
      id: 5,
      number: "05",
      title: "More tomorrows with you.",
      subtitle: "Every single one of them. For all of time.",
      description:
        "To wake up to your voice, to fall asleep holding your hand, and to choose you with certainty every ordinary, beautiful day to come.",
      accent: "#FFF9F2", // soft starlight white
      iconName: "infinity",
    },
  ],
  finale: {
    time: "11:11",
    line1: "Out of all the wishes in the universe...",
    line2: "You're still my favourite.",
    heading: "Happy 11:11, my love.",
    promise:
      "If I could go back and make a wish a thousand times, I'd still choose you. Every single time.",
    restartButtonText: "MAKE ANOTHER WISH ✨",
  },
  audio: {
    title: "Celestial Radiance (11:11 Ambient Soundscape)",
    artist: "Procedural Harmony & Starlight",
    src: "/audio/ambient.mp3",
    volume: 0.4,
    synthesizeAmbience: true,
  },
};
