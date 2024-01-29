import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { Button } from 'src/shared/components/ui/button';
import { AppContext } from 'src/shared/controller/appContext';

export function VoucherNewButton({ context }: { context: AppContext }) {
  if (!hasPermission(permissions.voucherCreate, context)) {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/voucher/new" prefetch={false}>
        <LuPlus className="mr-2 h-4 w-4" /> {context.dictionary.voucher.new.menu}
      </Link>
    </Button>
  );
}
