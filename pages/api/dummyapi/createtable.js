import db from "../../../lib/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
  try {
    await db.schema
      .createTable("todolist", (table) => {
        table.increments("id");
        table.string("todo");
        table.string("completed");
        table.integer("userId");
      })
      .then((res) => {
        res.send({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          data: "Table Created",
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
