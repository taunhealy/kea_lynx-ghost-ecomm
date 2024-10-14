export async function getCategories() {
  const response = await fetch("/api/categories", {
    credentials: "include", // This ensures cookies are sent with the request
  });
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}
