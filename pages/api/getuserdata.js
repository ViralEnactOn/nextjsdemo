import db from "../../lib/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
  try {
    // Retrieve all users from the database
    const response = await db.from("users");

    res.send({
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data: response,
    });
  } catch (error) {
    res.send({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: [],
    });
  }
}
