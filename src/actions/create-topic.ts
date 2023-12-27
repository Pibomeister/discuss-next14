'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Topic } from '@prisma/client';

import { auth } from '@/auth';
import paths from '@/paths';
import db from '@/db';
import { redirect } from 'next/navigation';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters and dashes only',
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse(
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
        _form: ['You must be signed in to create a topic'],
      },
    };
  }
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ['An unknown error occurred'],
        },
      };
    }
  }
  revalidatePath(paths.homePage());
  redirect(paths.topicShow(topic.slug));
}
