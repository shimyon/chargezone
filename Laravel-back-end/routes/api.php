<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\SmarteapiController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\OperationController;
use App\Http\Controllers\API\StationController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\EvMasterController;
use App\Http\Controllers\API\EvInvetoryController;
use App\Http\Controllers\API\OwnerMasterController;
use App\Http\Controllers\API\BatteryController;
use App\Http\Controllers\API\BatteryInventoryController;
use App\Http\Controllers\API\OemController;
use App\Http\Controllers\API\FleetOperatorController;
use App\Http\Controllers\API\FaultMasterController;
use App\Http\Controllers\API\ChargerController;
use App\Http\Controllers\API\ChargerInventoryController;
use App\Http\Controllers\API\MappingController;
use App\Http\Controllers\API\TransactionLogController;
use App\Http\Controllers\API\CountryMasterController;
use App\Http\Controllers\API\StateMasterController;
use App\Http\Controllers\API\CityMasterController;
use App\Http\Controllers\API\ReportController;
/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */
Route::group(['middleware' => ['cors']], function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('login', [RegisterController::class, 'login']);    
    Route::get('liveLocation', [SmarteapiController::class, 'liveLocation']);
    Route::get('dailyPerformance', [SmarteapiController::class, 'dailyPerformance']);
});


Route::group(['middleware' => ['cors', 'auth:api']], function () {
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::post('addVehicle', [VehicleController::class, 'addVehicle']);
    Route::post('addVehicleInQueue', [VehicleController::class, 'addVehicleInQueue']);
    Route::post('validateOTP', [OperationController::class, 'validateOTP']);
    Route::post('validateEV', [OperationController::class, 'validateEV']);
    Route::post('validatePairEV', [OperationController::class, 'validatePairEV']);
    Route::post('scanBatteries', [OperationController::class, 'scanBatteries']);
    Route::get('getStations', [StationController::class, 'getStations']);
    Route::post('getDashboardData', [StationController::class, 'getDashboardData']);

    /* User master */
    Route::post('users/add', [UserController::class, 'add']);    
    Route::post('users/getUserById', [UserController::class, 'getUserById']);
    Route::post('users/update', [UserController::class, 'update']);
    Route::get('users/list', [UserController::class, 'list']);
    Route::post('users/delete', [UserController::class, 'delete']);
    Route::get('users/roles', [UserController::class, 'roleList']);
    Route::post('users/getUsersByRole', [UserController::class, 'getUsersByRole']);
    Route::post('users/getUsersByStation', [UserController::class, 'getUsersByStation']);
    Route::get('users/getOperator', [UserController::class, 'getOperator']);
    
    /* Hub master */
    Route::post('station/add', [StationController::class, 'add']);
    Route::post('station/getStationById', [StationController::class, 'getStationById']);
    Route::post('station/update', [StationController::class, 'update']);
    Route::get('station/list', [StationController::class, 'list']);
    Route::post('station/delete', [StationController::class, 'delete']);
    Route::get('station/getStationsBycity', [StationController::class, 'getStationsBycity']);
    /* EV master */
    Route::post('ev/add', [EvMasterController::class, 'add']);
    Route::post('ev/getEvById', [EvMasterController::class, 'getEvById']);
    Route::post('ev/update', [EvMasterController::class, 'update']);
    Route::get('ev/list', [EvMasterController::class, 'list']);
    Route::post('ev/delete', [EvMasterController::class, 'delete']);
    Route::get('ev/getEv', [EvMasterController::class, 'getEv']);

    /* EV Inventory master */
    Route::post('ev_inventory/add', [EvInvetoryController::class, 'add']);
    Route::post('ev_inventory/getEvById', [EvInvetoryController::class, 'getEvById']);
    Route::post('ev_inventory/update', [EvInvetoryController::class, 'update']);
    Route::get('ev_inventory/list', [EvInvetoryController::class, 'list']);
    Route::post('ev_inventory/delete', [EvInvetoryController::class, 'delete']);
    Route::post('ev_inventory/getEvInventoryByStation', [EvInvetoryController::class, 'getEvInventoryByStation']);
    Route::get('ev_inventory/getEvQrCode', [EvInvetoryController::class, 'getEvQrCode']);
    
    /* Owner master */
    Route::post('owner/add', [OwnerMasterController::class, 'add']);
    Route::post('owner/getOwnerById', [OwnerMasterController::class, 'getOwnerById']);
    Route::post('owner/update', [OwnerMasterController::class, 'update']);
    Route::get('owner/list', [OwnerMasterController::class, 'list']);
    Route::post('owner/delete', [OwnerMasterController::class, 'delete']);
    Route::get('owner/getOwners', [OwnerMasterController::class, 'getOwners']);

     /* Battery master */
     Route::post('battery/add', [BatteryController::class, 'add']);
     Route::post('battery/getBatteryById', [BatteryController::class, 'getBatteryById']);
     Route::post('battery/update', [BatteryController::class, 'update']);
     Route::get('battery/list', [BatteryController::class, 'list']);
     Route::post('battery/delete', [BatteryController::class, 'delete']);
     Route::get('battery/getBatteryList', [BatteryController::class, 'getBatteryList']);

     /* Battery Inventory master */
     Route::post('battery_inventory/add', [BatteryInventoryController::class, 'add']);
     Route::post('battery_inventory/getBatteryById', [BatteryInventoryController::class, 'getBatteryById']);
     Route::post('battery_inventory/update', [BatteryInventoryController::class, 'update']);
     Route::get('battery_inventory/list', [BatteryInventoryController::class, 'list']);
     Route::post('battery_inventory/delete', [BatteryInventoryController::class, 'delete']);

     /* Oem master */
     Route::post('oem/add', [OemController::class, 'add']);
     Route::post('oem/getOemById', [OemController::class, 'getOemById']);
     Route::post('oem/update', [OemController::class, 'update']);
     Route::get('oem/list', [OemController::class, 'list']);
     Route::post('oem/delete', [OemController::class, 'delete']);
     Route::post('oem/getOem', [OemController::class, 'getOem']);
    
    /* Fleet Operator master */
    Route::post('fleet_operator/add', [FleetOperatorController::class, 'add']);
    Route::post('fleet_operator/getFleetOperatorById', [FleetOperatorController::class, 'getFleetOperatorById']);
    Route::post('fleet_operator/update', [FleetOperatorController::class, 'update']);
    Route::get('fleet_operator/list', [FleetOperatorController::class, 'list']);
    Route::post('fleet_operator/delete', [FleetOperatorController::class, 'delete']);
    Route::get('fleet_operator/getFleetOperator', [FleetOperatorController::class, 'getFleetOperator']);
    Route::post('fleet_operator/getFleetOperatorByStation', [FleetOperatorController::class, 'getFleetOperatorByStation']);

    /* Fault master */
    Route::post('fault/add', [FaultMasterController::class, 'add']);
    Route::post('fault/getFaultById', [FaultMasterController::class, 'getFaultById']);
    Route::post('fault/update', [FaultMasterController::class, 'update']);
    Route::get('fault/list', [FaultMasterController::class, 'list']);
    Route::post('fault/delete', [FaultMasterController::class, 'delete']);

    /* charger master */
    Route::post('charger/add', [ChargerController::class, 'add']);
    Route::post('charger/getChargerById', [ChargerController::class, 'getChargerById']);
    Route::post('charger/update', [ChargerController::class, 'update']);
    Route::get('charger/list', [ChargerController::class, 'list']);
    Route::post('charger/delete', [ChargerController::class, 'delete']);
    Route::get('charger/getCharger', [ChargerController::class, 'getCharger']);

    /* charger Inventory master */
    Route::post('charger_inventory/add', [ChargerInventoryController::class, 'add']);
    Route::post('charger_inventory/getChargerById', [ChargerInventoryController::class, 'getChargerById']);
    Route::post('charger_inventory/update', [ChargerInventoryController::class, 'update']);
    Route::get('charger_inventory/list', [ChargerInventoryController::class, 'list']);
    Route::post('charger_inventory/delete', [ChargerInventoryController::class, 'delete']);

    /*EV Mapping */
    Route::get('mapping/ev_list', [MappingController::class, 'ev_list']);
    Route::post('mapping/ev_mapping', [MappingController::class, 'ev_mapping']);

    /*Battery Mapping */
    Route::get('mapping/battery_list', [MappingController::class, 'battery_list']);
    Route::post('mapping/battery_mapping', [MappingController::class, 'battery_mapping']);
    
    /*EV Mapping */
    Route::get('mapping/charger_list', [MappingController::class, 'charger_list']);
    Route::post('mapping/charger_mapping', [MappingController::class, 'charger_mapping']);

    /*User Mapping */
    Route::post('mapping/user_mapping', [MappingController::class, 'user_mapping']);
    Route::post('mapping/fleet_operator_mapping', [MappingController::class, 'fleet_operator_mapping']);

    /*Operation Data*/
    Route::get('operations/transaction_list', [TransactionLogController::class, 'transaction_list']);
    Route::get('operations/queue_list', [TransactionLogController::class, 'queue_list']);
    Route::post('operations/getChargerByStation', [TransactionLogController::class, 'getChargerByStation']);
    Route::post('operations/getSlotByCharger', [TransactionLogController::class, 'getSlotByCharger']);
    
    /* Country master */
    Route::post('country/add', [CountryMasterController::class, 'add']);
    Route::post('country/getCountryById', [CountryMasterController::class, 'getCountryById']);
    Route::post('country/update', [CountryMasterController::class, 'update']);
    Route::get('country/list', [CountryMasterController::class, 'list']);
    Route::post('country/delete', [CountryMasterController::class, 'delete']);
    Route::get('country/getCountries', [CountryMasterController::class, 'getCountries']);

    /* State master */
    Route::post('state/add', [StateMasterController::class, 'add']);
    Route::post('state/getStateById', [StateMasterController::class, 'getStateById']);
    Route::post('state/update', [StateMasterController::class, 'update']);
    Route::get('state/list', [StateMasterController::class, 'list']);
    Route::post('state/delete', [StateMasterController::class, 'delete']);
    Route::post('state/getStateByCountry', [StateMasterController::class, 'getStateByCountry']);

    /* City master */
    Route::post('city/add', [CityMasterController::class, 'add']);
    Route::post('city/getCityById', [CityMasterController::class, 'getCityById']);
    Route::post('city/update', [CityMasterController::class, 'update']);
    Route::get('city/list', [CityMasterController::class, 'list']);
    Route::post('city/delete', [CityMasterController::class, 'delete']);
    Route::post('city/getCityByState', [CityMasterController::class, 'getCityByState']);

    /* Report master */
    Route::post('report/swapping_transaction', [ReportController::class, 'swapping_transaction']);
    Route::post('report/swap_report', [ReportController::class, 'swap_report']);
    Route::post('report/bss_network_report', [ReportController::class, 'bss_network_report']);
    Route::post('report/weekly_billing_ref', [ReportController::class, 'weekly_billing_ref']);
    Route::post('report/fault_report', [ReportController::class, 'fault_report']);    
    Route::post('report/battery_history_report1', [ReportController::class, 'battery_history_report']);     
    Route::post('report/export_swapping_report', [ReportController::class, 'export_swapping_report']);     
    Route::post('report/export_bss_network_report', [ReportController::class, 'export_bss_network_report']);     
    Route::post('report/export_fault_log_report', [ReportController::class, 'export_fault_log_report']);
    Route::post('report/export_swap_report', [ReportController::class, 'export_swap_report']);
    Route::post('report/export_weekly_billing_report', [ReportController::class, 'export_weekly_billing_report']);
});
