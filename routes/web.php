<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// User
Route::get('/{any?}', function () {
    return view('welcome');
});
Route::post('/login', [App\Http\Controllers\UserController::class,'login']);
Route::post('/checkLogin', [App\Http\Controllers\UserController::class,'checkLogin']);
Route::post('/addUser', [App\Http\Controllers\UserController::class,'create']);

// Post
Route::get('/p/{any?}', function () {
    return view('welcome');
})->where('any','^(?!api).*$');