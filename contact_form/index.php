<!DOCTYPE html>
<!-- Coding By CodingNepal - youtube.com/codingnepal -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form in PHP</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
</head>
<body>
  <div class="wrapper">
    <header>Send us a Message</header>
    
    <form action="message.php" method="POST">
      <div class="dbl-field">
        <div class="field">
          <input type="text" name="name" placeholder="Enter your name" required>
          <i class="fas fa-user"></i>
        </div>
        <div class="field">
          <input type="text" name="email" placeholder="Enter your email" required>
          <i class="fas fa-envelope"></i>
        </div>
      </div>

      <div class="dbl-field">
        <div class="field">
          <input type="text" name="phone" placeholder="Enter your phone" required>
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="field">
          <input type="text" name="website" placeholder="Enter your website" required>
          <i class="fas fa-globe"></i>
        </div>
      </div>

      <div class="message">
        <textarea placeholder="Write your message" name="message" required></textarea>
        <i class="material-icons">message</i>
      </div>

      <div class="button-area">
        <button type="submit">Send Message</button>
        <span></span>
      </div>
    </form>
  </div>

  <script src="script.js"></script>
</body>
</html>
