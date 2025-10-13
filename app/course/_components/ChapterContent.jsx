import { SelectedChapterIndexContent } from '@/context/SelectedChapterIndexContent';
import { index } from 'drizzle-orm/gel-core';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

function ChapterContent({ courseInfo }) {
    const info = Array.isArray(courseInfo) ? courseInfo[0] : courseInfo;
    const course = info?.course;
    const courseContent = course?.courseContent;
    const { SelectedChapterIndex } = useContext(SelectedChapterIndexContent);
    const topics = courseContent?.[SelectedChapterIndex]?.courseData.topics;
    let videoData;

    if (typeof SelectedChapterIndex !== 'undefined') {
        videoData = courseContent?.[SelectedChapterIndex]?.youtubeVideo;
    }


    return (
        <div className='p-10'>
            <h2 className='font-bold text-2xl'>
                {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}
            </h2>

            <h2 className=' my-2 font-bold text-lg'>
                Related Videos
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                
            {videoData?.map((video,index)=> index < 4 && (
               <div key={index}>
              <YouTube  videoId={video?.videoId}
                opts={{
                    height: '250',
                    width: '440',
                   
                }}
              
              />
              </div>
            ))}

            </div>

            <div className='mt-7'>
             {topics?.map((topic, index) => (
              <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
                <h2 className='font-bold text-lg text-primary'>{topic?.topic}</h2>
                <div dangerouslySetInnerHTML={{__html: topic?.content}}>

                </div>
              </div>
           ))}
           </div>



        </div>
        
    );
}

export default ChapterContent;
