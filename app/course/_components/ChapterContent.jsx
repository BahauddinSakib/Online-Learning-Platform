import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContent } from '@/context/SelectedChapterIndexContent';
import { CheckCircle, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import { toast } from 'sonner';
import axios from 'axios';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const info = Array.isArray(courseInfo) ? courseInfo[0] : courseInfo;
  const course = info?.course;
  const enrollCourse = info?.enrollCourse;
  const courseContent = course?.courseContent;
  const { SelectedChapterIndex } = useContext(SelectedChapterIndexContent);
  const [loading,setLoading] = useState(false);

  // Keep completedChapter in local state
  const [completedChapter, setCompletedChapter] = useState(
    enrollCourse?.completedChapter ?? []
  );

  useEffect(() => {
    // when courseInfo changes 
    setCompletedChapter(enrollCourse?.completedChapter ?? []);
  }, [enrollCourse]);

  const markChapterCompleted = async () => {
    setLoading(true);
    const updated = [...completedChapter, SelectedChapterIndex];

    const result = await axios.put('/api/enroll-course', {
      courseId,
      completedChapter: updated,
    });

    toast.success('Chapter marked as completed');
    setLoading(false);
    setCompletedChapter(updated); // update local state so button changes immediately
    refreshData();
  };
  //mark incomplete
  const markInCompleteChapter= async () => {
    setLoading(false)
    const completeChap = completedChapter.filter(item=>item!=SelectedChapterIndex);

    const result = await axios.put('/api/enroll-course', {
      courseId,
      completedChapter: completeChap,
    });

    toast.success('Chapter marked as Incomplete');
    setLoading(false)
    setCompletedChapter(completeChap); // update local state so button changes immediately
    refreshData();
  };

  let videoData =
    typeof SelectedChapterIndex !== 'undefined'
      ? courseContent?.[SelectedChapterIndex]?.youtubeVideo
      : [];

  const topics =
    courseContent?.[SelectedChapterIndex]?.courseData?.topics ?? [];

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>
          {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}
        </h2>

        {!completedChapter?.includes(SelectedChapterIndex) ? (
  <Button
    onClick={markChapterCompleted}
    className='cursor-pointer'
    disabled={loading}
  >
    {loading ? <Loader2Icon className='animate-spin' /> : <CheckCircle />}
    Mark as Completed
  </Button>
) : (
  <Button
    variant='outline'
    onClick={markInCompleteChapter}
    disabled={loading}  
  >
    {loading ? <Loader2Icon className='animate-spin' /> : <X />} 
    Mark Incomplete
  </Button>
)}

      </div>

      <h2 className='my-2 font-bold text-lg'>Related Videos</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {videoData?.slice(0, 4).map((video, index) => (
          <div key={index}>
            <YouTube videoId={video?.videoId} opts={{ height: '250', width: '440' }} />
          </div>
        ))}
      </div>

      <div className='mt-7'>
        {topics.map((topic, index) => (
          <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-lg text-primary'>
              {index + 1}. {topic?.topic}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: topic?.content }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
