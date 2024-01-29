'use client';

import { Customer } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomerForm } from 'src/features/customer/components/CustomerForm';
import { customerFindApiCall } from 'src/features/customer/customerApiCalls';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerWithRelationships } from 'src/features/customer/customerSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function CustomerEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setCustomer(undefined);
        const customer = await customerFindApiCall(id);

        if (!customer) {
          router.push('/customer');
        }

        setCustomer(customer);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/customer');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!customer) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.customer.list.menu, '/customer'],
          [customerLabel(customer, context.dictionary), `/customer/${customer?.id}`],
          [dictionary.customer.edit.menu],
        ]}
      />
      <div className="my-10">
        <CustomerForm
          context={context}
          customer={customer}
          onSuccess={(customer: Customer) => router.push(`/customer/${customer.id}`)}
          onCancel={() => router.push('/customer')}
        />
      </div>
    </div>
  );
}
