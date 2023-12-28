'use client';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEventHandler } from 'react';
import { Link } from '@/navigation';

interface LanguageChangerProps {
  locale: string;
}

const locales: ('en' | 'es' | 'de')[] = ['en', 'es', 'de'];

const flags = {
  en: '🇺🇸',
  es: '🇲🇽',
  de: '🇩🇪',
};

export default function LanguageChanger({ locale }: LanguageChangerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log('whatsssssup', e.target.value);
    router.replace(pathname, { locale: e.target.value } as any);
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button variant="bordered">{locale}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="py-2">
          {locales.map((l) => (
            <li key={l}>
              <Link href="/" locale={l}>
                <div
                  className={`px-4 py-2 border ${
                    locale === l ? 'bg-slate-300' : ''
                  }`}
                >
                  {flags[l]} {l}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
