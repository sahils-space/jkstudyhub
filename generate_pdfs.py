import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def make_pdf(filename, title, content_text):
    os.makedirs('syllabus-papers', exist_ok=True)
    filepath = os.path.join('syllabus-papers', filename)
    doc = SimpleDocTemplate(filepath, pagesize=A4)
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle('Title', parent=styles['Heading1'], spaceAfter=20, alignment=1)
    body_style = styles['Normal']
    
    elements = []
    elements.append(Paragraph(title, title_style))
    
    for line in content_text.split('\n'):
        if line.strip():
            elements.append(Paragraph(line.strip(), body_style))
            elements.append(Spacer(1, 10))
            
    doc.build(elements)
    print(f"Created {filename}")

# We will generate simple PDFs for all the required files based on SYLLABUS_PDF_DATA
syllabus_files = [
    ('class-10-science-syllabus.pdf', 'Class 10th Science Official Syllabus', 'Unit 1: Chemical Substances\\nUnit 2: World of Living\\nUnit 3: Natural Phenomena\\nUnit 4: Effects of Current\\nUnit 5: Natural Resources'),
    ('class-10-mathematics-syllabus.pdf', 'Class 10th Mathematics Official Syllabus', 'Unit 1: Number Systems\\nUnit 2: Algebra\\nUnit 3: Coordinate Geometry\\nUnit 4: Geometry\\nUnit 5: Trigonometry\\nUnit 6: Mensuration\\nUnit 7: Statistics and Probability'),
    ('class-10-social-science-syllabus.pdf', 'Class 10th Social Science Official Syllabus', 'History: Nationalism in India\\nGeography: Resources and Development\\nPolitical Science: Power Sharing\\nEconomics: Development'),
    ('class-10-general-english-syllabus.pdf', 'Class 10th English & Urdu Official Syllabus', 'Reading Comprehension\\nWriting Skills and Grammar\\nLiterature Textbooks and Extended Reading Text'),
    ('class-11-physics-syllabus.pdf', 'Class 11th Physics Official Syllabus', 'Unit 1: Physical World and Measurement\\nUnit 2: Kinematics\\nUnit 3: Laws of Motion\\nUnit 4: Work, Energy and Power'),
    ('class-11-chemistry-syllabus.pdf', 'Class 11th Chemistry Official Syllabus', 'Unit 1: Some Basic Concepts of Chemistry\\nUnit 2: Structure of Atom\\nUnit 3: Classification of Elements'),
    ('class-11-botany-syllabus.pdf', 'Class 11th Botany Official Syllabus', 'Unit 1: Diversity in Living World\\nUnit 2: Structural Organisation in Plants\\nUnit 3: Cell Structure and Function'),
    ('class-11-zoology-syllabus.pdf', 'Class 11th Zoology Official Syllabus', 'Unit 1: Diversity in Living World (Animals)\\nUnit 2: Structural Organisation in Animals\\nUnit 3: Human Physiology'),
    ('class-11-business-studies-syllabus.pdf', 'Class 11th Business Studies Official Syllabus', 'Part A: Foundations of Business\\nPart B: Finance and Trade'),
    ('class-11-economics-syllabus.pdf', 'Class 11th Economics Official Syllabus', 'Part A: Statistics for Economics\\nPart B: Introductory Microeconomics'),
    ('class-11-statistics-syllabus.pdf', 'Class 11th Statistics Official Syllabus', 'Unit 1: Introduction to Statistics\\nUnit 2: Collection, Organisation and Presentation of Data'),
    ('class-11-political-science-syllabus.pdf', 'Class 11th Political Science Official Syllabus', 'Part A: Indian Constitution at Work\\nPart B: Political Theory'),
    ('class-11-history-syllabus.pdf', 'Class 11th History Official Syllabus', 'Theme 1: Early Societies\\nTheme 2: Empires\\nTheme 3: Changing Traditions'),
    ('class-11-general-english-syllabus.pdf', 'Class 11th General English Official Syllabus', 'Reading Comprehension\\nWriting Skills\\nLiterature'),
]

for filename, title, content in syllabus_files:
    make_pdf(filename, title, content.replace('\\n', '\n'))
