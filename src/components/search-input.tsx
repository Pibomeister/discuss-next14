'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';
import { useTranslations } from 'next-intl';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const t = useTranslations('SearchBar');

  return (
    <form action={actions.search}>
      <Input
        name="term"
        placeholder={t('search')}
        defaultValue={searchParams.get('term') ?? ''}
      />
    </form>
  );
}
