-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('active', 'disabled', 'invited');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');

-- CreateEnum
CREATE TYPE "SubscriptionMode" AS ENUM ('user', 'tenant', 'membership', 'disabled');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyEmailToken" TEXT,
    "verifyEmailTokenExpiresAt" TIMESTAMPTZ(3),
    "provider" TEXT,
    "providerId" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetTokenExpiresAt" TIMESTAMPTZ(3),
    "expireSessionsOlderThan" TIMESTAMPTZ(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityName" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "tenantId" UUID,
    "userId" UUID,
    "membershipId" UUID,
    "apiKeyId" UUID,
    "apiEndpoint" TEXT,
    "apiHttpResponseCode" TEXT,
    "operation" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "transactionId" BIGINT NOT NULL DEFAULT txid_current(),

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "scopes" TEXT[],
    "expiresAt" TIMESTAMPTZ(3),
    "disabledAt" TIMESTAMPTZ(3),
    "membershipId" UUID NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "userId" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "avatars" JSONB,
    "roles" TEXT[],
    "invitationToken" TEXT,
    "status" "MembershipStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "membershipId" UUID,
    "userId" UUID NOT NULL,
    "mode" "SubscriptionMode" NOT NULL,
    "isCancelAtEndPeriod" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "supervisorId" UUID,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispenser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "stationId" UUID,

    CONSTRAINT "Dispenser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tank" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER,
    "stationId" UUID,

    CONSTRAINT "Tank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "otherNames" TEXT,
    "gender" TEXT NOT NULL,
    "serviceNo" TEXT,
    "entitledCards" INTEGER NOT NULL,
    "status" TEXT,
    "rankId" UUID,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "make" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "cc" INTEGER NOT NULL,
    "fullTank" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "customerId" UUID,
    "approvedById" UUID,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "date1" TIMESTAMPTZ(3) NOT NULL,
    "fuelType" TEXT NOT NULL,
    "litres" DECIMAL(65,30) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "paymode" TEXT NOT NULL,
    "cashAmount" DECIMAL(65,30),
    "mpesaAmount" DECIMAL(65,30),
    "invoiceAmount" DECIMAL(65,30),
    "customerId" UUID,
    "stationId" UUID,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "cardNo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "issueDate" TEXT NOT NULL,
    "deactivationDate" TEXT,
    "customerId" UUID,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "deviceId" TEXT NOT NULL,
    "description" TEXT,
    "stationId" UUID,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "date1" TEXT NOT NULL,
    "voucherNo" TEXT NOT NULL,
    "indentNo" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "qty" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "customerId" UUID,
    "vehicleId" UUID,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialReceipt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "date1" TEXT,
    "supplier" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "productId" UUID,

    CONSTRAINT "MaterialReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL DEFAULT NULLIF((current_setting('app.current_tenant_id'::text)), '')::uuid,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "createdByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedByUserId" UUID DEFAULT NULLIF((current_setting('app.current_user_id'::text)), '')::uuid,
    "updatedByMembershipId" UUID DEFAULT NULLIF((current_setting('app.current_membership_id'::text)), '')::uuid,
    "importHash" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_secret_key" ON "ApiKey"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_id_tenantId_key" ON "ApiKey"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_id_tenantId_membershipId_key" ON "ApiKey"("id", "tenantId", "membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_importHash_key" ON "Membership"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_invitationToken_key" ON "Membership"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_id_tenantId_key" ON "Membership"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_tenantId_key" ON "Membership"("userId", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Station_importHash_key" ON "Station"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Station_id_tenantId_key" ON "Station"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Dispenser_importHash_key" ON "Dispenser"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Dispenser_id_tenantId_key" ON "Dispenser"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Tank_importHash_key" ON "Tank"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Tank_id_tenantId_key" ON "Tank"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_importHash_key" ON "Customer"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_tenantId_key" ON "Customer"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_importHash_key" ON "Vehicle"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_tenantId_key" ON "Vehicle"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_importHash_key" ON "Sale"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_id_tenantId_key" ON "Sale"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_importHash_key" ON "Card"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_tenantId_key" ON "Card"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_importHash_key" ON "Product"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_tenantId_key" ON "Product"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_importHash_key" ON "Device"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_tenantId_key" ON "Device"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_importHash_key" ON "Voucher"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_id_tenantId_key" ON "Voucher"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialReceipt_importHash_key" ON "MaterialReceipt"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialReceipt_id_tenantId_key" ON "MaterialReceipt"("id", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Rank_importHash_key" ON "Rank"("importHash");

-- CreateIndex
CREATE UNIQUE INDEX "Rank_id_tenantId_key" ON "Rank"("id", "tenantId");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispenser" ADD CONSTRAINT "Dispenser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispenser" ADD CONSTRAINT "Dispenser_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispenser" ADD CONSTRAINT "Dispenser_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispenser" ADD CONSTRAINT "Dispenser_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialReceipt" ADD CONSTRAINT "MaterialReceipt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialReceipt" ADD CONSTRAINT "MaterialReceipt_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialReceipt" ADD CONSTRAINT "MaterialReceipt_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialReceipt" ADD CONSTRAINT "MaterialReceipt_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_createdByMembershipId_fkey" FOREIGN KEY ("createdByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_updatedByMembershipId_fkey" FOREIGN KEY ("updatedByMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
