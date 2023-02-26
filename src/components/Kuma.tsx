import SwipeableViews from "react-swipeable-views";
import kumaPeek from "../assets/images/kuma/kuma-peek.png";
import "../assets/styles/Kuma.css";

interface KumaWidgetProps {
    showKuma: boolean;
    setShowKuma: React.Dispatch<React.SetStateAction<boolean>>;
}

interface KumaProps {
    showKuma: boolean;
}

export const KumaWidget = ({ showKuma, setShowKuma }: KumaWidgetProps) => {
    const toggleKuma = () => {
        setShowKuma(!showKuma);
    };

    return (
        <>
            <div>
                <img
                    className="kuma-peek"
                    onClick={toggleKuma}
                    src={kumaPeek}
                    alt="Kuma Peek"></img>
            </div>
        </>
    );
};

export const Kuma = ({ showKuma }: KumaProps) => {
    return (
        <section className={`section kuma ${(showKuma) ? "shown" : "hidden"}`}>
            <div className="blog-container">

            </div>
        </section>
    );
}