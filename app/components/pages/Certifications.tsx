"use client";

import { certificationsData } from "@/app/data/certifications";
import { languagesData } from "@/app/data/languages";
import { Slide } from "../../animation/Slide";
import { motion } from "framer-motion";
import { BiCertification, BiGlobe, BiLinkExternal } from "react-icons/bi";

const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/semsem-dev/details/certifications/";

export default function Certifications() {
    // Group certifications by provider
    const groupedCerts = certificationsData.reduce((acc, cert) => {
        const provider = cert.provider;
        if (!acc[provider]) {
            acc[provider] = [];
        }
        acc[provider].push(cert);
        return acc;
    }, {} as Record<string, typeof certificationsData>);

    const providerOrder = [
        "Digital Workforce Services",
        "Amazon Web Services (AWS)",
        "LearnQuest",
        "Coursera",
        "IBM",
        "Qwiklabs",
        "New Horizons",
    ];

    return (
        <section className="mt-32">
            <Slide delay={0.16}>
                <div className="mb-16">
                    <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
                        Certifications & Languages
                    </h2>
                    <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
                        Professional certifications and language proficiencies.
                    </p>
                </div>
            </Slide>

            {/* Languages Section */}
            <Slide delay={0.18}>
                <div className="mb-12">
                    <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-zinc-800 dark:text-zinc-100">
                        <BiGlobe className="text-blue-500" />
                        Languages
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {languagesData.map((lang, index) => (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="p-4 rounded-xl dark:bg-zinc-800/50 bg-zinc-50 border dark:border-zinc-700/50 border-zinc-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div>
                                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {lang.name}
                                                </h4>
                                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                                    {lang.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                                        <motion.div
                                            style={{
                                                height: "100%",
                                                borderRadius: "9999px",
                                                background: "linear-gradient(to right, #3b82f6, #9333ea)"
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${lang.proficiency}%` }}
                                            transition={{ delay: 0.5 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Slide>

            {/* Certifications Section */}
            <Slide delay={0.2}>
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                            <BiCertification className="text-yellow-500" />
                            Certifications
                            <span className="text-sm font-normal text-zinc-500">
                                ({certificationsData.length})
                            </span>
                        </h3>

                    </div>

                    <div className="space-y-6">
                        {providerOrder.map((provider) => {
                            const certs = groupedCerts[provider];
                            if (!certs) return null;

                            return (
                                <motion.div
                                    key={provider}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="p-4 rounded-xl dark:bg-zinc-800/30 bg-zinc-50/50 border dark:border-zinc-700/30 border-zinc-200/50">
                                        <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                                            {provider}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {certs.map((cert, index) => (
                                                <motion.div
                                                    key={cert.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                >
                                                    <a
                                                        href={LINKEDIN_CERTS_URL}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-200 text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/5"
                                                        title={`${cert.name} - ${cert.issueDate}`}
                                                    >
                                                        {cert.name.length > 40
                                                            ? cert.name.substring(0, 37) + "..."
                                                            : cert.name}
                                                        <BiLinkExternal className="text-xs text-zinc-400" />
                                                    </a>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Slide>
        </section>
    );
}
