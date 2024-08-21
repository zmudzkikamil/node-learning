import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
	try {
		if (req.method === 'GET') {
			let filePath;

			if (req.url === '/') {
				filePath = path.join(__dirname, 'public', 'index.html');
			} else if (req.url === '/about') {
				filePath = path.join(__dirname, 'public', 'about.html');
			} else {
				// If the route is not recognized, send a 404 response
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('404 Not Found');
				return;
			}

			// Read the file and serve it
			const data = await fs.readFile(filePath);
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(200);
			res.end(data);
		} else {
			// Handle unsupported HTTP methods
			res.writeHead(405, { 'Content-Type': 'text/plain' });
			res.end('405 Method Not Allowed');
		}
	} catch (error) {
		console.error('Error occurred:', error);
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('500 Server Error');
	}
});

server.listen(8000, () => {
	console.log('Server running at http://localhost:8000');
	console.log('Filename:', __filename);
	console.log('Directory:', __dirname);
	console.log('Import Meta URL:', import.meta.url);
});
