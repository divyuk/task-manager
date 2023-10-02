class Validator {
  static validation(task) {
    if (
      task.hasOwnProperty("title") &&
      task.hasOwnProperty("description") &&
      task.title != "" && // Check if title is not empty after trimming
      task.description != "" && // Check if description is not empty after trimming
      task.hasOwnProperty("flag") &&
      task.hasOwnProperty("priority")
    ) {
      console.log("This", task.description);
      return { status: true, message: "Task has been created", data: task.id };
    } else {
      console.log("Wrong", task);
      return { status: false, message: `Validation failed -> ${task}` };
    }
  }
}

module.exports = Validator;
