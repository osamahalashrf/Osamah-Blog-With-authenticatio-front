"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Code,
    Database,
    Smartphone,
    Cloud,
    Cpu,
    Lock,
    ChevronRight,
    BookOpen,
    Search,
    Twitter,
    Linkedin,
    Facebook,
    Download,
    Shield,
    CpuIcon,
    SmartphoneIcon,
    Server
} from "lucide-react";

const tabKeys = [
    { id: "frontend", icon: Code, color: "from-blue-500 to-cyan-500" },
    { id: "backend", icon: Database, color: "from-green-500 to-emerald-500" },
    { id: "mobile", icon: Smartphone, color: "from-purple-500 to-pink-500" },
    { id: "devops", icon: Cloud, color: "from-orange-500 to-red-500" },
    { id: "ai", icon: Cpu, color: "from-indigo-500 to-purple-500" },
    { id: "security", icon: Lock, color: "from-red-500 to-orange-500" },
];

const socialButtons = [
    { icon: Twitter, label: "Twitter", color: "hover:bg-blue-100 hover:text-blue-600" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-100 hover:text-blue-700" },
    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-100 hover:text-blue-800" },
];

export default function GuidePage() {
    const t = useTranslations("GuidePage");
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("frontend");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && tabKeys.some(t => t.id === tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`?tab=${tabId}`, { scroll: false });
    };

    const activeTabData = tabKeys.find(tab => tab.id === activeTab);

    const renderContent = () => {
        switch (activeTab) {
            case "frontend":
                return renderFrontendContent();
            case "backend":
                return renderBackendContent();
            case "mobile":
                return renderMobileContent();
            case "devops":
                return renderDevOpsContent();
            case "ai":
                return renderAIContent();
            case "security":
                return renderSecurityContent();
            default:
                return renderFrontendContent();
        }
    };

    const renderFrontendContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.frontend.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.frontend.intro")}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 my-6">
                    <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-300">{t("content.frontend.whyImportant")}</h4>
                    <ul className="space-y-2">
                        {t.raw("content.frontend.whyImportantPoints").map((point: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.frontend.coreTechTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    {t.raw("content.frontend.coreTech").map((tech: any, index: number) => (
                        <div key={index} className={`border-l-4 ${index === 0 ? 'border-orange-500' : index === 1 ? 'border-blue-500' : 'border-yellow-500'} bg-gray-50 dark:bg-gray-700/30 p-4 rounded-r-lg`}>
                            <h4 className="font-bold text-lg">{tech.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.frontend.frameworksTitle")}</h3>
                <div className="space-y-4">
                    {t.raw("content.frontend.frameworks").map((framework: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold">{framework.name}</h4>
                                    {framework.company && (
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                            {framework.company}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">{framework.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.frontend.toolsTitle")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {t.raw("content.frontend.tools").map((tool: string, index: number) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg text-center">
                            <span className="text-sm font-medium">{tool}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.frontend.bestPractices")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.raw("content.frontend.bestPracticesList").map((practice: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700/50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>{practice}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderBackendContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.backend.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.backend.intro")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.backend.languagesTitle")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {t.raw("content.backend.languages").map((lang: string, index: number) => (
                        <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl text-center">
                            <span className="font-medium text-green-700 dark:text-green-300">{lang}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.backend.databasesTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.raw("content.backend.databases").map((db: any, index: number) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                            <h4 className="font-bold text-lg mb-2">{db.type}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{db.examples}</p>
                            <p className="text-sm">{db.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.backend.apisTitle")}</h3>
                <div className="space-y-3">
                    {t.raw("content.backend.apis").map((api: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                            <Server className="w-5 h-5 text-primary" />
                            <span>{api}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.backend.securityTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {t.raw("content.backend.security").map((item: string, index: number) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-medium">{item}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderMobileContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.mobile.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.mobile.intro")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.mobile.nativeTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.raw("content.mobile.native").map((platform: any, index: number) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <SmartphoneIcon className="w-8 h-8 text-purple-600" />
                                <h4 className="text-xl font-bold">{platform.platform}</h4>
                            </div>
                            <div className="space-y-2">
                                <p><strong>اللغة:</strong> {platform.language}</p>
                                <p><strong>الأدوات:</strong> {platform.tools}</p>
                                <p className="text-sm text-muted-foreground">{platform.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.mobile.hybridTitle")}</h3>
                <div className="space-y-4">
                    {t.raw("content.mobile.hybrid").map((framework: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <SmartphoneIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg">{framework.framework}</h4>
                                <p className="text-sm text-muted-foreground">{framework.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.mobile.considerationsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.raw("content.mobile.considerations").map((consideration: string, index: number) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                                <span>{consideration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderDevOpsContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.devops.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.devops.intro")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.devops.practicesTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {t.raw("content.devops.practices").map((practice: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                                <h4 className="font-bold">{practice}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.devops.toolsTitle")}</h3>
                <div className="space-y-4">
                    {t.raw("content.devops.tools").map((tool: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Cloud className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg">{tool.name}</h4>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.devops.benefitsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.raw("content.devops.benefits").map((benefit: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span>{benefit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderAIContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.ai.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.ai.intro")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.ai.mlTitle")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                    {t("content.ai.ml")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.ai.dlTitle")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    {t("content.ai.dl")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.ai.algorithmsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.raw("content.ai.algorithms").map((algorithm: any, index: number) => (
                        <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <CpuIcon className="w-8 h-8 text-indigo-600" />
                                <h4 className="text-xl font-bold">{algorithm.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{algorithm.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.ai.applicationsTitle")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {t.raw("content.ai.applications").map((app: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center">
                            <Cpu className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                            <span className="text-sm font-medium">{app}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    const renderSecurityContent = () => (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.security.title")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t("content.security.intro")}
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.security.principlesTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {t.raw("content.security.principles").map((principle: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-red-600" />
                                <span className="font-medium">{principle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.security.threatsTitle")}</h3>
                <div className="space-y-4">
                    {t.raw("content.security.threats").map((threat: any, index: number) => (
                        <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
                            <h4 className="font-bold text-lg text-red-600 dark:text-red-400 mb-2">{threat.name}</h4>
                            <p className="text-sm text-muted-foreground">{threat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.security.protectionTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.raw("content.security.protection").map((method: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <span>{method}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-4 text-primary">{t("content.security.bestPracticesTitle")}</h3>
                <div className="space-y-3">
                    {t.raw("content.security.bestPractices").map((practice: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span>{practice}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    return (
        <div className="min-h-screen gradient-bg">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-white to-purple-500/5 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <span className="text-primary font-medium">{t("toptitle")}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-gradient">{t("title")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            {t("subtitle")}
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="relative">
                                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("placeholder")}
                                    className="w-full px-6 py-4 pr-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Tabs Navigation */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    {t("tabs.title")}
                                </h3>
                                <nav className="space-y-2">
                                    {tabKeys.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${activeTab === tab.id
                                                ? "bg-white/20"
                                                : "bg-gradient-to-br " + tab.color
                                                }`}>
                                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-white"
                                                    }`} />
                                            </div>
                                            <span className="font-medium text-right flex-1">
                                                {t(`tabs.${tab.id}`)}
                                            </span>
                                            {activeTab === tab.id && (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl p-6 border border-primary/10">
                                <h4 className="font-bold mb-3">{t("guideStats")}</h4>
                                <div className="space-y-3">
                                    {tabKeys.map((tab) => (
                                        <div key={tab.id} className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                {t(`tabs.${tab.id}`)}
                                            </span>
                                            <span className="text-sm font-bold">12 {t("tabs.title")}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
                            >
                                {/* Tab Header */}
                                <div className={`bg-gradient-to-r ${activeTabData?.color} p-8`}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                            {activeTabData && <activeTabData.icon className="w-8 h-8 text-white" />}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                                {t(`content.${activeTab}.title`)}
                                            </h2>
                                            <p className="text-white/80 mt-2">
                                                {t("lastUpdate")} {new Date().toLocaleDateString('ar-SA')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tab Content */}
                                <div className="p-8">
                                    <div className="prose prose-lg dark:prose-invert max-w-none">
                                        {renderContent()}
                                    </div>

                                    {/* Navigation between tabs */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <span className="text-sm text-muted-foreground">{t("shareGuide")}</span>
                                            <div className="flex gap-2">
                                                {socialButtons.map((social) => (
                                                    <button
                                                        key={social.label}
                                                        className={`px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg ${social.color} transition-colors text-sm flex items-center gap-2`}
                                                    >
                                                        <social.icon className="w-4 h-4" />
                                                        {social.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2">
                                            <Download className="w-5 h-5" />
                                            {t("downloadPdf")}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Related Guides */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-6">{t("relatedGuides")}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {tabKeys
                                    .filter(tab => tab.id !== activeTab)
                                    .slice(0, 3)
                                    .map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
                                        >
                                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tab.color} flex items-center justify-center mb-4`}>
                                                <tab.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                                {t(`tabs.${tab.id}`)}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t("viewFullGuide")} {t(`tabs.${tab.id}`)}
                                            </p>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}