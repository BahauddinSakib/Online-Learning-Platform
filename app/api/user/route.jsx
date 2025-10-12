import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 
import { db } from "@/config/db"; 


export async function POST(req) {
    const {email,name} = await req.json();

    //If user already exist
    const users = await db.select().from(usersTable).where(eq(usersTable.email,email));


    //If not then insert
    if(users?.length==0){
        const result = await db.insert(usersTable).values({
            name:name,
            email:email
        }).returning(usersTable);

        console.log(result);
        return NextResponse.json(result)
    }


    return NextResponse.json(users[0])
}