"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Form from "@components/Form";

const EditPrompt = () => {
  const [Submitting, setSubmitting] = useState(false);
  const [Post, setPost] = useState(null);

  const {data: session} = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    //load the prompt
    const getDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      if (response.ok){
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } else {
        alert("FAILED TO LOAD DATA (SERVERS ARE DOWN, I REPEAT SERVERS ARE DOWN)");
      }
    };

    if (promptId) getDetails();
  } , [promptId]);
  
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}` , {
        method: 'PATCH',
        body: JSON.stringify(
          {
            ...Post,
            //userId: session?.user.id
          }
        ),
      });

      if (response.ok){
        router.push("/");
      }
    } catch (e){
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {Post && 
        <Form 
          type="Edit"
          Post={Post}
          setPost={setPost}
          Submitting={Submitting}
          submit={editPrompt}
        />
      }
    </div>
  );
}

export default EditPrompt;
