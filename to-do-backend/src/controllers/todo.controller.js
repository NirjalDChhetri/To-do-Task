import TodoService from "../services/todo.service.js";

class TodoController {
  async getAll(req, res) {
    try {
      const todo = await TodoService.getAll();
      res.status(200).json({
        status: true,
        data: {
          todo,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async createtodo(req, res, next) {
    try {
      let data = req.body;
      const todo = await TodoService.create(data);
      console.log(data);
      res.status(200).send({
        status: true,
        data: {
          todo,
        },
        message: "Todo Created",
      });
    } catch (error) {
      next(error);
    }
  }

  async getbyId(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const todo = await TodoService.get(id);
      if (!todo) throw new Error("Todo not found");
      res.status(200).json({
        status: true,
        data: {
          todo,
        },
        message: "Todo Found",
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Invalid ID");
      }
      const todo = await TodoService.delete(id);
      res.status(200).json({
        status: "success",
        data: {
          todo,
        },
        message: "Todo deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id)
      if (!id) {
        throw new Error("Invalid ID");
      }
      const todo = await TodoService.update(id, req.body);
      return res.status(200).json({
        status: true,
        data: {
          todo,
          message: "Todo Updated successfully",
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new TodoController();
