// Define the available services
export const careerlevelOptions = [
    { value: "Select your career level", label: "Select your career level" },
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
    { value: "Select your Interest", label: "Select your Interest" },
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
    { id: "careerCoaching", label: "Career Coaching", price: 125.98 },
    { id: "coverLetter", label: "Cover Letter Writing", price: 59.00 },
    { id: "thankYouLetter", label: "Thank-You Letter Writing", price: 49.00 },
    { id: "followUpLetter", label: "Follow-Up Letter Writing", price: 49.00 },
    { id: "linkedinProfile", label: "LinkedIn Profile Makeover", price: 89.00 },
    { id: "ksa", label: "KSA (Knowledge, Skills, and Abilities)", price: 59.00 }
]

export const packageOptions = [
    { value: "select", label: "Select a package", price: 0 },
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
        title: "Chat with writer", 
        description: "Engage with a skilled resume writer." 
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
    careerCoaching: { price: 125.98, label: "Career Coaching" },
    coverLetter: { price: 59.00, label: "Cover Letter Writing" },
    thankYouLetter: { price: 49.00, label: "Thank-You Letter Writing" },
    followUpLetter: { price: 49.00, label: "Follow-Up Letter Writing" },
    linkedinProfile: { price: 89.00, label: "LinkedIn Profile Makeover" },
    ksa: { price: 59.00, label: "KSA (Knowledge, Skills, and Abilities)" }
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