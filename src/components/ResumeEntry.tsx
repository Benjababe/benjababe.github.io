import { ReactNode } from "react";
import "../assets/styles/App.css";

interface EducationEntryProps {
    children: ReactNode;
    dateRange: string;
}

const ResumeEntry = ({ children, dateRange }: EducationEntryProps) => {
    return (
        <div className="resume-entry plain-text">
            {children}
            <div className="resume-entry-date">
                {dateRange}
            </div>
        </div>
    );
};

export default ResumeEntry;