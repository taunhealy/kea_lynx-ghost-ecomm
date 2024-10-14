"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import CategoryFilter from "@/components/CategoryFilter";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  subheading: string;
  categories: Category[];
  date: string;
  slug: string;
}

interface PostsGridProps {
  posts: Post[];
  categories: Category[];
}

export default function PostsGrid({ posts, categories }: PostsGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // see this in action - experiment with variations
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? // If the category was already selected, it becomes unselected.
          // This allows users to select multiple categories and deselect them
          prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };
  // filtering the posts based on the selected categories
  const filteredPosts =
    selectedCategories.length > 0
      ? posts.filter((post) =>
          // does selected post.categories match category? then it's included in the filtered array.
          post.categories.some((category) =>
            selectedCategories.includes(category.id),
          ),
        )
      : posts;
        
  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategorySelect={handleCategorySelect}
        onClearCategories={handleClearCategories}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.subheading}</p>
              <div className="mt-2">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="mr-2 rounded bg-gray-200 px-2 py-1 text-xs"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {formatDate(new Date(post.date))}
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
