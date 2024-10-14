"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  subheading: z.string().optional(),
  content: z.string().min(1, {
    message: "Content must be at least 1 character.",
  }),
});

// @ts-ignore
const EditPostForm = ({ post }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      subheading: post.subheading,
      content: post.content,
    },
  });

  // @ts-ignore
  const onSubmit = async (values) => {
    const response = await fetch(`/api/posts/${post.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push(`/posts/${post.slug}`);
    } else {
      console.error("Failed to update post");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormDescription>The title of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subheading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subheading</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormDescription>The subheading of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <textarea {...field} />
              </FormControl>
              <FormDescription>The content of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Post</Button>
      </form>
    </Form>
  );
};

export default EditPostForm;
