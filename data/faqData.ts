export interface FAQ {
    question: string;
    answer: string;
    source_url?: string;
}

export const faqData: FAQ[] = [
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
        question: "Do you offer on-campus housing for freshmen?",
        answer: "Yes, all first-year students are guaranteed on-campus housing and are required to live in university residence halls, which helps build a strong community. We offer various dorm styles, including traditional, suite-style, and apartment-style living.",
        source_url: "https://example-university.edu/housing/freshman-housing"
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
    {
        question: "Are there study abroad opportunities?",
        answer: "Absolutely! We have over 200 study abroad programs in 50 countries. Students can study abroad for a semester, a full academic year, or during the summer. We encourage all students to consider this transformative experience.",
        source_url: "https://example-university.edu/study-abroad/programs"
    },
    {
        question: "What campus safety measures are in place?",
        answer: "Campus safety is our top priority. We have a dedicated campus police department, 24/7 emergency blue light phones across campus, a safe ride program, and secure access to all residence halls.",
        source_url: "https://example-university.edu/safety/campus-security"
    }
];