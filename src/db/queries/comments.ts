import db from '@/db';
import { cache } from 'react';

export type CommentWithAuthor = Awaited<
  ReturnType<typeof fetchCommentsByPostId>
>[number];
export const fetchCommentsByPostId = cache((postId: string) => {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
});
