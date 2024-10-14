import { getAuth } from "./getAuth";

export async function createCategory(name: string) {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to create category");
  }

  return response.json();
}
