import CommentShow from '@/components/comments/comment-show';
import type { CommentWithAuthor } from '@/db/queries/comments';
import { getTranslations } from 'next-intl/server';

interface CommentListProps {
  fetchData: () => Promise<CommentWithAuthor[]>;
}

export default async function CommentList({ fetchData }: CommentListProps) {
  const comments = await fetchData();
  const t = await getTranslations('CommentList');
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3 pb-4">
      <h1 className="text-lg font-bold">
        {t('allComments', { length: comments.length })}
      </h1>
      {renderedComments}
    </div>
  );
}
