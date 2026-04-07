import db from "../db.server";

export async function loader({ request }) {

const url=new URL(request.url);
const productId=url.searchParams.get("product");

const views=await db.product_views.count({
where:{product_id:productId}
});

const cart=await db.add_to_cart_events.count({
where:{product_id:productId}
});

const orders=await db.orders.count({
where:{product_id:productId}
});

return Response.json({
views,
cart,
orders
});

}