import { isConnected, connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req , { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt){
      return new Response("Not Found" , {status: 404});
    }

    return new Response(JSON.stringify(prompt) , {status: 200});

  } catch (error){
    console.log(error);
    return new Response(JSON.stringify(error) , {status: 500});
  }
}


export const PATCH = async (req , { params }) => {
  const {prompt, tag} = await req.json();
  try {
    await connectToDB();
    const existsingOne = await Prompt.findById(params.id).populate('creator');
    if (!existsingOne){
      return new Response("Not Found" , {status: 404});
    }
    
    existsingOne.prompt = prompt;
    existsingOne.tag = tag;
    await existsingOne.save();

    return new Response(JSON.stringify(existsingOne) , {status: 200});

  } catch (error){
    console.log(error);
    return new Response(JSON.stringify(error) , {status: 500});
  }
}

export const DELETE = async (req , { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("deleted" , {status: 200});
  } catch (error){
    console.log(error);
    return new Response(JSON.stringify(error) , {status: 500});
  }
}