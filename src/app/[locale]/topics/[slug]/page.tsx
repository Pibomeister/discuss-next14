import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import db from '@/db';
import { Metadata, ResolvingMetadata } from 'next';

interface TopicShowProps {
  params: {
    slug: string;
    locale: string;
  };
}

export const generateMetadata = async (
  { params }: TopicShowProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const topic = await db.topic.findUnique({
    where: {
      slug: params.slug,
    },
  });
  const slug = params.slug || '';
  const title = slug[0].toUpperCase() + slug.slice(1);

  return {
    title: `${title} | Discuss`,
    description: topic?.description || (await parent).description,
  };
};

export default function TopicShowPage({ params }: TopicShowProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const topics = await db.topic.findMany();

  return topics.map(({ slug }) => ({
    slug,
  }));
}
