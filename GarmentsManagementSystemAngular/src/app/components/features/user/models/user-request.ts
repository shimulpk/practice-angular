import { Role } from "./role";

export interface UserRequest {

       name: string;

  email: string;

  phone: string;

  password: string;

  role: Role;

  active: boolean;
}
