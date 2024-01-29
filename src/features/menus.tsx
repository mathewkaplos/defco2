import { FaChartPie } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { LuHistory, LuLayoutGrid, LuUsers } from 'react-icons/lu';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';

export function menus(context: AppContext) {
  const menus: Array<{
    id: string;
    label: string;
    href: string;
    Icon: IconType;
    isExact?: boolean;
  }> = [];

  menus.push({
    id: 'dashboard',
    label: context.dictionary.shared.dashboard,
    href: `/`,
    Icon: FaChartPie,
    isExact: true,
  });

  if (hasPermission(permissions.auditLogRead, context)) {
    menus.push({
      id: 'auditLog',
      label: context.dictionary.auditLog.list.menu,
      href: `/audit-log`,
      Icon: LuHistory,
    });
  }

  if (hasPermission(permissions.membershipRead, context)) {
    menus.push({
      id: 'membership',
      label: context.dictionary.membership.list.menu,
      href: `/membership`,
      Icon: LuUsers,
    });
  }

  if (hasPermission(permissions.stationRead, context)) {
    menus.push({
      id: 'station',
      label: context.dictionary.station.list.menu,
      href: `/station`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.dispenserRead, context)) {
    menus.push({
      id: 'dispenser',
      label: context.dictionary.dispenser.list.menu,
      href: `/dispenser`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.tankRead, context)) {
    menus.push({
      id: 'tank',
      label: context.dictionary.tank.list.menu,
      href: `/tank`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.customerRead, context)) {
    menus.push({
      id: 'customer',
      label: context.dictionary.customer.list.menu,
      href: `/customer`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.vehicleRead, context)) {
    menus.push({
      id: 'vehicle',
      label: context.dictionary.vehicle.list.menu,
      href: `/vehicle`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.saleRead, context)) {
    menus.push({
      id: 'sale',
      label: context.dictionary.sale.list.menu,
      href: `/sale`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.cardRead, context)) {
    menus.push({
      id: 'card',
      label: context.dictionary.card.list.menu,
      href: `/card`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.productRead, context)) {
    menus.push({
      id: 'product',
      label: context.dictionary.product.list.menu,
      href: `/product`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.deviceRead, context)) {
    menus.push({
      id: 'device',
      label: context.dictionary.device.list.menu,
      href: `/device`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.voucherRead, context)) {
    menus.push({
      id: 'voucher',
      label: context.dictionary.voucher.list.menu,
      href: `/voucher`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.materialReceiptRead, context)) {
    menus.push({
      id: 'materialReceipt',
      label: context.dictionary.materialReceipt.list.menu,
      href: `/material-receipt`,
      Icon: LuLayoutGrid,
    });
  }
  if (hasPermission(permissions.rankRead, context)) {
    menus.push({
      id: 'rank',
      label: context.dictionary.rank.list.menu,
      href: `/rank`,
      Icon: LuLayoutGrid,
    });
  }

  return menus;
}
