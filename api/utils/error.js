// Function to create a custom error object with a specific status and message
export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
  };
  