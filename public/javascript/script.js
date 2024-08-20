import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
// import { getAnalytics } from '../node_modules/firebase/analytics';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

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
const db = getFirestore(app);
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
const yearSelect = document.getElementById('year');
const programSelect = document.getElementById('subject');
const btnSearch = document.getElementById('#search');
const btnDownload = document.getElementById('#download-pdf');
const pdfContainer = document.getElementById('pdf-container');

// Data for subcategories, years, and subjects (replace with your actual data)
async function getPapers() {
  const papersCol = collection(db, "QuestionPapers");
  const papersSnapshot = await getDocs(papersCol);
  const papersList = papersSnapshot.docs.map(doc => doc.data());
  return papersList;
}

getPapers().then((papers) =>{
  var school = [];
  var college = [];
  var university = [];
  var institutions = [];
  var yearArray = [];
  var schoolProg = [];
  var collegeProg = [];
  var uniProg = [];

  papers.forEach((p)=>{
    var inst = p.instType;
    var instName = p.instName;
    var mYear = p.year;
    var program = p.class;

    addToArray(institutions, inst);
    switch (inst) {
      case "School":
        addToArray(school, instName);
        addToArray(schoolProg, program);
        break;
      case "College":
        addToArray(college, instName);
        addToArray(collegeProg, program);
        break;
      case "University":
        addToArray(university, instName);
        addToArray(uniProg, program);
        break;
      default:
        break;
    }
    addToArray(yearArray, mYear);
  });

  const subcategories = {
    School: school,
    College: college,
    University: university
  };
  const programs = {
    School: schoolProg,
    College: collegeProg,
    University: uniProg
  };

  categorySelect.innerHTML = '<option value="">Select Category</option>';
  createOptions(categorySelect, institutions);

  categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    programSelect.innerHTML = '<option value="">Select Class</option>';

    if (selectedCategory) {
        const subcategoryOptions = subcategories[selectedCategory];
        const programsOptions = programs[selectedCategory];
        createOptions(subcategorySelect, subcategoryOptions);
        createOptions(programSelect, programsOptions);
        createOptions(yearSelect, yearArray);
    } else {
        subcategorySelect.disabled = true;
      }
  });
});

btnDownload.addEventListener('click', ()=>{
  var selectedPaper = {
    instType: categorySelect.value,
    instName: subcategorySelect.value,
    year: yearSelect.value,
    class: programSelect.value
  };
  console.log(selectedPaper);
});

function createOptions(dropDown, options){
  dropDown.disabled = false;
  options.forEach(option => {
    const mOption = document.createElement('option');
    mOption.value = option;
    mOption.text = option;
    dropDown.appendChild(mOption);
  });
}

function addToArray(mArray, mValue) {
  if (!mArray.includes(mValue)) {
    mArray.push(mValue)
  }
}
  