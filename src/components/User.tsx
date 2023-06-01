import { UserProfile } from "../interfaces/user";
import defaultUser from "../assets/default-user.jpg";
import BG from "../assets/motivation.jpeg";
import { useDispatch } from "react-redux";
import { setVisibility } from "../store/productionSlice";

export default function User({updateable, user, prompts}: UserProfile) {
  const dispatch = useDispatch();

  return (
    <main className="flex py-6 mb-4 items-center justify-evenly bg-slate-700 bg-cover bg-center bg-no-repeat text-white" style={{backgroundImage: `url(${BG})`}}>
      <div className="flex items-center gap-6">
        <input hidden type="file" name="profilePicture" id="profilePicture" className="hidden"/>
        {updateable ?
        <label htmlFor="profilePicture">
          <img src={user.profilePicture || defaultUser} alt="user profile" className="w-20 h-20 ring-2 ring-purple-700 rounded-full" />
        </label>
        : 
        <img src={user.profilePicture || defaultUser} alt="user profile" className="w-20 h-20 rounded-full" />
        }
        <div className="flex items-start justify-around flex-col">
          {/* show all of username, uid, joined date, user full name */}
          <h1>{user.name}</h1>
          <h3 className="text-purple-500">{user.username}<span className="text-xs text-gray-400">#{user.uid}</span></h3>
          <p>Joined On: {user.joined}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <h1 className="font-semibold p-2 bg-purple-500 rounded bg-opacity-50 backdrop:blur-md">Downloads Reached: <span className="text-[var(--clr-p)]">{prompts.totalDownloads}</span></h1>
        <h1 className="font-semibold p-2 bg-purple-500 rounded bg-opacity-50 backdrop:blur-md">Likes Reached: <span className="text-[var(--clr-p)]">{prompts.totalLikes}</span></h1>
      </div>
      <button id='production-visibility' onClick={() => dispatch(setVisibility(true))} className='h-full px-8 py-2 text-white transition-all hover:scale-[1.02] active:scale-95 rounded-lg bg-[var(--clr-p)]'>Add New Prompt</button>
    </main>
  )
}
