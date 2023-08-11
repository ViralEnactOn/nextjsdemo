import { ReasonPhrases, StatusCodes } from "http-status-codes";
import db from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.send({
      status: StatusCodes.METHOD_NOT_ALLOWED,
      message: ReasonPhrases.METHOD_NOT_ALLOWED,
      data: [],
    }); // Method Not Allowed
  } else if (req.method === "POST") {
    try {
      console.log(req.body);
      const { limit, skip } = req.body;
      await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
      ).then(async (response) => {
        let data = await response.json();
        console.log("data", data.todos);
        await data.todos.map(async (item, index) => {
          await db("todolist")
            .insert({
              id: item.id,
              todo: item.todo,
              completed: item.completed,
              userId: item.userId,
            })
            .then((response) => {
              res.send({
                status: StatusCodes.OK,
                message: ReasonPhrases.OK,
                data: response,
              });
            });
        });
      });
    } catch (error) {
      res.send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: [],
      });
    }
  }
}
