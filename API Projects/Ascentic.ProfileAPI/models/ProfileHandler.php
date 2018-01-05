<?php

include_once 'config.php';

class ProfileHandler{
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
	
	public function getAllProfiles($skip, $take,$order)
	{
		$query="select * from profile";
		$query=$query ." order by profile.createdDate ".$order;
		return $this->db->queryWithLimit($query,$skip,$take);
	
	}
	
	public function getById($id)
	{
		$query="select * from profile where guProfileId='".$id."'";
		return $this->db->query($query);
	
	}
	
	public function mapProfileData($input){
	
	
		$profile=new Profile();
	
		$profile->guProfileId=GUID::getGUID();
		$profile->gender= $input["gender"];
		$profile->firstName=$input["firstName"];
		$profile->lastName=$input["lastName"];
		$profile->createdDate=date("Y-m-d H:i:s");
		$profile->email=$input["email"];
		$profile->status=1;
		$profile->phone=$input["phone"];
		$profile->dob=$input["dob"];
		$profile->ssn=$input["ssn"];
		$profile->address=$input["address"];
		$profile->isInstructor=$input["isInstructor"];
		$profile->isStudent=$input["isStudent"];
		
		return $profile;
	}
	
	public function insertProfileData($profileData)
	{
		return $query ="INSERT INTO profile
						(gender,firstName,lastName,email,status,phone,dob,createdDate,guProfileId,ssn,address,isStudent,isInstructor)
						VALUES
						(
						'".$profileData->gender."',
						'".$profileData->firstName."',
						'".$profileData->lastName."',
						'".$profileData->email."',
						'".$profileData->status."',
						'".$profileData->phone."',
						'".$profileData->dob."',
						'".$profileData->createdDate."',
						'".$profileData->guProfileId."',
						'".$profileData->ssn."',
						'".$profileData->address."',
						'".$profileData->isStudent."',
						'".$profileData->isInstructor."')";
	
		 
	}
	
	public function insertProfile($input) {
		$profileData=$this->mapProfileData($input);
		$query = $this->insertProfileData($profileData);
		$this->db->beginTransaction();
		try {
			$rawData = $this->db->insert ( $query );
			$rawData->guProfileId=$profileData->guProfileId;
			$rawData->message="Profile inserted successfully.";
			$input["guProfileId"]=$rawData->guProfileId;
			$input["status"]=true;
			$accountData=$this->_mapAccountData($input);
			$this->_insertAccount($accountData);
			$this->db->commit();
			return $rawData;
	
		} catch (Exception $e) {
			$this->db->rollback();
			$resultData=array("status"=>false,"error"=>"00001","message"=>"Sign up has been failed.");
			return $resultData;
	
		}
	}
	
	private function _mapAccountData($input){
		
		$account=new stdClass();
		$account->guAccountId=GUID::getGUID();
		$account->guProfileId=$input["guProfileId"];
		$account->username=$input["username"];
		$account->password=$input["password"];
		$account->createdDate=date("Y-m-d H:i:s");
	
		return $account;
	}
	
	private function _insertAccount($jsondata)
	{
		$jsonstring=json_encode($jsondata);
		$req=new HttpRequestHelper();
		$this->headerArray=array();
		$url=ACCOUNTREG_URL;
		$this->addHeader('Content-Type','application/json');
		return $req->Post($jsonstring,$url, $this->headerArray);
	}
}
?>