import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
import firebaseConfig from './init.js';
import {PaperModel} from './PaperModel.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
const yearSelect = document.getElementById('year');
const programSelect = document.getElementById('subject');
const btnSearch = document.getElementById('#search');
const btnDownload = document.getElementById('#download-pdf');
const pdfContainer = document.getElementById('pdf-container');

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
    const paper = new PaperModel(p.instType, p.instName, p.year, p.subject, p.group);
    console.log(paper)

    addToArray(institutions, inst);
    switch (inst) {
      case "School":
        addToArray(school, paper.instType);
        addToArray(schoolProg, paper.program);
        break;
      case "College":
        addToArray(college, paper.instName);
        addToArray(collegeProg, paper.program);
        break;
      case "University":
        addToArray(university, paper.instName);
        addToArray(uniProg, paper.program);
        break;
      default:
        break;
    }
    addToArray(yearArray, paper.year);
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
  