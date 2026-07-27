<?php

$to = "chathurangad@gmail.com";

$email_subject = "Contact form submission: $name";

$email_body = "You have received a new message. ".

" Here are the details:\n Name: $name \n ".

"Email: $email_address\n Message \n $message";

$headers = "From: $myemail\n";

$headers .= "Reply-To: $email_address";

mail($to,$email_subject,$email_body,$headers);

//redirect to the 'thank you' page
$retval = mail ($to,$subject,$message,$header);
   if( $retval == true ){
      echo "Message sent successfully...";
   }else{
      echo "Message could not be sent...";
   }



?>
