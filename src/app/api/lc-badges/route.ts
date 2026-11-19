const QUERY = `
  query userBadges($username: String!) {
    matchedUser(username: $username) {
      badges {
        id
        displayName
        icon
        medal {
          config {
            iconGif
            iconGifBackground
          }
        }
        creationDate
        category
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: "shikkoustic" },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

    const json = await res.json();
    const badges: unknown[] = json?.data?.matchedUser?.badges ?? [];

    return Response.json(badges);
  } catch {
    // Return empty array on failure — UI falls back gracefully
    return Response.json([]);
  }
}
