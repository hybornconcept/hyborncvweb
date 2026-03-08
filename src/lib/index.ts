// Define the available services
export const careerlevelOptions = [
    { value: "entry-level", label: "Entry-Level" },
    { value: "mid-level", label: "Mid-Level" },
    { value: "senior-level", label: "Senior-Level" },
    { value: "executive-level", label: "Executive-Level" },
    { value: "management-level", label: "Management-Level" },
    { value: "junior-level", label: "Junior-Level" },
    { value: "internship", label: "Internship" },
    { value: "director-level", label: "Director-Level" },
    { value: "ceo-level", label: "CEO/President-Level" },
]


export const interestOptions = [
    { value: "Medical Doctor", label: "Medical Doctor" },
    { value: "Nurse", label: "Nurse" },
    { value: "Medical Sales Rep", label: "Medical Sales Rep" },
    { value: "HMO Officer", label: "HMO Officer" },
    { value: "Student (Masters program)", label: "Student (Masters program)" },
    { value: "Student (PHD program)", label: "Student (PHD program)" },
    { value: "Student (Doctorate program)", label: "Student (Doctorate program)" },
    { value: "Community Pharmacist", label: "Community Pharmacist" },
    { value: "Public Health officer (NGO)", label: "Public Health officer (NGO)" },
    { value: "Receptionist", label: "Receptionist" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "Marketing Manager", label: "Marketing Manager" },
    { value: "Accountant", label: "Accountant" },
    { value: "Human Resource Manager", label: "Human Resource Manager" },
    { value: "Administrative Assistant", label: "Administrative Assistant" },
    { value: "Office Manager", label: "Office Manager" },
    { value: "Financial Advisor", label: "Financial Advisor" },
    { value: "Executive Secretary", label: "Executive Secretary" },
    { value: "Data Entry Clerk", label: "Data Entry Clerk" },
    { value: "Executive Assistant", label: "Executive Assistant" },
    { value: "Human Resources Officer", label: "Human Resources Officer" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Marketing Specialist", label: "Marketing Specialist" },
    { value: "Customer Service Representative", label: "Customer Service Representative" },
    { value: "IT Officer", label: "IT Officer" },
    { value: "Legal Officer (Lawyer)", label: "Legal Officer (Lawyer)" },
    { value: "Procurement Officer", label: "Procurement Officer" },
    { value: "Sales Coordinator", label: "Sales Coordinator" },
    { value: "Office Administrator", label: "Office Administrator" },
    { value: "Compliance Officer", label: "Compliance Officer" },
    { value: "Finance Assistant", label: "Finance Assistant" },
    { value: "Research Assistant", label: "Research Assistant" },
    { value: "Others", label: "Others" },
]

export const additional = [
    { id: "careerCoaching", label: "Career Coaching", price: 25000 },
    { id: "interviewTips", label: "Interview Tips", price: 15000 },
    { id: "sustainabilityLetter", label: "Sustainability Letter", price: 12000 },
    { id: "followUpLetter", label: "Follow-Up Letter Writing", price: 10000 },
    { id: "linkedinProfileMakeover", label: "LinkedIn Profile Makeover", price: 20000 },
    { id: "ksa", label: "KSA (Knowledge, Skills, and Abilities)", price: 18000 },
    { id: "executiveBio", label: "Executive Bio Writing", price: 30000 },
    { id: "professionalBiography", label: "Professional Biography", price: 25000 },
    { id: "coldEmail", label: "Cold Email Template for Recruiters", price: 8000 },
    { id: "linkedinOptimization", label: "LinkedIn Profile Optimization", price: 22000 },
    { id: "githubReview", label: "GitHub Profile Review (for Tech Roles)", price: 15000 },
    { id: "personalWebsite", label: "Personal Website/Portfolio Setup", price: 75000 },
    { id: "jobSearchStrategy", label: "Job Search Strategy Session", price: 20000 },
    { id: "salaryNegotiation", label: "Salary Negotiation Coaching", price: 18000 },
    { id: "networkingStrategy", label: "Networking Strategy Coaching", price: 18000 },
    { id: "freeReview", label: "Free Resume Review / Critique", price: 0 },
    { id: "resumeScore", label: "Resume Score & Analysis Report", price: 8000 },
    { id: "skillsGap", label: "Skills Gap Assessment", price: 15000 },
    { id: "industryResume", label: "Industry-Specific Resume (Healthcare, Tech, etc)", price: 35000 },
    { id: "expressDelivery", label: "Express / Expedited Delivery (Within 24 Hours)", price: 10000 },
    { id: "unlimitedRevisions", label: "Unlimited Revisions Add-on", price: 12000 }
]

export const packageOptions = [
    { value: "basic", label: "Basic package", price: 10000 },
    { value: "regular", label: "Regular package", price: 25000 },
    { value: "allinone", label: "All in One package", price: 40000 }
] as const;

export const steps = [
    {
        number: 1,
        title: "Fill in the form",
        description: "Provide your professional details."
    },
    {
        number: 2,
        title: "Chat or call us",
        description: "Engage with a skilled resume writer at <strong>07065155036</strong>."
    },
    {
        number: 3,
        title: "Resume is ready",
        description: "Receive a professionally crafted resume."
    }
] as const;

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export the service configuration
export const additionalServicesConfig = {
    careerCoaching: { price: 25000, label: "Career Coaching" },
    interviewTips: { price: 15000, label: "Interview Tips" },
    sustainabilityLetter: { price: 12000, label: "Sustainability Letter" },
    followUpLetter: { price: 10000, label: "Follow-Up Letter Writing" },
    linkedinProfileMakeover: { price: 20000, label: "LinkedIn Profile Makeover" },
    ksa: { price: 18000, label: "KSA (Knowledge, Skills, and Abilities)" },
    executiveBio: { price: 30000, label: "Executive Bio Writing" },
    professionalBiography: { price: 25000, label: "Professional Biography" },
    coldEmail: { price: 8000, label: "Cold Email Template for Recruiters" },
    linkedinOptimization: { price: 22000, label: "LinkedIn Profile Optimization" },
    githubReview: { price: 15000, label: "GitHub Profile Review (for Tech Roles)" },
    personalWebsite: { price: 75000, label: "Personal Website/Portfolio Setup" },
    jobSearchStrategy: { price: 20000, label: "Job Search Strategy Session" },
    salaryNegotiation: { price: 18000, label: "Salary Negotiation Coaching" },
    networkingStrategy: { price: 18000, label: "Networking Strategy Coaching" },
    freeReview: { price: 0, label: "Free Resume Review / Critique" },
    resumeScore: { price: 8000, label: "Resume Score & Analysis Report" },
    skillsGap: { price: 15000, label: "Skills Gap Assessment" },
    industryResume: { price: 35000, label: "Industry-Specific Resume (Healthcare, Tech, etc)" },
    expressDelivery: { price: 10000, label: "Express / Expedited Delivery (Within 24 Hours)" },
    unlimitedRevisions: { price: 12000, label: "Unlimited Revisions Add-on" }
}


// Doctor
// Nurse
// Pharmacist
// Dentist
// Physical Therapist
// Radiologist
// Occupational Therapist
// Medical Laboratory Technician
// Dietitian
// Teacher
// Engineer
// Architect
// Lawyer
// Accountant
// Software Developer
// Electrician
// Pilot
// Journalist
// Chef