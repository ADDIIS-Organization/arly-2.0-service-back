export interface JwtPayload {
  sub: number; // Typically the user ID
  email: string;
  CediRoleUserIds?: number[];
  tenantSchema: string;
  tenantId: number;
}

