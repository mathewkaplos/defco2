'use client';

import { useMutation } from '@tanstack/react-query';
import { LuLoader2, LuMail } from 'react-icons/lu';
import { authVerifyEmailRequestApiCall } from 'src/features/auth/authApiCalls';
import SignOutButton from 'src/features/auth/components/SignOutButton';
import { UserWithMemberships } from 'src/features/user/userSchemas';
import { Button } from 'src/shared/components/ui/button';
import { toast } from 'src/shared/components/ui/use-toast';
import { formatTranslation } from 'src/translation/formatTranslation';
import { Dictionary } from 'src/translation/locales';

export function VerifyEmailRequest({
  dictionary,
  currentUser,
}: {
  dictionary: Dictionary;
  currentUser: UserWithMemberships;
}) {
  const verifyEmailRequestMutation = useMutation({
    mutationFn: () => {
      return authVerifyEmailRequestApiCall();
    },

    onError: (error: Error) => {
      toast({
        description: error.message || dictionary.shared.errors.unknown,
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="mt-4 flex flex-col items-center">
      <p
        className="text-center text-gray-600 dark:text-gray-300"
        dangerouslySetInnerHTML={{
          __html: formatTranslation(
            dictionary.auth.verifyEmailRequest.message,
            currentUser.email,
          ),
        }}
      ></p>

      <Button
        className="mt-6"
        onClick={() => verifyEmailRequestMutation.mutateAsync()}
        disabled={
          verifyEmailRequestMutation.isPending ||
          verifyEmailRequestMutation.isSuccess
        }
      >
        {verifyEmailRequestMutation.isPending ? (
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LuMail className="mr-2 h-4 w-4" />
        )}
        {verifyEmailRequestMutation.isSuccess
          ? dictionary.auth.verifyEmailRequest.success
          : dictionary.auth.verifyEmailRequest.button}
      </Button>

      <SignOutButton
        className="mt-8 block text-center text-sm font-medium text-gray-800 hover:underline dark:text-gray-200"
        dictionary={dictionary}
        text={dictionary.auth.signOut.button}
        disabled={verifyEmailRequestMutation.isPending}
      />
    </div>
  );
}
