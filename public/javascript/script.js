import { initializeApp } from '../node_modules/firebase/app';
import { getAnalytics } from '../node_modules/firebase/analytics';
import { getFirestore, collection, getDocs } from '../node_modules/firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBdYQIyZ_YDQC8XGrOLrplpE75_KqRZY0c",
  authDomain: "edu-trio.firebaseapp.com",
  projectId: "edu-trio",
  storageBucket: "edu-trio.appspot.com",
  messagingSenderId: "629345559277",
  appId: "1:629345559277:web:f3628f22c4a69535e4a2e4",
  measurementId: "G-N28VXTR9RH"
};

const app = initializeApp(firebaseConfig);
const analytics = app.analytics();
const db = app.getFirestore();
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
const yearSelect = document.getElementById('year');
const programSelect = document.getElementById('subject');

// Data for subcategories, years, and subjects (replace with your actual data)
async function getPapers(db) {
  const papersCol = collection(db, 'QuestionPapers');
  const papersSnapshot = await getDocs(papersCol);
  const papersList = papersSnapshot.docs.map(doc => doc.data());
  return papersList;
}

console.log(getPapers());
const subcategories = {
    school: ['Federal Board', 'Punjab Board', 'Sindh Board', 'KPK Board', 'Balochistan Board'],
    college: ['Government College Lahore', 'Beaconhouse National University', 'Lahore University of Management Sciences'],
    university: ['University of Punjab', 'Quaid-e-Azam University', 'Karachi University']
};

// Placeholder for subjects data (you'll need to populate this)
const programs = {
    school: ["9th Class", "10th Class"],
    college: ["1st Year", "2nd Year"],
    university: ["BS CS", "BS Education", "BS Accounting & Finance", "BS Zoology", "BS Physical Education", "BS Psycology"]
};

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    programSelect.innerHTML = '<option value="">Select Class</option>';

    if (selectedCategory) {
        subcategorySelect.disabled = false;
        const subcategoryOptions = subcategories[selectedCategory];
        subcategoryOptions.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.text = subcategory;
            subcategorySelect.appendChild(option);
        });
        createYears(5);
        programSelect.disabled = false;
        const programsOptions = programs[selectedCategory];
        programsOptions.forEach(program => {
            const option = document.createElement('option');
            option.value = program;
            option.text = program;
            programSelect.appendChild(option);
        });
    } else {
        subcategorySelect.disabled = true;
    }
});
  
  // Sample question data
  const question1 = {
    id: 1,
    subject: 'Math',
    year: 2023,
    pdfData: '// Replace with actual PDF data in binary format', // Placeholder
  };
  
db.questions.push(question1);

// Similar logic for year and subject selects based on your data structure

function createYears(n){
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - n; i--) {
        years.push(i);
    }
    yearSelect.disabled = false;
        years.forEach(year => {
            const yearOption = document.createElement('option');
            yearOption.value = year;
            yearOption.text = year;
            yearSelect.appendChild(yearOption);
        });
}
// Additional logic for populating subjects based on selected subcategory and year

const pdfContainer = document.getElementById('pdf-container');
const downloadBtn = document.getElementById('download-pdf');

// ... your JavaScript code ...

function displayPDF(pdfPath) {
    // Create an iframe to display the PDF
    const iframe = document.createElement('iframe');
    iframe.src = pdfPath;
    iframe.style.width = '100%';
    iframe.style.height = '500px'; // Adjust height as needed
    pdfContainer.appendChild(iframe);
  }

  function downloadPDF(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'document.pdf'; // Replace 'document.pdf' with desired filename
    link.click();
  }
  
  // Assuming you have a function to fetch the PDF path from the database
  function getPDFPath(questionId) {
    return "file:///C:/Users/Almadina%20computers/Desktop/Web%20Engineering/EDU%20TRIO/sample_paper.pdf";
  }
  
  // Example usage
  const pdfPath = getPDFPath(1); // Replace with actual question ID
  displayPDF(pdfPath);
  downloadBtn.addEventListener('click', ()=>{
    downloadPDF(pdfPath);
  })
  