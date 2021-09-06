<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\CountryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class CountryMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'country_name' => 'required|max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            CountryMaster::create($post_data);
            return $this->sendResponse('Country added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getCountryById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'country_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $country = CountryMaster::find($post_data['country_master_id']);
            return $this->sendResponse('country fetch successfully.',$country);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'country_master_id' => 'required|integer',        
                        'country_name' => 'required|max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['country_master_id'];
            CountryMaster::find($id)->update($post_data);

            return $this->sendResponse('Country updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $country_list = CountryMaster::where(['is_active'=>1]);
            if($request->has('search_param') && $request->input('search_param')){
                $country_list = $country_list->where(function($query) use ($request){
                                $columns = ['country_name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $country_list = $country_list->orderBy('id','DESC')->paginate(10);
            if(count($country_list) > 0){
                return $this->sendResponse('Country list fetch successfully.',$country_list);
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
                'country_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            CountryMaster::find($post_data['country_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Country deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function getCountries(Request $request) {
        try{
            $country_list = CountryMaster::where(['is_active'=>1])->select('id','country_name')->orderBy('country_name')->get();
            if(count($country_list) > 0){
                return $this->sendResponse('Country list fetch successfully.',$country_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
