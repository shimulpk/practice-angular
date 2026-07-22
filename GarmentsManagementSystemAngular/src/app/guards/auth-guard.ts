import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../components/features/auth/services/storage.service";
import { ROLE_PERMISSIONS } from "../core/security/role-permissions";
import { Role } from "../components/features/user/models/role";

/** Blocks unauthenticated users and redirects to /login */
export const authGuard: CanActivateFn = () => {
  
  const storage = inject(StorageService);
  const router  = inject(Router);

  if (storage.isLoggedIn()) return true;

  router.navigate(['/login']);
  return false;
};

/** Only allows the specified roles through */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const storage = inject(StorageService);
  const router = inject(Router);

  const role = storage.getRole() as Role;

  if (!role) {
    router.navigate(['/login']);
    return false;
  }

  const permission = ROLE_PERMISSIONS[role];

  if (!permission) {
    router.navigate(['/dashboard']);
    return false;
  }

  const requiredModule = route.data['module'] as string;

  if (!requiredModule) {
    return true;
  }

  if (
    permission.modules.includes(requiredModule) ||
    role === Role.ADMIN
  ) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};