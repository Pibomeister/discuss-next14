import db from '@/db';

export type PostWithData = Awaited<
  ReturnType<typeof fetchPostsByTopicSlug>
>[number];

export function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: {
      topic: {
        slug: slug,
      },
    },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export function fetchTopPosts() {
  return db.post.findMany({
    orderBy: { comments: { _count: 'desc' } },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: { comments: true },
      },
    },
    take: 5,
  });
}

export function fetchPostsBySearchTerm(term: string) {
  return db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: term,
            // mode: 'insensitive', // Only supported in Postgres
          },
        },
        {
          content: {
            contains: term,
            // mode: 'insensitive', // Only supported in Postgres
          },
        },
      ],
    },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: { comments: true },
      },
    },
    // orderBy: { createdAt: 'desc' },
  });
}
