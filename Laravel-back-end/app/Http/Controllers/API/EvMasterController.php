<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\EvMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class EvMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'vehicle_model' => 'required|max:100',
                        'battery_capacity' => 'required|max:100',
                        'vehicle_make' => 'required|max:100',
                        'vehicle_type' => 'required|max:100',
                        'fleet_owner_id' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            EvMaster::create($post_data);
            return $this->sendResponse('EV added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getEvById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'ev_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $ev = EvMaster::find($post_data['ev_master_id']);
            return $this->sendResponse('EV fetch successfully.',$ev);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'ev_master_id' => 'required|integer',        
                        'vehicle_model' => 'required|max:100',
                        'battery_capacity' => 'required|max:100',
                        'vehicle_make' => 'required|max:100',
                        'vehicle_type' => 'required|max:100',
                        'fleet_owner_id' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['ev_master_id'];
            EvMaster::find($id)->update($post_data);

            return $this->sendResponse('EV updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $ev_list = EvMaster::where(['ev_master.is_active'=>1])->select('ev_master.*','fleet_operator_master.name as fleet_operator_name')
                            ->leftJoin('fleet_operator_master', 'fleet_operator_master.fleet_operator_id', '=', 'ev_master.fleet_owner_id');
            if($request->has('search_param') && $request->input('search_param')){
                $ev_list = $ev_list->where(function($query) use ($request)
                                {
                                    $columns = ['ev_master.vehicle_model', 'ev_master.battery_capacity', 'ev_master.vehicle_make','ev_master.vehicle_type','fleet_operator_master.name','ev_master.remark_1','ev_master.remark_2'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $ev_list = $ev_list->orderBy('ev_master.ev_master_id','DESC')->paginate(10);
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function delete(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'ev_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            EvMaster::find($post_data['ev_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('EV deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getEv(Request $request) {
        try{
            $ev_list = EvMaster::where(['is_active'=>1])
                            ->select('ev_master_id','vehicle_model','battery_capacity','vehicle_make','vehicle_type')
                            ->orderBy('vehicle_model')->orderBy('vehicle_make')->get();
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
