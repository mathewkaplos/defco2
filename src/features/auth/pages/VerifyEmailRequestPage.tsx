import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { VerifyEmailRequest } from 'src/features/auth/components/VerifyEmailRequest';
import { ModeToggle } from 'src/shared/components/ModeToggler';
import { appContextForReact } from 'src/shared/controller/appContext';
import LocaleSwitcher from 'src/translation/LanguageSwitcher';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.auth.verifyEmailRequest.title,
  };
}

export default async function VerifyEmailRequestPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!context.currentUser || context.currentUser.emailVerified) {
    return redirect(`/`);
  }

  return (
    <>
      <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 flex gap-4 md:right-8 md:top-8">
          <LocaleSwitcher dictionary={dictionary} locale={context.locale} />
          <ModeToggle dictionary={dictionary} />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: 'url(/images/verifyEmail.jpg)',
            }}
          />
        </div>
        <div className="w-[100vw] p-4 sm:w-auto md:p-0 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
            <div className="mb-2 flex flex-col text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {dictionary.projectName}
              </h1>
            </div>
            <VerifyEmailRequest
              dictionary={dictionary}
              currentUser={context.currentUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
