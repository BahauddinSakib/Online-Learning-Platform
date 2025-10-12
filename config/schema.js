import { pgTable, text, varchar, integer, boolean, jsonb,json } from "drizzle-orm/pg-core";

//user table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar()
});

//course table
export const coursesTable = pgTable("courses",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull().unique(),
  name: varchar(),
  description: varchar(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar().notNull(),
  category: varchar(),
  courseContent: json().default({}),
  bannerImageUrl: text().default(''),
  courseJson: jsonb(),
  userEmail: varchar('userEmail').notNull().references(()=>usersTable.email)
});

//Enroll table
export const enrollCourseTable = pgTable('enrollCourse',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar('cid').references(()=>coursesTable.cid),
  userEmail: varchar('userEmail').notNull().references(()=>usersTable.email),
  completedChapters: json()

})

