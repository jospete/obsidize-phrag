import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
	plugins: [
		react()
	],
	esbuild: {
		legalComments: 'none'
	},
	build: {
		terserOptions: {
			format: {
				comments: false
			}
		}
	}
});
