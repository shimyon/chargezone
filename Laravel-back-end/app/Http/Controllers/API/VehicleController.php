<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\QueueMaster;
use App\Models\EvMaster;
use App\Models\EvInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VehicleController extends BaseController {

    public function addVehicle(Request $request) {
        try {
            $post_data = $request->json()->all();
            $validator = Validator::make($post_data, [
                        'vehicle_vin' => 'required',
                        'vehicle_model' => 'required',
                        'vehicle_make' => 'required',
                        'vehicle_type' => 'required',
                        'vehicle_id' => 'required|integer',
                        'vehicle_reg_no' => 'required',
                        'battery_capacity' => 'required',
                        'battery_vendor_hub_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $vehicle_vin = $post_data['vehicle_vin'];
            $vehicle_model = trim(strtolower($post_data['vehicle_model']));
            $vehicle_make = trim(strtolower($post_data['vehicle_make']));
            $vehicle_type = trim(strtolower($post_data['vehicle_type']));
            $vehicle_id = $post_data['vehicle_id'];
            $vehicle_reg_no = $post_data['vehicle_reg_no'];
            $battery_capacity = $post_data['battery_capacity'];
            $battery_vendor_hub_id = $post_data['battery_vendor_hub_id'];

            /* ----------------------------Add New Record in Ev Master-------------------------------- */
            $ev_exist = EvMaster::select('ev_master_id')
                    ->where(['vehicle_model' => $vehicle_model, 'vehicle_make' => $vehicle_make, 'vehicle_type' => $vehicle_type,'is_active'=>1])
                    ->first();
            if ($ev_exist) {
                $ev_master_id = $ev_exist->ev_master_id;
            } else {
                $ev_master_id = EvMaster::insertGetId([
                            'vehicle_model' => $vehicle_model,
                            'battery_capacity' => $battery_capacity,
                            'vehicle_make' => $vehicle_make,
                            'vehicle_type' => $vehicle_type,
                            'fleet_owner' => Auth::user()->name,
                            'created_by' => Auth::user()->id,
                            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
            }

            $ev_inventory_exist = EvInventoryMaster::where(['vehicle_vin' => $vehicle_vin,'is_active'=>1])->first();
            if ($ev_inventory_exist) {
                /* ----------------------------Add New Record in Ev Inventory----------------------------- */
                EvInventoryMaster::where('ev_inventory_id', $ev_inventory_exist->ev_inventory_id)->update([
                    'ev_master_id' => $ev_master_id,
                    'registration_no' => $vehicle_reg_no,
                    'hub_id' => $battery_vendor_hub_id,
                    'vechicle_id' => $vehicle_id,
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
                return $this->sendResponse('Vehicle data updated successfully!');
            } else {
                /* ----------------------------Add New Record in Ev Inventory----------------------------- */
                EvInventoryMaster::insert([
                    'e_qr_code' => intval(Carbon::now()->format('Ymd') . Auth::user()->id),
                    'ev_master_id' => $ev_master_id,
                    'registration_no' => $vehicle_reg_no,
                    'hub_id' => $battery_vendor_hub_id,
                    'vechicle_id' => $vehicle_id,
                    'vehicle_vin' => $vehicle_vin,
                    'fleet_owner' => Auth::user()->name,
                    'created_by' => Auth::user()->id,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
                return $this->sendResponse('Vehicle data added successfully!');
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }

    public function addVehicleInQueue(Request $request) {
        try {
            $post_data = $request->json()->all();
            $validator = Validator::make($post_data, [
                        'evDetail' => 'required',
                        'smarteSwappingId' => 'required|integer',
                        'batteryVendorHubId' => 'required|integer',
                        'otpDetail' => 'required',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $vehicle_id = intval(trim($post_data['evDetail']['vehicleId']));
            $vehicle_reg_no = trim($post_data['evDetail']['vehicleRegNumber']);
            $vehicle_vin = trim($post_data['evDetail']['vehicleVin']);
            $hub_id = intval(trim($post_data['batteryVendorHubId']));
            $ev_inventory = EvInventoryMaster::where(['registration_no' => $vehicle_reg_no, 'hub_id' => $hub_id, 'vechicle_id' => $vehicle_id, 'vehicle_vin' => $vehicle_vin,'is_active' => 1])->first();
            if ($ev_inventory) {
                $check_queue = QueueMaster::where(['ev_inventory_id' => $ev_inventory->ev_inventory_id,'is_active'=>1])->first();
                if ($check_queue) {
                    $data = [
                        'smarteSwappingId' => $post_data['smarteSwappingId'],
                        'hub_id' => $hub_id,
                        'start_otp' => $post_data['otpDetail']['otpToStartSwapping'],
                        'end_otp' => $post_data['otpDetail']['otpToEndSwapping'],
                        'vechicle_id' => $vehicle_id,
                        'vehicle_vin' => $vehicle_vin,
                        'registration_no' => $vehicle_reg_no,
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                    ];
                    QueueMaster::where('queue_master_id', $check_queue->queue_master_id)->update($data);
                    return $this->sendResponse('Queue data updated successfully!');
                } else {
                    $data = [
                        'smarteSwappingId' => $post_data['smarteSwappingId'],
                        'hub_id' => $hub_id,
                        'start_otp' => $post_data['otpDetail']['otpToStartSwapping'],
                        'end_otp' => $post_data['otpDetail']['otpToEndSwapping'],
                        'e_qr_code' => $ev_inventory->e_qr_code,
                        'ev_inventory_id' => $ev_inventory->ev_inventory_id,
                        'vechicle_id' => $vehicle_id,
                        'vehicle_vin' => $vehicle_vin,
                        'registration_no' => $vehicle_reg_no,
                        'created_by' => Auth::user()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                    ];
                    $queue_id = QueueMaster::insertGetId($data);
                    $data['queue_master_id'] = $queue_id;
                    DB::table('transaction_log')->insert($data);
                    return $this->sendResponse('Queue data added successfully!');
                }
            } else {
                return $this->sendError("Data not found in Ev Inventory.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }

}
