import db from "../db.server";

export async function action({ request }) {

  const payload = await request.json();

  await db.orders.updateMany({

    where: {
      order_id: String(payload.order_id)
    },

    data: {
      status: "fulfilled"
    }

  });

  return new Response();
}