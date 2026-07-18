import { Routes } from "@angular/router";
import { UserList } from "../pages/user-list/user-list";
import { UserRegistration } from "../pages/user-registration/user-registration";
import { UserDetails } from "../pages/user-details/user-details";
import { Profile } from "../pages/profile/profile";
import { ChangePassword } from "../pages/change-password/change-password";

export const USER_ROUTES: Routes = [

  {
    path: '',
    component: UserList
  },

  {
    path: 'add',
    component: UserRegistration
  },

  {
    path: 'edit/:id',
    component: UserRegistration
  },

    {
        path: 'profile',
        component: Profile
    },

    {
    path: 'change-password',
    component: ChangePassword
  },

  {
    path: 'details/:id',
    component: UserDetails
  }

];