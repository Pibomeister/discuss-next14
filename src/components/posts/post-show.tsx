import { notFound } from 'next/navigation';

import db from '@/db';
import PostContent from './post-content';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mb-4 mt-8">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <PostContent content={post.content} />
    </div>
  );
}
