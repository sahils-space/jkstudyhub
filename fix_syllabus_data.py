import re

with open('script.js', 'r') as f:
    content = f.read()

new_js = """
  const SYLLABUS_PDF_DATA = {
    'c10-sci': { title: 'Science Syllabus', file: 'class-10-science-syllabus.pdf', name: 'Class 10th Science' },
    'c10-math': { title: 'Mathematics Syllabus', file: 'class-10-mathematics-syllabus.pdf', name: 'Class 10th Mathematics' },
    'c10-sst': { title: 'Social Science Syllabus', file: 'class-10-social-science-syllabus.pdf', name: 'Class 10th Social Science' },
    'c10-eng': { title: 'English & Urdu Syllabus', files: [
      { file: 'class-10-general-english-syllabus.pdf', name: 'Class 10th General English' },
      { file: 'class-10-urdu-syllabus.pdf', name: 'Class 10th Urdu' }
    ]},
    '11-med': { title: 'Medical Stream Syllabus', files: [
      { file: 'class-11-physics-syllabus.pdf', name: 'Physics' },
      { file: 'class-11-chemistry-syllabus.pdf', name: 'Chemistry' },
      { file: 'class-11-biology-syllabus.pdf', name: 'Biology (Botany & Zoology)' },
      { file: 'class-11-general-english-syllabus.pdf', name: 'General English' }
    ]},
    '11-nonmed': { title: 'Non-Medical Stream Syllabus', files: [
      { file: 'class-11-physics-syllabus.pdf', name: 'Physics' },
      { file: 'class-11-chemistry-syllabus.pdf', name: 'Chemistry' },
      { file: 'class-11-mathematics-syllabus.pdf', name: 'Mathematics' },
      { file: 'class-11-computer-science-syllabus.pdf', name: 'Computer Science' },
      { file: 'class-11-general-english-syllabus.pdf', name: 'General English' }
    ]},
    '11-comm': { title: 'Commerce Stream Syllabus', files: [
      { file: 'class-11-accountancy-syllabus.pdf', name: 'Accountancy' },
      { file: 'class-11-business-studies-syllabus.pdf', name: 'Business Studies' },
      { file: 'class-11-economics-syllabus.pdf', name: 'Economics' },
      { file: 'class-11-entrepreneurship-syllabus.pdf', name: 'Entrepreneurship' },
      { file: 'class-11-business-mathematics-syllabus.pdf', name: 'Business Mathematics' }
    ]},
    '11-arts': { title: 'Arts & Humanities Syllabus', files: [
      { file: 'class-11-political-science-syllabus.pdf', name: 'Political Science' },
      { file: 'class-11-history-syllabus.pdf', name: 'History' },
      { file: 'class-11-sociology-syllabus.pdf', name: 'Sociology' },
      { file: 'class-11-psychology-syllabus.pdf', name: 'Psychology' },
      { file: 'class-11-geography-syllabus.pdf', name: 'Geography' },
      { file: 'class-11-education-syllabus.pdf', name: 'Education' },
      { file: 'class-11-islamic-studies-syllabus.pdf', name: 'Islamic Studies' },
      { file: 'class-11-philosophy-syllabus.pdf', name: 'Philosophy' },
      { file: 'class-11-urdu-literature-syllabus.pdf', name: 'Urdu Literature' },
      { file: 'class-11-english-literature-syllabus.pdf', name: 'English Literature' }
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
        marks: 'Detailed Chapter & Topic Breakdown',
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

# Extract the old block and replace
pattern = re.compile(r'  const SYLLABUS_PDF_DATA = \{.*?document\.body\.style\.overflow = \'hidden\';\n  };', re.DOTALL)
content = pattern.sub(new_js.strip(), content)

with open('script.js', 'w') as f:
    f.write(content)

print("JS mapped to all newly generated PDFs successfully!")
