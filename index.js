
const fs = require('fs');
const path = require('path');
const util = require('util');

class AutoInstaller {
  constructor(serverless, options) {		
	  this.serverless = serverless;
		this.alreadyInstalledPaths = {};
		
		this.serverless.cli.log('Check environment and API');

		this.functions = Object.keys(this.serverless.service.functions).map((key) => {
			return Object.assign(
				{},
				this.serverless.service.functions[key],
				{name: key},
			)
		});
		
		this.commands = {
      deploy: {
        lifecycleEvents: [
          'functions'
        ]
      },
    };

	  this.hooks = {
	    "before:deploy:functions": this.beforeDeploy.bind(this),
	  }
	}
	
	beforeDeploy() {
		return this.autoinstall();
	}

	async autoinstall() {
		this.serverless.cli.log('autoinstall');

		const {options: commandlineOptions} = this.serverless.processedInput;
		
		const specifiedFunction = commandlineOptions.function || [];

    if (specifiedFunction.length) {
      this.functions = this.functions.filter((functObject) => {
				return specifiedFunction.indexOf(functObject.name) > -1;
			});
    }

		return Promise.all(this.functions.map((funcObject) => {
			return this.autoinstallFunction(funcObject);
		}));
	}

	async autoinstallFunction(funcObject) {
		const {servicePath} = this.serverless.config;
		const funcPath = funcObject.handler.split('/')[0];
		let absFunctionPath = path.resolve(servicePath + '/' + funcPath);

		// Try to find a function parent path with package.json
		const packageJsonPath = path.join(absFunctionPath, 'package.json');
		let packagePath = '';

		packagePath = fs.existsSync(packageJsonPath) ? absFunctionPath : packagePath;

		absFunctionPath = path.resolve(absFunctionPath, '..');

		if (packagePath && !this.alreadyInstalledPaths[packagePath]) {
			this.alreadyInstalledPaths[packagePath] = true;
			await this.startNPMInstall(packagePath);
		}

		return Promise.resolve();
	}

	/**
	 *
	 *
	 * @param {string} destination absolute path
	 * @memberof AutoInstaller
	 */
	async startNPMInstall(destination) {
		this.serverless.cli.log(`Start npm install in folder ${destination}`);
		const exec = util.promisify(require('child_process').exec);
		const { stdout, stderr } = await exec(`cd ${destination} && npm install`);
		
		if (stderr) {
			this.serverless.cli.log(stderr);
		}

		this.serverless.cli.log(stdout);
	}
}

module.exports = AutoInstaller;
