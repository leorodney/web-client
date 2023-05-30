import { useSelector } from "react-redux"
import { StoreState } from "../interfaces/store"
import { useParams } from "react-router-dom";
import { UserProfile } from "../interfaces/user";
import User from "../components/User";
import { useEffect, useState } from "react";
import { Prompt } from "../interfaces/prompt";
import { endpoints, server } from "../utils/axios";

export default function Profile() {
    const user = useSelector((state: StoreState) => state.user);
    const { username } = useParams();
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    console.log({user});

    useEffect(() => {
        (async () => {
            try {
                const { data } = await server.get(endpoints.userPrompts(username as string));
                console.log(data);
                setPrompts(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [username]);

    const profile: UserProfile = { updateable: user.username === username, user };

  return (
    <>
    <User {...profile}/>
    </>
  )
}
