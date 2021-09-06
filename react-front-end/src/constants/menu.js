import { adminRoot } from "./defaultValues";
import { UserRole } from "../helpers/authHelper"

const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-grid',
    label: 'menu.Dashboard',
    to: `${adminRoot}/dashboard`,
    roles: [UserRole.Admin,UserRole.Operator,UserRole.Manager],
    subs: [
      {
        icon: 'iconsminds-monitor',
        label: 'menu.Dashboard',
        to: `${adminRoot}/dashboard/operator`, 
        roles: [UserRole.Operator],
      },
      {
        icon: 'iconsminds-monitor',
        label: 'menu.Dashboard',
        to: `${adminRoot}/dashboard/admin`, 
        roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-monitor',
        label: 'menu.Dashboard',
        to: `${adminRoot}/dashboard/manager`, 
        roles: [UserRole.Manager],
      },
    ],
  }, 
  {
    id: 'gogo',
    icon: 'iconsminds-gear-2',
    label: 'menu.gogo',
    to: `${adminRoot}/gogo`,
    roles: [UserRole.Operator],
    subs: [
      {
        icon: 'simple-icon-user-following',
        label: 'menu.start',
        to: `${adminRoot}/gogo/start`, 
        roles: [UserRole.Operator],
      },
    ],
  }, 
  {
    id: 'pages',
    icon: 'iconsminds-check',
    label: 'menu.Master',
    to: `${adminRoot}/master`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'iconsminds-male',
        label: 'menu.UserMaster',
        to: `${adminRoot}/pages/user`, 
      },
      {
        icon: 'iconsminds-align-justify-all',
        label: 'menu.RoleMaster',
        to: `${adminRoot}/pages/role`, 
      },
      {
        icon: 'iconsminds-battery-100',
        label: 'menu.BatteryMaster',
        to: `${adminRoot}/pages/battery`, 
      },
      {
        icon: 'iconsminds-car',
        label: 'menu.EVMaster',
        to: `${adminRoot}/pages/ev`, 
      },
      {
        icon: 'iconsminds-charger',
        label: 'menu.BulkChargerMaster',
        to: `${adminRoot}/pages/bulkcharger`, 
      },
      {
        icon: 'iconsminds-engineering',
        label: 'menu.FleetMaster',
        to: `${adminRoot}/pages/fleetoperator`, 
      },
      {
        icon: 'iconsminds-student-male',
        label: 'menu.Owner',
        to: `${adminRoot}/pages/owner`, 
      },
      {
        icon: 'iconsminds-support',
        label: 'menu.OEM',
        to: `${adminRoot}/pages/oem`, 
      },
      {
        icon: 'iconsminds-gas-pump',
        label: 'menu.swapping',
        to: `${adminRoot}/pages/swapping_station`, 
      },
      {
        icon: 'iconsminds-information',
        label: 'menu.Fault',
        to: `${adminRoot}/pages/fault`, 
      },
      {
        icon: 'simple-icon-map',
        label: 'menu.Country',
        to: `${adminRoot}/pages/country`, 
      },
      {
        icon: 'simple-icon-location-pin',
        label: 'menu.State',
        to: `${adminRoot}/pages/state`, 
      },
      {
        icon: 'simple-icon-directions',
        label: 'menu.City',
        to: `${adminRoot}/pages/city`, 
      },
    ],
  }, 
  {
    id: 'mapping',
    icon: 'iconsminds-synchronize-2',
    label: 'menu.Mapping',
    to: `${adminRoot}/mapping`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'iconsminds-shuffle',
        label: 'menu.EVMapping',
        to: `${adminRoot}/mapping/evmapping`, 
      },
      {
        icon: 'iconsminds-power-cable',
        label: 'menu.Batterymapping',
        to: `${adminRoot}/mapping/batterymapping`, 
      },
      {
        icon: 'iconsminds-charger',
        label: 'menu.Chargermapping',
        to: `${adminRoot}/mapping/chargermapping`, 
      },
      {
        icon: 'iconsminds-map2',
        label: 'menu.StationMapping',
        to: `${adminRoot}/mapping/station`, 
      },
    ],
  }, 
  {
    id: 'transaction',
    icon: 'iconsminds-gear-2',
    label: 'menu.Operations',
    to: `${adminRoot}/operations`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'iconsminds-arrow-inside',
        label: 'menu.Transaction',
        to: `${adminRoot}/operations/transaction`, 
      },
      {
        icon: 'iconsminds-sync',
        label: 'menu.Queue',
        to: `${adminRoot}/operations/queue`, 
      },
    ],
  }, 
  {
    id: 'inventory',
    icon: 'iconsminds-equalizer',
    label: 'menu.Inventory',
    to: `${adminRoot}/inventory`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'iconsminds-battery-0',
        label: 'menu.BatteryInven',
        to: `${adminRoot}/inventory/battery`, 
      },
      {
        icon: 'iconsminds-charger',
        label: 'menu.ChargerInven',
        to: `${adminRoot}/inventory/charger`, 
      },
      {
        icon: 'iconsminds-car',
        label: 'menu.EvInven',
        to: `${adminRoot}/inventory/evInventory`, 
      },
    ],
  }, 
  {
    id: 'report',
    icon: 'iconsminds-files',
    label: 'menu.Report',
    to: `${adminRoot}/report`,
    roles: [UserRole.Admin, UserRole.Manager],
    subs: [
      {
        icon: 'iconsminds-repeat',
        label: 'menu.bsnreport',
        to: `${adminRoot}/report/batterySwappingNetworkReport`, 
      },
      // {
      //   icon: 'iconsminds-green-energy',
      //   label: 'menu.ChargingSummary',
      //   to: `${adminRoot}/report/chargingSummary`, 
      // },
      {
        icon: 'iconsminds-billing',
        label: 'menu.batteryHistData',
        to: `${adminRoot}/report/batteryHistoricalData`, 
      },
      {
        icon: 'iconsminds-file',
        label: 'menu.Faultreport',
        to: `${adminRoot}/report/faultsAndAlerts`, 
      },
      {
        icon: 'iconsminds-file',
        label: 'menu.SwappingTrans',
        to: `${adminRoot}/report/swappingTransaction`, 
      },
      {
        icon: 'iconsminds-project',
        label: 'menu.Swapreport',
        to: `${adminRoot}/report/swap`, 
      },
      {
        icon: 'iconsminds-project',
        label: 'menu.WeeklyBillRef',
        to: `${adminRoot}/report/weeklyBillingRef`, 
      },
    ],
  }
];
export default data;
