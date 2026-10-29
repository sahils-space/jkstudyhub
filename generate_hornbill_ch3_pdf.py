import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

os.makedirs('cyqs', exist_ok=True)
PDF_PATH = 'cyqs/class-11-english-hornbill-discovering-tut-summary.pdf'

class CYQNumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            w, h = A4
            self.setFont('Helvetica-Bold', 8.5)
            self.setFillColor(colors.HexColor('#1e293b'))
            self.drawRightString(w - 38, 24, f"Page {self._pageNumber} of {num_pages}")
            super().showPage()
        super().save()


def draw_page_background(canvas_obj, doc):
    w, h = A4
    page_num = canvas_obj._pageNumber

    # ----------------------------------------------------
    # 1. True Background Watermark (Soft Faint Silver, Under Text)
    # ----------------------------------------------------
    canvas_obj.saveState()
    canvas_obj.setFont('Helvetica-Bold', 48)
    canvas_obj.setFillColor(colors.HexColor('#edf2f7'))  # Soft light silver gray
    canvas_obj.translate(w / 2.0, h / 2.0)
    canvas_obj.rotate(45)
    canvas_obj.drawCentredString(0, 0, "JK STUDY HUB")
    canvas_obj.restoreState()

    # ----------------------------------------------------
    # 2. Header Block
    # ----------------------------------------------------
    if page_num == 1:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 58, w, 58, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 16)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 28, "JK STUDY HUB")

        canvas_obj.setFont('Helvetica', 8)
        canvas_obj.setFillColor(colors.HexColor('#93c5fd'))
        canvas_obj.drawString(38, h - 44, "JAMMU & KASHMIR BOARD EXAMINATION PORTAL  |  SESSION 2025-26")

        canvas_obj.setFont('Helvetica-Bold', 11)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 30, "jkstudyhub.online")

        canvas_obj.setFillColor(colors.HexColor('#047857'))
        canvas_obj.rect(38, h - 90, w - 76, 26, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 9.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  COMPLETE CHAPTER SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "NCERT / JKBOSE BOARD SYLLABUS")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Ch 3: Discovering Tut: The Saga Continues — A.R. Williams")

        canvas_obj.setStrokeColor(colors.HexColor('#047857'))
        canvas_obj.setLineWidth(2)
        canvas_obj.line(0, h - 44, w, h - 44)

    # ----------------------------------------------------
    # 3. Footer Base Line & Branding
    # ----------------------------------------------------
    canvas_obj.setStrokeColor(colors.HexColor('#cbd5e1'))
    canvas_obj.setLineWidth(0.75)
    canvas_obj.line(38, 38, w - 38, 38)

    canvas_obj.setFont('Helvetica', 7.5)
    canvas_obj.setFillColor(colors.HexColor('#64748b'))
    canvas_obj.drawString(38, 24, "JK STUDY HUB | OFFICIAL EDUCATIONAL & BOARD RESOURCE PORTAL | HTTPS://JKSTUDYHUB.ONLINE/")


