<?php
namespace App\Helpers;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class SmarteHelper{

    public static function getAuthToken() {
        $crendentials = DB::table('smarte_credentials')->select('username', 'password', 'token')->where('log_id', 1)->first();
        $username = ($crendentials) ? $crendentials->username : "chargezone";
        $password = ($crendentials) ? $crendentials->password : "chargezone$&$901";
        $response = Http::withHeaders([
                    'user' => $username,
                    'password' => $password
                ])->get('http://juiceapi.getsmarte.in/aggregatorApi/api/v1/getAuthToken');
        if ($response) {
            DB::table('smarte_credentials')->where('log_id', 1)->update(['token' => $response['authToken']]);
        }        
    }
}
