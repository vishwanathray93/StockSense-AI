import db from "../db.server";

export async function loader(){

const last5Minutes=new Date(Date.now()-5*60*1000);

const visitors=await db.visitor.count({

where:{
last_seen:{
gte:last5Minutes
}
}

});

return Response.json({
visitors
});

}