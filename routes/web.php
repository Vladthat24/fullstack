<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::post('app/create_tag', [AdminController::class, 'addTag']);
Route::get('app/get_tags', [AdminController::class, 'getTag']);
Route::post('app/edit_tag', [AdminController::class, 'editTag']);
Route::post('app/delete_tag', [AdminController::class, 'deleteTag']);

Route::get('new', [TestController::class, 'controllerMethod']);

Route::post('app/upload', [AdminController::class, 'upload']);
Route::post('app/delete_image', [AdminController::class, 'deleteImage']);
Route::post('app/create_category', [AdminController::class, 'addCategory']);
Route::get('app/get_category', [AdminController::class, 'getCategory']);
Route::post('app/edit_category', [AdminController::class, 'editCategory']);
Route::post('app/delete_category', [AdminController::class, 'deleteCategory']);
Route::any('{slug}', function () {
    return view('welcome');
});