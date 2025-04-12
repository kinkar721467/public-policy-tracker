$(document).ready(function(){
    var choice = 1; // Default to main.php chatbot

    // Toggle chatbot when button is clicked
    $("#aiChatBtn").on("click", function() {
        choice = (choice === 1) ? 2 : 1; // Toggle between 1 and 2
        $(this).toggleClass("active"); // Optional: Add a visual effect
    });

    $("#send-btn").on("click",function() {
        $value = $("#main-input").val().trim();
        $msg = '<div class="user-inbox inbox"><div class="icon"><i class="fa-solid fa-user"></i></div><div class="msg-header"><p id="apivalue">'+$value+'</p></div></div>';
        $(".container-form").append($msg);
        $("#main-input").val('');

        var chatUrl = (choice === 1) ? "main.php" : "aichatbot.php"; // Choose chatbot

          // Show loader only for aichatbot.php
            if (choice === 2) {
                $replay = '<div class="bot-inbox inbox"><div class="icon"><i class="fa-brands fa-android"></i></div><div class="msg-header"><div class="loader"><div></div><div></div><div></div><div></div><div></div></div></div></div>';
                $(".container-form").append($replay);
            }

        //start ajak code
        $.ajax({
            url: chatUrl,
            type: 'POST',
            data: 'text='+$value,
            success: function(result) {
                if (choice === 2) {
                    //loader 
                    $(".bot-inbox:last .msg-header").html('<p>' + result + '</p>');
                } else {
                    $replay = '<div class="bot-inbox inbox"><div class="icon"><i class="fa-brands fa-android"></i></div><div class="msg-header"><p>' + result + '</p></div></div>';
                    $(".container-form").append($replay);
                }

                $(".container-form").scrollTop($(".container-form")[0].scrollHeight);
            }
        });
    });

    // PDF Conversion
    const { jsPDF } = window.jspdf;

    $("#aiToolBtn").on('click', function() {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        const content = $(".container-form").text().trim();

        if (!content) {
            alert('No content to generate PDF');
            return;
        }

        const margin = 10;
        const pageHeight = doc.internal.pageSize.height;
        const maxWidth = doc.internal.pageSize.width - 2 * margin;

        const splitText = doc.splitTextToSize(content, maxWidth);
        let y = margin;

        splitText.forEach(line => {
            if (y + 10 > pageHeight) {
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin, y);
            y += 7; // Line spacing
        });

        doc.save("chat-history.pdf");
    });

});