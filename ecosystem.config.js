module.exports = {
  apps: [{
    name: 'spotify-frontend',
    script: "npm",
    args : "run start:prod",
    watch: false,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
    
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-252-245-228.ap-southeast-2.compute.amazonaws.com',
      key: '~/.ssh/spotify-app-node.pem',
      ref: 'origin/master',
      repo: 'git@github.com:m-aziz/spotify-frontend.git',
      path: '/home/ubuntu/spotify-frontend',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}