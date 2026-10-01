import re

with open('index.html', 'r') as f:
    content = f.read()

syllabus_modal = """
  <!-- Interactive Syllabus Popup Modal -->
  <div class="modal-overlay" id="syllabusModalOverlay" onclick="closeSyllabusModal(event)">
    <div class="modal-card" id="syllabusModalCard">
      <div class="modal-header" style="background: linear-gradient(135deg, #1e40af, #2563eb);">
        <div class="modal-title-wrap">
          <h3 id="modalSyllabusTitle">Official PDF Syllabus</h3>
          <p id="modalSyllabusSubtitle">Select a subject to view or download</p>
        </div>
        <button class="modal-close-btn" onclick="closeSyllabusModalDirect()">&times;</button>
      </div>
      <div class="modal-body" id="modalSyllabusList">
        <!-- Injected dynamically by JavaScript -->
      </div>
      <div class="modal-footer" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 24px;">
        <span style="font-size: 12.5px; color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-certificate" style="color: var(--primary-blue); margin-right: 6px;"></i> Official JKBOSE Board Syllabus</span>
        <button type="button" onclick="closeSyllabusModalDirect()" style="background: var(--primary-navy); color: #ffffff; border: none; padding: 8px 20px; border-radius: 9999px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s;">Close</button>
      </div>
    </div>
  </div>
"""

# Insert before modelModalOverlay
content = content.replace('<!-- Interactive Model Papers Popup Modal -->', syllabus_modal + '\n  <!-- Interactive Model Papers Popup Modal -->')

with open('index.html', 'w') as f:
    f.write(content)

print("Modal added.")
