import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import dayjs from 'dayjs';
import { auditLogOperations } from 'src/features/auditLog/auditLogOperations';
import { authCreateAuditLog } from 'src/features/auth/authCreateAuditLog';
import { authSendVerifyEmailEmail } from 'src/features/auth/authSendVerifyEmail';
import { validateIsSignedIn } from 'src/features/security';
import { prismaAuth, prismaDangerouslyBypassAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error403 from 'src/shared/errors/Error403';
import uniqid from 'uniqid';

export const authVerifyEmailRequestApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/auth/verify-email/request',
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function authVerifyEmailRequestController(context: AppContext) {
  const { currentUser } = validateIsSignedIn(context);

  if (!currentUser) {
    throw new Error403();
  }

  const verifyEmailToken = uniqid();

  const prisma = prismaDangerouslyBypassAuth(context);

  await prisma.user.update({
    where: { id: currentUser?.id },
    data: {
      verifyEmailToken,
      verifyEmailTokenExpiresAt: dayjs().add(1, 'day').toDate(),
    },
  });

  await authSendVerifyEmailEmail(currentUser.email, verifyEmailToken, context);

  await authCreateAuditLog(
    currentUser,
    auditLogOperations.verifyEmailRequest,
    context,
  );
}
