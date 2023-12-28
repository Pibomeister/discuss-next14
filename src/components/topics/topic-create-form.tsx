'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';

import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';
import { useTranslations } from 'next-intl';

export default function TopicCreateForm() {
  const t = useTranslations('TopicCreateForm');
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" className="w-full">
          {t('createATopic')}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">{t('createATopic')}</h3>
            <Input
              label={t('name')}
              name="name"
              labelPlacement="outside"
              placeholder={t('name')}
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              label={t('description')}
              name="description"
              labelPlacement="outside"
              placeholder={t('descriptionPlaceholder')}
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            {formState.errors._form && (
              <div className="p-4 bg-red-200 rounded-lg ">
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
