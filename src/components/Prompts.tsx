
export default function Prompts() {
  return (
    <section className="w-screen grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {
        fetching ? <Loader size={20} theme="dark"/> :
        // reversing the prompts enable to spotlight the new published prompts
        [...prompts].reverse().map((prompt, index) => (
            <Prompt
            key={index}
            img={prompt.img}
            author={username}
            value={prompt.value}
            downloads={prompt.downloads}
            likes={prompt.likes}
            />
        ))
        }
    </section>
  )
}
