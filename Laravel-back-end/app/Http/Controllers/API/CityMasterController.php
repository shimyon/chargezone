<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\CityMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class CityMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'state_id' => 'required|integer',
                        'city_name' => 'required|max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            CityMaster::create($post_data);
            return $this->sendResponse('City added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getCityById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'city_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $city = CityMaster::where('city_master.id',$post_data['city_master_id'])->select('city_master.*','state_master.country_id')
                        ->join('state_master', 'state_master.id', '=', 'city_master.state_id')->first();
            return $this->sendResponse('city fetch successfully.',$city);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'city_master_id' => 'required|integer',     
                        'state_id' => 'required|integer',   
                        'city_name' => 'required|max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['city_master_id'];
            CityMaster::find($id)->update($post_data);

            return $this->sendResponse('City updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $city_list = CityMaster::where(['city_master.is_active'=>1])->select('city_master.*','state_name','country_name')
                            ->join('state_master', 'state_master.id', '=', 'city_master.state_id')
                            ->join('country_master', 'state_master.country_id', '=', 'country_master.id');
            if($request->has('search_param') && $request->input('search_param')){
                $city_list = $city_list->where(function($query) use ($request){
                                $columns = ['city_name','state_name','country_name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $city_list = $city_list->orderBy('city_master.id','DESC')->paginate(10);
            if(count($city_list) > 0){
                return $this->sendResponse('City list fetch successfully.',$city_list);
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
                'city_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            CityMaster::find($post_data['city_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('City deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function getCityByState(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'state_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $city_list = CityMaster::where(['is_active'=>1,'state_id'=>$post_data['state_id']])->select('id','city_name')->orderBy('city_name')->get();
            if(count($city_list) > 0){
                return $this->sendResponse('City list fetch successfully.',$city_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
