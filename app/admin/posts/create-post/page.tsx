"use client"; // Ensure this component is a client component

import React from "react";
import { createPost } from "@/api-actions/createPost"; // Import the createPost action
import { Input } from "@/components/ui/input"; // Adjust the import based on your setup
import { useRouter } from "next/navigation"; // Import useRouter for client-side routing
import { MultiSelect } from "@/components/ui/multi-select"; // You'll need to create this component
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component
import { Button } from "@/components/ui/button"; // Import Button component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import Card components
import { Label } from "@/components/ui/label"; // Import Label component
import { useQuery } from "@tanstack/react-query";

// Add this interface near the top of your file
interface Category {
  id: string | number;
  name: string;
}

// Add this function to fetch categories
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export default function CreatePostPage() {
  const router = useRouter(); // Initialize useRouter

  // Use Tanstack Query to fetch categories
  const { data: categories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createPost(formData);

    if (result.success) {
      router.push(`/posts/${result.slug}`); // Add leading slash to make path absolute
    } else {
      // Handle error (e.g., show error message)
      console.error(result.error);
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <Card className="mx-auto mt-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Input
              id="subheading"
              name="subheading"
              placeholder="Enter subheading"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your post content here"
              required
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Input
              id="quote"
              name="quote"
              placeholder="Enter a quote (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <MultiSelect
              name="categories"
              options={categories.map((cat) => ({
                value: String(cat.id),
                label: cat.name,
              }))}
              placeholder="Select categories"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <CardFooter className="px-0">
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
