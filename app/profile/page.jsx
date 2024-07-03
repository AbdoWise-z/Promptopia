"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {

  const [LoadedPrompts, setLoadedPrompts] = useState([]);
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPrmopts = async () => {
      const res = await fetch(`/api/users/${session.user.id}/posts`);
      if (res.ok){
        const data = await res.json();
        setLoadedPrompts(data);
      }
    };

    if (session && session.user) fetchPrmopts();
  } , [session]);

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
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={LoadedPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;