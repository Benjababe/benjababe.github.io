import { useState, useEffect, MutableRefObject } from "react";
import "../assets/styles/Header.css";

interface HeaderProps {
    aboutRef: MutableRefObject<HTMLDivElement>;
    educationRef: MutableRefObject<HTMLDivElement>;
    experienceRef: MutableRefObject<HTMLDivElement>;
    projectsRef: MutableRefObject<HTMLDivElement>;
    trackEvent: Function;
}

const Header = ({ aboutRef, educationRef, experienceRef, projectsRef, trackEvent }: HeaderProps) => {
    const [activeCategory, setActiveCategory] = useState("about");
    const categoryRefs = [aboutRef, educationRef, experienceRef, projectsRef];

    useEffect(() => {
        const checkActiveCategory = () => {
            // get sections that are visible
            const shownSections = categoryRefs
                .map((categoryRef) => {
                    const rect = categoryRef.current.getBoundingClientRect();
                    const heightShown = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    return {
                        id: categoryRef.current.id,
                        ref: categoryRef,
                        height: heightShown,
                    };
                })
                .filter((section) => (section.height > 0));

            // get section which is shown the most
            if (shownSections.length > 0) {
                const maxSection = shownSections.reduce((acc, cur) => {
                    return (cur.height > acc.height) ? cur : acc;
                }, shownSections[0]);

                setActiveCategory(maxSection.id);
            }
        };

        window.addEventListener("scroll", checkActiveCategory);
        return () => {
            window.removeEventListener("scroll", checkActiveCategory);
        }
    });

    const scrollTo = (ref: MutableRefObject<HTMLDivElement>) => {
        ref.current.style.scrollMargin = "5rem";    // header is 5rem tall
        ref.current.scrollIntoView({ behavior: "smooth" });

        trackEvent({
            category: "header",
            action: "scroll-to",
            name: ref.current.id
        });
    };

    return (
        <nav className="nav-header">
            <span
                className={((activeCategory === "about") ? "active" : "") + " nav-link"}
                onClick={() => scrollTo(aboutRef)}>About</span>
            <span
                className={((activeCategory === "education") ? "active" : "") + " nav-link"}
                onClick={() => scrollTo(educationRef)}>Education</span>
            <span
                className={((activeCategory === "experience") ? "active" : "") + " nav-link"}
                onClick={() => scrollTo(experienceRef)}>Experience</span>
            <span
                className={((activeCategory === "projects") ? "active" : "") + " nav-link"}
                onClick={() => scrollTo(projectsRef)}>Projects</span>
        </nav>
    );
};

export default Header;