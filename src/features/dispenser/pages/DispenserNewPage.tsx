import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DispenserNew from 'src/features/dispenser/components/DispenserNew';
import { dispenserPermissions } from 'src/features/dispenser/dispenserPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.dispenser.new.title,
  };
}

export default async function DispenserNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(dispenserPermissions.dispenserCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.dispenser.list.menu, '/dispenser'],
          [dictionary.dispenser.new.menu],
        ]}
      />
      <div className="my-10">
        <DispenserNew context={context} />
      </div>
    </div>
  );
}
