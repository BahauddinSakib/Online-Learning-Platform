import { SelectedChapterIndexContent } from '@/context/SelectedChapterIndexContent';
import React, { useContext } from 'react'

function ChapterContent({ courseInfo }) {
    const info = Array.isArray(courseInfo) ? courseInfo[0] : courseInfo;
    const course = info?.course;
    const courseContent = course?.courseContent;

    const { SelectedChapterIndex } = useContext(SelectedChapterIndexContent);

    return (
        <div className='p-10'>
            <h2 className='font-bold text-2xl'>
                {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}
            </h2>
        </div>
    );
}

export default ChapterContent;
