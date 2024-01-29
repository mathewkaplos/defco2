import { NextRequest } from 'next/server';
import { authVerifyEmailRequestController } from 'src/features/auth/controllers/authVerifyEmailRequestController';
import { NextResponseError } from 'src/shared/controller/NextResponseError';
import { NextResponseSuccess } from 'src/shared/controller/NextResponseSuccess';
import { appContext } from 'src/shared/controller/appContext';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  let context;
  try {
    context = await appContext(request);
    const payload = await authVerifyEmailRequestController(context);
    return NextResponseSuccess(request, context, payload);
  } catch (error: any) {
    return NextResponseError(request, context, error);
  }
}
