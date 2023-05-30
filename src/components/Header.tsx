import { Link } from 'react-router-dom';
import defaultUser from "../assets/default-user.jpg";
import { useSelector } from 'react-redux';
import { StoreState } from '../interfaces/store';
import Logout from './Logout';

export default function Header() {
  const {username, profilePicture} = useSelector((state: StoreState) => state.user);
  console.log(profilePicture)
  return (
    <header className="absolute h-16 w-full top-0 z-[999] flex items-center justify-center gap-10 flex-col p-2">
        {/* navbar with login,register  and profile picture if the user logged in shows the logout button */}
        <nav className="absolute right-8 flex group items-center flex-row-reverse w-10 h-10 rounded-full bg-slate-700 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${profilePicture || defaultUser})`}}>
          {/* a profile picture circle when hover over it displays a dropdown menu  */}
          <ul className='absolute w-32 top-12 flex flex-col rounded-md bg-white overflow-hidden'>
            <li className="py-2 px-2 flex items-center justify-evenly w-full text-gray-400 font-medium hover:cursor-pointer hover:text-[var(--clr-p)] transition-all hover:bg-gray-200"><Link to={`/${username}`}>{username}</Link></li>
            <li className='py-2 px-2 flex items-center justify-evenly w-full transition-all hover:bg-gray-200'><Link to={"/about"}>About</Link></li>
            <li className='py-2 px-2 text-center transition-all hover:bg-red-100'><Logout /></li>
          </ul>
        </nav>
    </header>
  )
}
