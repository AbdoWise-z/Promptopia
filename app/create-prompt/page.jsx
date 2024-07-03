"use client";

import React from 'react';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from "@components/Form";

const CreatePrompt = () => {
  const [Submitting, setSubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: "",
    tag: ""
  });

  const {data: session} = useSession();
  const router = useRouter();
  
  const createPormpt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new' , {
        method: 'POST',
        body: JSON.stringify(
          {
            ...Post,
            userId: session?.user.id
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
      <Form 
        type="Create"
        Post={Post}
        setPost={setPost}
        Submitting={Submitting}
        submit={createPormpt}
      />
    </div>
  );
}

export default CreatePrompt;
