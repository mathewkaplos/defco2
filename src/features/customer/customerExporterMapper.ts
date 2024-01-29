import { CustomerWithRelationships } from 'src/features/customer/customerSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function customerExporterMapper(
  customers: CustomerWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return customers.map((customer) => {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      otherNames: customer.otherNames,
      gender: enumeratorLabel(
        context.dictionary.customer.enumerators.gender,
        customer.gender,
      ),
      serviceNo: customer.serviceNo,
      entitledCards: customer.entitledCards?.toString(),
      status: enumeratorLabel(
        context.dictionary.customer.enumerators.status,
        customer.status,
      ),
      createdByMembership: membershipLabel(customer.createdByMembership, context.dictionary),
      createdAt: String(customer.createdAt),
      updatedByMembership: membershipLabel(customer.createdByMembership, context.dictionary),
      updatedAt: String(customer.updatedAt),
    };
  });
}
