import { useSelector } from "react-redux"
import { StoreState } from "../interfaces/store"
import { useParams } from "react-router-dom";
import { UserProfile, UserPrompts } from "../interfaces/user";
import User from "../components/User";
import { useEffect, useState } from "react";
import { endpoints, server } from "../utils/axios";
import Prompt from "../components/Prompt";
import Loader from "../components/Loader";
import useAuthorization from "../hooks/authorization";
import Production from "../components/Production";

export default function Profile() {
    // useAuthorization("/login");

    const user = useSelector((state: StoreState) => state.user);
    const { username } = useParams();
    const [prompts, setPrompts] = useState<UserPrompts>({prompts: [], totalDownloads: 0, totalLikes: 0});
    const [fetching, setFetching] = useState(false);
    console.log({user, prompts});

    useEffect(() => {
        (async () => {
            try {
                setFetching(true);
                const { data } = await server.get(endpoints.userPrompts(username as string));
                console.log(data);
                setPrompts(data);
            } catch (error) {
                console.error(error);
            } finally{
                setFetching(false);
            }
        })();
    }, [username]);

    // const  = 
    // const profile: UserProfile = { updateable: user.username === username, user, prompts };


  return (
    <>
    <User updateable={user.username === username} user={user} prompts={prompts}/>
    <Production />
    <h1 className="text-2xl font-bold m-4">My Prompts</h1>
    <section className="w-screen grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {
        fetching ? <Loader size={20} theme="dark"/> :
        // reversing the prompts enable to spotlight the new published prompts
        [...prompts.prompts].reverse().map((prompt, index) => (
            <Prompt
            _id={prompt._id}
            key={index}
            img={prompt.img}
            author={username as string}
            value={prompt.value}
            downloads={prompt.downloads}
            likes={prompt.likes}
            />
        ))
        }
    </section>
    </>
  )
}
