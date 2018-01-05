<?php
include_once 'config.php';

Flight::route('/', function(){
	define ( 'VERSION', "6.1.0.1" );
	define ( 'AUTHOR', "N.Suvethan" );
	define ( 'MODIFIED', "2017-12-28" );
	define ( 'DESCRIPTION', "Profile API" );

	echo nl2br ( "Author - " . AUTHOR . "\n" );
	echo nl2br ( "Version - " . VERSION . "\n" );
	echo nl2br ( "Company - Ascentic" . "\n" );
	echo nl2br ( "Last modified Date - " . MODIFIED . "\n" );
	echo nl2br ( "Description - " . DESCRIPTION );
});

Flight::route('GET /profiles', function () {
    $skip = $_GET["skip"];
	$take = $_GET["take"];
	$order = $_GET["order"];
	$profileHandler=new ProfileHandler();
	$data=$profileHandler->getAllProfiles($skip,$take,$order);
	Flight::json($data);
});

Flight::route('POST /profile', function () {
    $data = Flight::request()->data;
//     var_dump($data);exit();
	$profileHandler=new ProfileHandler();
	$data=$profileHandler->insertProfile($data);
	Flight::json($data);
});



Flight::route('GET /profile/@id', function ($id) {
	$profileHandler=new ProfileHandler();
	$data=$profileHandler->getById($id);
	Flight::json($data);
});

Flight::route('OPTIONS /*', function() {
	Flight::json('Security check has been passed');
});

Flight::start();
?>