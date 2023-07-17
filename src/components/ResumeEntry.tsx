import { ReactNode } from 'react';

interface ResumeEntryProps {
  title: string;
  dateRange: string;
  children: ReactNode;
}

const ResumeEntry = ({ title, dateRange, children }: ResumeEntryProps) => {
  return (
    <div className="resume-entry">
      <div className="resume-entry-header">
        <h3 className="resume-entry-title ">{title}</h3>
        <div className="resume-entry-date plain-text">{dateRange}</div>
      </div>
      <div className="plain-text">{children}</div>
    </div>
  );
};

export default ResumeEntry;
