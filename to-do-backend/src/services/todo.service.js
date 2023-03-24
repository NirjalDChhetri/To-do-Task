import Todo from "../models/todo.model.js";

class TodoService {
  async getAll() {
    const todo = await Todo.find();
    return todo;
  }

  async create(data) {
    const todo = new Todo();
    todo.title = data.title;
    todo.description = data.description;
    todo.time = data.time;
    if (data.status) {
      todo.status = data.status;
    }
    return await Todo.create(todo);
  }

  async get(_id) {
    const todo = await Todo.findById({ _id });
    console.log(todo);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  async delete(_id) {
    const todo = await Todo.findByIdAndDelete(_id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  async update(_id, body) {
    const todo = await Todo.findOneAndUpdate({ _id }, body, {new: true});
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }
}
export default new TodoService();
