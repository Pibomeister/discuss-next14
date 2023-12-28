import Image from 'next/image';
import CommentCreateForm from '@/components/comments/comment-create-form';
import type { CommentWithAuthor } from '@/db/queries/comments';
import { useFormatter } from 'next-intl';

interface CommentShowProps {
  commentId: string;
  comments: CommentWithAuthor[];
}

export default function CommentShow({ commentId, comments }: CommentShowProps) {
  const comment = comments.find((c) => c.id === commentId);
  const format = useFormatter();

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-500">
              {comment.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              {format.dateTime(comment.createdAt, {
                hour: 'numeric',
                minute: 'numeric',
              })}
              &nbsp;
              {format.dateTime(comment.createdAt, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
