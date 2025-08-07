
import React from 'react';
import { UniversityLogo } from '../components/logos/UniversityLogo';
import { SaasLogo } from '../components/logos/SaasLogo';
import { EcommerceLogo } from '../components/logos/EcommerceLogo';

export interface FAQ {
    question: string;
    answer: string;
    source_url?: string;
}

export interface ThemeClasses {
    primary: string;
    primaryHover: string;
    primaryDisabled: string;
    textOnPrimary: string;
    ring: string;
    iconFill: string;
    iconBg: string;
    typingIndicator: string;
    font: string;
    dark: {
        primaryDisabled: string;
        iconFill: string;
        iconBg: string;
    };
}


export interface CustomerConfig {
    id: string;
    name: string;
    tagline: string;
    placeholder: string;
    exampleQuestions: string[];
    systemInstruction: string;
    faqData: FAQ[];
    theme: ThemeClasses;
    logo: React.FC<React.SVGProps<SVGSVGElement>>;
}

const universityTheme: ThemeClasses = {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryDisabled: 'disabled:bg-blue-300',
    textOnPrimary: 'text-white',
    ring: 'focus:ring-blue-500 dark:focus:ring-blue-400',
    iconFill: 'text-blue-500',
    iconBg: 'bg-blue-100',
    typingIndicator: 'bg-blue-300',
    font: 'font-serif',
    dark: {
        primaryDisabled: 'dark:disabled:bg-blue-800',
        iconFill: 'dark:text-blue-400',
        iconBg: 'dark:bg-blue-900',
    },
};

const saasTheme: ThemeClasses = {
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryDisabled: 'disabled:bg-green-300',
    textOnPrimary: 'text-white',
    ring: 'focus:ring-green-500 dark:focus:ring-green-400',
    iconFill: 'text-green-500',
    iconBg: 'bg-green-100',
    typingIndicator: 'bg-green-300',
    font: 'font-sans',
    dark: {
        primaryDisabled: 'dark:disabled:bg-green-800',
        iconFill: 'dark:text-green-400',
        iconBg: 'dark:bg-green-900',
    },
};

const ecommerceTheme: ThemeClasses = {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    primaryDisabled: 'disabled:bg-teal-300',
    textOnPrimary: 'text-white',
    ring: 'focus:ring-teal-500 dark:focus:ring-teal-400',
    iconFill: 'text-teal-500',
    iconBg: 'bg-teal-100',
    typingIndicator: 'bg-teal-300',
    font: 'font-sans',
    dark: {
        primaryDisabled: 'dark:disabled:bg-teal-800',
        iconFill: 'dark:text-teal-400',
        iconBg: 'dark:bg-teal-900',
    },
};

const universityConfig: CustomerConfig = {
    id: 'university',
    name: 'University Assistant',
    tagline: 'Your AI-powered guide',
    placeholder: 'Ask about admissions, tuition, etc.',
    logo: UniversityLogo,
    exampleQuestions: [
        "How do I apply for financial aid?",
        "What is the student-to-faculty ratio?",
        "Tell me about on-campus housing.",
    ],
    systemInstruction: `You are a friendly and helpful university admissions chatbot. Your goal is to answer user questions based ONLY on the provided Frequently Asked Questions (FAQ) list. Do not use any external knowledge. If a source URL is provided with an answer, you MUST cite it. If the answer to the question is not found in the FAQ list, you must politely state that you don't have the information and suggest they contact the admissions office directly for the most accurate information. Do not make up answers or URLs.`,
    faqData: [
        {
            question: "What are the admission requirements for undergraduate programs?",
            answer: "General admission requirements include a high school diploma or equivalent, a minimum GPA of 3.0, and submission of SAT or ACT scores. Some programs may have additional requirements, such as a portfolio for arts programs or specific prerequisite courses for science and engineering.",
            source_url: "https://example-university.edu/admissions/undergraduate-requirements"
        },
        {
            question: "How do I apply for financial aid?",
            answer: "To apply for financial aid, you must complete the Free Application for Federal Student Aid (FAFSA). Our school code is 001234. We also recommend completing the CSS Profile for institutional aid. The deadline for priority consideration is March 1st.",
            source_url: "https://example-university.edu/financial-aid/how-to-apply"
        },
        {
            question: "What is the tuition cost for an out-of-state student?",
            answer: "For the 2024-2025 academic year, the estimated tuition and fees for out-of-state undergraduate students is $38,500. This does not include room, board, or other personal expenses.",
            source_url: "https://example-university.edu/tuition/costs-and-fees"
        },
        {
            question: "What majors and minors are available?",
            answer: "We offer over 150 undergraduate majors and 100 minors across our 8 colleges, including the College of Arts & Sciences, the School of Engineering, and the Business School. You can explore all our academic programs on our website.",
            source_url: "https://example-university.edu/academics/programs"
        },
        {
            question: "What is the student-to-faculty ratio?",
            answer: "Our student-to-faculty ratio is 14:1, which allows for personalized attention and small class sizes. Over 60% of our classes have fewer than 20 students."
        },
    ],
    theme: universityTheme,
};

