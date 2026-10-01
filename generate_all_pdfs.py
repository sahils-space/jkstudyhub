import json
import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

os.makedirs('syllabus-papers', exist_ok=True)

with open('syllabus_dump.json', 'r') as f:
    data = json.load(f)

styles = getSampleStyleSheet()
title_style = ParagraphStyle('Title', parent=styles['Heading1'], spaceAfter=20, alignment=1)
h2_style = ParagraphStyle('H2', parent=styles['Heading2'], spaceBefore=15, spaceAfter=10, textColor=colors.HexColor("#1e40af"))
h3_style = ParagraphStyle('H3', parent=styles['Heading3'], spaceBefore=10, spaceAfter=5, textColor=colors.HexColor("#0f766e"))
normal_style = styles['Normal']
bullet_style = ParagraphStyle('Bullet', parent=styles['Normal'], leftIndent=20, spaceAfter=5)

def build_pdf(filename, title, subject_data):
    filepath = os.path.join('syllabus-papers', filename)
    doc = SimpleDocTemplate(filepath, pagesize=A4)
    elements = []
    
    elements.append(Paragraph(title, title_style))
    
    meta_text = []
    if 'theoryMarks' in subject_data: meta_text.append(f"Theory Marks: {subject_data['theoryMarks']}")
    if 'practicalMarks' in subject_data: meta_text.append(f"Practical Marks: {subject_data['practicalMarks']}")
    if 'totalMarks' in subject_data: meta_text.append(f"Total Marks: {subject_data['totalMarks']}")
    if 'duration' in subject_data: meta_text.append(f"Duration: {subject_data['duration']}")
    
    if meta_text:
        elements.append(Paragraph(" | ".join(meta_text), ParagraphStyle('Meta', parent=normal_style, alignment=1, textColor=colors.dimgrey)))
        elements.append(Spacer(1, 15))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey, spaceAfter=15))
    
    if 'sections' in subject_data:
        for section in subject_data['sections']:
            sec_title = section.get('sectionTitle', '')
            if sec_title:
                elements.append(Paragraph(sec_title, h2_style))
            
            for unit in section.get('units', []):
                unit_title = f"{unit.get('unitNumber', '')}: {unit.get('title', '')} ({unit.get('marks', '')} Marks)"
                elements.append(Paragraph(unit_title, h3_style))
                for topic in unit.get('topics', []):
                    elements.append(Paragraph(f"• {topic}", bullet_style))
                elements.append(Spacer(1, 5))
    
    # Textbooks
    if 'books' in subject_data and subject_data['books']:
        elements.append(Spacer(1, 15))
        elements.append(Paragraph("Prescribed Textbooks:", h2_style))
        for book in subject_data['books']:
            elements.append(Paragraph(f"• {book}", bullet_style))
            
    doc.build(elements)
    print(f"Generated {filename}")

# Class 10
c10_mapping = {
    'c10-sci': 'class-10-science-syllabus.pdf',
    'c10-math': 'class-10-mathematics-syllabus.pdf',
    'c10-sst': 'class-10-social-science-syllabus.pdf',
    'c10-eng': 'class-10-general-english-syllabus.pdf',
    'c10-urdu': 'class-10-urdu-syllabus.pdf',
    'c10-cs': 'class-10-computer-science-syllabus.pdf'
}

for subj in data['SYLLABUS_10_DATA']:
    fid = subj['id']
    if fid in c10_mapping:
        build_pdf(c10_mapping[fid], f"Class 10th {subj['name']} Syllabus", subj)

# Class 11
c11_mapping = {
    'med-bio': 'class-11-biology-syllabus.pdf',
    'med-phy': 'class-11-physics-syllabus.pdf',
    'med-chem': 'class-11-chemistry-syllabus.pdf',
    'med-eng': 'class-11-general-english-syllabus.pdf',
    'nonmed-math': 'class-11-mathematics-syllabus.pdf',
    'nonmed-cs': 'class-11-computer-science-syllabus.pdf',
    'comm-acc': 'class-11-accountancy-syllabus.pdf',
    'comm-bst': 'class-11-business-studies-syllabus.pdf',
    'comm-eco': 'class-11-economics-syllabus.pdf',
    'comm-ep': 'class-11-entrepreneurship-syllabus.pdf',
    'comm-bm': 'class-11-business-mathematics-syllabus.pdf',
    'arts-pol': 'class-11-political-science-syllabus.pdf',
    'arts-hist': 'class-11-history-syllabus.pdf',
    'arts-soc': 'class-11-sociology-syllabus.pdf',
    'arts-psy': 'class-11-psychology-syllabus.pdf',
    'arts-geo': 'class-11-geography-syllabus.pdf',
    'arts-edu': 'class-11-education-syllabus.pdf',
    'arts-is': 'class-11-islamic-studies-syllabus.pdf',
    'arts-phil': 'class-11-philosophy-syllabus.pdf',
    'arts-urdu': 'class-11-urdu-literature-syllabus.pdf',
    'arts-englit': 'class-11-english-literature-syllabus.pdf'
}

for stream, sdata in data['SYLLABUS_DATA'].items():
    for subj in sdata['subjects']:
        fid = subj['id']
        if fid in c11_mapping:
            # check if it exists so we don't duplicate (since physics is in med and nonmed)
            filepath = os.path.join('syllabus-papers', c11_mapping[fid])
            if not os.path.exists(filepath):
                build_pdf(c11_mapping[fid], f"Class 11th {subj['name']} Syllabus", subj)

print("All PDFs built successfully!")
