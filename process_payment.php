<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


//Load Composer's autoloader
require 'vendor/autoload.php';

$recipientEmail = 'res@karmaexperience.com';
$recipientName 	= 'Karma Group'; 
$subject = 'New Payment Received'; // optional name of the recipient, if not provided it will be set to $email
$body = "New payment recived from  $firstName $lastName \n\n , Payment amount is $paymentAmount GBP ";

function sendEmail($recipientEmail, $recipientName, $subject, $body) {
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'res@karmaexperience.com';
        $mail->Password   = 'bkdjqppfacngnnqp';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465; 


        // Sender and recipient settings
        $mail->setFrom('res@karmaexperience.com', 'Karma Experience');
        $mail->addAddress($recipientEmail, $recipientName);

        // Email content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Send the email
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the payment here...

    // Get payment amount and other data from the form
    $paymentAmount = $_POST['payment-amount'];
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $dob = $_POST['dob'];
    $spouseName = $_POST['spouse-name'];
    $spouseDob = $_POST['spouse-dob'];
    $email = $_POST['email'];
    $mobile1 = $_POST['mobile1'];
    $mobile2 = $_POST['mobile2'];
    $address = $_POST['address'];
    $occupation = $_POST['occupation'];
    $maritalStatus = $_POST['marital-status'];

    // Send confirmation email to the customer
    $customerEmail = $_POST['email'];
    $customerSubject = 'Payment Confirmation';
    $customerMessage = "Dear $firstName $lastName,\n\n";
    $customerMessage .= "Thank you for your payment of $paymentAmount GBP.\n";
    $customerMessage .= "Here are the details you provided:\n";
    $customerMessage .= "Date of Birth: $dob\n";
    $customerMessage .= "Spouse Name: $spouseName\n";
    $customerMessage .= "Spouse Date of Birth: $spouseDob\n";
    $customerMessage .= "Email: $email\n";
    $customerMessage .= "Mobile No 1: $mobile1\n";
    $customerMessage .= "Mobile No 2: $mobile2\n";
    $customerMessage .= "Complete Address with Pin Code: $address\n";
    $customerMessage .= "Occupation: $occupation\n";
    $customerMessage .= "Marital Status: $maritalStatus\n";

    // Include other form data in the email...

    // Send email to the customer
    if (sendEmail($customerEmail, "$firstName $lastName", $customerSubject, $customerMessage)) {
        echo 'Payment successful. Confirmation email sent to the customer.';
    } else {
        echo 'Payment successful, but there was an issue sending the confirmation email to the customer.';
    }

    // Send notification email to the admin
    $adminEmail = 'res@karmaexperience.com'; // Replace with your admin's email address
    $adminSubject = 'New Payment Received';
    $adminMessage = "A new payment of $paymentAmount GBP has been received from $firstName $lastName.\n";
    $adminMessage .= "Here are the details:\n";
    $adminMessage .= "Date of Birth: $dob\n";
    $adminMessage .= "Spouse Name: $spouseName\n";
    $adminMessage .= "Spouse Date of Birth: $spouseDob\n";
    $adminMessage .= "Email: $email\n";
    $adminMessage .= "Mobile No 1: $mobile1\n";
    $adminMessage .= "Mobile No 2: $mobile2\n";
    $adminMessage .= "Complete Address with Pin Code: $address\n";
    $adminMessage .= "Occupation: $occupation\n";
    $adminMessage .= "Marital Status: $maritalStatus\n";

    // Include other form data in the email...

    // Send email to the admin
    if (sendEmail($adminEmail, 'Karma Group', $adminSubject, $adminMessage)) {
        // Admin notification email sent successfully
    } else {
        // There was an issue sending the admin notification email
    }
}
?>
