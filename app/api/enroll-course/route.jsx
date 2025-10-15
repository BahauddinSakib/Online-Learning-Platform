import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { and, eq,desc } from "drizzle-orm";

export async function POST(req){         //if not enrolled
    const {courseId} = await req.json();
    const user = await currentUser();


    //if course already enrolled
    const enrollCourses = await db.select().from(enrollCourseTable)
    .where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress),
    eq(enrollCourseTable.cid,courseId)));

    if(enrollCourses?.length==0){
       const result = await db.insert(enrollCourseTable)
       .values({
          cid: courseId,
          userEmail: user.primaryEmailAddress?.emailAddress
       }).returning(enrollCourseTable)

       return NextResponse.json(result);
    }
    return NextResponse.json({'resp':'Already Enrolled'});
}

/*
export async function GET(req) {
    const user = await currentUser();
    const result = await db.select().from(coursesTable)
    .where(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress))
    .innerJoin(enrollCourseTable,eq(coursesTable.cid,enrollCourseTable.cid))
    .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
}
    */

export async function GET(req) {
    const user = await currentUser();

    const {searchParams} = new URL(req.url);
    const courseId = searchParams?.get('courseId')

    if(courseId){
        const result = await db
        .select({
          course: coursesTable,
          enroll: enrollCourseTable,
        })
        .from(enrollCourseTable)
        .innerJoin(coursesTable, eq(coursesTable.cid, enrollCourseTable.cid))
        .where(and(eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress),
    eq(enrollCourseTable.cid,courseId)))
        return NextResponse.json(result[0]);
    }
    else{
  
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const result = await db
      .select({
        course: coursesTable,
        enroll: enrollCourseTable,
      })
      .from(enrollCourseTable)
      .innerJoin(coursesTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(enrollCourseTable.id));
  
    return NextResponse.json(result);
  }
  
}

//for completed chapter endpoint
export async function PUT(req) {
   const {completedChapter,courseId} = await req.json();
   const user = await currentUser();

   //update record
   const result = await db.update(enrollCourseTable).set
   ({
    completedChapters: completedChapter
   }).where(and(eq(enrollCourseTable.cid,courseId),
  eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress)))
  .returning(enrollCourseTable)

  return NextResponse.json(result);
}