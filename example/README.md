Notes:
If you can not install serverless-plugin-autoinstaller package from npm, we can link it locally by following the steps below
- go to root folder, then run `npm link`
- go to example folder, then run `npm link serverless-plugin-autoinstaller`

If we want to unlink, we simply remove serverless-plugin-autoinstaller symlink in the example/node_module.

## Setup
- Install serverless. Please read this doc https://serverless.com/framework/docs/providers/aws/guide/installation/
- Install dependency: `npm install`

## Deploy
- `npm run deploy-lambda`

## Remove
- `npm run remove-lambda`
