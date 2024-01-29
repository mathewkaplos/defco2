'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { redirect, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { authPasswordResetConfirmApiCall } from 'src/features/auth/authApiCalls';
import { cn } from 'src/shared/components/cn';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import { Input } from 'src/shared/components/ui/input';
import { toast } from 'src/shared/components/ui/use-toast';
import { getZodErrorMap } from 'src/translation/getZodErrorMap';
import { Dictionary, Locale } from 'src/translation/locales';
import { z } from 'zod';

export function PasswordResetConfirmForm({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  React.useEffect(() => {
    if (!token) {
      redirect(`/auth/password-reset/request`);
    }
  }, [token]);

  z.setErrorMap(getZodErrorMap(locale));

  const schema = z.object({
    password: z.string().min(8),
  });

  const [initialValues] = React.useState({
    password: '',
  });

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof schema>) => {
      if (!token) {
        throw new Error(dictionary.auth.errors.invalidPasswordResetToken);
      }

      return authPasswordResetConfirmApiCall(data.password, token);
    },
    onSuccess: () => {
      router.push('/');

      toast({
        title: dictionary.auth.passwordResetConfirm.success,
      });
    },
    onError: (error: Error) => {
      form.setError('password', {
        message: error.message || dictionary.shared.errors.unknown,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutation.mutateAsync(data);
  };

  return (
    <div className={cn('grid gap-6')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {dictionary.auth.passwordResetConfirm.password}
                    </FormLabel>
                    <Input
                      type="password"
                      disabled={mutation.isPending || mutation.isSuccess}
                      autoFocus
                      {...field}
                    />
                    <FormMessage data-testid="password-error" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="mt-2"
              disabled={mutation.isPending || mutation.isSuccess}
              type="submit"
            >
              {(mutation.isPending || mutation.isSuccess) && (
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {dictionary.auth.passwordResetConfirm.button}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
