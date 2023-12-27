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

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" className="w-full">
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              label="Title"
              name="title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              label="Content"
              name="content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form && (
              <div className="p-4 bg-red-200 rounded-lg">
                {formState.errors._form.join(', ')}
              </div>
            )}
            <FormButton variant="bordered" color="primary">
              Create
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
