import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESTE ES EL TRUCO: Un plugin simple para imprimir en la terminal de VS Code
const terminalLoggerPlugin = () => ({
  name: 'terminal-logger',
  configureServer(server) {
    server.middlewares.use('/__log_secret', (req, res, next) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const code = url.searchParams.get('code');
      if (code) {
        // Esto imprime en TU terminal de Visual Studio (color amarillo y brillante)
        console.log('\n\x1b[41m\x1b[37m%s\x1b[0m', ' 🔒 [SEGURIDAD] SOLICITUD DE ACCESO ADMIN ');
        console.log('\x1b[33m%s\x1b[0m', ` 👉 TU CÓDIGO ES: ${code}`);
        console.log('\x1b[36m%s\x1b[0m', '    Ingrésalo en el recuadro de la web.\n');
      }
      res.end('ok');
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    terminalLoggerPlugin() // <--- AGREGA ESTO AQUÍ
  ],
}) 