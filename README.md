Requirements

Install node 
Install npm

Start Application
gradle build && java -jar build/libs/siteminder-test-0.1.0.jar --mailgun.apiKey=<INSERT MAILGUN API KEY> --sendgrid.apiKey=<INSERT SENDGRID API KEY HERE>
View application on http://localhost:8080

Third Party Endpoints for Mock Test Cases:
private final String mailGunBaseUrl = "http://localhost:1337/sandbox66af2bfe73644db3b91920c1afe40d95.mailgun.org/messages";
private final String sendGridBaseUrl = "http://localhost:1338/mail/send";

npm install 


