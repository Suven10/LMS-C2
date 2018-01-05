<?php

include_once 'config.php';

class SubscriptionHandler{
	private $baseUrl;
	private $conType;
	private $headerArray;
	private $db=null;
	
	public function __construct() {
		$this->db=Database::getInstance();
		
	}
	
	public function addHeader($k, $v){
		array_push($this->headerArray, $k . ": " . $v);
	}
	
	public function getAllSubscriptions($skip, $take,$order)
	{
		$query="select * from subscription";
		$query=$query ." order by subscription.createdDate ".$order;
		return $this->db->queryWithLimit($query,$skip,$take);
	
	}
	
	public function getByProfileId($id)
	{
		$query="select * from subscription where guProfileId='".$id."'";
		$rawData=$this->db->query($query);
		if (isset ( $rawData )) {
			$resultObj=new stdClass();
			$resultData=array();
			foreach($rawData as $key=>$valueData){
				$resultObj=$valueData;
				$query = "select * from course where guCourseId ='" . $valueData["guCourseId"] . "'";
				$DetailData = $this->db->query ( $query );
				$resultObj["CourseDetails"]=$DetailData;
				$resultData["result"][$key]=$resultObj;
			}
			$resultData["error"]="00000";
		}
		return $resultData;
	
	}
	
	public function getById($id)
	{
		$query="select * from subscription where guEnrollId='".$id."'";
		return $this->db->query($query);
	
	}
	
	public function mapSubscriptionData($input){
		$subscription=new Subscription();
	
		$subscription->guEnrollId=GUID::getGUID();
		$subscription->guCourseId= $input["guCourseId"];
		$subscription->guProfileId=$input["guProfileId"];
		$subscription->subscribedDate=date("Y-m-d H:i:s");
		$subscription->coveredModules=$input["moduleCount"];
		$subscription->desc=$input["desc"];
		$subscription->createdDate=date("Y-m-d H:i:s");
		
		return $subscription;
	}
	
	public function insertSubscriptionData($subData)
	{
		return $query ="INSERT INTO subscription
						(guEnrollId,guCourseId,guProfileId,subscribedDate,coveredModules,description,createdDate)
						VALUES
						(
						'".$subData->guEnrollId."',
						'".$subData->guCourseId."',
						'".$subData->guProfileId."',
						'".$subData->subscribedDate."',
						'".$subData->coveredModules."',
						'".$subData->desc."',
						'".$subData->createdDate."')";
	
		 
	}
	
	public function insertSubscription($input) {
		$subData=$this->mapSubscriptionData($input);
		$query = $this->insertSubscriptionData($subData);
		$this->db->beginTransaction();
		try {
			$rawData = $this->db->insert ( $query );
			$rawData->guEnrollId=$subData->guEnrollId;
			$rawData->message="Course has been enrolled successfully.";
			$input["guEnrollId"]=$rawData->guEnrollId;
			$this->db->commit();
			return $rawData;
	
		} catch (Exception $e) {
			$this->db->rollback();
			return array("status"=>false,"error"=>"00001","message"=>"Course enrollment has been failed.");
	
		}
	}
	
	public function updateModulesCovered($input) {
		$query = "update subscription
				  set coveredModules=coveredModules+1
				  where guEnrollId ='" . $input["guEnrollId"]."'" ;
		$rawData = $this->db->update( $query );
		$rawData->message="Course has been enrolled successfully.";
		return $rawData;
	}
}
?>