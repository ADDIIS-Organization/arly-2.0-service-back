export interface JwtPayload {
  sub: number; // Typically the user ID
  email: string;
  cediUserRoleIds?: number[];
  tenantSchema: string;
  tenantId: number;
}

