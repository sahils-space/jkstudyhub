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
PDF_PATH = 'cyqs/class-11-english-hornbill-the-adventure-summary.pdf'

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
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  PROSE FICTION SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "THE ADVENTURE: DETAILED REVISION")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "The Adventure — Jayant Narlikar")

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
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=13,
        spaceAfter=5,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=10.5,
        leading=15.5,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=7,
        alignment=4
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
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
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=3
    )

    story = []

    # Title Block
    story.append(Paragraph("The Adventure", ch_title_style))
    story.append(Paragraph("Author: Jayant Narlikar &nbsp;|&nbsp; Genre: Historical Science Fiction (Alternate History)", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=11, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Chapter Overview: The Fusion of Science & History", h1_style))
    story.append(Paragraph(
        "<b><i>The Adventure</i></b> by world-renowned astrophysicist and science-fiction writer <b>Jayant Narlikar</b> is an ingenious "
        "narrative that fuses Indian history with modern theoretical physics. The story follows <b>Professor Gangadharpant Gaitonde</b>, "
        "an eminent Pune historian, who suffers a vehicular collision and undergoes an extraordinary mental excursion into a parallel reality. "
        "In this alternate world, a minute historical contingency radically reshaped the destiny of the Indian subcontinent.",
        body_style
    ))
    story.append(Paragraph(
        "Narlikar uses this fascinating premise to explore <b>Catastrophe Theory</b> and the <b>Many-Worlds Interpretation of Quantum Mechanics</b>, "
        "demonstrating how history and reality are not rigidly linear, but subject to bifurcations at critical nodal points.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. The Strange Journey: An Unfamiliar Bombay", h1_style))
    story.append(Paragraph(
        "While travelling from Pune to Bombay aboard the <i>Jijamata Express</i>, Professor Gaitonde meets a companion named Khan Sahib. "
        "At a small border station named <b>Sarhad</b>, Gaitonde is startled to discover passport and customs checks, marking the frontier "
        "where British territory began.",
        body_style
    ))
    story.append(Paragraph(
        "Upon arriving at <b>Victoria Terminus</b>, he is deeply disoriented by several inexplicable anomalies:",
        body_style
    ))
    story.append(Paragraph("• <b>Flourishing East India Company:</b> The station was spotlessly clean, with Anglo-Indian staff and Union Jack flags. Most shocking of all, the <b>East India Company</b> was alive and prospering—despite having been officially dissolved in 1858 in Gaitonde's known history.", bullet_style))
    story.append(Paragraph("• <b>British Commercial Enclave:</b> Walking along Hornby Road, he observed British department stores (such as Boots and Woolworth) and foreign bank headquarters.", bullet_style))
    story.append(Paragraph("• <b>Missing Son:</b> When he visited the Forbes building where his son, Vinay Gaitonde, worked, the receptionist found no record of anyone by that name in their employment rolls.", bullet_style))

    # Section 3
    story.append(Paragraph("3. Historical Research at the Town Hall Library", h1_style))
    story.append(Paragraph(
        "Determined to resolve the mystery, Professor Gaitonde hurried to the Asiatic Society Library in the historic <b>Town Hall</b>. "
        "He requested five volumes of Indian history that he himself had authored. Reading through them, he observed that historical events "
        "matched his memories perfectly up to the death of Aurangzeb.",
        body_style
    ))
    story.append(Paragraph(
        "The monumental deviation appeared in <b>Volume 5</b>, which recorded the outcome of the fateful <b>Third Battle of Panipat (1761)</b>:",
        body_style
    ))
    story.append(Paragraph("• <b>Maratha Victory:</b> In this timeline, the Maratha army under Sadashivrao Bhau and his nephew Vishwasrao defeated Ahmad Shah Abdali of Afghanistan.", bullet_style))
    story.append(Paragraph("• <b>Ascent of Vishwasrao:</b> Vishwasrao ascended the throne in Pune, consolidating Maratha supremacy across north and central India.", bullet_style))
    story.append(Paragraph("• <b>Containment of the British:</b> The East India Company's expansion was halted. The British were confined strictly to commercial trade enclaves in Bombay, Calcutta, and Madras.", bullet_style))

    # Section 4
    story.append(Paragraph("4. The Emergence of a Modern, Democratic India", h1_style))
    story.append(Paragraph(
        "As Gaitonde read on, he discovered that this alternate India had evolved along admirable lines of self-respect, technological prowess, "
        "and democratic governance:",
        body_style
    ))
    story.append(Paragraph("• <b>Indigenous Modernization:</b> The Maratha rulers established their own science, engineering, and military academies, enlisting foreign experts solely to train local talent without allowing colonial subjugation.", bullet_style))
    story.append(Paragraph("• <b>Democratic Transition:</b> Power gradually shifted from the Peshwas to democratically elected legislative assemblies. The Mughal Emperor in Delhi was retained merely as a ceremonial figurehead to endorse democratic bills.", bullet_style))
    story.append(Paragraph("• <b>The 1908 Bombay Treaty:</b> The British had been granted a commercial lease over Bombay, scheduled to expire in 2001.", bullet_style))

    # Section 5
    story.append(Paragraph("5. The Crucial Bifurcation: Bhausahebanchi Bakhar", h1_style))
    story.append(Paragraph(
        "Gaitonde sought the exact mechanical turning point that caused the victory. He consulted an ancient Marathi chronicle called "
        "<b><i>Bhausahebanchi Bakhar</i></b>. Comparing the text, he discovered a pivotal discrepancy in a single battle sentence:",
        body_style
    ))
    story.append(Paragraph("• <b>In Known History:</b> The bullet struck Vishwasrao, killing him instantly. Seeing their young leader fall, the Maratha soldiers panicked, lost morale, and suffered total rout.", bullet_style))
    story.append(Paragraph("• <b>In the Alternate Reality:</b> The bullet <i>'brushed past his ear'</i> by the fraction of an inch, missing him. Seeing Vishwasrao rally and charge forward with bravery, the inspired Maratha forces fought fiercely, routed Abdali's troops, and won the day.", bullet_style))
    story.append(Paragraph(
        "Without realizing it, Gaitonde absently slipped that printed page into his pocket before leaving the library.",
        body_style
    ))

    # Section 6
    story.append(Paragraph("6. The Azad Maidan Uproar & Return to Reality", h1_style))
    story.append(Paragraph(
        "That evening, walking past <b>Azad Maidan</b>, the professor noticed a public seminar with a large audience. Accustomed to academic "
        "etiquette where a chairperson presides, he was horrified to find the <b>presidential chair unoccupied</b>. He instinctively marched "
        "onto the dais and occupied the chair to inaugurate the session.",
        body_style
    ))
    story.append(Paragraph(
        "The audience violently protested. In this progressive society, people had abolished long speeches, formal chairpersons, and votes of thanks—they "
        "demanded only to hear the invited speaker. When Gaitonde refused to step down, the crowd pelted him with tomatoes and eggs, "
        "finally rushing the stage to physically eject him. In the midst of the physical struggle, Gaitonde lost consciousness and vanished from that world.",
        body_style
    ))

    # Section 7
    story.append(Paragraph("7. Rajendra Deshpande's Scientific Explanation", h1_style))
    story.append(Paragraph(
        "Gaitonde woke up in a Pune hospital in his own familiar world. He met his physicist friend, <b>Rajendra Deshpande</b>, who analyzed "
        "the experience scientifically after examining the physical evidence: the torn page from <i>Bhausahebanchi Bakhar</i> that Gaitonde had "
        "involuntarily brought back in his coat pocket.",
        body_style
    ))
    story.append(Paragraph(
        "Deshpande reconciled the incident through two cutting-edge scientific frameworks:",
        body_style
    ))
    story.append(Paragraph("• <b>Catastrophe Theory:</b> In non-linear systems, a microscopic variation at a critical bifurcation point can cause colossal divergence in final outcomes. In the Battle of Panipat, the trajectory of a single bullet altered the destiny of an entire subcontinent.", bullet_style))
    story.append(Paragraph("• <b>Quantum Mechanics & Parallel Worlds:</b> At the subatomic level, particles like electrons exhibit indeterminacy—they can occupy multiple possible states simultaneously until observed. In theoretical physics, parallel worlds can coexist simultaneously. Gaitonde had not travelled through time; his consciousness had made a quantum transition into an alternate, coexisting present reality, catalyzed by his subconscious obsession with the Battle of Panipat at the instant of his vehicular crash.", bullet_style))

    # Section 8
    story.append(Spacer(1, 4))

    exam_box_content = [
        [Paragraph("<b>BOARD EXAMINATION CAPSULE & HIGH-YIELD HIGHLIGHTS</b>", box_title_style)],
        [Paragraph(
            "• <b>Protagonist & Author:</b> Professor Gangadharpant Gaitonde (historian); written by astrophysicist Jayant Narlikar.<br/>"
            "• <b>The Two Scientific Principles:</b><br/>"
            "&nbsp;&nbsp;1. <i>Catastrophe Theory:</i> Mathematical concept showing how a tiny change at a critical moment triggers monumental shifts.<br/>"
            "&nbsp;&nbsp;2. <i>Lack of Determinism in Quantum Theory:</i> Micro-level indeterminacy permitting multiple parallel realities.<br/>"
            "• <b>The Crucial Document:</b> <i>Bhausahebanchi Bakhar</i> — recording that the bullet missed Vishwasrao by a hair's breadth.<br/>"
            "• <b>Alternate India's Characteristics:</b> Marathas victorious; East India Company constrained; democratic governance; self-reliant scientific institutions.<br/>"
            "• <b>The Azad Maidan Climax:</b> Gaitonde's refusal to vacate the empty presidential chair results in audience fury and his return to his base reality.",
            box_body_style
        )]
    ]

    exam_table = Table(exam_box_content, colWidths=[519])
    exam_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0fdf4')),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#16a34a')),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 11),
        ('RIGHTPADDING', (0, 0), (-1, -1), 11),
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
