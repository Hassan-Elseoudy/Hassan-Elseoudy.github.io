// Navigation Bar SECTION
const navBar = {
    show: true,
};

// Main Body SECTION
const mainBody = {
    gradientColors: "#000000, #090909, #131313, #1A1A1A, #202020",
    firstName: "Hassan",
    middleName: "",
    lastName: "Elseoudy",
    message: "Senior Software Engineer ⚛ (Backend - Data) ⚛ Technology Enthusiast",
    icons: [
        {
            image: "fa-github",
            url: "https://github.com/Hassan-Elseoudy",
        },
        {
            image: "fa-facebook",
            url: "https://www.facebook.com/Hassan.A.Elseoudy",
        },
        {
            image: "fa-instagram",
            url: "https://www.instagram.com/_._semsem_._/",
        },
        {
            image: "fa-linkedin",
            url: "https://www.linkedin.com/in/hassanel-seoudy/",
        }
    ],
};

const about = {
    show: true,
    heading: "About Me",
    imageLink: require("./hassanelseoudy.png"),
    imageSize: 375,
    message:
    "Hassan, an esteemed figure in the industry, holds a bachelor's degree in Computer Engineering, marking the beginning of a journey that seamlessly integrates technical expertise with business acumen. Specializing in the development of forward-thinking B2B applications, Hassan's proficiency extends beyond mere coding excellence to encompass a pivotal role in shaping the industry. In essence, Hassan's narrative is one of balance – a harmonious blend of technical mastery and strategic insight. His influence is not confined to lines of code but extends into the realm of industry leadership, where he continuously redefines standards for excellence.",
    resume: require("./resume.pdf"),
};

const repos = {
    show: true,
    heading: "Recent Projects",
    gitHubUsername: "Hassan-Elseoudy",
    reposLength: 25,
    specificRepos: [],
};

// SKILLS SECTION
const skills = {
    show: false,
    heading: "Skills",
    hardSkills: [
        {name: "Python", value: 90},
        {name: "SQL", value: 75},
        {name: "Data Structures", value: 85},
        {name: "C/C++", value: 65},
        {name: "JavaScript", value: 90},
        {name: "React", value: 65},
        {name: "HTML/CSS", value: 55},
        {name: "C#", value: 80},
    ],
    softSkills: [
        {name: "Goal-Oriented", value: 80},
        {name: "Collaboration", value: 90},
        {name: "Positivity", value: 75},
        {name: "Adaptability", value: 85},
        {name: "Problem Solving", value: 75},
        {name: "Empathy", value: 90},
        {name: "Organization", value: 70},
        {name: "Creativity", value: 90},
    ],
};

// GET IN TOUCH SECTION
const getInTouch = {
    show: true,
    heading: "Get In Touch",
    message:
        "If you know of any positions available, have any questions, or just want to say hi, please feel free to email me at",
    email: "hassan.elseoudy@gmail.com",
};

const experiences = {
    show: true,
    heading: "Experiences",
    data: [
        {
            role: 'Founder & CEO',
            companylogo: require('../assets/img/noaat.png'),
            date: 'Jan 2024 – Present',
        },
        {
            role: 'Senior Software Engineer (JVM)',
            companylogo: require('../assets/img/Zalando-SE-logo.png'),
            date: 'Sep 2022 – Present',
        },
        {
            role: 'Software Engineer (Python/Django)',
            companylogo: require('../assets/img/cynopsis.png'),
            date: 'Oct 2021 – Present',
        },
        {
            role: 'Software Engineer (Java)',
            companylogo: require('../assets/img/dhl.jpg'),
            date: 'Oct 2021 – May 2022',
        },
        {
            role: 'Software Engineer (Back-end/Data Analytics)',
            companylogo: require('../assets/img/rubikal.png'),
            date: 'Jan 2021 – Jun 2022',
        },
        {
            role: 'Cloud Native Engineer (Part time)',
            companylogo: require('../assets/img/cassbana.png'),
            date: 'Oct 2020 – Feb 2021',
        },
        {
            role: 'Software Engineer (Full-stack)',
            companylogo: require('../assets/img/sia.jfif'),
            date: 'Apr 2020 – Dec 2020',
        },
        {
            role: 'Software Engineer (Undergraduate)',
            companylogo: require('../assets/img/robotech.png'),
            date: 'Aug 2018 – April 2020',
        },
    ]
}

export {navBar, mainBody, about, repos, skills, getInTouch, experiences};
