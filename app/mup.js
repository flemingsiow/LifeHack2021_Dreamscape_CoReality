module.exports = {
	servers: {
		one: {
			// TODO: set host address, username, and authentication method
			//host: '165.227.44.8',
			//username: 'root',
			// pem: '~/.ssh/id_rsa.pub'
			// password: 'server-password'
			// or neither for authenticate from ssh-agent
		}
	},

	app: {
		// TODO: change app name and path
		name: 'vr',
		path: '../app',

		servers: {
			one: {},
		},

		buildOptions: {
			serverOnly: true,
		},

		env: {
			ROOT_URL: 'https://ec2-44-193-29-183.compute-1.amazonaws.com',
			MONGO_URL: 'mongodb://localhost:3001/meteor',
		},

		ssl: { 
		// Enables let's encrypt
			autogenerate: {
				email: 'flemingsiow@gmail.com',
				domains: 'ec2-44-193-29-183.compute-1.amazonaws.com, www.ec2-44-193-29-183.compute-1.amazonaws.com'
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
