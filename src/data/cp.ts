export type CPPlatform = {
  name: string;
  handle: string;
  rank: string;
  rating: number;
  ratingLabel: string;
  stat: string;
  statLabel: string;
  accent: string;
  href: string;
};

export const cpPlatforms: CPPlatform[] = [
  {
    name: "LeetCode",
    handle: "shikkoustic",
    rank: "Knight",
    rating: 1959,
    ratingLabel: "peak contest rating",
    stat: "741",
    statLabel: "problems solved · top 3.31%",
    accent: "#C17A2E",
    href: "https://leetcode.com/u/shikkoustic/",
  },
  {
    name: "CodeChef",
    handle: "shikkoustic",
    rank: "3★",
    rating: 1724,
    ratingLabel: "highest rating",
    stat: "169",
    statLabel: "problems solved · 13 rated contests",
    accent: "#6C4FD6",
    href: "https://www.codechef.com/users/shikkoustic",
  },
  {
    name: "Codeforces",
    handle: "shikkoustic",
    rank: "Specialist",
    rating: 1457,
    ratingLabel: "max rating",
    stat: "10+",
    statLabel: "rated contests",
    accent: "#2F5233",
    href: "https://codeforces.com/profile/shikkoustic",
  },
];

export const cpSummary = {
  totalSolved: "1000+",
  totalContests: "35+",
};
