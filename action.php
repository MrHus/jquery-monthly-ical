<?php 

$_GET['date']; 

//imagine a complex calculation here

$dates = array('dates' => array(
							array('date' => '2009-03-21', 'title' => 'My birthday', 'desc' => 'I changed'),
							array('date' => 'yyyy-mm-02', 'title' => 'Second', 'desc' => 'Second day of the month'),
							array('date' => '2009-04-01', 'title' => 'April fools', 'desc' => "Don't forget to bring a towl")
							)
			  );
			
echo json_encode($dates); 

?>