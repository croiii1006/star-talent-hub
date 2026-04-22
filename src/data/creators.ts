import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import creator4 from "@/assets/creator-4.jpg";
import creator5 from "@/assets/creator-5.jpg";

export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  avgViews: string;
  region: "CN" | "US" | "UK" | "JP" | "KR";
  gender: "男性" | "女性";
  platform: "TikTok Shop" | "抖音" | "小红书" | "Instagram" | "YouTube";
  category: "美妆" | "穿搭" | "数码" | "美食" | "生活";
};

export const creators: Creator[] = [
  {
    id: "c-1",
    name: "Ethan Walker",
    handle: "ethan.daily",
    avatar: creator1,
    followers: "82.4K",
    avgViews: "3.1万",
    region: "US",
    gender: "男性",
    platform: "TikTok Shop",
    category: "穿搭",
  },
  {
    id: "c-2",
    name: "Lucas Bennett",
    handle: "lucas.styled",
    avatar: creator2,
    followers: "126.7K",
    avgViews: "5.8万",
    region: "UK",
    gender: "男性",
    platform: "Instagram",
    category: "穿搭",
  },
  {
    id: "c-3",
    name: "Mason Reed",
    handle: "mason.lab",
    avatar: creator3,
    followers: "54.2K",
    avgViews: "2.4万",
    region: "US",
    gender: "男性",
    platform: "YouTube",
    category: "生活",
  },
  {
    id: "c-4",
    name: "Noah Carter",
    handle: "noah.everyday",
    avatar: creator4,
    followers: "98.1K",
    avgViews: "4.2万",
    region: "US",
    gender: "男性",
    platform: "TikTok Shop",
    category: "生活",
  },
  {
    id: "c-5",
    name: "Jack Morrison",
    handle: "jack.reviews",
    avatar: creator5,
    followers: "67.5K",
    avgViews: "2.9万",
    region: "UK",
    gender: "男性",
    platform: "YouTube",
    category: "数码",
  },
];
