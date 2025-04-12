<?php 
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $userMessage = isset($_POST['text']) ? trim($_POST['text']) : '';
        if(!empty($userMessage)) {
            // Gemini API key
            $apiKey = "AIzaSyA0_CAcGMl6RI2R4ePwRsCu8FTmOR8IjXM";
            $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey";
            
            // JSON payload for API request
            $postData = json_encode([
            "contents" => [
                ["parts" => [["text" => $userMessage]]]
            ]
            ]);

             // cURL initialization
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            
             // Execute request
            $response = curl_exec($ch);
            curl_close($ch);

            // Decode API response
            $responseData = json_decode($response, true);

             // Extract and return chatbot response
            if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                $reply = $responseData['candidates'][0]['content']['parts'][0]['text'];
    
                // Clean the text by removing asterisks and trimming spaces
                $clean_reply = trim(preg_replace('/\*+/', '', $reply));
                
                // Display the response safely with formatting
                echo nl2br(htmlspecialchars($clean_reply));
            } else {
                echo "Sorry, I couldn't generate a response.";
            }
        } else {
            echo "Please enter a message.";
        }
    }else {
        echo "Invalid request.";
    }
?>