def build_pdf():
    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=A4,
        leftMargin=38,
        rightMargin=38,
        topMargin=104,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    ch_title_style = ParagraphStyle(
        'ChapterTitle',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=4,
        spaceBefore=0
    )

    author_style = ParagraphStyle(
        'AuthorMeta',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#047857'),
        spaceAfter=3
    )

    meta_tag_style = ParagraphStyle(
        'MetaTag',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#64748b'),
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'Heading1Custom',
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=11,
        leading=16,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=8,
        alignment=4
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        fontName='Helvetica',
        fontSize=10.5,
        leading=15.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=5
    )

    box_title_style = ParagraphStyle(
        'BoxTitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=4
    )

    box_body_style = ParagraphStyle(
        'BoxBody',
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=3
    )

    story = []

    # Title Block
    story.append(Paragraph("Discovering Tut: The Saga Continues", ch_title_style))
    story.append(Paragraph("Author: A. R. Williams &nbsp;|&nbsp; Genre: Archaeological & Scientific Feature", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Chapter Overview & Introduction", h1_style))
    story.append(Paragraph(
        "<b><i>Discovering Tut: The Saga Continues</i></b> by <b>A. R. Williams</b> is an illuminating, investigative account of the "
        "legendary Egyptian boy-king <b>Tutankhamun</b> (popularly known as King Tut). The article explores the dramatic discovery "
        "of his undisturbed tomb, the fabulous golden artifacts buried with him, the unfortunate physical damage inflicted upon his mummy "
        "by early archaeologists, and the modern deployment of cutting-edge computed tomography (CT scanning) to unravel the enduring "
        "mysteries surrounding his youthful life and unexpected death.",
        body_style
    ))
    story.append(Paragraph(
        "King Tut was the last heir of an immensely powerful royal family that had ruled Egypt's golden empire for centuries. He died "
        "mysteriously in his late teens, sparking widespread historical speculation—including theories of foul play and murder. "
        "On <b>5 January 2005</b>, precisely at 6:00 PM, King Tut's mummy was carefully removed from its subterranean tomb in the "
        "fabled <b>Valley of the Kings</b> to undergo a high-resolution CT scan aimed at shedding light on his exact age and cause of demise.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Howard Carter's Discovery & Forensic Complications (1922)", h1_style))
    story.append(Paragraph(
        "In 1922, British archaeologist <b>Howard Carter</b> discovered King Tut's underground tomb after years of fruitless excavations. "
        "Although grave robbers had ransacked parts of the antechambers in antiquity, the burial vault itself remained astonishingly intact. "
        "It housed the most spectacular hoard of royal gold treasures ever unearthed in archaeological history.",
        body_style
    ))
    story.append(Paragraph("The royal burial complex revealed two categories of fascinating items:", body_style))
    story.append(Paragraph("• <b>Gold Artifacts of Resurrection:</b> Magnificent collars, necklaces, bracelets, rings, amulets, sandals, and a solid gold funerary mask and coffin designed to guarantee his eternal rebirth in the afterlife.", bullet_style))
    story.append(Paragraph("• <b>Everyday Comforts for Eternity:</b> Board games, a bronze razor, fine linen garments, dried fruits, food cases, and jars of wine intended for his comfort in the netherworld.", bullet_style))
    story.append(Paragraph(
        "When Carter opened the outermost of the three nesting coffins, he found a shroud lovingly adorned with garlands of willow, olive leaves, "
        "wild celery, lotus petals, and cornflowers—botanical evidence establishing that the royal burial had occurred in <b>March or April</b>.",
        body_style
    ))
    story.append(Paragraph(
        "However, Carter encountered a catastrophic obstacle when reaching the innermost coffin: the ritual funerary resins had hardened into "
        "an unyielding cement, bonding the mummy rigidly to the solid gold base. Carter attempted to bake the coffin under blistering desert heat "
        "(reaching 149 degrees Fahrenheit), but the resin remained rock solid.",
        body_style
    ))
    story.append(Paragraph(
        "Fearing that leaving the gold in place would tempt thieves to rip the tomb apart under cover of darkness, Carter made the controversial "
        "decision to chisel away the hardened resin. His team severed the king's head and virtually all major limb joints to detach the mummy. "
        "They subsequently reassembled the dismembered remains upon a bed of sand in a wooden box, which became Tut's modern resting place.",
        body_style
    ))

    # Section 3
    story.append(Paragraph("3. Evolution of Modern Archaeology & The 1968 X-Ray Revelation", h1_style))
    story.append(Paragraph(
        "In the decades following Carter's sensational find, the fundamental philosophy of archaeology transformed. The discipline shifted its "
        "primary focus away from sensational treasure-hunting toward forensic science, social anthropology, and reconstructing the daily realities "
        "and medical histories of ancient peoples.",
        body_style
    ))
    story.append(Paragraph(
        "In <b>1968</b>, more than forty years after Carter's excavations, an anatomy professor X-rayed the mummy and made a startling discovery: "
        "beneath the hardened chest resin, <b>King Tut's breastbone and front ribs were completely missing</b>. This revelation deepened the "
        "mystery: had the young king suffered a catastrophic chest trauma in battle, a chariot accident, or had he been assassinated?",
        body_style
    ))
    story.append(Paragraph(
        "To resolve these questions without further mutilating the fragile body, scientists turned to <b>Computed Tomography (CT)</b>. "
        "By capturing hundreds of cross-sectional X-ray slices, a CT scanner constructs a flawless 3D digital facsimile of the corpse, "
        "providing non-invasive forensic clarity.",
        body_style
    ))

    # Section 4
    story.append(Paragraph("4. Royal Dynasty, Religious Turmoil & Tut's Restoration", h1_style))
    story.append(Paragraph(
        "King Tut's lineage represents one of the most turbulent epochs in ancient Egyptian history:",
        body_style
    ))
    story.append(Paragraph("• <b>Amenhotep III:</b> Tut's father or grandfather was a legendary pharaoh who ruled for nearly 40 prosperous years during the zenith of the 18th Dynasty.", bullet_style))
    story.append(Paragraph("• <b>Akhenaten's Heresy:</b> His eccentric successor, Amenhotep IV, initiated a radical religious upheaval. He outlawed traditional gods, elevated <b>Aten</b> (the sun disk), changed his own name to <b>Akhenaten</b> ('servant of the Aten'), and moved the royal capital from Thebes to the newly built city of <b>Akhetaten</b> (modern Amarna). Furthermore, he shocked the nation by smashing statues of the chief deity <b>Amun</b> and shutting down his ancient temples.", bullet_style))
    story.append(Paragraph("• <b>Tutankhaten to Tutankhamun:</b> Following Akhenaten's demise and the brief, mysterious reign of Smenkhkare, a young boy named <b>Tutankhaten</b> assumed the throne. Recognizing the country's spiritual distress, he swiftly restored traditional worship, changed his name to <b>Tutankhamun</b> ('living image of Amun'), and oversaw an orderly return to the old religion. He reigned for roughly nine years before passing away unexpectedly.", bullet_style))

    # Section 5
    story.append(Paragraph("5. The High-Tech CT Scan of January 5, 2005", h1_style))
    story.append(Paragraph(
        "Under the auspices of the <b>Egyptian Mummy Project</b> (which had recorded over 600 mummies since late 2003), King Tut's mummy was selected "
        "to become the first to undergo scanning using a portable state-of-the-art CT machine manufactured by <b>Siemens</b> and donated by "
        "the <b>National Geographic Society</b>.",
        body_style
    ))
    story.append(Paragraph(
        "On the cold desert night of <b>5 January 2005</b>, ghostly dust devils swirled as Tut's mummy was hoisted out of the tomb into a customized "
        "scanning trailer. The apparatus recorded <b>1,700 digital cross-sectional X-ray images</b> from head to toe. Tut's skull was scanned in "
        "microscopic <b>0.62-millimetre slices</b> to capture the finest structural nuances.",
        body_style
    ))
    story.append(Paragraph(
        "A dramatic technical hitch occurred when desert sand blew into the scanner's cooling fans, causing the machine to stall. A nervous guard "
        "whispered, <i>'Curse of the Pharaoh!'</i> However, technicians quickly brought out two white replacement fans, allowing the scan to resume. "
        "In less than three hours, the mummy was returned peacefully to his underground crypt beneath the Valley of the Kings. "
        "<b>Zahi Hawass</b>, Secretary General of Egypt's Supreme Council of Antiquities, breathed a profound sigh of relief that no further damage had occurred.",
        body_style
    ))

    # Section 6
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & CRITICAL ANALYSIS</b>", box_title_style)],
        [Paragraph(
            "• <b>Central Theme:</b> Demonstrates the marriage of modern medical technology (CT scanning) and forensic archaeology in solving ancient historical enigmas without invasive physical destruction.<br/>"
            "• <b>Howard Carter's Justification vs Critique:</b> Carter's chiselling defended as necessary to prevent thievery, yet criticized for irreversibly damaging the anatomical integrity of the mummy.<br/>"
            "• <b>Significance of Akhenaten's Reign:</b> Marked a fanatic monotheistic disruption of Egyptian traditions; King Tut's historical acclaim rests largely upon his restoration of Amun worship.<br/>"
            "• <b>The Curse of the Pharaoh:</b> Popularized folklore that disturbing royal tombs brings misfortune; scientifically demystified during the 2005 scan despite the eerie dust storm and fan malfunction.",
            box_body_style
        )]
    ]

    exam_table = Table(exam_box_content, colWidths=[519])
    exam_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0fdf4')),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#16a34a')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))

    story.append(exam_table)

    doc.build(
        story,
        canvasmaker=CYQNumberedCanvas,
        onFirstPage=draw_page_background,
        onLaterPages=draw_page_background
    )
    print(f"Successfully generated {PDF_PATH} ({os.path.getsize(PDF_PATH)} bytes)")

if __name__ == '__main__':
    build_pdf()
