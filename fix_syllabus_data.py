import re

with open('script.js', 'r') as f:
    content = f.read()

# I will replace the JS that uses MODEL_PAPERS_DATA for syllabus
old_js = """
  // Reuse the structure from MODEL_PAPERS_DATA for simplicity, 
  // since the keys match the subjects precisely.
  window.openSyllabusModal = function(contextKey) {
    const data = MODEL_PAPERS_DATA[contextKey]; // we can map from existing subjects
    if (!data || !syllabusModalOverlay) return;

    modalSyllabusTitle.textContent = data.title.replace('Model Question Papers', 'Syllabus').replace('Model Question Paper', 'Syllabus');
    modalSyllabusSubtitle.textContent = 'Official PDF Syllabus for Board Examination';

    let html = '';
    if (data.papers.length > 0) {
      data.papers.forEach(p => {
        const syllabusFileName = p.file.replace('model-papers', 'syllabus-papers').replace('model-paper', 'syllabus');
        const pMod = {
          name: p.name + " (Syllabus)",
          marks: p.marks,
          file: syllabusFileName,
          icon: 'fa-file-pdf',
          badge: 'Official Syllabus PDF'
        };
        html += generatePaperItemHtml(pMod, '#2563eb', '#dbeafe', 'Official Syllabus');
      });
    }

    if (data.pending) {
      html += `
        <div class="item-notice-box">
          <i class="fa-solid fa-circle-info" style="font-size: 20px;"></i>
          <div>Syllabus PDF is being uploaded shortly.</div>
        </div>
      `;
    }

    modalSyllabusList.innerHTML = html;
    syllabusModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
"""

new_js = """
  const SYLLABUS_PDF_DATA = {
    'c10-sci': { title: 'Science Syllabus', file: 'class-10-science-syllabus.pdf', name: 'Class 10th Science Official Syllabus' },
    'c10-math': { title: 'Mathematics Syllabus', file: 'class-10-mathematics-syllabus.pdf', name: 'Class 10th Mathematics Official Syllabus' },
    'c10-sst': { title: 'Social Science Syllabus', file: 'class-10-social-science-syllabus.pdf', name: 'Class 10th Social Science Official Syllabus' },
    'c10-eng': { title: 'English & Urdu Syllabus', file: 'class-10-general-english-syllabus.pdf', name: 'Class 10th English & Urdu Official Syllabus' },
    '11-med': { title: 'Medical Stream Syllabus', files: [
      { file: 'class-11-physics-syllabus.pdf', name: 'Physics Official Syllabus' },
      { file: 'class-11-chemistry-syllabus.pdf', name: 'Chemistry Official Syllabus' },
      { file: 'class-11-botany-syllabus.pdf', name: 'Botany Official Syllabus' },
      { file: 'class-11-zoology-syllabus.pdf', name: 'Zoology Official Syllabus' }
    ]},
    '11-nonmed': { title: 'Non-Medical Stream Syllabus', files: [
      { file: 'class-11-physics-syllabus.pdf', name: 'Physics Official Syllabus' },
      { file: 'class-11-chemistry-syllabus.pdf', name: 'Chemistry Official Syllabus' },
      { file: 'class-11-mathematics-syllabus.pdf', name: 'Mathematics Official Syllabus' }
    ]},
    '11-comm': { title: 'Commerce Stream Syllabus', files: [
      { file: 'class-11-business-studies-syllabus.pdf', name: 'Business Studies Official Syllabus' },
      { file: 'class-11-economics-syllabus.pdf', name: 'Economics Official Syllabus' },
      { file: 'class-11-statistics-syllabus.pdf', name: 'Statistics Official Syllabus' }
    ]},
    '11-arts': { title: 'Arts & Humanities Syllabus', files: [
      { file: 'class-11-political-science-syllabus.pdf', name: 'Political Science Official Syllabus' },
      { file: 'class-11-history-syllabus.pdf', name: 'History Official Syllabus' },
      { file: 'class-11-economics-syllabus.pdf', name: 'Economics Official Syllabus' },
      { file: 'class-11-general-english-syllabus.pdf', name: 'General English Official Syllabus' }
    ]}
  };

  window.openSyllabusModal = function(contextKey) {
    const data = SYLLABUS_PDF_DATA[contextKey];
    if (!data || !syllabusModalOverlay) return;

    modalSyllabusTitle.textContent = data.title;
    modalSyllabusSubtitle.textContent = 'Official PDF Syllabus for Board Examination';

    let html = '';
    
    const itemsToRender = data.files ? data.files : [{ file: data.file, name: data.name }];
    
    itemsToRender.forEach(p => {
      const pMod = {
        name: p.name,
        marks: 'Unit-wise Marks Breakdown',
        file: 'syllabus-papers/' + p.file,
        icon: 'fa-file-pdf',
        badge: 'Official Syllabus PDF'
      };
      html += generatePaperItemHtml(pMod, '#2563eb', '#dbeafe', 'Official Syllabus');
    });

    modalSyllabusList.innerHTML = html;
    syllabusModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
"""

content = content.replace(old_js.strip(), new_js.strip())

with open('script.js', 'w') as f:
    f.write(content)

print("Fixed JS.")
