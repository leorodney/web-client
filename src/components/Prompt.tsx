import { useState } from 'react';
import { Prompt } from '../interfaces/prompt'
import { endpoints, server } from '../utils/axios';

export default function Prompt({ _id, author, img, value, downloads, likes }: Prompt) {
  const [updateType, setUpdateType] = useState(false);
  // display the min content and suffixed with ... 
  const splitValue = value.split(" ").length > 22 ? value.split(' ').slice(0, 22).join(' ')+" ..." : value;

  // update the prompt likes in the database
  const updateLikes = async () => {
    try {
      setUpdateType(!updateType);
      const { data } = await server.post(endpoints.promptlikes, {id: _id, type: updateType ? "unlike" : "like"});
      likes = data.likes;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // update the prompt downloads in the database
  const updateDownloads = async () => {
    try {
      const { data } = await server.post(endpoints.promptdownloads, {id: _id});
      downloads = data.downloads;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <article id={_id} className="relative h-72 aspect-square group flex justify-center items-center rounded-lg overflow-hidden border border-slate-800 bg-slate-800 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${img})`}}>
      <button className='absolute left-2 top-[-50%] group-hover:top-2 px-4 py-1 text-white transition-all hover:scale-[1.02] active:scale-95 rounded-lg bg-[var(--clr-p)]'>Use It</button>
      <div className='absolute w-full py-4 text-white max-h-[70%] bottom-[-120%] bg-slate-900 bg-opacity-[0.7] flex justify-between items-center gap-2 flex-col transition-all group-hover:bottom-0'>
        <div className='w-full px-4 flex justify-between items-center'>
          <h3 className='capitalize text-[var(--clr-p)]'>{author}</h3>       
          <div className='flex gap-2 items-center'>
            <button onClick={updateDownloads} className="flex gap-1"><i className="h-6 w-6 fi fi-br-arrow-small-down flex justify-center items-center text-base bg-[var(--clr-ac)] rounded-full text-white"></i> <span>{downloads}</span></button>
            <button onClick={updateLikes} className="flex gap-1"><i className="h-6 w-6 fi fi-sr-heart flex justify-center items-center text-sm bg-gray-800 rounded-full text-[var(--clr-p)]"></i> <span>{likes}</span></button>
          </div>
        </div>
        <p className='px-4 text-sm' title={value}>{splitValue}</p>
      </div>
    </article>
  )
}
