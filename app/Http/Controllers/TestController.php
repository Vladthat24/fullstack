<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{

    public function controllerMethod()
    {
        return response()->json([
            'msg' => 'Esto es una prueba de tramite'
        ]);
    }
    public function test()
    {
        return response()->json([
            'msg' => 'some error ocured'
        ], 422);
    }
}
