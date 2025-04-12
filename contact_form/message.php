<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $website = htmlspecialchars(trim($_POST['website']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate required fields
    if (!empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Replace with your actual email
            $receiver = "yourname@example.com"; 

            // Subject and body of the email
            $subject = "Message from $name <$email>";
            $body = "Name: $name\n";
            $body .= "Email: $email\n";
            $body .= "Phone: $phone\n";
            $body .= "Website: $website\n\n";
            $body .= "Message:\n$message\n\n";
            $body .= "Regards,\n$name";

            // Email headers
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            // Send email
            if (mail($receiver, $subject, $body, $headers)) {
                echo "Your message has been sent successfully.";
            } else {
                echo "Sorry, failed to send your message.";
            }
        } else {
            echo "Please enter a valid email address.";
        }
    } else {
        echo "Email and message fields are required.";
    }
} else {
    echo "Invalid request method.";
}
?>
