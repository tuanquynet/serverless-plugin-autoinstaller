# serverless-plugin-autoinstaller
This serverless plugin help auto install node module inside of each lambda function before the function deploy onto the services.

It will detect package.json inside lambda function before doing `npm install`

[Example](https://github.com/tuanquynet/serverless-plugin-autoinstaller/tree/master/example)