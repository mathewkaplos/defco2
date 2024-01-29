'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authVerifyEmailConfirmApiCall } from 'src/features/auth/authApiCalls';
import SignOutButton from 'src/features/auth/components/SignOutButton';
import { UserWithMemberships } from 'src/features/user/userSchemas';
import { Dictionary } from 'src/translation/locales';

export function VerifyEmailConfirm({
  dictionary,
  currentUser,
}: {
  dictionary: Dictionary;
  currentUser?: UserWithMemberships | null;
}) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const verifyEmailConfirmMutation = useMutation({
    mutationFn: (token: string) => {
      return authVerifyEmailConfirmApiCall(token);
    },

    onSuccess: () => {
      router.push(`/`);
    },

    onError: (error: Error) => {
      setErrorMessage(error.message || dictionary.shared.errors.unknown);
    },
  });

  useEffect(() => {
    if (token) {
      if (verifyEmailConfirmMutation.isIdle) {
        verifyEmailConfirmMutation.mutateAsync(token);
      }
    } else {
      router.push(`/auth/verify-email/request`);
    }
  }, [verifyEmailConfirmMutation, router, token]);

  return (
    <div className="mt-4 flex flex-col items-center">
      {!verifyEmailConfirmMutation.isSuccess &&
        !verifyEmailConfirmMutation.isError && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            {dictionary.auth.verifyEmailConfirm.loadingMessage}
          </p>
        )}

      {!verifyEmailConfirmMutation.isPending && Boolean(errorMessage) && (
        <p
          data-testid="error"
          className="text-center text-red-600 dark:text-red-300"
        >
          {errorMessage}
        </p>
      )}

      {verifyEmailConfirmMutation.isSuccess && (
        <p
          data-testid="error"
          className="text-center text-gray-600 dark:text-gray-300"
        >
          {dictionary.auth.verifyEmailConfirm.success}
        </p>
      )}

      {currentUser && (
        <SignOutButton
          className="mt-8 block text-center text-sm font-medium text-gray-800 hover:underline dark:text-gray-200"
          text={dictionary.auth.signOut.button}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}
