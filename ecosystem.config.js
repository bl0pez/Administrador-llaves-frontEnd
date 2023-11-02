module.exports = {
    script: "serve",
    env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 8080,
        VITE_URL_BACKEND_PUBLIC_URL: 'http://localhost:3000/uploads/',
        VITE_URL_BACKEND: 'http://localhost:3000/api/v2'
    }
}