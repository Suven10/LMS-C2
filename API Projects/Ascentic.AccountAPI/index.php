<?php
include_once 'config.php';

Flight::route('/', function(){
	define ( 'VERSION', "6.1.0.1" );
	define ( 'AUTHOR', "N.Suvethan" );
	define ( 'MODIFIED', "2017-12-28" );
	define ( 'DESCRIPTION', "Account API" );

	echo nl2br ( "Author - " . AUTHOR . "\n" );
	echo nl2br ( "Version - " . VERSION . "\n" );
	echo nl2br ( "Company - Ascentic" . "\n" );
	echo nl2br ( "Last modified Date - " . MODIFIED . "\n" );
	echo nl2br ( "Description - " . DESCRIPTION );
});

Flight::route('GET /accounts', function () {
    $skip = $_GET["skip"];
	$take = $_GET["take"];
	$order = $_GET["order"];
	$accountHandler=new AccountHandler();
	$data=$accountHandler->getAllAccounts($skip,$take,$order);
	Flight::json($data);
});

Flight::route('POST /account', function () {
    $data = Flight::request()->data;
	$accountHandler=new AccountHandler();
	$data=$accountHandler->insertAccount($data);
	Flight::json($data);
});

Flight::route('GET /account/@id', function ($id) {
	$accountHandler=new AccountHandler();
	$data=$accountHandler->getById($id);
	Flight::json($data);
});

Flight::route('POST /authenticate', function () {
	$data = Flight::request()->data;
	$accountHandler=new AccountHandler();
	$data=$accountHandler->validateUser($data);
	Flight::json($data);
});

Flight::route('OPTIONS /*', function() {
	Flight::json('Security check has been passed');
});
Flight::start();
?>