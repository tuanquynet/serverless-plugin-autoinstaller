# serverless-plugin-autoinstaller
This serverless plugin help auto install node module inside of each lambda function before the function deploy onto the services.

I will detect package.json inside lambda function before doing `npm install`