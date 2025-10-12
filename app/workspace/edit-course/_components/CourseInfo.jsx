"use client"
import { Book, Clock, Diff,PlayCircle, Section, Settings, TrendingUp} from 'lucide-react';
//import React from 'react'
import Link from 'next/link'; 
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


function CourseInfo({course,viewCourse}) {
    const courseLayout = course?.courseJson?.course;
    if (!courseLayout) return null;
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const GenerateCourseContent = async () => { 
        setLoading(true)
        try {
          // call api to generate content
          const result = await axios.post('/api/generate-course-content', {
            courseJson: courseLayout,
            courseTitle: course?.name,
            courseId: course?.cid,
          });
          console.log(result.data);
          setLoading(false)
          router.replace('/workspace') //after generate course will come here
          toast.success('Course generated successfully')
        } catch (e) {
            setLoading(false)
          console.error(e);
          toast.error('Server Side error, Try again')
        }
      };
  return (
    <div className='flex-row-reverse md:flex gap-5 justify-between p-5 rounded-2xl shadow-xl'>
      <div className='flex flex-col gap-5'>
         <h2 className='font-bold text-3xl'> {courseLayout?.name} </h2>
         <p className='line-clamp-3 text-gray-500'>{courseLayout?.description}</p>

   <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>

       <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
           <Clock className='text-blue-500'/>
         <div>
           <h2 className='font-bold'>Duration</h2>
           <h2>2 Hours</h2>
         </div>
       </div>

       <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
           <Book className='text-green-500'/>
         <div>
           <h2 className='font-bold'>Chapters</h2>
           <h2>2 Hours</h2>
         </div>
       </div>

       <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
           <TrendingUp className='text-red-500'/>
         <div>
           <h2 className='font-bold'>Difficulty Level</h2>
           <h2>{course?.level}</h2>
         </div>
       </div>

</div>   

{!viewCourse?
 <Button 
  onClick={GenerateCourseContent} 
  disabled={loading} 
  className="mx-w-sm cursor-pointer flex items-center gap-2"
>
  {loading && <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>}
  Generate Content
</Button> : <Link href={'/course/'+course?.cid}>
  <Button className='cursor-pointer'><PlayCircle />Continue Learning</Button>
</Link>}


      </div>

    <Image src={course?.bannerImageUrl} alt={"Banner image"} width={400} height={400} className='w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-2xl'/>

    </div>
  )
}

export default CourseInfo
