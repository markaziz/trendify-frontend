module.exports = {
  apps: [{
    name: 'spotify-frontend',
    script: "npm",
    args: 'run start:prod',
    watch: false,
    interpreter: 'none',
    env_production: {
      NODE_ENV: "production",
    }
    
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'trendifymusic.com',
      key: '~/.ssh/spotify-app-node.pem',
      ref: 'origin/master',
      repo: 'git@github.com:m-aziz/spotify-frontend.git',
      "pre-deploy": "cd /home/ubuntu/spotify-frontend && git pull",
      path: '/home/ubuntu/spotify-frontend',
    }
  }
}