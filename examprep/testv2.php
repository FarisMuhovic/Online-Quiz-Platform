<?php
require 'vendor/autoload.php';

// Path Parameter
Flight::route('/user/@id', function($id){
    echo "User ID: " . $id . "<br>";
});

// Query Parameter
Flight::route('/search', function(){
    $request = Flight::request();
    $query = isset($request->query['q']) ? $request->query['q'] : 'none';
    echo "Search Query: " . $query . "<br>";
});

// Body Parameter
Flight::route('POST /user', function(){
    $request = Flight::request();
    $name = isset($request->data->name) ? $request->data->name : 'unknown';
    $email = isset($request->data->email) ? $request->data->email : 'unknown';
    echo "Name: " . $name . ", Email: " . $email . "<br>";
});

// Mixed Parameters
Flight::route('/user/@id', function($id){
    $request = Flight::request();
    $action = isset($request->query['action']) ? $request->query['action'] : 'none';
    $name = isset($request->data->name) ? $request->data->name : 'unknown';
    echo "User ID: " . $id . ", Action: " . $action . ", Name: " . $name . "<br>";
});

// Handling Headers
Flight::route('/headers', function(){
    $request = Flight::request();
    $userAgent = isset($request->headers['User-Agent']) ? $request->headers['User-Agent'] : 'unknown';
    echo "User-Agent: " . $userAgent . "<br>";
});

Flight::start();
