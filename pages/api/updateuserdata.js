import db from "../../lib/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.send({
      status: StatusCodes.METHOD_NOT_ALLOWED,
      message: ReasonPhrases.METHOD_NOT_ALLOWED,
      data: [],
    }); // Method Not Allowed
  } else if (req.method === "POST") {
    const { id, name, age } = req.body;
    // Update user from the database
    await db("users")
      .where("id", id)
      .update({ name, age })
      .then((response) => {
        res.send({
          status: StatusCodes.OK,
          message: ReasonPhrases.OK,
          data: response,
        });
      })
      .catch((error) => {
        res.send({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          data: [],
        });
      });
  }
}
