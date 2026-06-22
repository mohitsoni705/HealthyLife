import { useState } from "react"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import Roleselector from "./Roleselector"
import ViewFeatures from "./ViewFeatures"


const Home = () => {
  // const [activeSection ,setActiveSection]=useState("");
   const scrollToSection = (sectionId:any) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    // setActiveSection(sectionId);
  };
  return (
    <div>
        <Navbar/>
        <HeroSection scrollToSection={scrollToSection}/>
        {/* <Roleselector/> */}
        <ViewFeatures/>
    </div>
  )
}

export default Home
