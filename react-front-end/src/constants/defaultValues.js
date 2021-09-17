import { UserRole } from "../helpers/authHelper";

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  /*apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',*/
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const adminRoot = '/app';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';
// export const baseAPI = 'http://127.0.0.1:8000/api';
// export const baseAPI = 'https://bss.chargezone.co/admin/public/api';
export const baseAPI = 'https://stagingbss.mychargezone.com/admin/public/api';


export const loginAPI = `${baseAPI}/login`;
export const validateOTPAPI = `${baseAPI}/validateOTP`;
export const validateScanEVAPI = `${baseAPI}/validateEV`;
export const validatePairEVAPI = `${baseAPI}/validatePairEV`;
export const validateScanBatteryAPI = `${baseAPI}/scanBatteries`;
export const UserLogout = `${baseAPI}/logout`;
//user by roles
export const getUsersByRolesAPI = `${baseAPI}/users/getUsersByRole`;
//get OEM
export const getOemAPI = `${baseAPI}/oem/getOem`;
//get Owners
export const getOwnersAPI = `${baseAPI}/owner/getOwners`;
//get Battery
export const getBatteryDataAPI = `${baseAPI}/battery/getBatteryList`;
//get Charger by Station
export const getChargerByStationAPI = `${baseAPI}/operations/getChargerByStation`;
//get Slot by Charger
export const getSlotByChargerAPI = `${baseAPI}/operations/getSlotByCharger`;
//get Charger
export const getChargerAPI = `${baseAPI}/charger/getCharger`;
//get EV
export const getEvAPI = `${baseAPI}/ev/getEv`;
//get EV_Inventory by station
export const getEvInventoryByStationAPI = `${baseAPI}/ev_inventory/getEvInventoryByStation`;
//get Countries 
export const getCountriesAPI = `${baseAPI}/country/getCountries`;
//get state by country
export const getStatesByCountryAPI = `${baseAPI}/state/getStateByCountry`;
//get city by state
export const getCitiesByStateAPI = `${baseAPI}/city/getCityByState`;
//get station by city
export const getStationsByCityAPI = `${baseAPI}/station/getStationsBycity?`;
//get Fleet Operator
export const getFleetOperatorAPI = `${baseAPI}/fleet_operator/getFleetOperator`;
//Master
//swapping station
export const getStationsAPI = `${baseAPI}/getStations`;
export const getDashboardDataAPI = `${baseAPI}/getDashboardData`;
export const getSwappingStationAPI = `${baseAPI}/station/list?page=`;
export const addSwappingStationAPI = `${baseAPI}/station/add`;
export const updateSwappingStationAPI = `${baseAPI}/station/update`;
export const deleteSwappingStationAPI = `${baseAPI}/station/delete`;
export const getStationByIdAPI = `${baseAPI}/station/getStationById`;
//user roles
export const getUserRolesAPI = `${baseAPI}/users/roles`;
//User
export const getUserListAPI = `${baseAPI}/users/list?page=`;
export const addUserAPI = `${baseAPI}/users/add`;
export const deleteUserAPI = `${baseAPI}/users/delete`;
export const updateUserAPI = `${baseAPI}/users/update`;
export const getUserByIdAPI = `${baseAPI}/users/getUserById`;
//EV
export const getEvListAPI = `${baseAPI}/ev/list?page=`;
export const addEvAPI = `${baseAPI}/ev/add`;
export const deleteEvAPI = `${baseAPI}/ev/delete`;
export const updateEvAPI = `${baseAPI}/ev/update`;
export const getEvByIdAPI = `${baseAPI}/ev/getEvById`;
//OEM
export const getOemListAPI = `${baseAPI}/oem/list?page=`;
export const addOemAPI = `${baseAPI}/oem/add`;
export const deleteOemAPI = `${baseAPI}/oem/delete`;
export const updateOemAPI = `${baseAPI}/oem/update`;
export const getOemByIdAPI = `${baseAPI}/oem/getOemById`;
export const getOemUsersAPI = `${baseAPI}/users/getUsersByRole`;
//Owner
export const getOwnerListAPI = `${baseAPI}/owner/list?page=`;
export const addOwnerAPI = `${baseAPI}/owner/add`;
export const deleteOwnerAPI = `${baseAPI}/owner/delete`;
export const updateOwnerAPI = `${baseAPI}/owner/update`;
export const getOwnerByIdAPI = `${baseAPI}/owner/getOwnerById`;
//Fault
export const getFaultListAPI = `${baseAPI}/fault/list?page=`;
export const addFaultAPI = `${baseAPI}/fault/add`;
export const deleteFaultAPI = `${baseAPI}/fault/delete`;
export const updateFaultAPI = `${baseAPI}/fault/update`;
export const getFaultByIdAPI = `${baseAPI}/fault/getFaultById`;
//Battery
export const getBatteryListAPI = `${baseAPI}/battery/list?page=`;
export const addBatteryAPI = `${baseAPI}/battery/add`;
export const deleteBatterytAPI = `${baseAPI}/battery/delete`;
export const updateBatteryAPI = `${baseAPI}/battery/update`;
export const getBatteryByIdAPI = `${baseAPI}/battery/getBatteryById`;
//BUlk Charger
export const getBulkChargerListAPI = `${baseAPI}/charger/list?page=`;
export const addBulkChargerAPI = `${baseAPI}/charger/add`;
export const deleteBulkChargerAPI = `${baseAPI}/charger/delete`;
export const updateBulkChargerAPI = `${baseAPI}/charger/update`;
export const getBulkChargerByIdAPI = `${baseAPI}/charger/getChargerById`;
//Fleet Operator
export const getFleetOperatorListAPI = `${baseAPI}/fleet_operator/list?page=`;
export const addFleetOperatorAPI = `${baseAPI}/fleet_operator/add`;
export const deleteFleetOperatorAPI = `${baseAPI}/fleet_operator/delete`;
export const updateFleetOperatorAPI = `${baseAPI}/fleet_operator/update`;
export const getFleetOperatorByIdAPI = `${baseAPI}/fleet_operator/getFleetOperatorById`;
//Country 
export const getCountryListAPI = `${baseAPI}/country/list?page=`;
export const addCountryAPI = `${baseAPI}/country/add`;
export const deleteCountryAPI = `${baseAPI}/country/delete`;
export const updateCountryAPI = `${baseAPI}/country/update`;
export const getCountryByIdAPI = `${baseAPI}/country/getCountryById`;
//State 
export const getStateListAPI = `${baseAPI}/state/list?page=`;
export const addStateAPI = `${baseAPI}/state/add`;
export const deleteStateAPI = `${baseAPI}/state/delete`;
export const updateStateAPI = `${baseAPI}/state/update`;
export const getStateByIdAPI = `${baseAPI}/state/getStateById`;
//City 
export const getCityListAPI = `${baseAPI}/city/list?page=`;
export const addCityAPI = `${baseAPI}/city/add`;
export const deleteCityAPI = `${baseAPI}/city/delete`;
export const updateCityAPI = `${baseAPI}/city/update`;
export const getCityByIdAPI = `${baseAPI}/city/getCityById`;
//Operations
//Transaction
export const getTransactionAPI = `${baseAPI}/operations/transaction_list?page=`;
//Queue
export const getQueueLogAPI = `${baseAPI}/operations/queue_list?page=`;
//Inevntory
//Battery Inventory
export const getBatteryInventoryListAPI = `${baseAPI}/battery_inventory/list?page=`;
export const addBatteryInventoryAPI = `${baseAPI}/battery_inventory/add`;
export const deleteBatteryInventoryAPI = `${baseAPI}/battery_inventory/delete`;
export const updateBatteryInventoryAPI = `${baseAPI}/battery_inventory/update`;
export const getBatteryInventoryByIdAPI = `${baseAPI}/battery_inventory/getBatteryById`;
//Charger Inventory
export const getChargerInventoryListAPI = `${baseAPI}/charger_inventory/list?page=`;
export const addChargerInventoryAPI = `${baseAPI}/charger_inventory/add`;
export const deleteChargerInventoryAPI = `${baseAPI}/charger_inventory/delete`;
export const updateChargerInventoryAPI = `${baseAPI}/charger_inventory/update`;
export const getChargerInventoryByIdAPI = `${baseAPI}/charger_inventory/getChargerById`;
//Ev Inventory
export const getEvInventoryListAPI = `${baseAPI}/ev_inventory/list?page=`;
export const addEvInventoryAPI = `${baseAPI}/ev_inventory/add`;
export const deleteEvInventoryAPI = `${baseAPI}/ev_inventory/delete`;
export const updateEvInventoryAPI = `${baseAPI}/ev_inventory/update`;
export const getEvInventoryByIdAPI = `${baseAPI}/ev_inventory/getEvById`;
//Mapping
//Ev Mapping
export const getEvMappingAPI = `${baseAPI}/mapping/ev_list?page=`;
export const mapEvAPI = `${baseAPI}/mapping/ev_mapping`;
//Battery Mapping
export const getBatteryMappingAPI = `${baseAPI}/mapping/battery_list?page=`;
export const mapBatteryAPI = `${baseAPI}/mapping/battery_mapping`;
//Charger Mapping
export const getChargerMappingAPI = `${baseAPI}/mapping/charger_list?page=`;
export const mapChargerAPI = `${baseAPI}/mapping/charger_mapping`;
//Station Mapping
export const getFleetOperatorMappingListAPI = `${baseAPI}/fleet_operator/getFleetOperatorByStation`;
export const mapFleetOperatorAPI = `${baseAPI}/mapping/fleet_operator_mapping`;
export const getUserMappingListByRoleAPI = `${baseAPI}/users/getUsersByStation`;
export const mapByRoleAPI = `${baseAPI}/mapping/user_mapping`;
//Reports
//Swapping Transaction Report
export const swappingTransactionReportAPI = `${baseAPI}/report/swapping_transaction`;
export const downloadSwappingReportAPI = `${baseAPI}/report/export_swapping_report`;
//Swap Report
export const swapReportAPI = `${baseAPI}/report/swap_report`;
export const downloadSwapReportAPI = `${baseAPI}/report/export_swap_report`;
//BSN Report
export const bsnReportAPI = `${baseAPI}/report/bss_network_report`;
export const downloadBsnReportAPI = `${baseAPI}/report/export_bss_network_report`;
//Weekly Billing Ref Report
export const weeklyBillRefReportAPI = `${baseAPI}/report/weekly_billing_ref`;
export const downloadWeeklyBillRefReportAPI = `${baseAPI}/report/export_weekly_billing_report`;
//Alarm & Fault Report
export const faultReportAPI = `${baseAPI}/report/fault_report`;
export const downloadfaultReportAPI = `${baseAPI}/report/export_fault_log_report`;
//Excel Report
export const historyReportAPI = `${baseAPI}/report/battery_history_report1`;

export const currentUser = {
  id: 1,
  name: 'Sarah ',
  img: '/assets/img/profiles/profimg.png',
  username: 'Last seen today 15:24',
  email: 'Last seen today 15:24',
  token: 'abc',
  role: UserRole.Admin
}


export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.redruby';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
