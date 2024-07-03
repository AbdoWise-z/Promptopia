"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = ( {params} ) => {

  const [LoadedPrompts, setLoadedPrompts] = useState(null);
  const {data: session} = useSession();
  const router = useRouter();
  const [UserData, setUserData] = useState(null);
  const id = params.id;
  
  useEffect(() => {
    const fetchPrmopts = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      if (res.ok){
        const data = await res.json();

        if (session && session.user && session.user.id == id){ //this user
          setUserData(
            {
              "title" : "My",
              "desc" : "Welcome to your personalized profile"
            }
          );

          setLoadedPrompts(data);
        } else {
          // fetch that user data
          const userRequest = await fetch(`/api/users/${id}`);
          if (userRequest.ok){
            const userResData = await userRequest.json();
            setUserData(
              {
                "title" : `${userResData.username.split(" ")[0]}'s`,
                "desc" : `This is ${userResData.username}'s profile, feel free to explore his prompts.`
              }
            );
            setLoadedPrompts(data);
          }
        }
      }
    };

    if (id != null) fetchPrmopts();
  } , [id , session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    console.log('delete called');
    const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");
    if (hasConfirmed){
      const del = async () => {
        try {
          const response = await fetch(`/api/prompt/${post._id.toString()}` , {
            method: 'DELETE',
          });

          const filtered = LoadedPrompts.filter((p) => p._id !== post._id);
          setLoadedPrompts(filtered);
          //console.log(filtered); 
        } catch (error) {
          //console.log(error);
        }
      };

      del();
    }
  }

  return (
    <div className='w-full'>
      {
        LoadedPrompts && 
        <Profile
          name={UserData.title}
          desc={UserData.desc}
          data={LoadedPrompts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      }
    </div>
  )
}

export default ProfilePage;