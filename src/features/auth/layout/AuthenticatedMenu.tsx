'use client';

import { times } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menus } from 'src/features/menus';
import { cn } from 'src/shared/components/cn';
import { AppContext } from 'src/shared/controller/appContext';

export function AuthenticatedMenu({
  context,
  onMenuClick,
}: {
  context: AppContext;
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="space-y-1">
        {menus(context).map((menu) => (
          <Link
            href={menu.href}
            key={menu.id}
            className={cn(
              isActive(menu.href, pathname, menu.isExact)
                ? 'bg-gray-200 text-gray-800 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:active:bg-gray-700'
                : 'text-gray-500 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:active:bg-gray-700',
              'flex w-full items-center space-x-2 rounded-lg p-2 text-sm font-medium',
            )}
            onClick={onMenuClick}
            prefetch={false}
          >
            <menu.Icon className="mr-2 h-4 w-4" />
            {menu.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function isActive(path: string, currentPath: string, isExact?: boolean) {
  if (isExact) {
    return currentPath === path;
  }

  return currentPath === path || currentPath.startsWith(path + '/');
}
