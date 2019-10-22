<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function(){
    Route::namespace("Event")->prefix('event')->group(function(){
        Route::post('create', "EventController@createEvent");
        Route::get('latest', "EventController@latestEvent");
        Route::delete('all', "EventController@deleteAllEvents");
    });
});