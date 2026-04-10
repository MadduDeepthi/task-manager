const http = require('http');

let tasks = [];

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    res.end("Task Manager API 🚀 CI/CD WORKING");
  }

  else if (req.method === 'GET' && req.url === '/tasks') {
    res.end(JSON.stringify(tasks));
  }

  else if (req.method === 'POST' && req.url === '/tasks') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const task = JSON.parse(body);
      tasks.push(task);
      res.end("Task added");
    });
  }

  else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);