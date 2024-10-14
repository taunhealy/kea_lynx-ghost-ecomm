"use client";

import React from "react";
import { useDeletePost } from "@/api-actions/deletePost";

// destructuring slug from the props object
const DeleteButton = ({ slug }: { slug: string }) => {
  // function component that uses the useDeletePost hook to delete a post
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDelete = async () => {
    // if the user confirms the deletion, the deletePost function is called with the slug
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(slug);
    }
  };

  return (
    // the button is disabled if the delete is pending
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="border px-4 py-2 text-black hover:underline"
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
};

export default DeleteButton;
