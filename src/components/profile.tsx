'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return (
      <div>
        <div>
          From client, user signed in:
          <p className="p-4 border rounded bg-gray-200 overflow-scroll m-4 font-light">
            {JSON.stringify(session.data.user)}
          </p>
        </div>
      </div>
    );
  }
  return <div></div>;
}
