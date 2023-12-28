import { Divider } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topics-list';
import { fetchTopPosts } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discuss | Home',
  description:
    "Connect, Collaborate, Code: Discuss - Where Web Developers Weave the Web's Future.",
};

export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <h1 className="text-xl m-2">{t('title')}</h1>
          <PostList fetchData={fetchTopPosts} />
        </div>
        <div className="border shadow py-3 px-2">
          <TopicCreateForm />
          <Divider className="mt-3 mb-2" />
          <h3 className="text-lg mb-2">{t('topics')}</h3>
          <TopicList />
        </div>
      </div>
    </>
  );
}
