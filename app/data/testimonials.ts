export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    relationship: string;
    date: string;
    text: string;
    linkedinUrl?: string;
}

export const testimonialsData: Testimonial[] = [
    {
        id: "mauro-sanchez",
        name: "Mauro Sanchez",
        role: "Technical Lead",
        company: "Google (via Vaco)",
        relationship: "Worked together at Cynopsis Solutions",
        date: "August 2022",
        text: "Hassan is a very knowledgeable Software Engineer. He is always willing to help. During my time there, he was always looking for ways to improve the codebase in order to make it more efficient, robust, and clean. Some implementation he created were a suite of tests that created a coverage report of the codebase and also implemented pre-commit hooks to make sure that code being pushed would conform to pylint norms. I would enjoy working with him again because he is a reliable and kind person.",
    },
    {
        id: "jaehwi-kwon",
        name: "Jaehwi Kwon",
        role: "Full Stack Software Engineer",
        company: "Python, JavaScript, React, Vue",
        relationship: "Worked together at Cynopsis Solutions",
        date: "August 2022",
        text: "Hassan started out as a great coworker and has since become a good friend as well. At first, Hassan was intimidatingly hardworking, I would check Slack and see that he was still working at 3AM his time. He has a voracious appetite for knowledge and would find information from the deep recesses of Stack Overflow that was invaluable. When Hassan was first introduced to my team, he was a bit lacking in Python experience and specialized in Java. After a few months, he has become just as proficient at Python as everyone else. Hassan is also proficient at speaking with clients. He is an exemplary professional.",
    },
    {
        id: "abdelrahman-saleh",
        name: "Abdelrahman Saleh",
        role: "Data Engineer",
        company: "Zalando",
        relationship: "Studied together",
        date: "June 2022",
        text: "Hassan is hardworking and resilient, and is always striving to achieve excellence, and do things the right way.",
    },
    {
        id: "youssef-essam",
        name: "Youssef Essam",
        role: "Senior Android Software Engineer",
        company: "Jahez",
        relationship: "Worked on different teams",
        date: "September 2021",
        text: "Hassan is knowledgeable and a problem solver. He is continuously eager to learn. I would recommend and endorse Hassan.",
    },
    {
        id: "abdullah-elbradey",
        name: "Abdullah Elbradey",
        role: "Senior Software Engineer",
        company: "Infralabs LTD",
        relationship: "Worked together",
        date: "June 2021",
        text: "Hassan is a great developer and a leader! During our college years, I had the pleasure of working with him on the same projects and extracurricular activities. He always kept the team motivated and shared knowledge. I believe he is one of the best leaders I ever had, as his skills are highly developed. His ability to deal with a crisis and come up with new ways to achieve results was always an inspiration.",
    },
    {
        id: "khaled-mashaly",
        name: "Khaled Mashaly",
        role: "Senior Software Engineer",
        company: "",
        relationship: "Senior colleague",
        date: "May 2021",
        text: "Very energetic and a fast learner. Able to develop the required skills and knowledge to finish the task at hand quickly and efficiently. Autonomous, needs little to no guidance to get the job done.",
    },
    {
        id: "muhammad-hatem",
        name: "Muhammad Hatem",
        role: "Senior MLOps Engineer",
        company: "GCP Professional Cloud Architect",
        relationship: "Studied together",
        date: "May 2021",
        text: "Hassan was a colleague of mine, he is a hard worker and a person with a vision who knows where to aim at every phase. He is disciplined and I believe he has a great potential.",
    },
    {
        id: "abdelfattah-mohamed",
        name: "Abdelfattah Mohamed",
        role: "Software Engineer",
        company: "Meta",
        relationship: "Studied together",
        date: "May 2021",
        text: "Hassan was my teammate at ACM Student chapter. He is a hard-working person and a good team leader and getting things done in a perfect way.",
    },
    {
        id: "khaled-salman",
        name: "Khaled Salman",
        role: "Lead CNC Programmer",
        company: "Manufacturing Engineer",
        relationship: "Worked together",
        date: "May 2021",
        text: "Has a good mental to solve the problems, usually thinking out of box, so friendly and cooperative.",
    },
    {
        id: "nevine-elagawany",
        name: "Nevine Elagawany",
        role: "Software Engineer",
        company: "VECTOR Informatik",
        relationship: "Studied together",
        date: "May 2021",
        text: "Hassan is all about teamwork and getting things done. It was my pleasure working with him on several college projects. Wishing you the best of luck in your future endeavors!",
    },
];
