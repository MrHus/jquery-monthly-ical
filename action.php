<?php 

$_GET['date']; 

//imagine a complex calculation here

$dates = array('dates' => array(
							'2009-03-21' => array('title' => 'My birthday', 'desc' => 'I changed'),
							'yyyy-mm-02' => array('title' => 'Second', 'desc' => 'Second day of the month'),
							'2009-04-01' => array('title' => 'April fools', 'desc' => "Don't forget to bring a towl")
							)
			  
			  );
			
echo json_encode($dates); 

?>