import pymupdf as fitz
import os
import glob

IN_DIR = "syllabus-papers"
OUT_DIR = "syllabus-papers-4k"

os.makedirs(OUT_DIR, exist_ok=True)

pdf_files = glob.glob(f"{IN_DIR}/*.pdf")

for pdf_path in pdf_files:
    filename = os.path.basename(pdf_path)
    
    doc = fitz.open(pdf_path)
    new_doc = fitz.open()
    
    for page in doc:
        # A4 is 595x842. Zoom = 6.0 gives 3570x5052 (near 4K)
        # Using 7.0 gives ~ 4165x5894 (true 4K)
        mat = fitz.Matrix(7.0, 7.0)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        
        # High quality JPEG
        img_bytes = pix.tobytes("jpeg")
        
        new_page = new_doc.new_page(width=pix.width, height=pix.height)
        page_rect = fitz.Rect(0, 0, pix.width, pix.height)
        new_page.insert_image(page_rect, stream=img_bytes)
        
    out_path = os.path.join(OUT_DIR, filename)
    new_doc.save(out_path, deflate=False)
    new_doc.close()
    doc.close()
    
    os.replace(out_path, pdf_path)
    print(f"Processed {filename} -> Size: {os.path.getsize(pdf_path) / (1024*1024):.2f} MB")

os.rmdir(OUT_DIR)
print("All PDFs converted to 4K resolution!")
