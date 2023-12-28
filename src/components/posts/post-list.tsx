import { Link } from '@/navigation';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';
import { getTranslations } from 'next-intl/server';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const t = await getTranslations('PostList');

  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error(t('noSlug'));
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">
              {t('by')} {post.user.name}
            </p>
            <p className="text-xs text-gray-400">
              {post._count.comments} {t('comments')}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
