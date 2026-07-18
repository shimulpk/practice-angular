import { Injectable } from "@angular/core";
import { LoginResponse } from "../authmodels/auth.model";
import { CryptoUtil } from "../../../../utils/crypto.util";

export const KEYS = {
  TOKEN: 'cm_token',
  USER: 'cm_user',
 ADMIN: 'cm_admin',
  MERCHANDISER: 'cm_merchandiser',
  STORE_MANAGER: 'cm_store_manager',
  PURCHASE_MANAGER: 'cm_purchase_manager',
  CUTTING_MANAGER: 'cm_cutting_manager',
  SEWING_MANAGER: 'cm_sewing_manager',
  FINISHING_MANAGER: 'cm_finishing_manager',
  PACKING_MANAGER: 'cm_packing_manager',
  PRODUCTION_MANAGER: 'cm_production_manager'
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // ── Write ────────────────────────────────────────────

  saveSession(data: LoginResponse): void {
    localStorage.setItem(
      KEYS.TOKEN,
      CryptoUtil.encrypt(data.token)
    );
    localStorage.setItem(
      KEYS.USER,
      CryptoUtil.encrypt(JSON.stringify(data))
    );
  }


  // ── Read ─────────────────────────────────────────────

  getToken(): string | null {
    const raw = localStorage.getItem(KEYS.TOKEN);
    return raw ? CryptoUtil.decrypt(raw) : null;
  }

  getUser(): LoginResponse | null {
    const raw = localStorage.getItem(KEYS.USER);
    if (!raw) return null;
    const json = CryptoUtil.decrypt(raw);
    try {
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


 // ── Clear ─────────────────────────────────────────────

 clearSession(): void {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }


  // Customer -------------------------------------------------

 


// Generic Method for ALl

saveData(key: string, data: any): void {
  localStorage.setItem(
    key,
    CryptoUtil.encrypt(JSON.stringify(data))
  );
}


getData<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const json = CryptoUtil.decrypt(raw);
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

removeData(key: string): void {
  localStorage.removeItem(key);
}



}