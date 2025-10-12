import React from 'react'
import { useContext } from 'react';
import { SelectedChapterIndexContent } from '@/context/SelectedChapterIndexContent';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

function ChapterListSidebar({courseInfo}) {
    const course = courseInfo?.course;
    const enrollCourse = courseInfo?.enrollCourse
    //const courseContent = courseInfo?.course?.courseContent
    const courseContent = courseInfo?.[0]?.course?.courseContent;
    const {SelectedChapterIndex,setSelectedChapterIndex} = useContext(SelectedChapterIndexContent)

    //const courseContent = courseInfo?.courseContent;
    
  return (
    <div className='w-80 bg-secondary h-screen p-5'> 
    <h2 className='my-3 font-bold text-xl'>Chapters ({courseContent?.length})</h2>
             <Accordion type="single" collapsible>

             {courseContent?.map((chapter, index) => (
  <AccordionItem value={`item-${index}`} key={index} onClick={()=>setSelectedChapterIndex(index)}>
    <AccordionTrigger className={'text-lg font-medium'}> { index + 1}. {chapter.courseData.chapterName}</AccordionTrigger>
    <AccordionContent>
      
      <div className=''>
        {chapter?.courseData?.topics.map((topic,index)=>(
            
                <h2 key={index} className='p-3 bg-white my-1 rounded-lg'> 
                    {topic?.topic}
                </h2>
            )
        )}
      </div>
    </AccordionContent>
  </AccordionItem>
))}


              
    </Accordion>
    </div>
  )
}

export default ChapterListSidebar

//{chapter.courseData.topics?.map((topic, idx) => (
    //<div key={idx}>{topic.topic}</div>
//))}