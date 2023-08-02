import db from "../../lib/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export default async function handler(req, res) {
  // Retrieve all users from the database
  await db
    .from("users")
    .select("name", "age")
    .orderBy("age", "desc")
    .then((response) => {
      res.send({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: response,
      });
      res.status(StatusCodes.OK).send(ReasonPhrases.OK).data(response);
    })
    .catch((error) => {
      res.send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: [],
      });
    });
}
