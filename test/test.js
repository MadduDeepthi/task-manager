const http = require('http');

function testAPI() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/', (res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        reject("API failed");
      }
    }).on('error', reject);
  });
}

async function runTests() {
  try {
    await testAPI();
    console.log("API test passed!");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

runTests();