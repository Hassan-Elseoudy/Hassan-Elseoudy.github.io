export interface Language {
    name: string;
    level: string;
    proficiency: number; // 0-100
    flag: string; // emoji or country code
}

export const languagesData: Language[] = [
    {
        name: "Arabic",
        level: "Native",
        proficiency: 100,
        flag: "🇪🇬",
    },
    {
        name: "English",
        level: "Fluent",
        proficiency: 95,
        flag: "🇬🇧",
    },
    {
        name: "German",
        level: "B1",
        proficiency: 50,
        flag: "🇩🇪",
    },
    {
        name: "French",
        level: "A1",
        proficiency: 20,
        flag: "🇫🇷",
    },
];
