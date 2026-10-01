import re

with open('script.js', 'r') as f:
    content = f.read()

# We need to find the place after window.closeModelModal
js_to_add = """
  // =========================================================
  // SYLLABUS PDF POPUP MODAL CONTROLLER
  // =========================================================

  const syllabusModalOverlay = document.getElementById('syllabusModalOverlay');
  const modalSyllabusTitle = document.getElementById('modalSyllabusTitle');
  const modalSyllabusSubtitle = document.getElementById('modalSyllabusSubtitle');
  const modalSyllabusList = document.getElementById('modalSyllabusList');

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

  window.closeSyllabusModalDirect = function() {
    if (syllabusModalOverlay) {
      syllabusModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.closeSyllabusModal = function(e) {
    if (e.target === syllabusModalOverlay) {
      closeSyllabusModalDirect();
    }
  };

"""

content = content.replace("  // STUDENT STUDY LIBRARY (STORAGE & BOOKMARKS ENGINE)", js_to_add + "\n  // STUDENT STUDY LIBRARY (STORAGE & BOOKMARKS ENGINE)")

# Also we need to close the syllabus modal on Escape key
content = content.replace("closeModelModalDirect();", "closeModelModalDirect();\n      closeSyllabusModalDirect();")

with open('script.js', 'w') as f:
    f.write(content)

print("JS added.")
