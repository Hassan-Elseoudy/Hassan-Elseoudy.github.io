export interface Certification {
    id: string;
    name: string;
    provider: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
    skills?: string[];
}

export const certificationsData: Certification[] = [
    {
        id: "agentic-ai",
        name: "Understanding Agentic AI",
        provider: "Digital Workforce Services",
        issueDate: "Nov 2025",
        credentialId: "67432c58827e1409ba0ccf8a",
    },
    {
        id: "spring-ecosystem",
        name: "Spring - Ecosystem and Core",
        provider: "LearnQuest",
        issueDate: "Sep 2021",
        credentialId: "6Q8KX4RESZTZ",
        skills: ["Kotlin"],
    },
    {
        id: "aws-serverless",
        name: "AWS Fundamentals: Building Serverless Applications",
        provider: "Amazon Web Services (AWS)",
        issueDate: "Jun 2021",
        credentialId: "MPT78HA35SAQ",
    },
    {
        id: "angular",
        name: "Front-End JavaScript Frameworks: Angular",
        provider: "Coursera",
        issueDate: "Aug 2020",
        credentialId: "A9H3BGECNRRK",
    },
    {
        id: "agile-jira",
        name: "Agile with Atlassian Jira",
        provider: "Coursera",
        issueDate: "Apr 2020",
        credentialId: "P9R39GN5H6DU",
    },
    {
        id: "gke",
        name: "Getting Started with Google Kubernetes Engine",
        provider: "Coursera",
        issueDate: "Apr 2020",
        credentialId: "UF46LLDELL8R",
    },
    {
        id: "sql-data-science",
        name: "SQL for Data Science",
        provider: "Coursera",
        issueDate: "Apr 2020",
        credentialId: "96H2A83PPYAG",
    },
    {
        id: "git",
        name: "Version Control with Git",
        provider: "Coursera",
        issueDate: "Apr 2020",
        credentialId: "9KFXVA5JSEMH",
    },
    {
        id: "neural-networks",
        name: "Neural Networks and Deep Learning",
        provider: "Coursera",
        issueDate: "Aug 2019",
        credentialId: "BBKR2JV2AGFZ",
    },
    {
        id: "open-source-ds",
        name: "Open Source Tools for Data Science",
        provider: "Coursera",
        issueDate: "Aug 2019",
        credentialId: "6VDVGJXSFT35",
    },
    {
        id: "what-is-ds",
        name: "What is Data Science?",
        provider: "Coursera",
        issueDate: "Aug 2019",
        credentialId: "76XW4ERAJY4E",
    },
    {
        id: "ibm-ai",
        name: "Artificial Intelligence Intro",
        provider: "IBM",
        issueDate: "Sep 2018",
    },
    {
        id: "gcp-essentials",
        name: "GCP Essentials",
        provider: "Qwiklabs",
        issueDate: "Sep 2018",
    },
    {
        id: "java-jsf",
        name: "Java SE8: JSF - Introduction to Java Server Faces",
        provider: "New Horizons",
        issueDate: "Mar 2018",
    },
    {
        id: "java-jdbc",
        name: "Java SE8: JDBC - Fundamentals of Java Database Connectivity",
        provider: "New Horizons",
        issueDate: "Feb 2018",
    },
    {
        id: "java-mysql",
        name: "Java SE8: Fundamentals Of MySQL",
        provider: "New Horizons",
        issueDate: "Jan 2018",
    },
    {
        id: "java-gui",
        name: "Java SE8: GUI Programming",
        provider: "New Horizons",
        issueDate: "Nov 2017",
    },
    {
        id: "java-oop",
        name: "Java SE8: Object Oriented Programming",
        provider: "New Horizons",
        issueDate: "Sep 2017",
    },
    {
        id: "java-fundamentals",
        name: "Java SE8: Fundamentals Of Programming",
        provider: "New Horizons",
        issueDate: "Jul 2017",
    },
];
