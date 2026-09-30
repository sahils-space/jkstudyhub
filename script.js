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

  window.openModelModal = function(contextKey) {
    const data = MODEL_PAPERS_DATA[contextKey];
    if (!data || !modelModalOverlay) return;

    modalStreamTitle.textContent = data.title;
    modalStreamSubtitle.textContent = data.subtitle;

    let html = '';
    if (data.papers.length > 0) {
      data.papers.forEach(p => {
        html += `
          <div class="modal-paper-item">
            <div class="item-info">
              <div class="item-icon">
                <i class="fa-solid ${p.icon}"></i>
              </div>
              <div class="item-text">
                <h4>${p.name}</h4>
                <p><i class="fa-regular fa-clock"></i> ${p.marks}</p>
              </div>
            </div>
            <div class="item-actions">
              <a href="${p.file}" target="_blank" class="item-btn-open">
                <i class="fa-solid fa-eye"></i> View
              </a>
              <a href="${p.file}" download class="item-btn-open" style="background: var(--primary-navy);" title="Download PDF">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
        `;
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
        html += `
          <div class="modal-paper-item">
            <div class="item-info">
              <div class="item-icon" style="background: #ecfdf5; color: #059669;">
                <i class="fa-solid ${p.icon}"></i>
              </div>
              <div class="item-text">
                <h4>${p.name}</h4>
                <p><i class="fa-regular fa-bookmark" style="color: #059669;"></i> ${p.marks}</p>
              </div>
            </div>
            <div class="item-actions">
              <a href="${p.file}" target="_blank" class="item-btn-open" style="background: #059669;">
                <i class="fa-solid fa-eye"></i> View
              </a>
              <a href="${p.file}" download class="item-btn-open" style="background: var(--primary-navy);" title="Download PDF">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
        `;
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

  // Close modals on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModelModalDirect();
      closeCyqModalDirect();
    }
  });

});
