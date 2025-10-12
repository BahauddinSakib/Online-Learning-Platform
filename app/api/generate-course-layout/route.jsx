import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import {db} from '@/config/db';
import axios from "axios";

import {
    GoogleGenAI,
  } from '@google/genai';
import { NextResponse } from 'next/server';

  const PROMPT = 
`Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name., Topic under each chapters, Duision for each chapters etc, in JSON format only Schema:
"course": {
"name": "string".
"description": "string",
"category": "string".
"level": "string".
"includeVideo": "boolean".
"noOrChapters": "number".
"bannerImagePrompt": "string",
"chapters®: [
"chapterName": "string".
"duration": "string".
"topics": [
"string*
],
}
]
}
}
,User Input:`

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const {courseId,...formData} = await req.json();

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: PROMPT + JSON.stringify(formData),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log(response.candidates[0].content.parts[0].text);
    const RawResp = response?.candidates[0]?.content?.parts[0]?.text
    const RawJson = RawResp.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(RawJson);
    const ImagePrompt = JSONResp.course?.bannerImagePrompt;

    //generate image
    const bannerImageUrl = await GenerateImage(ImagePrompt)
    //const bannerImageUrl = "https://dummyimage.com/1024x512/000/fff.png&text=AI+Generated";


    
   //save to database
    const result = await db.insert(coursesTable).values({
    cid: courseId,
      ...formData,
      name: JSONResp.course?.name,               
      description: JSONResp.course?.description,
      noOfChapters: formData.noOfChapter || JSONResp.course?.noOfChapters || 0,
      courseJson: JSONResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      bannerImageUrl: bannerImageUrl

    });

    return NextResponse.json({courseId:courseId});
  } catch (error) {
    console.error("Error generating course:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

const GenerateImage = async (imagePrompt) => {
    const BASE_URL = 'https://aigurulab.tech';

    try {
        const result = await axios.post(
            `${BASE_URL}/api/generate-image`,
            {
                width: 1024,
                height: 1024,
                input: imagePrompt,
                model: 'flux', // or 'flux'
                aspectRatio: "16:9" // Only applies to flux
            },
            {
                headers: {
                    'x-api-key': process.env.AI_GURU_LAB_API, // no optional chaining
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(result.data.image); // Base64 image
        return result.data.image;

    } catch (error) {
        console.error("Image generation failed:", error.response?.data || error.message);
        return null;
    }
};


