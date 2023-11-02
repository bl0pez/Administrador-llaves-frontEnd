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
};
