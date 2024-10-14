import { EditForm } from '@/components/dashboard/EditForm';
import prisma from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId
    }
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({ params }: { params: { id: string } }) {
  noStore();
  const data = await getData(params.id);
  return <EditForm data={data} />;
}
