export async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    console.log("Fetched posts:", posts); // Debugging line
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
