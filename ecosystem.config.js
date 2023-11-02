module.exports = {
    apps: [{
        name: 'administrador-llaves-frontend',
        script: 'serve',
        env: {
            PM2_SERVE_PATH: './dist',
            PM2_SERVE_PORT: 3001,
            VITE_URL_BACKEND_PUBLIC_URL: 'http://localhost:3000/uploads/',
            VITE_URL_BACKEND: 'http://localhost:3000/api/v2'
        }
    }],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
