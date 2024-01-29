import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TankNew from 'src/features/tank/components/TankNew';
import { tankPermissions } from 'src/features/tank/tankPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.tank.new.title,
  };
}

export default async function TankNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(tankPermissions.tankCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.tank.list.menu, '/tank'],
          [dictionary.tank.new.menu],
        ]}
      />
      <div className="my-10">
        <TankNew context={context} />
      </div>
    </div>
  );
}
