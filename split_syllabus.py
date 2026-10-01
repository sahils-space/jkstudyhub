import os
from pypdf import PdfReader, PdfWriter

CLASS_11_PDF = '/Users/sahilzahoor/.gemini/antigravity/brain/34d78e6e-c8d9-4cdd-b448-d440ca8f5dba/.user_uploaded/media_1790851589761.pdf'
CLASS_10_PDF = '/Users/sahilzahoor/.gemini/antigravity/brain/34d78e6e-c8d9-4cdd-b448-d440ca8f5dba/.user_uploaded/media_1790851598202.pdf'
OUT_DIR = 'syllabus-papers'

# Just to be 100% sure about which is which, check page count
reader1 = PdfReader(CLASS_11_PDF)
reader2 = PdfReader(CLASS_10_PDF)

if len(reader1.pages) < len(reader2.pages):
    CLASS_11_PDF, CLASS_10_PDF = CLASS_10_PDF, CLASS_11_PDF

reader11 = PdfReader(CLASS_11_PDF)
reader10 = PdfReader(CLASS_10_PDF)

os.makedirs(OUT_DIR, exist_ok=True)

def extract(reader, start_pdf_page, end_pdf_page, out_filename):
    writer = PdfWriter()
    # pypdf pages are 0-indexed
    for i in range(start_pdf_page - 1, end_pdf_page):
        if i < len(reader.pages):
            writer.add_page(reader.pages[i])
    with open(os.path.join(OUT_DIR, out_filename), 'wb') as f:
        writer.write(f)
    print(f"Extracted {out_filename}")

# Class 11 Mappings (Offset: PDF Page = Printed Page + 8)
c11_tasks = [
    ('class-11-general-english-syllabus.pdf', 3, 5),
    ('class-11-history-syllabus.pdf', 6, 8),
    ('class-11-economics-syllabus.pdf', 9, 15),
    ('class-11-geography-syllabus.pdf', 16, 18),
    ('class-11-political-science-syllabus.pdf', 19, 21),
    ('class-11-psychology-syllabus.pdf', 22, 23),
    ('class-11-sociology-syllabus.pdf', 24, 26),
    ('class-11-mathematics-syllabus.pdf', 27, 30),
    ('class-11-physics-syllabus.pdf', 31, 37),
    ('class-11-chemistry-syllabus.pdf', 38, 41),
    ('class-11-biology-syllabus.pdf', 42, 46), # Covers Botany and Zoology
    ('class-11-business-studies-syllabus.pdf', 47, 57),
    ('class-11-accountancy-syllabus.pdf', 58, 60),
    ('class-11-computer-science-syllabus.pdf', 61, 64),
    ('class-11-information-practices-syllabus.pdf', 65, 67),
    ('class-11-statistics-syllabus.pdf', 71, 74),
    ('class-11-education-syllabus.pdf', 77, 79),
    ('class-11-islamic-studies-syllabus.pdf', 89, 89),
    ('class-11-english-literature-syllabus.pdf', 149, 150),
    ('class-11-entrepreneurship-syllabus.pdf', 121, 130),
    ('class-11-business-mathematics-syllabus.pdf', 134, 135)
]

for filename, start, end in c11_tasks:
    extract(reader11, start + 8, end + 8, filename)

# For Zoology and Botany separately (they are inside Biology 42-46)
extract(reader11, 42 + 8, 46 + 8, 'class-11-botany-syllabus.pdf')
extract(reader11, 42 + 8, 46 + 8, 'class-11-zoology-syllabus.pdf')


# Class 10 Mappings (Offset: PDF Page = Printed Page + 1)
c10_tasks = [
    ('class-10-general-english-syllabus.pdf', 8, 14),
    ('class-10-mathematics-syllabus.pdf', 25, 28),
    ('class-10-social-science-syllabus.pdf', 29, 38),
    ('class-10-science-syllabus.pdf', 39, 47),
    ('class-10-computer-science-syllabus.pdf', 48, 51),
    ('class-10-urdu-syllabus.pdf', 19, 24)
]

for filename, start, end in c10_tasks:
    extract(reader10, start + 1, end + 1, filename)

print("All extractions complete!")
