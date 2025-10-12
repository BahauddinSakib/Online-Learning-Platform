import { coursesTable } from "@/config/schema";
import { db } from '@/config/db'
import { NextResponse } from "next/server";
import { eq,desc } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const courseId = searchParams?.get('courseId')
    const user = await currentUser();

    if(courseId){

     const result = await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId));

     console.log(result);

    return NextResponse.json(result[0]);
}
else{
    const result = await db.select().from(coursesTable)
    .where(eq(coursesTable.userEmail,user.primaryEmailAddress?.emailAddress))
    .orderBy(desc(coursesTable.id));

     console.log(result);

    return NextResponse.json(result);
 }
}