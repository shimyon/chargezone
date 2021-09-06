<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class RegisterController extends BaseController {

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
                    'name' => 'required',
                    'email' => 'required|email',
                    'username' => 'required',
                    'password' => 'required',
                    'role' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $user->assignRole($input['role']);
        $data['token'] = $user->createToken('MyApp')->accessToken;
        return $this->sendResponse('User register successfully.', $data);
    }

    public function login(Request $request) {
         $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
        $username = isset($post_data['username']) ? $post_data['username'] : "";
        $password = isset($post_data['password']) ? $post_data['password'] : "";
        return Auth::attempt(['username' => $username, 'password' => $password]);
        if (Auth::attempt(['username' => $username, 'password' => $password])) {
            $user = Auth::user();
            if($user->is_active==1 && $user->hasRole(['Admin', 'Operator', 'Manager'])){
                $data['token'] = $user->createToken('charge_zone_app')->accessToken;
                $data['user_detail'] = ['id' => $user->id, 'name' => $user->name, 'username' => $user->username, 'email' => $user->email];
                $data['user_detail']['roles'] = $user->roles()->pluck('id');
                return $this->sendResponse('User login successfully.', $data);
            }else{
                return $this->sendError('User not found.');
            }
        } else {
            return $this->sendError('Invalid username or password.');
        }
    }

    public function logout(Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        return $this->sendResponse('You have been successfully logged out!');
    }

}
