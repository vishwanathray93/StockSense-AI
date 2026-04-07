import db from "../db.server";

export async function action({ request }) {

  const payload = await request.json();

  const orderId = String(payload.id);

  /* CREATE ORDER */

  const order = await db.orders.create({
    data: {
      shop_domain: payload.shop_domain,
      order_id: orderId,
      customer_id: payload.customer?.id ? String(payload.customer.id) : null,
      subtotal: Number(payload.subtotal_price || 0),
      tax: Number(payload.total_tax || 0),
      discount: Number(payload.total_discounts || 0),
      shipping: Number(payload.total_shipping_price_set?.shop_money?.amount || 0),
      total_price: Number(payload.total_price || 0),
      currency: payload.currency,
      status: "created",
      created_at: new Date(payload.created_at)
    }
  });

  /* ORDER ITEMS */

  for (const item of payload.line_items || []) {

    await db.order_items.create({
      data: {
        order_id: order.id,
        product_id: String(item.product_id),
        variant_id: String(item.variant_id),
        quantity: item.quantity,
        price: Number(item.price)
      }
    });

    /* SYNC PRODUCT */

    await db.products.upsert({

      where: { product_id: String(item.product_id) },

      update: {
        title: item.title,
        image: item.image?.src || null,
        handle: item.handle
      },

      create: {
        shop_domain: payload.shop_domain,
        product_id: String(item.product_id),
        title: item.title,
        image: item.image?.src || null,
        handle: item.handle
      }

    });

  }

  return new Response();
}