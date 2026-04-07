import db from "../db.server";

export async function loader(){

try{

/* ================= BASIC STATS ================= */

const views = await db.pageView.count();
const clicks = await db.clickEvent.count();
const orders = await db.orders.count();

const revenueAgg = await db.orders.aggregate({
_sum:{ total_price:true }
});

const revenue = Number(revenueAgg._sum.total_price || 0);

/* ================= CART EVENTS ================= */

const cartAdds = await db.add_to_cart_events.count();

/* ================= PRODUCT VIEWS ================= */

const mostVisitedRaw = await db.product_views.groupBy({
by:["product_id"],
_count:{product_id:true},
orderBy:{_count:{product_id:"desc"}},
take:5
});

/* ================= CART PRODUCTS ================= */

const mostCartRaw = await db.add_to_cart_events.groupBy({
by:["product_id"],
_count:{product_id:true},
orderBy:{_count:{product_id:"desc"}},
take:5
});

/* ================= CLICK EVENTS ================= */

const mostClicksRaw = await db.clickEvent.groupBy({
by:["element_text"],
_count:{element_text:true},
orderBy:{_count:{element_text:"desc"}},
take:5
});

/* ================= PRODUCTS ================= */

const productIds = mostVisitedRaw.map(p=>p.product_id);

const products = await db.products.findMany({
where:{
product_id:{in:productIds}
}
});

/* ================= FORMAT PRODUCTS ================= */

const mostVisited = mostVisitedRaw.map(p=>{

const product = products.find(x=>x.product_id===p.product_id);

return{
product_id:p.product_id,
views:p._count.product_id,
title:product?.title||"Unknown",
image:product?.image||"",
collection:product?.collection||"Unknown"
};

});

const mostCart = mostCartRaw.map(p=>{

const product = products.find(x=>x.product_id===p.product_id);

return{
product_id:p.product_id,
title:product?.title||"Unknown",
adds:p._count.product_id
};

});

const mostClicks = mostClicksRaw.map(p=>({

element_text:p.element_text || "Unknown",
clicks:p._count.element_text

}));

/* ================= DEVICE ANALYTICS ================= */

const deviceRaw = await db.visitor.groupBy({
by:["device"],
_count:true
});

let mobile = 0;
let desktop = 0;

deviceRaw.forEach(d=>{
if(d.device === "mobile") mobile = d._count;
if(d.device === "desktop") desktop = d._count;
});

/* ================= WEEKLY VISITORS ================= */

const weekData = [];

for(let i=6;i>=0;i--){

const start = new Date();
start.setDate(start.getDate()-i);
start.setHours(0,0,0,0);

const end = new Date(start);
end.setHours(23,59,59,999);

const count = await db.pageView.count({
where:{
created_at:{
gte:start,
lte:end
}
}
});

weekData.push(count);

}

/* ================= TRAFFIC OVERVIEW ================= */

const overview = {

labels:["Views","Clicks","Cart","Orders"],

views:[views],
clicks:[clicks],
cart:[cartAdds],
orders:[orders]

};

/* ================= CONVERSION FUNNEL ================= */

const checkout = await db.sessions.count({
where:{
exit_page:{
contains:"checkout"
}
}
});

const funnel = {
views,
cart:cartAdds,
checkout,
orders
};

/* ================= REVENUE TIMELINE ================= */

const revenueTimeline = [];

for(let i=6;i>=0;i--){

const start = new Date();
start.setDate(start.getDate()-i);
start.setHours(0,0,0,0);

const end = new Date(start);
end.setHours(23,59,59,999);

const dayRevenue = await db.orders.aggregate({
where:{
created_at:{
gte:start,
lte:end
}
},
_sum:{total_price:true}
});

revenueTimeline.push(Number(dayRevenue._sum.total_price || 0));

}

/* ================= CART ABANDONMENT ================= */

const abandonedCart = cartAdds - orders;

const abandonmentRate = cartAdds
? ((abandonedCart / cartAdds) * 100).toFixed(2)
: 0;

/* ================= RESPONSE ================= */

return Response.json({

stats:{
views,
clicks,
orders,
revenue,
cart:cartAdds
},

overview,

devices:{
mobile,
desktop
},

weeklyVisitors:weekData,

funnel,

revenueTimeline,

abandonment:{
cartAdds,
orders,
abandoned:abandonedCart,
rate:abandonmentRate
},

mostVisited,
mostCart,
mostClicks

});

}catch(err){

console.error("Analytics API Error:",err);

return Response.json({

stats:{views:0,clicks:0,orders:0,revenue:0,cart:0},

overview:{
labels:[],
views:[],
clicks:[],
cart:[],
orders:[]
},

devices:{mobile:0,desktop:0},

weeklyVisitors:[],

funnel:{views:0,cart:0,orders:0},

revenueTimeline:[],

abandonment:{
cartAdds:0,
orders:0,
abandoned:0,
rate:0
},

mostVisited:[],
mostCart:[],
mostClicks:[]

});

}

}