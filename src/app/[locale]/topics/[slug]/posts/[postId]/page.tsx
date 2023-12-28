import { Suspense } from 'react';
import { ResolvingMetadata, Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

import db from '@/db';
import paths from '@/paths';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import PostShowLoading from '@/components/posts/post-show-loading';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
    locale: string;
  };
}

export const generateMetadata = async (
  { params }: PostShowPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  const postTitle = post?.title || '';
  const title = postTitle[0].toUpperCase() + postTitle.slice(1);

  return {
    title: `${title} | Discuss`,
    description: post?.content.substring(0, 15) || (await parent).description,
  };
};

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;
  const t = await getTranslations('PostPage');
  return (
    <div className="space-y-3">
      <Link className="decoration-solid " href={paths.topicShow(slug)}>
        <div className="border rounded p-2 w-fit">
          ⬅️ {t('backTo')} {slug}
        </div>
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}

export async function generateStaticParams() {
  const topics = await db.topic.findMany({
    include: {
      posts: true,
    },
  });

  return topics.reduce((acc, topic) => {
    const { slug } = topic;

    if (!slug) {
      return acc;
    }

    const postIds = topic.posts.map((post) => post.id);

    return [
      ...acc,
      ...postIds.map((postId) => ({
        slug,
        postId,
      })),
    ];
  }, [] as { slug: string; postId: string }[]);
}
