import { isConnected, connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req , res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts) , {status: 200});

  } catch (error){
    console.log(error);
    return new Response(JSON.stringify(error) , {status: 500});
  }
}

export const POST = async (req , res) => {
  try {
    const { filter } = await req.json();
    await connectToDB();
    const prompts = await Prompt.find({
      "$or": [{
        "prompt": {
          "$regex": filter,
          "$options": "i"
        }
      }, {
        "tag": {
          "$regex": filter,
          "$options": "i"
        }
      },]
    }).populate('creator');
    return new Response(JSON.stringify(prompts) , {status: 200});

  } catch (error){
    console.log(error);
    return new Response(JSON.stringify(error) , {status: 500});
  }
}