<?php
//connecting to database
$connect = mysqli_connect("localhost","root","","chatbot") or die("Database Error");

//getting user message through ajax
$getMesg = mysqli_real_escape_string($connect,$_POST['text']);

//checking user query to database query
$check_data = "SELECT replies FROM chatbot WHERE queries LIKE '%$getMesg%' ";
$run_query = mysqli_query($connect,$check_data) or die("Error");

//if user query matched to database query we'll show the replay otherwise it go's to else statement 

if(mysqli_num_rows($run_query) > 0) {
    //fetching replay from the database according to the user query
    $fetch_data = mysqli_fetch_assoc($run_query);
    $replay = $fetch_data['replies'];
    echo $replay;
}else {
    echo "sorry! can't be able to understand you!";
}

?>