import React, {useRef} from "react";

function About(){

    const footerRef = useRef(null);

    // Scroll function
    const scrollToFooter = () => {
      // Ensure footerRef.current is not null before attempting to scroll
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
return(
    
    <div ref={scrollToFooter}>
        <h1>About!</h1>
    </div>
)
}

export default About;