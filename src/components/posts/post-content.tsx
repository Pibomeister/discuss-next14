'use client';

import MarkdownPreview from '@uiw/react-markdown-preview';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <MarkdownPreview
      className="p-4 border rounded mt-2"
      source={content}
      wrapperElement={{
        'data-color-mode': 'light',
      }}
    />
  );
}
