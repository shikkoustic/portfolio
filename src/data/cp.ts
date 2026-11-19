export type CPBadgeItem = {
  name: string;
  icon: string;
  category?: string;
  description?: string;
};

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
  featuredBadge: CPBadgeItem;
  badges: CPBadgeItem[];
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
    featuredBadge: {
      name: "Knight",
      icon: "https://assets.leetcode.com/static_assets/others/Knight.gif",
      category: "Contest",
      description: "Top 3.31% globally",
    },
    badges: [
      {
        name: "Knight",
        icon: "https://assets.leetcode.com/static_assets/others/Knight.gif",
        category: "Contest",
        description: "Contest Rating 1959",
      },
      {
        name: "365 Days",
        icon: "https://assets.leetcode.com/static_assets/marketing/365_new.gif",
        category: "Streak",
        description: "365 Days Streak",
      },
      {
        name: "Annual 2026",
        icon: "https://assets.leetcode.com/static_assets/others/2026.gif",
        category: "Annual",
        description: "Annual Badge 2026",
      },
      {
        name: "200 Days",
        icon: "https://assets.leetcode.com/static_assets/others/2026_200.gif",
        category: "Streak",
        description: "200 Days Badge",
      },
      {
        name: "100 Days",
        icon: "https://assets.leetcode.com/static_assets/others/100.gif",
        category: "Streak",
        description: "100 Days Badge",
      },
      {
        name: "50 Days",
        icon: "https://assets.leetcode.com/static_assets/others/50.gif",
        category: "Streak",
        description: "50 Days Badge",
      },
    ],
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
    featuredBadge: {
      name: "3 Star",
      icon: "https://cdn.codechef.com/images/badges/contest/bronze.svg",
      category: "Division 2",
      description: "Division 2 Coder",
    },
    badges: [
      {
        name: "Contest Contender",
        icon: "https://cdn.codechef.com/images/badges/contest/bronze.svg",
        category: "Bronze",
        description: "5+ Rated Contests",
      },
      {
        name: "Problem Solver",
        icon: "https://cdn.codechef.com/images/badges/problem/bronze.svg",
        category: "Bronze",
        description: "50+ Problems",
      },
      {
        name: "Daily Streak",
        icon: "https://cdn.codechef.com/images/badges/streak/bronze.svg",
        category: "Bronze",
        description: "5+ Days Streak",
      },
    ],
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
    featuredBadge: {
      name: "Specialist",
      icon: "https://userpic.codeforces.org/5801165/avatar/7895c879656d7f15.jpg",
      category: "Cyan",
      description: "Specialist Rank",
    },
    badges: [
      {
        name: "Specialist",
        icon: "",
        category: "Rank",
        description: "Rating 1457 (Cyan)",
      },
      {
        name: "Contests",
        icon: "",
        category: "Activity",
        description: "10+ Rated Rounds",
      },
      {
        name: "Global Rank",
        icon: "",
        category: "Active",
        description: "Top Tier Collegiate",
      },
    ],
  },
];

export const cpSummary = {
  totalSolved: "1000+",
  totalContests: "35+",
};
