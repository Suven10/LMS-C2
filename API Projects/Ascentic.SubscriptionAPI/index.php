<?php
include_once 'config.php';

Flight::route('/', function(){
	define ( 'VERSION', "6.1.0.1" );
	define ( 'AUTHOR', "N.Suvethan" );
	define ( 'MODIFIED', "2017-12-28" );
	define ( 'DESCRIPTION', "Subscription API" );

	echo nl2br ( "Author - " . AUTHOR . "\n" );
	echo nl2br ( "Version - " . VERSION . "\n" );
	echo nl2br ( "Company - Ascentic" . "\n" );
	echo nl2br ( "Last modified Date - " . MODIFIED . "\n" );
	echo nl2br ( "Description - " . DESCRIPTION );
});

Flight::route('GET /subscriptions', function () {
	$skip = $_GET["skip"];
	$take = $_GET["take"];
	$order = $_GET["order"];
	$subscriptionHandler=new SubscriptionHandler();
	$data=$subscriptionHandler->getAllSubscriptions($skip,$take,$order);
	Flight::json($data);
});

Flight::route('POST /subscription', function () {
	$data = Flight::request()->data;
	$subscriptionHandler=new SubscriptionHandler();
	$data=$subscriptionHandler->insertSubscription($data);
	Flight::json($data);
});

Flight::route('GET /subscription/profile/@id', function ($id) {
	$subscriptionHandler=new SubscriptionHandler();
	$data=$subscriptionHandler->getByProfileId($id);
	Flight::json($data);
});

Flight::route('GET /subscription/@id', function ($id) {
	$subscriptionHandler=new SubscriptionHandler();
	$data=$subscriptionHandler->getById($id);
	Flight::json($data);
});

Flight::route('POST /updateSubs', function () {
	$data = Flight::request()->data;
	$subscriptionHandler=new SubscriptionHandler();
	$data=$subscriptionHandler->updateModulesCovered($data);
	Flight::json($data);
});

Flight::route('OPTIONS /*', function() {
	Flight::json('Security check has been passed');
});

Flight::start();
?>