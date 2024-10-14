"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/api-actions/getCategories";
import CreateCategoryForm from "@/components/forms/create-category";
import { getAuth } from "@/api-actions/getAuth";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  postCount: number;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const CategoriesPage = () => {
  const { user } = getAuth();
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = React.useState<number | null>(
    null,
  );
  const [editName, setEditName] = React.useState("");

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: !!user, // Only fetch categories when user is authenticated
  });

  console.log("Categories data:", categories);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

  const updateCategory = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingCategory(null);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Categories</h1>
      <div className="mb-6">
        <CreateCategoryForm
          // @ts-ignore
          onCategoryCreated={() =>
            queryClient.invalidateQueries({ queryKey: ["categories"] })
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category: Category) => (
          <div
            key={category.id}
            className="rounded-lg border border-gray-200 p-4 shadow"
          >
            {editingCategory === category.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateCategory.mutate({ id: category.id, name: editName });
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" size="sm">
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingCategory(null)}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-semibold">{category.name}</h2>
                <p className="mb-4 text-sm text-gray-600">
                  Posts: {category.postCount}
                </p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCategory(category.id);
                      setEditName(category.name);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the category and remove its data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCategory.mutate(category.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button asChild>
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoriesPage;
