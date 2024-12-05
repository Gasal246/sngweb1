
import { ROLES_SLUG } from "../../constants/strings";

let _USER = localStorage.getItem("user_role")



export const MENUITEMS = [
  {
    menutitle: "",
    menutitleaccess: true,
    Items: [
      {
        path: `/dashboard`, icon: "home", type: "link", active: false, title: "Dashboard",
        access: true,
      },
      {
        path: `/client-administrator`, icon: "user", type: "link", active: false, title: "Client Administrator",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/admin-coordinator`, icon: "users", type: "link", active: false, title: "Coordinator",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/client-coordinator`, icon: "users", type: "link", active: false, title: "Coordinator",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/admin-accountant`, icon: "database", type: "link", active: false, title: "Accountant",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/client-accountant`, icon: "database", type: "link", active: false, title: "Accountant",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      // {
      //   path: `/client-pos-device-code`, icon: "smartphone", type: "link", active: false, title: "POS Device Code",
      //   access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false,
      //   options: [
      //     {
      //       title: "Active Device", path: '/client-pos-device-code'
      //     },
      //     {
      //       title: "Attach POS", path: '/client-pos-device-code'
      //     },
      //   ]
      // },
      {
        icon: "smartphone", type: "folder", active: false, title: "POS Device Management",subTitle:'pos',
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false,
        options: [
          {
            path: `/client-pos-device-code`, icon: "smartphone", type: "link", active: false, title: "Active Device",
          },
          {
            path: '/client-attach-device-pos',icon: "smartphone", type: "link", active: false, title: "Attach Device To POS"
          },
        ]
      },
      {
        path: `/pos-camp`, icon: "map-pin", type: "link", active: false, title: "Camps",
        access: ['pos'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/pos-find-user`, icon: "users", type: "link", active: false, title: "Find User",
        access: ['pos'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      // {
      //   path: `/pos-order-internet-package`, icon: "map-pin", type: "link", active: false, title: "Order Internet Package",
      //   access: ['pos'].includes(ROLES_SLUG[_USER]) ? true : false
      // },
      {
        path: `/pos-report`, icon: "file", type: "link", active: false, title: "Report",
        access: ['pos'].includes(ROLES_SLUG[_USER]) ? true : false
      },

      {
        path: `/admin-investors`, icon: "stop-circle", type: "link", active: false, title: "Investors",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      // {
      //   path: `/national-type`, icon: "file", type: "link", active: false, title: "National ID Type",
      //   access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      // },
      {
        icon: "settings", type: "folder", active: false, title: "Settings",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false,
        options: [
          {
            path: `/national-type`, icon: "file", type: "link", active: false, title: "National ID Type",
            access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
          {
            path: `/country`, icon: "flag", type: "link", active: false, title: "Country",
            access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
        ]
      },
      {
        icon: "map-pin", type: "folder", active: false, title: "Camp Management" , subTitle:'camp',
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false,
        options: [
          {
            path: `/camp-list`, icon: "map-pin", type: "link", active: false, title: "Camp List",
            access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
          {
            path: `/attach-management`, icon: "map-pin", type: "link", active: false, title: "Attach Management",
            access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
          {
            path: `/attached-list`, icon: "map-pin", type: "link", active: false, title: "Attached List",
            access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
          {
            path: `/camp-user-list`, icon: "map-pin", type: "link", active: false, title: "Camp User List",
            access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
          },
        ] 
      },
      {
        path: `/client-investors`, icon: "stop-circle", type: "link", active: false, title: "Investors",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },

      {
        path: `/pos`, icon: "cpu", type: "link", active: false, title: "POS",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false,

      },

      // {
      //   path: `/camps`, icon: "map-pin", type: "link", active: false, title: "Camps",
      //   access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      // },
      {
        path: `/accountant-report`, icon: "map-pin", type: "link", active: false, title: "Reports",
        access: ['accountant'].includes(ROLES_SLUG[_USER]) ? true : false
      },




      // {
      //   path: `/country`, icon: "flag", type: "link", active: false, title: "Country",
      //   access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      // },

      {
        path: `/pos-device-code`, icon: "smartphone", type: "link", active: false, title: "POS Device Code",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false,

      },

      {
        path: `/admin-water-manger`, icon: "droplet", type: "link", active: false, title: "Water Package",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/admin-internet-package`, icon: "wifi", type: "link", active: false, title: "Internet Package",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/admin-kitchen-manger`, icon: "home", type: "link", active: false, title: "Kitchen Manager",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },

      //store-manager
      {
        path: `/admin-store-manger`, icon: "shopping-bag", type: "link", active: false, title: "Store Manager",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },

      {
        path: `/store-meal-package`, icon: "package", type: "link", active: false, title: "Meal Package",
        access: ['store-manager'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/store-water-package`, icon: "droplet", type: "link", active: false, title: "Water Package",
        access: ['store-manager'].includes(ROLES_SLUG[_USER]) ? true : false
      },


      //plant-manager
      {
        path: `/admin-plant-manger`, icon: "package", type: "link", active: false, title: "Plant Manager",
        access: ['admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },


      //internet-package
      {
        path: `/client-internet-package`, icon: "wifi", type: "link", active: false, title: "Internet Package",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      }
      ,

      {
        path: `/coordinator-internet-package`, icon: "wifi", type: "link", active: false, title: "Internet Package",
        access: ['coordinator'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      //water-package
      {
        path: `/client-water-package`, icon: "droplet", type: "link", active: false, title: "Water Package",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/client-report`, icon: "file", type: "link", active: false, title: "Reports",
        access: ['client-admin'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/coordinator-report`, icon: "file", type: "link", active: false, title: "Reports",
        access: ['coordinator'].includes(ROLES_SLUG[_USER]) ? true : false
      },
      {
        path: `/accountant-report`, icon: "file", type: "link", active: false, title: "Reports",
        access: ['accountant'].includes(ROLES_SLUG[_USER]) ? true : false
      },

    ],
  },

  {
    menutitle: "",
    menutitleaccess: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
    Items: [
      {
        title: "messMange",
        icon: "sliders",
        type: "sub",
        active: false,
        access: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
        children: [
          {
            path: `/meal-category`,
            title: "Meal Category",
            type: "link",
            access: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
          },
          {
            path: `/meal-item`,
            title: "Meal Item",
            type: "link",
            access: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
          },
          {
            path: `/meal-package`,
            title: "Meal Package",
            type: "link",
            access: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
          },
          // {
          //   path: `/meal/:id/comboitem`,
          //   title: "Meal Combo Item",
          //   type: "link",
          //   access: ['kitchen-manager'].includes(ROLES_SLUG[_USER]) ? true : false,
          // },
        ],
      },
    ],
  },
];
