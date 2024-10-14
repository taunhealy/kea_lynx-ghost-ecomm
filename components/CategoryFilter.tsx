"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  // selectedCategories is an array of numbers passed from PostsGrid.tsx
  selectedCategories: number[];
  // void - the function is called for its side effects rather than for a return value.
  onCategorySelect: (categoryId: number) => void;
  onClearCategories: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategorySelect,
  onClearCategories,
}: CategoryFilterProps) {
  return (
    <div className="mb-4">
      {/* The actual implementation of onClearCategories is not defined within
      this component. It's defined in the parent component PostsGrid.tsx */}
      <button
        onClick={onClearCategories}
        className={`mr-2 rounded px-3 py-1 ${
          selectedCategories.length === 0
            ? "bg-white text-black" // Light mode for active "All" button
            : "bg-gray-700 text-white" // Dark mode for inactive "All" button
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`mr-2 rounded px-3 py-1 ${
            selectedCategories.includes(category.id)
              ? "bg-white text-black" // Light mode for active category
              : "bg-gray-700 text-white" // Dark mode for inactive categories
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
