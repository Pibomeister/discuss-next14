'use client';

import { useFormState } from 'react-dom';
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';

import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { useTranslations } from 'next-intl';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const t = useTranslations('PostCreateForm');

  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" className="w-full">
          {t('createAPost')}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg"> {t('createAPost')}</h3>
            <Input
              label={t('title')}
              name="title"
              labelPlacement="outside"
              placeholder={t('title')}
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              label={t('content')}
              name="content"
              labelPlacement="outside"
              placeholder={t('content')}
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form && (
              <div className="p-4 bg-red-200 rounded-lg">
                {formState.errors._form.join(', ')}
              </div>
            )}
            <FormButton variant="bordered" color="primary">
              {t('create')}
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
