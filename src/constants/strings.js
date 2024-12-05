export const ROLES_SLUG = {
  ROLE_SUPER_ADMIN: "admin",
  ROLE_POS: 'pos',
  ROLE_CLIENT_ADMIN: "client-admin",
  ROLE_COORDINATOR: "coordinator",
  ROLE_ACCOUNTANT: "accountant",
  ROLE_INVESTOR: "investor",
  ROLE_KITCHEN_MANAGER: "kitchen-manager",
  ROLE_STORE_MANAGER: "store-manager",
  ROLE_PLANT_MANAGER: "plant-manager",
};

export const ROLES_NAME = {
  ROLE_SUPER_ADMIN: "Super Admin",
  ROLE_CLIENT_ADMIN: "Client Admin",
  ROLE_COORDINATOR: "Coordinator",
  ROLE_ACCOUNTANT: "Accountant",
  ROLE_INVESTOR: "Investor",
  ROLE_KITCHEN_MANAGER: "Kitchen Manager",
  ROLE_STORE_MANAGER: "Store Manager",
  ROLE_PLANT_MANAGER: "Plant Manager",
  ROLE_POS: "POS",
}

export const optionData = [
  {
    value: "ONE-TIME",
    label: "ONE-TIME",
  },
  {
    value: "SUBSCRIPTION",
    label: "SUBSCRIPTION",
  }
];

export const TypeData = [
  {
    value: "commission",
    label: "Commission",
  },
  {
    value: "direct",
    label: "Direct",
  }
];

export const MealType = [
  {
    value: "Veg",
    label: "Veg",
  },
  {
    value: "Non-veg",
    label: "Non-veg",
  }
];



export const MealcomboData = {
  package_items: {
    day_1: [],
    day_2: [],
    day_3: [],
    day_4: [],
    day_5: [],
    day_6: [],
    day_7: [],
  },
}