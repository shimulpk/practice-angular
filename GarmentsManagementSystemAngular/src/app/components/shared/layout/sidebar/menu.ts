export interface MenuItem {

   title:string;

    icon:string;

    route?:string;

    expanded?:boolean;

    children?:MenuItem[];

    module?:string;

}

export const MENU: MenuItem[] = [



  {
    title:'User Directory',

    icon:'bi bi-people',

    route:'/users',

    module:'USER'
},

  // ===========================
  // Merchandising
  // ===========================

  {
title:'Merchandising',

icon:'bi bi-briefcase-fill',

module:'MERCHANDISING',

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
        route: '/raw-material-check/add'
      },

      {
        title: 'Raw Material Details',
        icon: 'bi bi-box-seam',
        route: '/raw-material-check'
      },

       {
        title: 'Fabric Record Check',
        icon: 'bi bi-box-seam',
        route: '/fabric-record-check/add'
      },

       {
        title: 'View Fabric Record',
        icon: 'bi bi-box-seam',
        route: '/fabric-record-check'
      }



    ]

  },

  // ===========================
  // Procurement
  // ===========================

  {

    title: 'Procurement',

    icon: 'bi bi-truck',

   module:'PROCUREMENT',

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
      title: 'Pending Requisition',
      icon: 'bi bi-hourglass-split',
      route: '/pending-store-requisition'
    },

  

     
      { title: 'Create Purchase Orders', 
        icon: 'bi bi-file-earmark-plus',
         route: '/purchase-orders/add' },

         
      { title: 'View PO List',
         icon: 'bi bi-card-list',
          route: '/purchase-orders' }

    ]

  },

  // ===========================
  // Inventory
  // ===========================

  {

    title: 'Inventory',

    icon: 'bi bi-boxes',

   module:'INVENTORY',

   

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
      title: 'Create Store Requisition',
      icon: 'bi bi-file-earmark-plus',
      route: '/store-requisitions/add'
    },

    {
      title: 'View Store Requisition',
      icon: 'bi bi-file-earmark-text',
      route: '/store-requisitions'
    },

      
      {
        title: 'Create GRN',
        icon: 'bi bi-box-arrow-in-down',
        route: '/inventory/grn/create'
  },

  {
        title: 'View GRNs',
        icon: 'bi bi-journal-text',
        route: '/inventory/grn'
},

{
  title: 'Current Stock Report',
  icon: 'bi bi-box-seam',
  route: '/stocks'
},

{
  title: 'Create Material Issue',
  icon: 'bi bi-box-arrow-up',
  route: '/material-issue/create'
},

{
  title: 'View Material Issues',
  icon: 'bi bi-journal-check',
  route: '/material-issue'
}



    ]

  },

  // ===========================
  // Production Planning
  // ===========================

  {

    title: 'Production Planning & Control',

    icon: 'bi bi-gear-wide-connected',

    module:'PRODUCTION',

    children: [

      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        route: '/production/dashboard'
      },

      {
      title: 'Add Production Line',
      icon: 'bi bi-plus-circle',
      route: '/production-lines/add'
      },

     {
      title: 'View Production Lines',
       icon: 'bi bi-list-ul',
       route: '/production-lines'
      },

     {
  title: 'Add Machine',
  icon: 'bi bi-plus-circle',
  route: '/machines/add'
},

{
  title: 'View Machines',
  icon: 'bi bi-list-ul',
  route: '/machines'
},

      // Nested Menu
      {
        title: 'Cutting',
        icon: 'bi bi-scissors',
       module:'CUTTING',
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
       module:'SEWING',
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
       module:'FINISHING',
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
  route: '/day-wise-finishing-production/add'
},

{
  title: 'View Day Wise Finishing Production',
  icon: 'bi bi-calendar-check',
  route: '/day-wise-finishing-production'
},
        ]
      },

      {
        title: 'Packing',
        icon: 'bi bi-box',
       module:'PACKING',
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