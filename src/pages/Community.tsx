import Hero from "../components/Hero";
import ShowCases from "../components/ShowCases";
import useAuthorization from "../hooks/authorization";
import Production from "../components/Production";
import Header from "../components/Header";

export default function Community() {
  useAuthorization("/login");
  return (
    <>
      <Header/>
      <Hero/>
      <Production/>
      <ShowCases/>
    </>
  )
};
