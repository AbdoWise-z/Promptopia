
import React from 'react';

import Link from 'next/link';

const Form = ({ type, Post, setPost, Submitting, submit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world and let you imgination
        run wild with any AI powered platform.
      </p>

      <form
        onSubmit={submit}
        className='mt-10 w-full flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-bold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={Post.prompt}
            onChange={(e) => {
              setPost({...Post , prompt: e.target.value})
            }}
            placeholder='write your prmopt here'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-bold text-base text-gray-700'>
            Tag
            <br/>
            <span className='font-normal text-sm text-gray-400'>(#product, #web_dev, #fox_my_life)</span>
          </span>

          <textarea
            value={Post.tag}
            onChange={(e) => {
              setPost({...Post , tag: e.target.value})
            }}
            placeholder='#tag'
            required
            className='form_input resize-none'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={"/"} className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={Submitting}
            className='px-5 py-1.5 text-sm bg-purple-800 rounded-full text-white'
          >
            {Submitting ? `${type}...` : type}
          </button>
        </div>

      </form>
    </section>
  );
}

export default Form;
