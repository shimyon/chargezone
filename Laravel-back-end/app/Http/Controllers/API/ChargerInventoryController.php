<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ChargerInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ChargerInventoryController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'charger_master_id' => 'required|integer',
                        'hub_id' => 'required|integer', 
                        'charger_id' => 'required|max:50',  
                        'qr_code' => 'required|max:50',       
                        'no_of_slot' => 'required|integer',
                        'own_by' => 'required|integer',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
                        'slots_data' => 'required',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $slots_data = $post_data['slots_data'];
            if(is_array($slots_data) && count($slots_data)){
                $post_data['created_by'] = Auth::user()->id;
                $charger_inventory_id = ChargerInventoryMaster::create($post_data)->id;

                $charger_slot_data = [];
                foreach($slots_data as $data){
                    $charger_slot_data[] = ['charger_inventory_id' => $charger_inventory_id,'charger_id' => $post_data['charger_id'],'slot_id' => $data['slot_id'],'hub_id'=>$post_data['hub_id']];
                }
                DB::table('charger_slot')->insert($charger_slot_data);
                return $this->sendResponse('Charger added successfully in inventory.');
            }else{
                return $this->sendError("Please add valid slot data.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getChargerById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'charger_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $id = $post_data['charger_inventory_id'];            
            $charger = ChargerInventoryMaster::find($id);
            if($charger){
                $charger->slots = DB::table('charger_slot')->where(['charger_inventory_id' => $id,'is_active' => 1])->get();
                return $this->sendResponse('Charger detail fetch successfully.',$charger);
            }else{
                return $this->sendError("Data not found");
            }
            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                    'charger_inventory_id' => 'required|integer',
                    'hub_id' => 'required|integer', 
                    'charger_master_id' => 'required|integer', 
                    'charger_id' => 'required|max:50',  
                    'qr_code' => 'required|max:50',       
                    'no_of_slot' => 'required|integer',
                    'own_by' => 'required|integer',
                    'remark_1' => 'max:100',
                    'remark_2' => 'max:100',
                    'slots_data' => 'required'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $slots_data = $post_data['slots_data'];
            if(is_array($slots_data) && count($slots_data)){
                $id = $post_data['charger_inventory_id'];
                ChargerInventoryMaster::find($id)->update($post_data);

                DB::table('charger_slot')->where('charger_inventory_id',$id)->delete();
                $charger_slot_data = [];
                foreach($slots_data as $data){
                    $charger_slot_data[] = ['charger_inventory_id' => $id,'charger_id' => $post_data['charger_id'],'slot_id' => $data['slot_id'],'hub_id'=>$post_data['hub_id']];
                }
                DB::table('charger_slot')->insert($charger_slot_data);
                return $this->sendResponse('Charger updated successfully.');
            }else{
                return $this->sendError("Please add valid slot data.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $charger_list = ChargerInventoryMaster::where(['charger_inventory.is_active'=>1])
                                ->select('charger_inventory.*','charger_master.make','charger_master.model','charger_master.dimension','hub_master.name as station_name','owner_master.name as owner_name')
                                ->join('charger_master', 'charger_inventory.charger_master_id', '=', 'charger_master.id')
                                ->leftJoin('hub_master', 'hub_master.hub_master_id', '=', 'charger_inventory.hub_id')
                                ->leftJoin('owner_master', 'owner_master.owner_master_id', '=', 'charger_inventory.own_by');
            if($request->has('search_param') && $request->input('search_param')){
                $charger_list = $charger_list->where(function($query) use ($request)
                                {
                                    $columns = ['charger_master.make', 'charger_master.model', 'charger_master.dimension','hub_master.name','owner_master.name','charger_inventory.charger_id','charger_inventory.qr_code','charger_inventory.no_of_slot','charger_inventory.remark_1','charger_inventory.remark_2'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $charger_list = $charger_list->orderBy('charger_inventory.id','DESC')->paginate(10);

            if(count($charger_list) > 0){
                return $this->sendResponse('charger fetch successfully.',$charger_list);
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
                'charger_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            ChargerInventoryMaster::find($post_data['charger_inventory_id'])->update(['is_active'=>0]);
            DB::table('charger_slot')->where('charger_inventory_id',$post_data['charger_inventory_id'])->update(['is_active' => 0]);
            return $this->sendResponse('Charger deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
