// export const baseUrl = 'http://dev1.websorbzdocker.online'
// export const baseUrl = 'http://65.109.1.128:3019'
// export const baseUrl = 'http://5.161.235.50:3019'
export const baseUrl = 'https://sngoapi.appdemolink.online'

// <----------------- Super Admin ----------------> 

/*LoginAPI */
export const SUPERADMIN_LOGIN_API = `${baseUrl}/api/admin/login`;

/*get user detail */
export const GET_SUPERADMIN_DETAIL_API = `${baseUrl}/api/admin/details`;

/* crud opration */
export const SUPERADMIN_UPDATE_PASSWORD = `${baseUrl}/super-admin/api/update-password`; // update password
export const SUPERADMIN_ADD_CLIENT_ADMIN_API = `${baseUrl}/api/admin/client-admin`;// client admin
export const SUPERADMIN_ADD_GET_COORDINATOR_API = `${baseUrl}/super-admin/api/coordinator`; // coordinator
export const SUPERADMIN_ADD_GET_ACCOUNTANT_API = `${baseUrl}/super-admin/api/accountant`; // accountant
export const SUPERADMIN_ADD_GET_INVESTORS_API = `${baseUrl}/super-admin/api/investors`; // investors
export const SUPERADMIN_ADD_GET_COUNTRY_API = `${baseUrl}/super-admin/api/country`; // country
export const SUPERADMIN_ADD_GET_POSEDEVICECODE_API = `${baseUrl}/super-admin/api/pos-device-code`; //pos device code
export const SUPERADMIN_GET_MEALPACKAGE_API = `${baseUrl}/super-admin/api/meal-package`; // meal pack details
export const SUPERADMIN_UPDATE_MEALPACKAGE_API = `${baseUrl}/super-admin/api/meal-package/set-package-cost`;

/* UPDATE STATUS & DELETE USER */
// STATUS : 0 /* DELETE */ // STATUS : 1 /* ACTIVE */ // STATUS : 2 /* DEACTIVE */

export const SUPERADMIN_UPDATE_CLIENT_ADMIN_API = `${baseUrl}/api/admin/client-admin/status-update`;
export const SUPERADMIN_UPDATE_COORDINATOR_API = `${baseUrl}/super-admin/api/coordinator/status-update`;
export const SUPERADMIN_UPDATE_ACCOUNTANT_API = `${baseUrl}/super-admin/api/accountant/status-update`;
export const SUPERADMIN_UPDATE_INVESTORS_API = `${baseUrl}/super-admin/api/investors/status-update`;

// <----------------- Super Admin ---------------->


/*LoginAPI */
export const CLIENTADMIN_LOGIN_API = `${baseUrl}/api/client-admin/login`;
export const COORDINATOR_LOGIN_API = `${baseUrl}/api/coordinator/login`;
export const ACCOUNTANT_LOGIN_API = `${baseUrl}/api/accountant/login`;
export const INVESTOR_LOGIN_API = `${baseUrl}/api/investor/login`;
export const KITCHEN_MANAGER_LOGIN_API = `${baseUrl}/kitchen-manager/api/login`;
export const STORE_MANAGER_LOGIN_API = `${baseUrl}/store-manager/api/login`;
export const PLANT_MANAGER_LOGIN_API = `${baseUrl}/api/plant-manager/login`;
export const POS_LOGIN_API = `${baseUrl}/api/pos/login`;



// <----------------- Client Admin POS ----------------> 

export const ADD_GET_CLIENTADMIN_POS_API = `${baseUrl}/client-admin/api/pos`; // pos list
export const ADD_GET_CAMPS_API = `${baseUrl}/client-admin/api/internet-package`; // Camps list



// <----------------- messMange ----------------> 

//mealicategory
export const ADD_GET_MEALCATEGORY_API = `${baseUrl}/mess-manage/api/category`; // item list

//mealitems 
export const ADD_GET_MEALITEM_API = `${baseUrl}/mess-manage/api/item`; // item list

//mealipackage
export const ADD_GET_MEALPACKAGE_API = `${baseUrl}/mess-manage/api/meal-package`; // item list
export const UPDATE_MEALPACKAGE_API = `${baseUrl}/mess-manage/api/meal-package/status-update`;
export const GET_MEALPACKAGE_ITEM_API = `${baseUrl}/mess-manage/api/meal-package-item`;
export const GET_DELETED_MEALPACKAGE_API = `${baseUrl}/mess-manage/api/meal-package?status=0`;

//store-manager
export const GET_STORE_MEALPACKAGE_API = `${baseUrl}/store-manager/api/meal-package/assigned-camp-meal-packages`; // meal list
export const GET_DELETED_STORE_MEALPACKAGE_API = `${baseUrl}/store-manager/api/meal-package/assigned-camp-meal-packages?status=0`; // deleted meal list
export const GET_STORE_WATRERPACKAGE_API = `${baseUrl}/store-manager/api/water-package/assigned-camp-water-packages`; // water list
export const GET_DELETED_STORE_WATRERPACKAGE_API = `${baseUrl}/store-manager/api/water-package/assigned-camp-water-packages?status=0`; // water list