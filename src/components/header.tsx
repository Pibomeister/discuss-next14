import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { Suspense } from 'react';

import SearchInput from './search-input';
import HeaderAuthWrapper from './header-auth';
import LanguageChanger from './language-switcher';

export default async function Header({ locale }: { locale: string }) {
  return (
    <Navbar className="shadow mb-6 py-2">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Suspense>
          <LanguageChanger locale={locale} />
        </Suspense>
        <HeaderAuthWrapper />
      </NavbarContent>
    </Navbar>
  );
}
