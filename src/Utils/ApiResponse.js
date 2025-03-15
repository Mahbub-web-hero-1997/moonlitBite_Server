class ApiResponse {
  constructor(statusCode, data, message, success = true) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}


export default ApiResponse