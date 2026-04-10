const http = require('http');

function getTasks() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/tasks', (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject("Invalid JSON response");
        }
      });

    }).on('error', reject);
  });
}

function addTask(task) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/tasks',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', reject);

    req.write(JSON.stringify(task));
    req.end();
  });
}

async function runTests() {
  try {
    // Add task
    await addTask({ name: "Test Task" });

    // Get tasks
    const tasks = await getTasks();

    // Validate
    if (!tasks.some(t => t.name === "Test Task")) {
      throw new Error("Task not added correctly");
    }

    console.log("API tests passed!");

  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

runTests();