import { Injectable } from "@angular/core";
import { StorageService } from "../../components/features/auth/services/storage.service";
import { Role } from "../../components/features/user/models/role";
import { ROLE_PERMISSIONS } from "./role-permissions";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private storage: StorageService
  ) {}

  private getPermission() {

    const role = this.storage.getRole() as Role;

  return role
    ? ROLE_PERMISSIONS[role]
    : null;
  }

  hasModule(module: string): boolean {

    const permission = this.getPermission();

    if (!permission) return false;

    return permission.modules.includes(module);

  }

  can(action: string): boolean {

    const permission = this.getPermission();

    if (!permission) return false;

    return permission.actions.includes('*')
        || permission.actions.includes(action);

  }

}