export async function fetchAllPosts() {
  const response = await fetch("/api/posts", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
