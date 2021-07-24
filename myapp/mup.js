module.exports = {
	servers: {
		one: {
			// TODO: set host address, username, and authentication method
		}
	},

	app: {
		name: 'CoReality',
		path: '../myapp',

		servers: {
			one: {},
		},

		buildOptions: {
			serverOnly: true,
		},

		env: {
			ROOT_URL: 'https://ec2-35-170-58-201.compute-1.amazonaws.com',
			MONGO_URL: 'mongodb://ec2-35-170-58-201.compute-1.amazonaws.com:3001/meteor',
		},

		ssl: { 
		// Enables let's encrypt
			autogenerate: {
				email: 'flemingsiow@gmail.com',
				domains: 'ec2-35-170-58-201.compute-1.amazonaws.com, www.ec2-35-170-58-201.compute-1.amazonaws.com'
			}
		},

		docker: {
			image: 'abernix/meteord:node-8.4.0-base',
		},

		// Shows progress bar while uploading bundle to server
		enableUploadProgressBar: true,
		deployCheckWaitTime: 240
	},

	mongo: {
		version: '3.4.10',
		servers: {
			one: {}
		}
	}
};
