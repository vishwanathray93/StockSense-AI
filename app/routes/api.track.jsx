import db from "../db.server";

export async function action({ request }) {

const body=await request.json();

const {shop,visitor_id,type,timestamp,...data}=body;

/* VISITOR */

await db.visitor.upsert({
where:{id:visitor_id},
update:{last_seen:new Date(timestamp)},
create:{
id:visitor_id,
shop_domain:shop,
first_seen:new Date(timestamp),
last_seen:new Date(timestamp)
}
});

/* PAGE VIEW */

if(type==="page_view"){

await db.pageView.create({
data:{
shop_domain:shop,
visitor_id,
url:data.url,
path:data.path,
title:data.title,
created_at:new Date(timestamp)
}
});

}

/* CLICK */

if(type==="click"){

await db.clickEvent.create({
data:{
shop_domain:shop,
visitor_id,
page:data.page,
element_text:data.element_text,
element_type:data.element_type,
created_at:new Date(timestamp)
}
});

}

/* PRODUCT VIEW */

if(type==="product_view"){

await db.product_views.create({
data:{
shop_domain:shop,
visitor_id,
product_id:data.product_id,
created_at:new Date(timestamp)
}
});

/* SYNC PRODUCT */

await db.products.upsert({

where:{product_id:data.product_id},

update:{
title:data.title,
image:data.image,
collection:data.collection
},

create:{
shop_domain:shop,
product_id:data.product_id,
title:data.title,
image:data.image,
collection:data.collection
}

});

}

/* ADD TO CART */

if(type==="add_to_cart"){

await db.add_to_cart_events.create({
data:{
shop_domain:shop,
visitor_id,
product_id:data.product_id,
quantity:parseInt(data.quantity)||1,
created_at:new Date(timestamp)
}
});

}

return Response.json({success:true});

}