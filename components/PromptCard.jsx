"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({
  post, handleTagClick, handleEdit, handleDelete
}) => {
  const [Copy, setCopy] = useState(false);
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gab-5'>
        <div 
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={() => {
            router.push(`/profile/${post.creator._id}`)
          }}
        >
          <Image 
            src={post.creator.image}
            width={40}
            height={40}
            alt='user_image'
            className='rounded-full'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={() => {
          setCopy(true);
          navigator.clipboard.writeText(post.prompt);
          setTimeout(() => setCopy(false) , 3000);
        }}>
          <Image
            src={Copy ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={18}
            height={18}
            alt='copy'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => {
        if (handleTagClick){
          handleTagClick(post.tag);
        }
      }}>
        {post.tag}
      </p>

      {
        session && session.user.id == post.creator._id && pathName == "/profile" && 
        <div className='flex gap-10 mt-2 border-t pt-3 border-gray-200'>
          <p 
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
            >
            Edit
          </p>

          <p 
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
            >
            Delete
          </p>
        </div>        
      }
    </div>
  );
}

export default PromptCard;
