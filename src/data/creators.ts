export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string; // e.g. "77.2K"
  avgViews: string; // e.g. "9.7万"
  region: "CN" | "US" | "UK" | "JP" | "KR";
  gender: "男性" | "女性";
  platform: "TikTok Shop" | "抖音" | "小红书" | "Instagram" | "YouTube";
  category: "美妆" | "穿搭" | "数码" | "美食" | "生活";
};

const seed = [
  ["Camila Reed", "camilareviewslab", "美妆"],
  ["Nora Hayes", "nora.finds", "穿搭"],
  ["Ari Monroe", "ariugcstudio", "数码"],
  ["Jade Collins", "jadebeautydiary", "美妆"],
  ["Sienna Brooks", "siennaskinclub", "美妆"],
  ["Leo Tanaka", "leo.daily", "生活"],
  ["Maya Chen", "mayachen.style", "穿搭"],
  ["Owen Park", "owen.tech", "数码"],
  ["Iris Wong", "iris.eats", "美食"],
  ["Felix Zhao", "felix.fitlab", "生活"],
  ["Ruby Lin", "rubylin.beauty", "美妆"],
  ["Theo Kim", "theo.streetfit", "穿搭"],
  ["Luna Sato", "luna.skinjournal", "美妆"],
  ["Eli Nakamura", "eli.gadgetlab", "数码"],
  ["Mia Huang", "mia.kitchen", "美食"],
  ["Noah Cheng", "noah.everyday", "生活"],
  ["Vera Ito", "vera.outfits", "穿搭"],
  ["Kai Yamamoto", "kai.unbox", "数码"],
] as const;

const platforms: Creator["platform"][] = ["TikTok Shop", "抖音", "小红书", "Instagram", "YouTube"];
const regions: Creator["region"][] = ["CN", "US", "UK", "JP", "KR"];

export const creators: Creator[] = seed.map((s, i) => ({
  id: `c-${i + 1}`,
  name: s[0],
  handle: s[1],
  avatar: `https://i.pravatar.cc/200?img=${(i % 70) + 1}`,
  followers: `${(Math.round((20 + i * 7.3) * 10) / 10).toFixed(1)}K`,
  avgViews: `${(Math.round((1.2 + i * 0.6) * 10) / 10).toFixed(1)}万`,
  region: regions[i % regions.length],
  gender: i % 3 === 0 ? "女性" : "男性",
  platform: platforms[i % platforms.length],
  category: s[2] as Creator["category"],
}));
