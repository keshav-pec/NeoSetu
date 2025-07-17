const status = require("http-status").default;

// Access status codes
console.log("OK =", status.OK);                  // 200
console.log("CREATED =", status.CREATED);        // 201
console.log("NOT_FOUND =", status.NOT_FOUND);    // 404
console.log("CONFLICT =", status.CONFLICT);      // 409
console.log("INTERNAL_SERVER_ERROR =", status.INTERNAL_SERVER_ERROR); // 500

// Reverse lookup
console.log("Status 200 name:", status[200]);   // 'OK'
console.log("Status 404 name:", status[404]);   // 'NOT_FOUND'

// Simulate an API response
function simulateResponse(code) {
  return {
    statusCode: code,
    statusText: status[code] || "UNKNOWN",
    message: "Simulated API response"
  };
}

console.log(simulateResponse(status.CONFLICT));