const saasConfig: CustomerConfig = {
    id: 'saas-co',
    name: 'InnovateSaaS Support',
    tagline: 'Your product specialist',
    placeholder: 'Ask about billing, accounts, etc.',
    logo: SaasLogo,
    exampleQuestions: [
        "How do I reset my password?",
        "What are your pricing plans?",
        "How do I upgrade my account?",
    ],
    systemInstruction: `You are a support agent for 'InnovateSaaS'. Your goal is to help users with their account and billing questions based ONLY on the provided FAQ. Be concise and friendly. If you don't know the answer, direct them to email support@innovatesaas.example.com.`,
    faqData: [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. An email will be sent to you with further instructions."
        },
        {
            question: "What are your pricing plans?",
            answer: "We offer three main plans: Starter ($10/month), Business ($50/month), and Enterprise (custom pricing). You can see a full feature comparison on our pricing page.",
            source_url: "https://example-saas.com/pricing"
        },
        {
            question: "How do I upgrade my account?",
            answer: "You can upgrade your account at any time from your account dashboard. Navigate to the 'Billing' section and select 'Change Plan'."
        },
    ],
    theme: saasTheme,
};

const ecommerceConfig: CustomerConfig = {
    id: 'ecommerce-store',
    name: 'GadgetGrove Help',
    tagline: 'Your friendly shopping assistant',
    placeholder: 'Ask about orders, shipping...',
    logo: EcommerceLogo,
    exampleQuestions: [
        "What is your return policy?",
        "How do I track my order?",
        "Do you ship internationally?",
    ],
    systemInstruction: `You are a customer service representative for 'GadgetGrove'. Answer questions about orders, shipping, and returns using ONLY the provided FAQ. Be friendly and helpful. If you don't have the answer, advise the customer to contact help@gadgetgrove.example.com.`,
    faqData: [
        {
            question: "What is your return policy?",
            answer: "We accept returns on all items within 30 days of delivery. The item must be in unused condition with its original packaging. To start a return, please visit our returns portal.",
            source_url: "https://example-ecommerce.com/returns"
        },
        {
            question: "How do I track my order?",
            answer: "Once your order has shipped, you will receive an email containing your tracking number. You can use this number on the carrier's website to see the latest shipping updates."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide! Shipping costs and times vary by destination and will be calculated at checkout. Please note that customers are responsible for any customs fees or import duties."
        },
    ],
    theme: ecommerceTheme,
};


const customerData: Record<string, CustomerConfig> = {
    [universityConfig.id]: universityConfig,
    [saasConfig.id]: saasConfig,
    [ecommerceConfig.id]: ecommerceConfig,
};

/**
 * Retrieves the configuration for a given customer ID.
 * Defaults to the 'university' configuration if the ID is not found or is null.
 * @param customerId The ID of the customer.
 * @returns The customer's configuration.
 */
export const getCustomerConfig = (customerId: string | null): CustomerConfig => {
    const defaultConfig = customerData['university'];
    if (!customerId) return defaultConfig;
    return customerData[customerId] || defaultConfig;
};
