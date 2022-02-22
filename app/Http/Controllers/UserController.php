<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller {

    public static function checkLogin(Request $request) {
        if($request->session()->get('user_id') && !empty($request->session()->get('user_id'))) {
            return true;
        } else {
            return false;
        }
    }

    public function login(Request $request) {
        if(!UserController::checkLogin($request)) {
            $user = User::where('email','=',$request->email)->where('password','=',$request->password)->first();
            if($user) {
                $request->session()->put('user_email', $user->email);
                $request->session()->put('user_id', $user->id);
                return ["data" => "true"];
            } else {
                return ["data" => "false"];
            } 
        }
    }

    public function logout(Request $request) {
        $request->session()->flush();
        return redirect('/');
    }

    public function create(Request $request) {
        if(!UserController::checkLogin($request)) {
            if(User::where('email','=',$request->email)->where('password','=',$request->password)->first()) {
                return ["data" => "false"];
            } else {
                $user = new User();
                $user->email = $request->email;
                $user->password = $request->password;
                $user->save();
                $request->session()->put('user_email', $user->user_email);
                $request->session()->put('user_id', $user->id);
                return ["data" => "true"];
            } 
        }
    }

    
    
}
