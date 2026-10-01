// JK STUDY HUB - Interactive Scripts & Dual Digital Syllabus Engine (Class 10th & 11th)

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Inquiry Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const studentName = document.getElementById('name').value;
      const studentClass = document.getElementById('studentClass').value;

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${studentName}</strong>! Your inquiry for <strong>${studentClass}</strong> has been received. Our team will contact you shortly.`;
      
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 6000);
    });
  }

  // =========================================================
  // SHARED DIGITAL SYLLABUS UTILITIES
  // =========================================================
  function getSubjectIcon(code) {
    const map = {
      // Class 10th
      'SC-10': 'fa-solid fa-atom',
      'MA-10': 'fa-solid fa-calculator',
      'SS-10': 'fa-solid fa-earth-americas',
      'EN-10': 'fa-solid fa-book-open',
      'UR-10': 'fa-solid fa-feather-pointed',
      'CS-10': 'fa-solid fa-laptop-code',
      // Class 11th
      'BI': 'fa-solid fa-dna',
      'PH': 'fa-solid fa-atom',
      'CH': 'fa-solid fa-flask-vial',
      'EN': 'fa-solid fa-book-open',
      'BT': 'fa-solid fa-microscope',
      'ES': 'fa-solid fa-leaf',
      'MA': 'fa-solid fa-calculator',
      'CS': 'fa-solid fa-laptop-code',
      'AY': 'fa-solid fa-receipt',
      'BS': 'fa-solid fa-briefcase',
      'EO': 'fa-solid fa-chart-line',
      'EP': 'fa-solid fa-lightbulb',
      'BM': 'fa-solid fa-square-root-variable',
      'PS': 'fa-solid fa-scale-balanced',
      'HY': 'fa-solid fa-landmark',
      'SO': 'fa-solid fa-users',
      'PY': 'fa-solid fa-brain',
      'GG': 'fa-solid fa-earth-asia',
      'ED': 'fa-solid fa-chalkboard-user',
      'IS': 'fa-solid fa-mosque',
      'PL': 'fa-solid fa-monument',
      'UR': 'fa-solid fa-feather-pointed',
      'EL': 'fa-solid fa-quote-right'
    };
    return map[code] || 'fa-solid fa-book';
  }

  function renderUnitsHtml(units) {
    if (!units || !units.length) return '';
    return units.map(unit => `
      <div class="syllabus-unit-card">
        <div class="unit-card-header">
          <span class="unit-code-badge">${unit.unitNumber}</span>
          <h5 class="unit-card-title">${unit.title}</h5>
          <span class="unit-marks-badge">${unit.marks} Marks</span>
        </div>
        <ul class="unit-topics-list">
          ${unit.topics.map(t => `<li><i class="fa-solid fa-circle-dot"></i> <span>${t}</span></li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  function renderSubjectCard(subj, isExpanded = false) {
    const practicalLabel = subj.practicalMarks ? `Practical / IA: ${subj.practicalMarks} Marks` : `Internal: 20 Marks`;
    
    let contentBody = '';

    if (subj.sections && subj.sections.length) {
      contentBody = subj.sections.map(sec => `
        <div class="syllabus-section-block">
          <h4 class="section-block-title"><i class="fa-solid fa-folder-open"></i> ${sec.sectionTitle}</h4>
          <div class="units-grid">
            ${renderUnitsHtml(sec.units)}
          </div>
        </div>
      `).join('');
    } else if (subj.units && subj.units.length) {
      contentBody = `
        <div class="units-grid">
          ${renderUnitsHtml(subj.units)}
        </div>
      `;
    }

    let practicalsHtml = '';
    if (subj.practicals && subj.practicals.length) {
      practicalsHtml = `
        <div class="practicals-card">
          <div class="practicals-header">
            <i class="fa-solid fa-flask"></i>
            <span>Practical Examination, Projects &amp; Lab Work (${subj.practicalMarks || 20} Marks)</span>
          </div>
          <ul class="practicals-list">
            ${subj.practicals.map(p => `<li><i class="fa-solid fa-check"></i> ${p}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    let booksHtml = '';
    if (subj.books && subj.books.length) {
      booksHtml = `
        <div class="prescribed-books">
          <strong><i class="fa-solid fa-book"></i> Prescribed Textbooks:</strong>
          ${subj.books.map(b => `<span class="book-chip">${b}</span>`).join('')}
        </div>
      `;
    }

    return `
      <div class="digital-subject-card ${isExpanded ? 'active' : ''}" id="card-${subj.id}">
        <div class="subject-card-bar" onclick="toggleSubject('${subj.id}')">
          <div class="subject-title-area">
            <div class="subject-icon-wrap">
              <i class="${getSubjectIcon(subj.code)}"></i>
            </div>
            <div>
              <div class="subject-meta-tags">
                <span class="subject-code-tag">${subj.code}</span>
                <span class="subject-type-tag ${subj.type.toLowerCase().includes('compulsory') ? 'compulsory' : 'elective'}">${subj.type}</span>
              </div>
              <h3 class="subject-name">${subj.name}</h3>
            </div>
          </div>

          <div class="subject-marks-area">
            <div class="marks-pill">
              <span class="theory-pill">Theory: ${subj.theoryMarks}m</span>
              <span class="practical-pill">${practicalLabel}</span>
              <span class="total-pill">Total: ${subj.totalMarks}m</span>
            </div>
            <button class="expand-btn" aria-label="Expand syllabus details">
              <i class="fa-solid fa-chevron-down toggle-icon"></i>
            </button>
          </div>
        </div>

        <div class="subject-details-body" id="body-${subj.id}">
          <div class="details-inner">
            <div class="exam-blueprint-bar">
              <span><i class="fa-regular fa-clock"></i> <strong>Exam Duration:</strong> ${subj.duration || '3 Hours'}</span>
              <span><i class="fa-solid fa-shield-halved"></i> <strong>Assessment Pattern:</strong> JKBOSE Board Theory (80m) + School Assessment (20m)</span>
            </div>
            ${contentBody}
            ${practicalsHtml}
            ${booksHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Global toggle function
  window.toggleSubject = function(subjId) {
    const card = document.getElementById(`card-${subjId}`);
    if (card) {
      card.classList.toggle('active');
    }
  };

  // Class 10 vs 11 View Switcher
  window.switchClassView = function(classNum) {
    const btn10 = document.getElementById('btnClass10');
    const btn11 = document.getElementById('btnClass11');
    const view10 = document.getElementById('viewClass10');
    const view11 = document.getElementById('viewClass11');

    if (String(classNum) === '10') {
      if (btn10) btn10.classList.add('active');
      if (btn11) btn11.classList.remove('active');
      if (view10) view10.style.display = 'block';
      if (view11) view11.style.display = 'none';
      renderClass10();
    } else {
      if (btn11) btn11.classList.add('active');
      if (btn10) btn10.classList.remove('active');
      if (view11) view11.style.display = 'block';
      if (view10) view10.style.display = 'none';
      renderStream(currentStream);
    }
  };

  // =========================================================
  // CLASS 10TH DIGITAL SYLLABUS CONTROLLER
  // =========================================================
  const syllabus10Container = document.getElementById('syllabus10Container');
  const syllabus10Search = document.getElementById('syllabus10Search');

  function renderClass10(query = '') {
    if (!syllabus10Container || typeof SYLLABUS_10_DATA === 'undefined') return;

    let filtered = SYLLABUS_10_DATA;
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = SYLLABUS_10_DATA.filter(s => {
        const matchName = s.name.toLowerCase().includes(q);
        const matchCode = s.code.toLowerCase().includes(q);
        const matchTopics = (s.units || []).some(u => 
          u.title.toLowerCase().includes(q) || (u.topics || []).some(t => t.toLowerCase().includes(q))
        );
        const matchSections = (s.sections || []).some(sec => 
          sec.sectionTitle.toLowerCase().includes(q) || (sec.units || []).some(u => 
            u.title.toLowerCase().includes(q) || (u.topics || []).some(t => t.toLowerCase().includes(q))
          )
        );
        return matchName || matchCode || matchTopics || matchSections;
      });
    }

    if (filtered.length === 0) {
      syllabus10Container.innerHTML = `
        <div class="no-results-card">
          <i class="fa-solid fa-search"></i>
          <h4>No Class 10th subjects or topics match "${query}"</h4>
          <p>Try searching for keywords like 'Electricity', 'Light', 'Nationalism', 'Triangles', or 'Carbon'.</p>
        </div>
      `;
      return;
    }

    syllabus10Container.innerHTML = filtered.map((subj, idx) => 
      renderSubjectCard(subj, query.trim() ? true : (idx === 0))
    ).join('');
  }

  if (syllabus10Search) {
    syllabus10Search.addEventListener('input', (e) => {
      renderClass10(e.target.value);
    });
  }

  // Initial render for Class 10th
  renderClass10();

  // =========================================================
  // CLASS 11TH DIGITAL SYLLABUS CONTROLLER
  // Strictly segregated by Stream (No cross-mixing)
  // =========================================================
  let currentStream = 'medical';
  const streamTabs = document.querySelectorAll('.stream-tab-btn');
  const syllabusContainer = document.getElementById('syllabusContainer');
  const streamMeta = document.getElementById('streamMeta');
  const syllabusSearch = document.getElementById('syllabusSearch');

  if (typeof SYLLABUS_DATA !== 'undefined' && syllabusContainer) {

    function renderStream(streamKey, query = '') {
      currentStream = streamKey;
      const data = SYLLABUS_DATA[streamKey];
      if (!data) return;

      // Update stream meta description
      if (streamMeta) {
        streamMeta.innerHTML = `
          <div class="stream-info-card">
            <div class="stream-info-main">
              <span class="stream-tag">${data.streamBadge}</span>
              <h3 class="stream-name">${data.streamTitle}</h3>
              <p class="stream-sub">${data.streamDesc}</p>
            </div>
            <div class="stream-stats">
              <div class="stat-box">
                <span class="stat-number">${data.subjects.length}</span>
                <span class="stat-label">Subjects</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-label">Digital JKBOSE</span>
              </div>
            </div>
          </div>
        `;
      }

      let filteredSubjects = data.subjects;
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        filteredSubjects = data.subjects.filter(s => {
          const matchName = s.name.toLowerCase().includes(q);
          const matchCode = s.code.toLowerCase().includes(q);
          const matchTopics = (s.units || []).some(u => 
            u.title.toLowerCase().includes(q) || (u.topics || []).some(t => t.toLowerCase().includes(q))
          );
          const matchSections = (s.sections || []).some(sec => 
            sec.sectionTitle.toLowerCase().includes(q) || (sec.units || []).some(u => 
              u.title.toLowerCase().includes(q) || (u.topics || []).some(t => t.toLowerCase().includes(q))
            )
          );
          return matchName || matchCode || matchTopics || matchSections;
        });
      }

      if (filteredSubjects.length === 0) {
        syllabusContainer.innerHTML = `
          <div class="no-results-card">
            <i class="fa-solid fa-search"></i>
            <h4>No subjects or topics match "${query}" in this stream</h4>
            <p>Try searching for a different topic or switch to another stream above.</p>
          </div>
        `;
        return;
      }

      // Render all subjects in this stream (first subject opened by default when not searching)
      syllabusContainer.innerHTML = filteredSubjects.map((subj, idx) => 
        renderSubjectCard(subj, query.trim() ? true : (idx === 0))
      ).join('');
    }

    // Tab buttons event listeners
    streamTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        streamTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetStream = tab.getAttribute('data-stream');
        if (syllabusSearch) syllabusSearch.value = '';
        renderStream(targetStream);
      });
    });

    // Realtime search listener for Class 11th
    if (syllabusSearch) {
      syllabusSearch.addEventListener('input', (e) => {
        renderStream(currentStream, e.target.value);
      });
    }

    // Initial render for Medical Stream
    renderStream('medical');
  }

  // =========================================================
  // FALLING CHINAR LEAVES ANIMATION
  // =========================================================
  const leafIcons = ['🍁', '🍂', '🍃', '🍁', '🍂'];
  function createFallingLeaf() {
    const wrapper = document.getElementById('autumnWrapper');
    if (!wrapper) return;
    
    const leaf = document.createElement('div');
    const randomIcon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
    leaf.innerHTML = randomIcon;
    leaf.className = 'falling-leaf';
    
    leaf.style.left = (Math.random() * 94 + 3) + '%';
    leaf.style.fontSize = (Math.random() * 10 + 18) + 'px'; 
    const dur = Math.random() * 2.5 + 3.5;
    leaf.style.animationDuration = dur + 's'; 
    
    wrapper.appendChild(leaf);
    
    setTimeout(() => {
      leaf.remove();
    }, dur * 1000);
  }

  // Start falling leaves immediately & run continuously
  setInterval(createFallingLeaf, 650);
  for (let i = 0; i < 6; i++) {
    setTimeout(createFallingLeaf, i * 200);
  }
  // =========================================================
  // MODEL PAPERS POPUP MODAL CONTROLLER
  // =========================================================

  const modelModalOverlay = document.getElementById('modelModalOverlay');
  const modalStreamTitle = document.getElementById('modalStreamTitle');
  const modalStreamSubtitle = document.getElementById('modalStreamSubtitle');
  const modalPapersList = document.getElementById('modalPapersList');

  const MODEL_PAPERS_DATA = {
    'c10-eng': {
      title: 'Class 10th • English & Urdu',
      subtitle: 'Official Model Question Papers for Board Examination',
      papers: [
        {
          name: 'General English (Tulip Series Book X)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-10-general-english-model-paper.pdf',
          icon: 'fa-book-open',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: 'Baharistan-e-Urdu model paper is being uploaded shortly.'
    },
    'c10-sci': {
      title: 'Class 10th • Science',
      subtitle: 'Official Model Question Paper for Board Examination',
      papers: [
        {
          name: 'Science (Physics, Chemistry & Biology)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-10-science-model-paper.pdf',
          icon: 'fa-atom',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: ''
    },
    'c10-math': {
      title: 'Class 10th • Mathematics',
      subtitle: 'Official Model Question Paper for Board Examination',
      papers: [
        {
          name: 'Mathematics',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-10-mathematics-model-paper.pdf',
          icon: 'fa-calculator',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: ''
    },
    'c10-sst': {
      title: 'Class 10th • Social Science',
      subtitle: 'Official Model Question Paper for Board Examination',
      papers: [
        {
          name: 'Social Science (History, Civics, Geography, Economics)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-10-social-science-model-paper.pdf',
          icon: 'fa-earth-americas',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: ''
    },
    '11-med': {
      title: 'Class 11th • Medical Science',
      subtitle: 'Faculty of Science (Medical Stream)',
      papers: [
        {
          name: 'Physics',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physics-model-paper.pdf',
          icon: 'fa-bolt',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Chemistry (Core Science)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-chemistry-model-paper.pdf',
          icon: 'fa-flask',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Botany (Section A of Biology)',
          marks: '35 Marks (Theory) • 1½ Hours',
          file: 'model-papers/class-11-botany-model-paper.pdf',
          icon: 'fa-seedling',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Zoology (Section B of Biology)',
          marks: '35 Marks (Theory) • 1½ Hours',
          file: 'model-papers/class-11-zoology-model-paper.pdf',
          icon: 'fa-paw',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'General English (Compulsory for All Streams)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-general-english-model-paper.pdf',
          icon: 'fa-book-bookmark',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Information Practices (IP - Elective)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-information-practices-model-paper.pdf',
          icon: 'fa-laptop-code',
          badge: 'Elective / Additional'
        },
        {
          name: 'Physical Education (Theory Paper)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physical-education-model-paper.pdf',
          icon: 'fa-person-running',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: ''
    },
    '11-nonmed': {
      title: 'Class 11th • Non-Medical Science',
      subtitle: 'Faculty of Science (Non-Medical Stream)',
      papers: [
        {
          name: 'Mathematics (Core Subject)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-mathematics-model-paper.pdf',
          icon: 'fa-calculator',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Physics',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physics-model-paper.pdf',
          icon: 'fa-bolt',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Chemistry (Core Science)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-chemistry-model-paper.pdf',
          icon: 'fa-flask',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Statistics (Mathematical Sciences)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-statistics-model-paper.pdf',
          icon: 'fa-chart-simple',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'General English (Compulsory for All Streams)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-general-english-model-paper.pdf',
          icon: 'fa-book-bookmark',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Information Practices (IP - Elective)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-information-practices-model-paper.pdf',
          icon: 'fa-laptop-code',
          badge: 'Elective / Additional'
        },
        {
          name: 'Physical Education (Theory Paper)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physical-education-model-paper.pdf',
          icon: 'fa-person-running',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: ''
    },
    '11-comm': {
      title: 'Class 11th • Commerce Stream',
      subtitle: 'Faculty of Commerce',
      papers: [
        {
          name: 'Business Studies',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-business-studies-model-paper.pdf',
          icon: 'fa-briefcase',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Economics (Part A: Statistics & Part B: IED)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-economics-model-paper.pdf',
          icon: 'fa-chart-pie',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Statistics (Core Commerce Subject)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-statistics-model-paper.pdf',
          icon: 'fa-chart-simple',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'General English (Compulsory for All Streams)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-general-english-model-paper.pdf',
          icon: 'fa-book-bookmark',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Information Practices (IP - Elective)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-information-practices-model-paper.pdf',
          icon: 'fa-laptop-code',
          badge: 'Elective / Additional'
        },
        {
          name: 'Physical Education (Theory Paper)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physical-education-model-paper.pdf',
          icon: 'fa-person-running',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: 'Accountancy (80m) model paper will be added as soon as released by JKBOSE.'
    },
    '11-arts': {
      title: 'Class 11th • Arts & Humanities',
      subtitle: 'Faculty of Humanities',
      papers: [
        {
          name: 'Political Science',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-political-science-model-paper.pdf',
          icon: 'fa-landmark',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'History (Themes in World History)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-history-model-paper.pdf',
          icon: 'fa-scroll',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Economics (Elective / Core with Statistics)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-economics-model-paper.pdf',
          icon: 'fa-chart-pie',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Statistics (Core / Elective Arts Subject)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-statistics-model-paper.pdf',
          icon: 'fa-chart-simple',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'General English (Compulsory for All Streams)',
          marks: '80 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-general-english-model-paper.pdf',
          icon: 'fa-book-bookmark',
          badge: 'Official JKBOSE Paper'
        },
        {
          name: 'Information Practices (IP - Elective)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-information-practices-model-paper.pdf',
          icon: 'fa-laptop-code',
          badge: 'Elective / Additional'
        },
        {
          name: 'Physical Education (Theory Paper)',
          marks: '70 Marks (Theory) • 3 Hours',
          file: 'model-papers/class-11-physical-education-model-paper.pdf',
          icon: 'fa-person-running',
          badge: 'Official JKBOSE Paper'
        }
      ],
      pending: 'Sociology, Psychology, Education & Geography model papers are being processed.'
    }
  };

  // =========================================================

  // =========================================================
  // SYLLABUS PDF POPUP MODAL CONTROLLER
  // =========================================================

  const syllabusModalOverlay = document.getElementById('syllabusModalOverlay');
  const modalSyllabusTitle = document.getElementById('modalSyllabusTitle');
  const modalSyllabusSubtitle = document.getElementById('modalSyllabusSubtitle');
  const modalSyllabusList = document.getElementById('modalSyllabusList');

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


  // STUDENT STUDY LIBRARY (STORAGE & BOOKMARKS ENGINE)
  // =========================================================
  const StudyLibrary = {
    getBookmarkKey: function() {
      const user = window.currentUser || JSON.parse(localStorage.getItem('jk_study_user'));
      return user && user.uid ? `jk_study_bookmarks_${user.uid}` : 'jk_study_bookmarks';
    },
    getHistoryKey: function() {
      const user = window.currentUser || JSON.parse(localStorage.getItem('jk_study_user'));
      return user && user.uid ? `jk_study_history_${user.uid}` : 'jk_study_history';
    },

    getBookmarks: function() {
      try {
        return JSON.parse(localStorage.getItem(this.getBookmarkKey())) || [];
      } catch (e) {
        return [];
      }
    },

    isBookmarked: function(file) {
      if (!file) return false;
      const list = this.getBookmarks();
      return list.some(item => item.file === file);
    },

    toggleBookmark: function(paper) {
      if (!paper || !paper.file) return false;
      let list = this.getBookmarks();
      const idx = list.findIndex(item => item.file === paper.file);
      let isSaved = false;

      if (idx >= 0) {
        list.splice(idx, 1);
        isSaved = false;
      } else {
        list.unshift({
          name: paper.name,
          file: paper.file,
          marks: paper.marks || '',
          icon: paper.icon || 'fa-file-pdf',
          type: paper.type || 'Study Material',
          timestamp: Date.now()
        });
        isSaved = true;
      }

      localStorage.setItem(this.getBookmarkKey(), JSON.stringify(list));
      this.updateBadges();
      this.syncToCloud();
      return isSaved;
    },

    getHistory: function() {
      try {
        return JSON.parse(localStorage.getItem(this.getHistoryKey())) || [];
      } catch (e) {
        return [];
      }
    },

    recordHistory: function(paper, action) {
      if (!paper || !paper.file) return;
      let list = this.getHistory();
      list = list.filter(item => item.file !== paper.file);
      list.unshift({
        name: paper.name,
        file: paper.file,
        marks: paper.marks || '',
        icon: paper.icon || 'fa-file-pdf',
        action: action || 'Viewed',
        timestamp: Date.now()
      });

      if (list.length > 40) list = list.slice(0, 40);
      localStorage.setItem(this.getHistoryKey(), JSON.stringify(list));
      this.updateBadges();
      this.syncToCloud();
    },

    clearHistory: function() {
      localStorage.removeItem(this.getHistoryKey());
      this.updateBadges();
      this.syncToCloud();
    },

    updateBadges: function() {
      const badge = document.getElementById('libraryBadge');
      const bCount = document.getElementById('libBookmarksCount');
      const hCount = document.getElementById('libHistoryCount');
      const bookmarks = this.getBookmarks();
      const history = this.getHistory();

      if (badge) {
        badge.textContent = bookmarks.length;
        badge.style.display = bookmarks.length > 0 ? 'inline-flex' : 'none';
      }
      if (bCount) bCount.textContent = bookmarks.length;
      if (hCount) hCount.textContent = history.length;
    },

    syncToCloud: function() {
      if (window.currentUser && window.db && window.currentUser.uid) {
        const pillText = document.getElementById('syncPillText');
        if (pillText) pillText.textContent = 'Syncing...';
        window.db.collection('student_libraries').doc(window.currentUser.uid).set({
          bookmarks: this.getBookmarks(),
          history: this.getHistory(),
          updatedAt: Date.now()
        }, { merge: true }).then(() => {
          if (pillText) pillText.textContent = 'Cloud Synced';
        }).catch(err => {
          console.warn('Sync notice:', err.message);
        });
      }
    }
  };

  function generatePaperItemHtml(p, badgeColor, badgeBg, paperType) {
    const isStarred = StudyLibrary.isBookmarked(p.file);
    const starClass = isStarred ? 'bookmarked' : '';
    const starIcon = isStarred ? 'fa-solid fa-star' : 'fa-regular fa-star';
    const safeData = encodeURIComponent(JSON.stringify({
      name: p.name,
      file: p.file,
      marks: p.marks || '',
      icon: p.icon || 'fa-file-pdf',
      type: paperType || 'Board Paper'
    }));

    return `
      <div class="modal-paper-item">
        <div class="item-info">
          <div class="item-icon" style="background: ${badgeBg}; color: ${badgeColor};">
            <i class="fa-solid ${p.icon}"></i>
          </div>
          <div class="item-text">
            <h4>${p.name}</h4>
            <p><i class="fa-regular fa-bookmark" style="color: ${badgeColor};"></i> ${p.marks}</p>
          </div>
        </div>
        <div class="item-actions">
          <button type="button" class="item-btn-star ${starClass}" onclick="handlePaperStarToggle(this, '${safeData}')" title="${isStarred ? 'Remove from Saved' : 'Save / Bookmark paper'}">
            <i class="${starIcon}"></i>
          </button>
          <a href="${p.file}" target="_blank" class="item-btn-open" style="background: ${badgeColor};" onclick="handlePaperAccess('${safeData}', 'Viewed')">
            <i class="fa-solid fa-eye"></i> View
          </a>
          <a href="${p.file}" download class="item-btn-open" style="background: var(--primary-navy);" title="Download PDF" onclick="handlePaperAccess('${safeData}', 'Downloaded')">
            <i class="fa-solid fa-download"></i>
          </a>
        </div>
      </div>
    `;
  }

  window.openModelModal = function(contextKey) {
    const data = MODEL_PAPERS_DATA[contextKey];
    if (!data || !modelModalOverlay) return;

    modalStreamTitle.textContent = data.title;
    modalStreamSubtitle.textContent = data.subtitle;

    let html = '';
    if (data.papers.length > 0) {
      data.papers.forEach(p => {
        html += generatePaperItemHtml(p, 'var(--primary-blue)', '#dbeafe', 'Official Model Paper');
      });
    }

    if (data.pending) {
      html += `
        <div class="item-notice-box">
          <i class="fa-solid fa-circle-info" style="font-size: 20px;"></i>
          <div>${data.pending}</div>
        </div>
      `;
    }

    modalPapersList.innerHTML = html;
    modelModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModelModalDirect = function() {
    if (modelModalOverlay) {
      modelModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.closeModelModal = function(e) {
    if (e.target === modelModalOverlay) {
      closeModelModalDirect();
      closeSyllabusModalDirect();
    }
  };

  // =========================================================
  // CRUCIAL YEAR-END QUESTIONS (CYQS) MODAL CONTROLLER
  // =========================================================

  const cyqModalOverlay = document.getElementById('cyqModalOverlay');
  const modalCyqTitle = document.getElementById('modalCyqTitle');
  const modalCyqSubtitle = document.getElementById('modalCyqSubtitle');
  const modalCyqList = document.getElementById('modalCyqList');

  const CYQ_DATA = {
    '11-med': {
      title: 'Class 11th • Medical Science CYQs',
      subtitle: 'Crucial Year-End Questions (JKBOSE Board Exam Question Bank)',
      papers: [
        {
          name: 'Class 11th Physics CYQs',
          marks: 'Complete Physics Theory & Numerical Bank • 12 Units',
          file: 'cyqs/class-11-physics-important-questions.pdf',
          icon: 'fa-bolt',
          badge: 'High Priority CYQ'
        },
        {
          name: 'Class 11th Chemistry CYQs',
          marks: 'Physical, Inorganic & Organic Chemistry • Core Board Bank',
          file: 'cyqs/class-11-chemistry-important-questions.pdf',
          icon: 'fa-flask',
          badge: 'High Priority CYQ'
        },
        {
          name: 'Class 11th Botany CYQs',
          marks: 'Section A: Botany • All Units & Crucial Topics',
          file: 'cyqs/class-11-botany-important-questions.pdf',
          icon: 'fa-seedling',
          badge: 'High Priority CYQ'
        },
        {
          name: 'Class 11th Zoology CYQs',
          marks: 'Section B: Zoology • All Units & Crucial Topics',
          file: 'cyqs/class-11-zoology-important-questions.pdf',
          icon: 'fa-dna',
          badge: 'High Priority CYQ'
        }
      ],
      notice: 'All core Medical Science (Physics, Chemistry, Botany, Zoology) CYQ question banks are now available.'
    },
    '11-nonmed': {
      title: 'Class 11th • Non-Medical Science CYQs',
      subtitle: 'Crucial Year-End Questions (JKBOSE Board Exam Question Bank)',
      papers: [
        {
          name: 'Class 11th Physics CYQs',
          marks: 'Complete Physics Theory & Numerical Bank • 12 Units',
          file: 'cyqs/class-11-physics-important-questions.pdf',
          icon: 'fa-bolt',
          badge: 'High Priority CYQ'
        },
        {
          name: 'Class 11th Chemistry CYQs',
          marks: 'Physical, Inorganic & Organic Chemistry • Core Board Bank',
          file: 'cyqs/class-11-chemistry-important-questions.pdf',
          icon: 'fa-flask',
          badge: 'High Priority CYQ'
        }
      ],
      notice: 'Class 11th Mathematics CYQ question bank is currently being prepared and will be added here shortly.'
    },
    '11-comm': {
      title: 'Class 11th • Commerce Stream CYQs',
      subtitle: 'Crucial Year-End Questions (JKBOSE Board Exam)',
      papers: [],
      notice: 'Class 11th Accountancy, Business Studies & Economics CYQs are currently being prepared for the upcoming session.'
    },
    '11-arts': {
      title: 'Class 11th • Arts & Humanities CYQs',
      subtitle: 'Crucial Year-End Questions (JKBOSE Board Exam)',
      papers: [],
      notice: 'Class 11th Political Science, History & Sociology CYQs are being compiled and will be available shortly.'
    },
    'c10-sci': {
      title: 'Class 10th • Science CYQs',
      subtitle: 'Crucial Year-End Questions (Physics, Chemistry, Life Processes)',
      papers: [],
      notice: 'Class 10th Science Crucial Questions bank is currently being formatted for PDF release.'
    },
    'c10-math': {
      title: 'Class 10th • Mathematics CYQs',
      subtitle: 'Crucial Theorem Proofs & High-Yield Numerical Questions',
      papers: [],
      notice: 'Class 10th Mathematics high-yield problem collection will be uploaded here soon.'
    },
    'c10-sst': {
      title: 'Class 10th • Social Science CYQs',
      subtitle: 'Crucial Board Questions (History, Civics, Geography, J&K)',
      papers: [],
      notice: 'Class 10th Social Science 2025-26 revision question bank will be live soon.'
    },
    'c10-eng': {
      title: 'Class 10th • English & Urdu CYQs',
      subtitle: 'Crucial Literature Questions & Writing Skills Formats',
      papers: [],
      notice: 'Class 10th English & Urdu question compilations are being prepared.'
    }
  };

  window.openCyqModal = function(contextKey) {
    const data = CYQ_DATA[contextKey];
    if (!data || !cyqModalOverlay) return;

    if (modalCyqTitle) modalCyqTitle.textContent = data.title;
    if (modalCyqSubtitle) modalCyqSubtitle.textContent = data.subtitle;

    let html = '';
    if (data.papers && data.papers.length > 0) {
      data.papers.forEach(p => {
        html += generatePaperItemHtml(p, '#059669', '#ecfdf5', 'Crucial Questions (CYQ)');
      });
    }

    if (data.notice) {
      html += `
        <div class="item-notice-box" style="background: #f0fdf4; border-color: #bbf7d0; color: #166534;">
          <i class="fa-solid fa-circle-info" style="font-size: 20px; color: #16a34a;"></i>
          <div>${data.notice}</div>
        </div>
      `;
    }

    if (modalCyqList) modalCyqList.innerHTML = html;
    cyqModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCyqModalDirect = function() {
    if (cyqModalOverlay) {
      cyqModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.closeCyqModal = function(e) {
    if (e.target === cyqModalOverlay) {
      closeCyqModalDirect();
    }
  };

  // =========================================================
  // PREVIOUS YEAR PAPERS (PYQS) MODAL CONTROLLER
  // =========================================================

  const pyqModalOverlay = document.getElementById('pyqModalOverlay');
  const modalPyqTitle = document.getElementById('modalPyqTitle');
  const modalPyqSubtitle = document.getElementById('modalPyqSubtitle');
  const modalPyqList = document.getElementById('modalPyqList');

  const PYQ_DATA = {
    '11-med': {
      title: 'Class 11th • Medical Science PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [
        {
          name: 'Class 11th Physics (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1208-A • 70 Marks',
          file: 'pyqs/class-11-physics-pyq-series-a.pdf',
          icon: 'fa-atom',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Physics (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1208-C • 70 Marks',
          file: 'pyqs/class-11-physics-pyq-paper.pdf',
          icon: 'fa-atom',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Chemistry (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1209-C • 70 Marks',
          file: 'pyqs/class-11-chemistry-pyq-paper.pdf',
          icon: 'fa-flask',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Botany (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1210-A • 35 Marks',
          file: 'pyqs/class-11-botany-pyq-paper.pdf',
          icon: 'fa-seedling',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Zoology (Series A & B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1211-A • 35 Marks',
          file: 'pyqs/class-11-zoology-pyq-paper.pdf',
          icon: 'fa-dna',
          badge: 'Official Series A/B'
        },
        {
          name: 'Class 11th General English (Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-B • 80 Marks',
          file: 'pyqs/class-11-english-pyq-series-b.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series B'
        },
        {
          name: 'Class 11th General English (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-C • 80 Marks',
          file: 'pyqs/class-11-english-pyq-paper.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Physical Education (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1235-A • 70 Marks',
          file: 'pyqs/class-11-physical-education-pyq-series-a.pdf',
          icon: 'fa-person-running',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Information Practices (IP - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1215-B • 70 Marks',
          file: 'pyqs/class-11-information-practices-pyq-series-b.pdf',
          icon: 'fa-laptop-code',
          badge: 'Additional Subject'
        },
        {
          name: 'Class 11th Environmental Science (EVS - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1228-B • 70 Marks',
          file: 'pyqs/class-11-environmental-science-pyq-series-b.pdf',
          icon: 'fa-earth-americas',
          badge: 'Additional Subject'
        }
      ],
      notice: 'All core medical stream papers and additional subjects (IP, Physical Education, EVS) are verified and available.'
    },
    '11-nonmed': {
      title: 'Class 11th • Non-Medical Science PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [
        {
          name: 'Class 11th Mathematics (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1207-A • 100 Marks',
          file: 'pyqs/class-11-mathematics-pyq-paper.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Physics (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1208-A • 70 Marks',
          file: 'pyqs/class-11-physics-pyq-series-a.pdf',
          icon: 'fa-atom',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Physics (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1208-C • 70 Marks',
          file: 'pyqs/class-11-physics-pyq-paper.pdf',
          icon: 'fa-atom',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Chemistry (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1209-C • 70 Marks',
          file: 'pyqs/class-11-chemistry-pyq-paper.pdf',
          icon: 'fa-flask',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th General English (Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-B • 80 Marks',
          file: 'pyqs/class-11-english-pyq-series-b.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series B'
        },
        {
          name: 'Class 11th General English (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-C • 80 Marks',
          file: 'pyqs/class-11-english-pyq-paper.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Physical Education (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1235-A • 70 Marks',
          file: 'pyqs/class-11-physical-education-pyq-series-a.pdf',
          icon: 'fa-person-running',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Information Practices (IP - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1215-B • 70 Marks',
          file: 'pyqs/class-11-information-practices-pyq-series-b.pdf',
          icon: 'fa-laptop-code',
          badge: 'Additional Subject'
        },
        {
          name: 'Class 11th Environmental Science (EVS - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1228-B • 70 Marks',
          file: 'pyqs/class-11-environmental-science-pyq-series-b.pdf',
          icon: 'fa-earth-americas',
          badge: 'Additional Subject'
        }
      ],
      notice: 'All core non-medical stream papers and additional subjects (IP, Physical Education, EVS) are verified and available.'
    },
    '11-comm': {
      title: 'Class 11th • Commerce Stream PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [
        {
          name: 'Class 11th General English (Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-B • 80 Marks',
          file: 'pyqs/class-11-english-pyq-series-b.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series B'
        },
        {
          name: 'Class 11th General English (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-C • 80 Marks',
          file: 'pyqs/class-11-english-pyq-paper.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Physical Education (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1235-A • 70 Marks',
          file: 'pyqs/class-11-physical-education-pyq-series-a.pdf',
          icon: 'fa-person-running',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Information Practices (IP - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1215-B • 70 Marks',
          file: 'pyqs/class-11-information-practices-pyq-series-b.pdf',
          icon: 'fa-laptop-code',
          badge: 'Additional Subject'
        },
        {
          name: 'Class 11th Environmental Science (EVS - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1228-B • 70 Marks',
          file: 'pyqs/class-11-environmental-science-pyq-series-b.pdf',
          icon: 'fa-earth-americas',
          badge: 'Additional Subject'
        }
      ],
      notice: 'Accountancy, Business Studies and Economics previous year board papers are currently being digitized.'
    },
    '11-arts': {
      title: 'Class 11th • Arts & Humanities PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [
        {
          name: 'Class 11th General English (Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-B • 80 Marks',
          file: 'pyqs/class-11-english-pyq-series-b.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series B'
        },
        {
          name: 'Class 11th General English (Series C)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1200-C • 80 Marks',
          file: 'pyqs/class-11-english-pyq-paper.pdf',
          icon: 'fa-book-open',
          badge: 'Official Series C'
        },
        {
          name: 'Class 11th Physical Education (Series A)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1235-A • 70 Marks',
          file: 'pyqs/class-11-physical-education-pyq-series-a.pdf',
          icon: 'fa-person-running',
          badge: 'Official Series A'
        },
        {
          name: 'Class 11th Information Practices (IP - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1215-B • 70 Marks',
          file: 'pyqs/class-11-information-practices-pyq-series-b.pdf',
          icon: 'fa-laptop-code',
          badge: 'Additional Subject'
        },
        {
          name: 'Class 11th Environmental Science (EVS - Series B)',
          marks: 'Series: 11thARNKD(W/Z) JKLUT-25-1228-B • 70 Marks',
          file: 'pyqs/class-11-environmental-science-pyq-series-b.pdf',
          icon: 'fa-earth-americas',
          badge: 'Additional Subject'
        }
      ],
      notice: 'Political Science, History, Sociology and Education previous year board papers are currently being digitized.'
    },
    'c10-sci': {
      title: 'Class 10th • Science PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [],
      notice: 'Class 10th Science board question papers are being digitized for PDF release.'
    },
    'c10-math': {
      title: 'Class 10th • Mathematics PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [
        {
          name: 'Class 10th Mathematics (Series X - 2025)',
          marks: 'Series: 10th ARF(SZ) 2024-25 • Code: 103-X • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-x-2025.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Series X (2025)'
        },
        {
          name: 'Class 10th Mathematics (Series Y - 2025)',
          marks: 'Series: 10th ARF(SZ) 2024-25 • Code: 103-Y • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-y-2025.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Series Y (2025)'
        },
        {
          name: 'Class 10th Mathematics (Series Z - 2025)',
          marks: 'Series: 10th ARF(SZ) 2024-25 • Code: 103-Z • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-z-2025.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Series Z (2025)'
        },
        {
          name: 'Class 10th Mathematics (Series X - Annual 2024)',
          marks: 'Series: 10th ARM(SZ) 2024 • Code: 1003-X • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-x-annual-2024.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Annual 2024 (1003-X)'
        },
        {
          name: 'Class 10th Mathematics (Series Z - Annual 2024)',
          marks: 'Series: 10th ARM(SZ) 2024 • Code: 1003-Z • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-z-annual-2024.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Annual 2024 (1003-Z)'
        },
        {
          name: 'Class 10th Mathematics (Series X - 2023)',
          marks: 'Series: XARJKUT23 • Code: 9303-X • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-x-2023.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Series X (2023)'
        },
        {
          name: 'Class 10th Mathematics (Series Z - 2023)',
          marks: 'Series: XARJKUT23 • Code: 9303-Z • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-z-2023.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Series Z (2023)'
        },
        {
          name: 'Class 10th Mathematics (Hard Zone - Series X)',
          marks: 'Series: 10th ARM(HZ) 2024-25 • Code: 403-X • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-series-x-hardzone-2025.pdf',
          icon: 'fa-square-root-variable',
          badge: 'Hard Zone (403-X)'
        },
        {
          name: 'Class 10th Mathematics (Half-Yearly Examination Paper)',
          marks: 'Comprehensive Half-Yearly Exam • 40 Questions • 80 Marks',
          file: 'pyqs/class-10-mathematics-pyq-half-yearly-paper.pdf',
          icon: 'fa-file-lines',
          badge: 'Half-Yearly Exam'
        }
      ],
      notice: 'All Class 10th Mathematics board papers (Series X, Y, Z across 2025, 2024, 2023, Hard Zone, and Half-Yearly) are verified and available.'
    },
    'c10-sst': {
      title: 'Class 10th • Social Science PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [],
      notice: 'Class 10th Social Science previous year papers are being processed.'
    },
    'c10-eng': {
      title: 'Class 10th • English & Urdu PYQs',
      subtitle: 'Official JKBOSE Previous Year Board Examination Papers',
      papers: [],
      notice: 'Class 10th English & Urdu previous year papers will be uploaded shortly.'
    }
  };

  window.openPyqModal = function(contextKey) {
    const data = PYQ_DATA[contextKey];
    if (!data || !pyqModalOverlay) return;

    if (modalPyqTitle) modalPyqTitle.textContent = data.title;
    if (modalPyqSubtitle) modalPyqSubtitle.textContent = data.subtitle;

    let html = '';
    if (data.papers && data.papers.length > 0) {
      data.papers.forEach(p => {
        html += generatePaperItemHtml(p, '#ea580c', '#fff7ed', 'Previous Year Paper (PYQ)');
      });
    }

    if (data.notice) {
      html += `
        <div class="item-notice-box" style="background: #fff7ed; border-color: #fed7aa; color: #9a3412;">
          <i class="fa-solid fa-circle-info" style="font-size: 20px; color: #ea580c;"></i>
          <div>${data.notice}</div>
        </div>
      `;
    }

    if (modalPyqList) modalPyqList.innerHTML = html;
    pyqModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closePyqModalDirect = function() {
    if (pyqModalOverlay) {
      pyqModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.closePyqModal = function(e) {
    if (e.target === pyqModalOverlay) {
      closePyqModalDirect();
    }
  };

  // =========================================================
  // PAPER ACTIONS: STAR BOOKMARK & ACCESS TRACKING
  // =========================================================
  window.handlePaperStarToggle = function(btn, encodedData) {
    try {
      const paper = JSON.parse(decodeURIComponent(encodedData));
      const isSaved = StudyLibrary.toggleBookmark(paper);
      if (btn) {
        if (isSaved) {
          btn.classList.add('bookmarked');
          btn.innerHTML = '<i class="fa-solid fa-star"></i>';
          btn.title = 'Remove from Saved';
        } else {
          btn.classList.remove('bookmarked');
          btn.innerHTML = '<i class="fa-regular fa-star"></i>';
          btn.title = 'Save / Bookmark paper';
        }
      }

      // If My Library modal is currently active, live-refresh its view
      const libModal = document.getElementById('libraryModalOverlay');
      if (libModal && libModal.classList.contains('active')) {
        renderLibraryContent();
      }
    } catch(err) {
      console.warn("Bookmark toggle error:", err);
    }
  };

  window.handlePaperAccess = function(encodedData, action) {
    try {
      const paper = JSON.parse(decodeURIComponent(encodedData));
      StudyLibrary.recordHistory(paper, action);
    } catch (err) {
      console.warn("Record history error:", err);
    }
  };

  // =========================================================
  // MY STUDY LIBRARY MODAL CONTROLLER
  // =========================================================
  let currentLibraryTab = 'bookmarks';

  function formatTimeAgo(timestamp) {
    if (!timestamp) return 'Recently';
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays}d ago`;
  }

  window.openLibraryModal = function() {
    const modal = document.getElementById('libraryModalOverlay');
    if (!modal) return;
    StudyLibrary.updateBadges();
    window.switchLibraryTab(currentLibraryTab);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLibraryModalDirect = function() {
    const modal = document.getElementById('libraryModalOverlay');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.closeLibraryModal = function(e) {
    const modal = document.getElementById('libraryModalOverlay');
    if (e.target === modal) {
      closeLibraryModalDirect();
    }
  };

  window.switchLibraryTab = function(tabName) {
    currentLibraryTab = tabName;
    const tabBookmarksBtn = document.getElementById('tabBookmarksBtn');
    const tabHistoryBtn = document.getElementById('tabHistoryBtn');
    if (tabBookmarksBtn && tabHistoryBtn) {
      if (tabName === 'bookmarks') {
        tabBookmarksBtn.classList.add('active');
        tabHistoryBtn.classList.remove('active');
      } else {
        tabHistoryBtn.classList.add('active');
        tabBookmarksBtn.classList.remove('active');
      }
    }
    renderLibraryContent();
  };

  function renderLibraryContent() {
    const container = document.getElementById('libraryModalBody');
    if (!container) return;

    StudyLibrary.updateBadges();

    if (currentLibraryTab === 'bookmarks') {
      const bookmarks = StudyLibrary.getBookmarks();
      if (bookmarks.length === 0) {
        container.innerHTML = `
          <div class="lib-empty-state">
            <div class="lib-empty-icon"><i class="fa-regular fa-star"></i></div>
            <h4>No Saved Papers Yet</h4>
            <p>Click the <i class="fa-solid fa-star" style="color: #f59e0b;"></i> star icon next to any PYQ or CYQ paper to save it here for quick revision before exams.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = bookmarks.map(p => {
        const safeData = encodeURIComponent(JSON.stringify(p));
        return `
          <div class="modal-paper-item">
            <div class="item-info">
              <div class="item-icon" style="background: #fef3c7; color: #d97706;">
                <i class="fa-solid ${p.icon || 'fa-file-pdf'}"></i>
              </div>
              <div class="item-text">
                <h4>${p.name}</h4>
                <p><i class="fa-regular fa-bookmark" style="color: #d97706;"></i> ${p.marks || 'Saved Paper'} • <span style="color: #94a3b8;">${formatTimeAgo(p.timestamp)}</span></p>
              </div>
            </div>
            <div class="item-actions">
              <button type="button" class="item-btn-star bookmarked" onclick="handlePaperStarToggle(this, '${safeData}')" title="Remove from Saved">
                <i class="fa-solid fa-star"></i>
              </button>
              <a href="${p.file}" target="_blank" class="item-btn-open" style="background: var(--primary-blue);" onclick="handlePaperAccess('${safeData}', 'Viewed')">
                <i class="fa-solid fa-eye"></i> View
              </a>
              <a href="${p.file}" download class="item-btn-open" style="background: var(--primary-navy);" title="Download PDF" onclick="handlePaperAccess('${safeData}', 'Downloaded')">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');

    } else {
      const history = StudyLibrary.getHistory();
      if (history.length === 0) {
        container.innerHTML = `
          <div class="lib-empty-state">
            <div class="lib-empty-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <h4>No Download History Yet</h4>
            <p>Papers you view or download from any class or stream will automatically appear here so you can access them again quickly.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = history.map(p => {
        const isStarred = StudyLibrary.isBookmarked(p.file);
        const starClass = isStarred ? 'bookmarked' : '';
        const starIcon = isStarred ? 'fa-solid fa-star' : 'fa-regular fa-star';
        const safeData = encodeURIComponent(JSON.stringify(p));
        const actionBadge = p.action === 'Downloaded' 
          ? '<span style="color: #059669; font-weight: 700;"><i class="fa-solid fa-arrow-down"></i> Downloaded</span>'
          : '<span style="color: #2563eb; font-weight: 700;"><i class="fa-solid fa-eye"></i> Opened</span>';

        return `
          <div class="modal-paper-item">
            <div class="item-info">
              <div class="item-icon" style="background: #eff6ff; color: var(--primary-blue);">
                <i class="fa-solid ${p.icon || 'fa-file-pdf'}"></i>
              </div>
              <div class="item-text">
                <h4>${p.name}</h4>
                <p>${actionBadge} • ${formatTimeAgo(p.timestamp)}</p>
              </div>
            </div>
            <div class="item-actions">
              <button type="button" class="item-btn-star ${starClass}" onclick="handlePaperStarToggle(this, '${safeData}')" title="${isStarred ? 'Remove from Saved' : 'Save / Bookmark paper'}">
                <i class="${starIcon}"></i>
              </button>
              <a href="${p.file}" target="_blank" class="item-btn-open" style="background: var(--primary-blue);" onclick="handlePaperAccess('${safeData}', 'Viewed')">
                <i class="fa-solid fa-eye"></i> View
              </a>
              <a href="${p.file}" download class="item-btn-open" style="background: var(--primary-navy);" title="Download PDF" onclick="handlePaperAccess('${safeData}', 'Downloaded')">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  window.confirmClearHistory = function() {
    if (confirm("Are you sure you want to clear your download and viewing history?")) {
      StudyLibrary.clearHistory();
      renderLibraryContent();
    }
  };

  // =========================================================
  // USER AUTHENTICATION & GOOGLE SIGN-IN CONTROLLER
  // =========================================================
  window.currentUser = null;

  function setLoggedInUser(user) {
    window.currentUser = user;
    localStorage.setItem('jk_study_user', JSON.stringify(user));

    const btnLogin = document.getElementById('btnGoogleLogin');
    const userProfileMenu = document.getElementById('userProfileMenu');
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userFirstName = document.getElementById('userFirstName');
    const dropdownUserName = document.getElementById('dropdownUserName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const syncPill = document.getElementById('librarySyncPill');
    const syncPillText = document.getElementById('syncPillText');

    if (btnLogin) btnLogin.style.display = 'none';
    if (userProfileMenu) userProfileMenu.style.display = 'block';

    const firstName = (user.displayName || 'Student').split(' ')[0];
    if (userFirstName) userFirstName.textContent = firstName;
    if (userAvatarImg) userAvatarImg.src = user.photoURL || 'ceo-placeholder.svg';
    if (dropdownUserName) dropdownUserName.textContent = user.displayName || 'Student';
    if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || 'Google Account';

    if (syncPill) syncPill.classList.remove('local');
    if (syncPillText) syncPillText.textContent = 'Cloud Synced';

    // Sync cloud bookmarks if firestore available
    if (window.db && user.uid) {
      window.db.collection('student_libraries').doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data.bookmarks) localStorage.setItem(StudyLibrary.getBookmarkKey(), JSON.stringify(data.bookmarks));
          if (data.history) localStorage.setItem(StudyLibrary.getHistoryKey(), JSON.stringify(data.history));
          StudyLibrary.updateBadges();
        }
      }).catch(err => console.warn(err));
    }
    
    // Update local UI immediately when switching accounts
    StudyLibrary.updateBadges();
  }

  function setLoggedOutState() {
    window.currentUser = null;
    localStorage.removeItem('jk_study_user');

    const btnLogin = document.getElementById('btnGoogleLogin');
    const userProfileMenu = document.getElementById('userProfileMenu');
    const syncPill = document.getElementById('librarySyncPill');
    const syncPillText = document.getElementById('syncPillText');

    if (btnLogin) btnLogin.style.display = 'inline-flex';
    if (userProfileMenu) userProfileMenu.style.display = 'none';

    if (syncPill) syncPill.classList.add('local');
    if (syncPillText) syncPillText.textContent = 'Local Storage';
    
    // Update local UI immediately when logging out
    StudyLibrary.updateBadges();
  }

  window.handleGoogleSignIn = function() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(res => {
        setLoggedInUser({
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          uid: res.user.uid
        });
      }).catch(err => {
        console.warn("Google popup auth:", err.message);
        const name = prompt("Welcome to JK Study Hub! Enter your name for your personalized Study Desk:", "Student");
        if (name && name.trim()) {
          setLoggedInUser({
            displayName: name.trim(),
            email: `${name.trim().toLowerCase().replace(/\\s+/g, '')}@student.jkstudyhub.online`,
            photoURL: 'ceo-placeholder.svg',
            uid: 'student_' + Date.now()
          });
        }
      });
    } else {
      const name = prompt("Welcome to JK Study Hub! Enter your name for your personalized Study Desk:", "Student");
      if (name && name.trim()) {
        setLoggedInUser({
          displayName: name.trim(),
          email: `${name.trim().toLowerCase().replace(/\\s+/g, '')}@student.jkstudyhub.online`,
          photoURL: 'ceo-placeholder.svg',
          uid: 'student_' + Date.now()
        });
      }
    }
  };

  window.handleGoogleSignOut = function() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().signOut().then(() => {
        setLoggedOutState();
        window.toggleUserDropdown(false);
      }).catch(() => {
        setLoggedOutState();
        window.toggleUserDropdown(false);
      });
    } else {
      setLoggedOutState();
      window.toggleUserDropdown(false);
    }
  };

  window.toggleUserDropdown = function(forceClose) {
    const card = document.getElementById('userDropdownCard');
    if (!card) return;
    if (forceClose === false) {
      card.classList.remove('show');
    } else {
      card.classList.toggle('show');
    }
  };

  // Check saved session on load
  try {
    const savedUser = JSON.parse(localStorage.getItem('jk_study_user'));
    if (savedUser) {
      setLoggedInUser(savedUser);
    } else {
      setLoggedOutState();
    }
  } catch(e) {
    setLoggedOutState();
  }

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    const userProfileMenu = document.getElementById('userProfileMenu');
    const userDropdownCard = document.getElementById('userDropdownCard');
    if (userProfileMenu && userDropdownCard && !userProfileMenu.contains(e.target)) {
      userDropdownCard.classList.remove('show');
    }
  });

  // Initialize Library Badges
  StudyLibrary.updateBadges();

  // Close modals on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModelModalDirect();
      closeSyllabusModalDirect();
      closeCyqModalDirect();
      closePyqModalDirect();
      closeLibraryModalDirect();
      window.toggleUserDropdown(false);
      if (typeof closePromoModal === 'function') closePromoModal();
    }
  });

  // =========================================================
  // PROMO LOGIN MODAL LOGIC (30 Seconds)
  // =========================================================
  window.closePromoModal = function() {
    const overlay = document.getElementById('promoLoginOverlay');
    if (overlay) overlay.classList.remove('active');
    // Remember choice for 7 days
    localStorage.setItem('jk_promo_dismissed', Date.now());
  };

  window.handlePromoGoogleLogin = function() {
    if (typeof handleGoogleSignIn === 'function') {
      handleGoogleSignIn();
      closePromoModal();
    }
  };

  setTimeout(() => {
    try {
      // Check if user is already logged in
      const currentUser = JSON.parse(localStorage.getItem('jk_study_user'));
      if (currentUser) return; // Do not show if logged in

      // Check if they dismissed it recently (within 7 days)
      const dismissedAt = localStorage.getItem('jk_promo_dismissed');
      if (dismissedAt) {
        const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) return; // Do not show again for 7 days
      }

      // Show the modal
      const overlay = document.getElementById('promoLoginOverlay');
      if (overlay) overlay.classList.add('active');
    } catch (e) {
      console.warn("Error in promo timer:", e);
    }
  }, 30000); // 30 seconds

});
