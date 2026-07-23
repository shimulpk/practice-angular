import { Role } from "../../components/features/user/models/role";

export interface RolePermission {

     modules: string[];

    actions: string[];
}

export const ROLE_PERMISSIONS: Record<Role, RolePermission> = {

   [Role.ADMIN]: {

    modules: [

        'USER',

        'MERCHANDISING',

        'PROCUREMENT',

        'INVENTORY',

        'PRODUCTION',

         'CUTTING',

          'SEWING',

           'FINISHING',
            'PACKING',

        'REPORT'

    ],

    actions: [

        '*'

    ]

},
    [Role.MERCHANDISER]: {

    modules: [

        'MERCHANDISING'

    ],

    actions: [

        'VIEW',

        'CREATE',

        'EDIT'

    ]

},
   [Role.STORE_MANAGER]: {

    modules: [

        'INVENTORY'

    ],

    actions: [

        'VIEW',

        'CREATE',

        'EDIT',

        'APPROVE'

    ]

},

  [Role.PURCHASE_MANAGER]: {

    modules: [

        'PROCUREMENT'

    ],

    actions: [

        'VIEW',

        'CREATE',

        'EDIT',

        'APPROVE'

    ]

},
 [Role.PRODUCTION_MANAGER]: {
  modules: [
    'PRODUCTION',
    'CUTTING',
    'SEWING',
    'FINISHING',
    'PACKING'
  ],
  actions: ['*']
},

[Role.CUTTING_MANAGER]: {
  modules: [
   
    'CUTTING'
  ],
  actions: ['VIEW', 'CREATE', 'EDIT']
},

[Role.SEWING_MANAGER]: {
  modules: [
   
    'SEWING'
  ],
  actions: ['VIEW', 'CREATE', 'EDIT']
},

[Role.FINISHING_MANAGER]: {
  modules: [
   
    'FINISHING'
  ],
  actions: ['VIEW', 'CREATE', 'EDIT']
},

[Role.PACKING_MANAGER]: {
  modules: [
  
    'PACKING'
  ],
  actions: ['VIEW', 'CREATE', 'EDIT']
},

};