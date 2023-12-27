'use server';

import { z } from 'zod';
import { Post } from '@prisma/client';

import { auth } from '../auth';
import db from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '../paths';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  _formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a post'],
      },
    };
  }
  let post: Post;
  try {
    const topic = await db.topic.findFirst({
      where: {
        slug: slug,
      },
    });
    if (!topic) {
      return {
        errors: {
          _form: ['Topic not found'],
        },
      };
    }
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic?.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to create post'],
        },
      };
    }
  }
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
