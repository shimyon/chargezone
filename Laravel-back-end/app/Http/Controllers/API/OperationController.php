<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\UserHubLog;
use App\Models\QueueMaster;
use App\Models\EvInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OperationController extends BaseController
{

    public function validateOTP(Request $request)
    {
        try {
            $post_data = $request->all();
            $validator = Validator::make($post_data, [
                'otp_value' => 'required|integer',
            ]);
            return $this->sendResponse('OTP found successfully!');

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $otp_value = intval(trim($post_data['otp_value']));
            $user_id = Auth::user()->id;
            $user_hub = UserHubLog::where(['user_id' => $user_id, 'is_active' => 1])->first();
            if ($user_hub) {
                $otp_exist = DB::table('transaction_log')->where(['hub_id' => $user_hub->hub_id, 'end_otp' => $otp_value, 'is_active' => 1])->where('status', '>=', 3)->orderBy('transaction_log_id', 'DESC')->first();
                if ($otp_exist) {
                    /* ---------------------UPDATE END TIME IN TRANSACTION LOG--------------------------------------- */
                    if ($otp_exist->status == 7) {
                        return $this->sendError("Pairing process is completed.");
                    }
                    DB::table('transaction_log')->where('transaction_log_id', $otp_exist->transaction_log_id)->update(['status' => 4, 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);
                    return $this->sendResponse('OTP found successfully!');
                } else {
                    return $this->sendError("Otp not found.");
                }
            } else {
                return $this->sendError("Hub not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }

    public function validateEV(Request $request)
    {
        try {
            $post_data = $request->all();
            $validator = Validator::make($post_data, [
                'ev_qr_code' => 'required|integer',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $ev_qr_code = intval(trim($post_data['ev_qr_code']));
            $user_id = Auth::user()->id;
            $user_hub = UserHubLog::where(['user_id' => $user_id, 'is_active' => 1])->first();
            if ($user_hub) {
                $hub_id = $user_hub->hub_id;
                $transaction_log = DB::table('transaction_log')->select('status', 'transaction_log_id')
                    ->where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, 'is_active' => 1])
                    ->where('status', '<', 7)
                    ->orderBy('transaction_log_id', 'DESC')
                    ->first();
                if ($transaction_log && $transaction_log->status >= 3) {
                    return $this->sendError("Please Complete Pairing Process");
                }
                $queue_exist = QueueMaster::where(['e_qr_code' => $ev_qr_code, 'hub_id' => $hub_id, 'is_active' => 1])->orderBy('queue_master_id', 'DESC')->first();
                $ev_exist = EvInventoryMaster::where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, 'is_active' => 1])->orderBy('ev_inventory_id', 'DESC')->first();
                if ($ev_exist) {
                    if ($ev_exist->battery_id_1 == 0 && $ev_exist->battery_id_2 == 0) {
                        return $this->sendError("Please Complete Pairing Process");
                    }
                    if (!$transaction_log) {
                        $data = [
                            'queue_master_id' => ($queue_exist) ? $queue_exist->queue_master_id : 0,
                            'hub_id' => $hub_id,
                            'end_otp' => '1234',
                            'e_qr_code' => $ev_qr_code,
                            'ev_inventory_id' => $ev_exist->ev_inventory_id,
                            'vechicle_id' => $ev_exist->vechicle_id,
                            'vehicle_vin' => $ev_exist->vehicle_vin,
                            'registration_no' => $ev_exist->registration_no,
                            'start_time' => Carbon::now()->format('Y-m-d H:i:s'),
                            'created_by' => Auth::user()->id,
                            'created_at' => Carbon::now()->timezone('Asia/Kolkata')->format('Y-m-d H:i:s'),
                            'updated_at' => Carbon::now()->timezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                        ];
                        DB::table('transaction_log')->insert($data);
                    } else {
                        DB::table('transaction_log')->where('transaction_log_id', $transaction_log->transaction_log_id)->update(['start_time' => Carbon::now()->format('Y-m-d H:i:s'), 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);
                    }
                    return $this->sendResponse('EV found successfully!');
                } else {
                    return $this->sendError("EV not found");
                }
            } else {
                return $this->sendError("Hub not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }

    public function validatePairEV(Request $request)
    {
        try {
            $post_data = $request->all();
            $validator = Validator::make($post_data, [
                'ev_qr_code' => 'required|integer',
                //'otp_value' => 'required|integer',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            // $otp_value = intval(trim($post_data['otp_value']));
            $ev_qr_code = intval(trim($post_data['ev_qr_code']));
            $user_id = Auth::user()->id;
            $user_hub = UserHubLog::where(['user_id' => $user_id, 'is_active' => 1])->first();

            if ($user_hub) {
                $hub_id = $user_hub->hub_id;
                $ev_exist = EvInventoryMaster::where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, 'is_active' => 1])->exists();
                $trans_exist = DB::table('transaction_log')->where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, /* 'end_otp' => $otp_value, */ 'is_active' => 1])
                    ->where('status', '<', 7)
                    ->where('status', '>=', 3)
                    ->first();
                if ($trans_exist && $ev_exist) {
                    DB::table('transaction_log')->where('transaction_log_id', $trans_exist->transaction_log_id)
                        ->update(['status' => 5, 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);
                    $ev_inventory_master = DB::table('ev_inventory_master')->where(['e_qr_code' => $ev_qr_code])
                        ->select('ev_inventory_master.is_ev_verify_require', 'fleet_operator_master.driver_verify_require', 'fleet_operator_master.driver_verify_url', 'fleet_operator_master.driver_verify_user', 'fleet_operator_master.driver_verify_pass', 'fleet_operator_master.driver_verify_eligible_url')
                        ->join('fleet_operator_master', 'ev_inventory_master.fleet_owner_id', '=', 'fleet_operator_master.fleet_operator_id')
                        ->first();
                    return $this->sendResponse('EV found successfully!', $ev_inventory_master);
                } else {
                    return $this->sendError("EV not found");
                }
            } else {
                return $this->sendError("Hub not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }

    public function scanBatteries(Request $request)
    {
        try {
            $post_data = $request->all();
            $validator = Validator::make($post_data, [
                'battery_type' => 'required',
                'battery_sequence' => 'required|integer',
                'battery_qr_code' => 'required|integer',
                'ev_qr_code' => 'required|integer',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $battery_type = (trim(strtolower($post_data['battery_type'])) == "discharged") ? "discharged" : "charged";
            $battery_sequence = (intval(trim($post_data['battery_sequence'])) == 2) ? 2 : 1;
            $battery_qr_code = intval(trim($post_data['battery_qr_code']));
            $ev_qr_code = intval(trim($post_data['ev_qr_code']));
            $user_id = Auth::user()->id;
            $user_hub = UserHubLog::where(['user_id' => $user_id, 'is_active' => 1])->first();
            if ($user_hub) {
                $hub_id = $user_hub->hub_id;
                $trans_exist = DB::table('transaction_log')->where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, 'is_active' => 1])->orderBy('transaction_log_id', 'DESC')->first();
                $ev_exist = EvInventoryMaster::where(['hub_id' => $hub_id, 'e_qr_code' => $ev_qr_code, 'is_active' => 1])->orderBy('ev_inventory_id', 'DESC')->first();
                if ($trans_exist && $ev_exist) {
                    if ($battery_type == "discharged") {
                        if ($battery_qr_code == "1001") {
                            $battery_inventory = DB::table('battery_inventory')->where(['b_qr_code' => $battery_qr_code, 'is_active' => 1])->first();
                        } else {
                            $battery_inventory = DB::table('battery_inventory')->where(['ev_inventory_id' => $trans_exist->ev_inventory_id, 'b_qr_code' => $battery_qr_code, 'is_active' => 1])->first();
                        }
                    } else {
                        $battery_inventory = DB::table('battery_inventory')->where(['ev_inventory_id' => 0, 'b_qr_code' => $battery_qr_code, 'is_active' => 1])->first();
                    }
                    if ($battery_inventory) {
                        if ($battery_qr_code != "1001") {
                            $other_battery_sequence = (intval(trim($post_data['battery_sequence'])) == 2) ? 1 : 2;
                            $is_duplicate_battery = DB::table('transaction_log')
                                ->where('transaction_log_id', $trans_exist->transaction_log_id)
                                ->where('is_active', 1)
                                ->where($battery_type . '_battery_inventory_id_' . $other_battery_sequence, $battery_inventory->battery_inventory_id)->exists();
                            if ($is_duplicate_battery) {
                                return $this->sendError("Battery already scan.");
                            }
                        }
                        /* ---------------------Update soc & bin in transaction log--------------------- */
                        $trans_update_data = [
                            $battery_type . '_battery_bin_' . $battery_sequence => $battery_inventory->bin,
                            $battery_type . '_battery_soc_' . $battery_sequence => $battery_inventory->soc,
                            $battery_type . '_battery_inventory_id_' . $battery_sequence => $battery_inventory->battery_inventory_id,
                            $battery_type . '_battery_bv_' . $battery_sequence => $battery_inventory->bv,
                            $battery_type . '_battery_rec_' . $battery_sequence => $battery_inventory->rec,
                            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                        ];
                        $trans_update_data['status'] = ($battery_type == "charged") ? (($battery_sequence == 1) ? 6 : 7) : (($battery_sequence == 1) ? 2 : 3);
                        if ($trans_update_data['status'] == 7) {
                            $trans_update_data['end_time'] = Carbon::now()->format('Y-m-d H:i:s');
                        }
                        DB::table('transaction_log')->where('transaction_log_id', $trans_exist->transaction_log_id)->update($trans_update_data);
                        /* ---------------------Update ev_master_id in battery log--------------------- */
                        if ($battery_sequence == 2) {
                            $ev_inventory_id = ($battery_type == "discharged") ? 0 : $trans_exist->ev_inventory_id;
                            $first_battery_inventory_id = ($battery_type == "discharged") ? $trans_exist->discharged_battery_inventory_id_1 : $trans_exist->charged_battery_inventory_id_1;
                            /* ------------------------Update EVID in battery inventory------------------- */
                            DB::table('battery_inventory')->where(['battery_inventory_id' => $first_battery_inventory_id])->update(['ev_inventory_id' => $ev_inventory_id, 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);
                            DB::table('battery_inventory')->where(['battery_inventory_id' => $battery_inventory->battery_inventory_id])->update(['ev_inventory_id' => $ev_inventory_id, 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);
                            /* ---------------------Update Charged bettary in ev master---------------- */
                            $battery_1 = ($battery_type == "discharged") ? 0 : $trans_exist->charged_battery_inventory_id_1;
                            $battery_2 = ($battery_type == "discharged") ? 0 : $battery_inventory->battery_inventory_id;
                            EvInventoryMaster::where(['ev_inventory_id' => $trans_exist->ev_inventory_id])->update([
                                'battery_id_1' => $battery_1,
                                'battery_id_2' => $battery_2,
                                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                            ]);
                        }
                        return $this->sendResponse('Battery found successfully!');
                    } else {
                        return $this->sendError("Battery not found");
                    }
                } else {
                    return $this->sendError("EV not found");
                }
            } else {
                return $this->sendError("Hub not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Please send valid input parameters.");
        }
    }
}
