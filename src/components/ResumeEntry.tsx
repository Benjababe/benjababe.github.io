import { ReactNode } from "react";

interface ResumeEntryProps {
    children: ReactNode;
    dateRange: string;
}

const ResumeEntry = ({ children, dateRange }: ResumeEntryProps) => {
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