import os
from pypdf import PdfReader, PdfWriter

CLASS_11_PDF = '/Users/sahilzahoor/.gemini/antigravity/brain/34d78e6e-c8d9-4cdd-b448-d440ca8f5dba/.user_uploaded/media_1790851589761.pdf'
OUT_DIR = 'syllabus-papers'

reader11 = PdfReader(CLASS_11_PDF)

def extract(reader, start_pdf_page, end_pdf_page, out_filename):
    writer = PdfWriter()
    for i in range(start_pdf_page - 1, end_pdf_page):
        if i < len(reader.pages):
            writer.add_page(reader.pages[i])
    with open(os.path.join(OUT_DIR, out_filename), 'wb') as f:
        writer.write(f)
    print(f"Extracted {out_filename}")

# Philosophy: Printed 75-76 -> PDF 75+8 = 83, 76+8 = 84
extract(reader11, 83, 84, 'class-11-philosophy-syllabus.pdf')

# Urdu Literature: Printed 161-164 maybe?
# The index says: 46 Urdu(From right to left) 167-165. 
# Let's extract pages 165+8 to 167+8 = 173 to 175
extract(reader11, 173, 175, 'class-11-urdu-literature-syllabus.pdf')

