import db from "../../lib/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const { name, age } = req.body;
  console.log(req.body);
  //   Insert users from the database
  await db("users")
    .insert({ name, age })
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
