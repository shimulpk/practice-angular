export interface MenuItem {

  title: string;
  icon: string;

  route?: string;

  expanded?: boolean;

  children?: MenuItem[];

}

export const MENU: MenuItem[] = [

  // ===========================
  // Merchandising
  // ===========================

  {

    title: 'Merchandising',

    icon: 'bi bi-briefcase-fill',

    expanded: true,

    children: [

      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        route: '/dashboard'
      },

      {
        title: 'Add Buyer',
        icon: 'bi bi-person-plus',
        route: '/buyers/add'
      },

      {
        title: 'View Buyer',
        icon: 'bi bi-people',
        route: '/buyers'
      },

      {
        title: 'Add UOM',
        icon: 'bi bi-plus-square',
        route: '/uoms/add'
      },

      {
        title: 'View UOM',
        icon: 'bi bi-list-ul',
        route: '/uoms'
      },

     {
    title: 'Add Style',
    icon: 'bi bi-palette',
    route: '/styles/add'
},

{
    title: 'Style List',
    icon: 'bi bi-list-ul',
    route: '/styles'
},

{
    title: 'BOM Style List',
    icon: 'bi bi-diagram-3',
    route: '/bom'
},

      {
        title: 'Create Order',
        icon: 'bi bi-cart-plus',
        route: '/orders/add'
      },

      {
        title: 'Order List',
        icon: 'bi bi-list-check',
        route: '/orders'
      },

      {
        title: 'Raw Material Check',
        icon: 'bi bi-search',
        route: '/raw-material-check'
      },

      {
        title: 'View Fabric Record',
        icon: 'bi bi-box-seam',
        route: '/fabric-record'
      }

    ]

  },

  // ===========================
  // Procurement
  // ===========================

  {

    title: 'Procurement',

    icon: 'bi bi-truck',

    expanded: false,

    children: [

      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        route: '/procurement/dashboard'
      },

      {
        title: 'Add Vendor',
        icon: 'bi bi-person-plus',
        route: '/vendors/add'
      },

      {
        title: 'View Vendor',
        icon: 'bi bi-people',
        route: '/vendors'
      },

      {
        title: 'Create PO',
        icon: 'bi bi-file-earmark-plus',
        route: '/purchase-order/add'
      },

      {
        title: 'View PO',
        icon: 'bi bi-card-list',
        route: '/purchase-order'
      }

    ]

  },

  // ===========================
  // Inventory
  // ===========================

  {

    title: 'Inventory',

    icon: 'bi bi-boxes',

    expanded: false,

    children: [

      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        route: '/inventory/dashboard'
      },

      {
        title: 'Add Item',
        icon: 'bi bi-plus-circle',
        route: '/items/add'
      },

      {
        title: 'View Item',
        icon: 'bi bi-list',
        route: '/items'
      },

      {
        title: 'Stock In',
        icon: 'bi bi-box-arrow-in-down',
        route: '/stock-in'
      },

      {
        title: 'Stock Out',
        icon: 'bi bi-box-arrow-up',
        route: '/stock-out'
      },

      {
        title: 'Inventory List',
        icon: 'bi bi-box',
        route: '/inventory-list'
      },

      {
        title: 'Create Requisition',
        icon: 'bi bi-file-earmark-plus',
        route: '/requisition/add'
      },

      {
        title: 'View Requisition',
        icon: 'bi bi-card-list',
        route: '/requisition'
      }

    ]

  },

  // ===========================
  // Production Planning
  // ===========================

  {

    title: 'Production Planning & Control',

    icon: 'bi bi-gear-wide-connected',

    expanded: false,

    children: [

      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        route: '/production/dashboard'
      },

      {
        title: 'Line List',
        icon: 'bi bi-list-ul',
        route: '/lines'
      },

      {
        title: 'Machine List',
        icon: 'bi bi-cpu',
        route: '/machines'
      },

      // Nested Menu
      {
        title: 'Cutting',
        icon: 'bi bi-scissors',
        expanded: false,
        children: [{
      title: 'Add Cutting Plan',
      icon: 'bi bi-plus-circle',
      route: '/cutting-plan/add'
    },

    {
      title: 'View Cutting Plan',
      icon: 'bi bi-list-ul',
      route: '/cutting-plan'
    },

    {
      title: 'Add Day Wise Cutting Production',
      icon: 'bi bi-calendar-plus',
      route: '/cutting-production/add'
    },

    {
      title: 'View Day Wise Cutting Production',
      icon: 'bi bi-calendar-check',
      route: '/cutting-production'
    }
]
      },

      {
        title: 'Sewing',
        icon: 'bi bi-tools',
        expanded: false,
        children: [
             {
      title: 'Add Sewing Plan',
      icon: 'bi bi-plus-circle',
      route: '/sewing-plan/add'
    },

    {
      title: 'View Sewing Plan',
      icon: 'bi bi-list-ul',
      route: '/sewing-plan'
    },

    {
      title: 'Add Day Wise Sewing Production',
      icon: 'bi bi-calendar-plus',
      route: '/sewing-production/add'
    },

    {
      title: 'View Day Wise Sewing Production',
      icon: 'bi bi-calendar-check',
      route: '/sewing-production'
    }
        ]
      },

      {
        title: 'Finishing',
        icon: 'bi bi-check2-square',
        expanded: false,
        children: [
            {
      title: 'Add Finishing Plan',
      icon: 'bi bi-plus-circle',
      route: '/finishing-plan/add'
    },

    {
      title: 'View Finishing Plan',
      icon: 'bi bi-list-ul',
      route: '/finishing-plan'
    },

    {
      title: 'Add Day Wise Finishing Production',
      icon: 'bi bi-calendar-plus',
      route: '/finishing-production/add'
    },

    {
      title: 'View Day Wise Finishing Production',
      icon: 'bi bi-calendar-check',
      route: '/finishing-production'
    }
        ]
      },

      {
        title: 'Packing',
        icon: 'bi bi-box',
        expanded: false,
        children: [

            {
      title: 'Add Packing Plan',
      icon: 'bi bi-plus-circle',
      route: '/packing-plan/add'
    },

    {
      title: 'View Packing Plan',
      icon: 'bi bi-list-ul',
      route: '/packing-plan'
    },

    {
      title: 'Add Day Wise Packing Production',
      icon: 'bi bi-calendar-plus',
      route: '/packing-production/add'
    },

    {
      title: 'View Day Wise Packing Production',
      icon: 'bi bi-calendar-check',
      route: '/packing-production'
    }
        ]
      }

    ]

  }
]