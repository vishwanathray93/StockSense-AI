import { json } from "@remix-run/node";
import { pool } from "../db.server";
import prisma from "../db.server";

import { detectIntent } from "../ai/detectIntent";
import { templates } from "../ai/queryTemplates";
import { generateSQL } from "../ai/sqlGenerator";
import { isSafeQuery } from "../ai/sqlGuard";

export async function action({ request }) {

try {

const body = await request.json();
const question = body.question;

let sql;

const intent = await detectIntent(question);

if(templates[intent]){

sql = templates[intent];

}else{

sql = await generateSQL(question);

}

if(!isSafeQuery(sql)){

return json({
error:"Unsafe query blocked",
sql
});

}

const result = await pool.query(sql);

return json({
intent,
sql,
data:result.rows
});

}catch(error){

console.error(error);

return json({
error:error.message
});

}

}