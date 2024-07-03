import React from 'react'
import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gardient'>
        {name} Profile
        </span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      {
        data.length === 0 && <p className='pt-12 orange_gradient text-lg'> Create some prompts to view them here .. </p>
      }

      <div className="mt-16 prompt_layout w-full">
        {
          data.map((post) => (
            <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {handleEdit && handleEdit(post)}}
            handleDelete={() => {handleDelete && handleDelete(post)}}
            />
          ))
        }
      </div> 

    </section>
  )
}

export default Profile