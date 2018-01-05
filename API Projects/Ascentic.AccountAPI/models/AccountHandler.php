<?php

include_once 'config.php';

class AccountHandler{
	private $db=null;
	
	public function __construct() {
		$this->db=Database::getInstance();
		
	}
	
	public function getAllAccounts($skip, $take,$order)
	{
		$query="select * from account";
		$query=$query ." order by account.createdDate ".$order;
		return $this->db->queryWithLimit($query,$skip,$take);
	
	}
	
	public function getById($id)
	{
		$query="select * from account where guAccountId='".$id."'";
		return $this->db->query($query);
	
	}
	
	public function mapAccountData($input){
	
	
		$account=new Account();
	
		$account->guAccountId=GUID::getGUID();
		$account->guProfileId=$input["guProfileId"];
		$account->username=strtolower($input["username"]);
		$account->password=$input["password"];
		$account->createdDate=date("Y-m-d H:i:s");
		
		return $account;
	}
	
	public function insertAccountData($accountData)
	{
		return $query ="INSERT INTO account
						(guProfileId,guAccountId,username,password,createdDate)
						VALUES
						(
						'".$accountData->guProfileId."',
						'".$accountData->guAccountId."',
						'".$accountData->username."',
						HASHBYTES('SHA2_512','".$accountData->password.$accountData->guProfileId."'),
						'".$accountData->createdDate."')";
	
		 
	}
	
	public function insertAccount($input) {
		$accountData=$this->mapAccountData($input);
		$query = $this->insertAccountData($accountData);
		$this->db->beginTransaction();
		try {
			$rawData = $this->db->insert ( $query );
			$rawData->guAccountId=$accountData->guAccountId;
			$rawData->message="Account inserted successfully.";
			$rawData->status=true;
			$this->db->commit();
			return $rawData;
	
		} catch (Exception $e) {
			$this->db->rollback();
			$resultData=array("status"=>false,"error"=>"00001","message"=>"Account creation has been failed.");
			return $resultData;
	
		}
	}
	
	public function validateUser($input) {
		try {
			$userName=strtolower($input["username"]);
			$query="select * from account where username='".$userName."'";
			$rawData=$this->db->query($query);
			$validateQuery="select guAccountId as 'id' from account where username='".$userName."' and password=HASHBYTES('SHA2_512','".$input["password"].$rawData[0]["guProfileId"]."')";
			$validatedData=$this->db->query($validateQuery);
			if(empty($validatedData))
			{
				$resultData=array("status"=>false,"error"=>"00001","message"=>"Authentication has been failed.");
			}
			else 
			{
				if (isset ( $rawData )) {
				
					$query = "select * from profile where guProfileId ='" . $rawData[0]["guProfileId"] . "'";
					$DetailData = $this->db->query ( $query );
				
					$rawData [0] ["ProfileDetails"] = $DetailData;
				}
				$resultData=array("status"=>true,"profile"=>$rawData[0]["ProfileDetails"],"error"=>"00000","message"=>"Authentication has been successful.");
			}
			return $resultData;
	
		} catch (Exception $e) {
			return $resultData=array("status"=>false,"error"=>"00001","message"=>"Authentication has been failed.");
	
		}
	}
}
?>