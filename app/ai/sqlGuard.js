export function isSafeQuery(sql){

if(!sql) return false;

const forbidden = [
"INSERT",
"UPDATE",
"DELETE",
"DROP",
"ALTER",
"TRUNCATE",
"CREATE"
];

const upper = sql.toUpperCase();

for(const word of forbidden){
 if(upper.includes(word)){
   return false;
 }
}

return upper.trim().startsWith("SELECT") || upper.trim().startsWith("WITH");
}