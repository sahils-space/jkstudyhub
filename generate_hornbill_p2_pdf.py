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
PDF_PATH = 'cyqs/class-11-english-hornbill-the-laburnum-top-summary.pdf'

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
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  COMPLETE POETRY SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "POEM 2: DETAILED REVISION NOTES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Poem 2: The Laburnum Top — Ted Hughes")

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
    story.append(Paragraph("The Laburnum Top", ch_title_style))
    story.append(Paragraph("Poet: Ted Hughes &nbsp;|&nbsp; Core Theme: Nature's Symbiosis & Maternal Devotion", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Poem Overview & Core Theme", h1_style))
    story.append(Paragraph(
        "<b><i>The Laburnum Top</i></b> by the renowned English poet <b>Ted Hughes</b> is a lyrical depiction of the mutual relationship "
        "between a dormant, lifeless laburnum tree and an energetic goldfinch bird. It masterfully portrays the transformative power "
        "of life and motherly care: how a single living creature can awaken an entire world from death-like dormancy into dynamic vitality, "
        "only to leave it in profound stillness once her mission is fulfilled.",
        body_style
    ))
    story.append(Paragraph(
        "The poem centers on a sharp dramatic contrast between the tree's silent, desolate solitude before and after the bird's arrival, "
        "and the explosive burst of music, movement, and family joy during her presence.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Setting the Scene: The Silent Tree in Autumn", h1_style))
    story.append(Paragraph(
        "The poem opens on a quiet, golden afternoon in the month of September. The top of the laburnum tree (a short, ornamental tree "
        "with hanging yellow flowers and poisonous seeds) stands completely still, silent, and motionless.",
        body_style
    ))
    story.append(Paragraph(
        "Key atmospheric elements established in the opening lines include:",
        body_style
    ))
    story.append(Paragraph("• <b>September Sunlight:</b> The golden yellow sunlight of early autumn bathes the yellowing leaves of the laburnum tree, creating a visual harmony of yellow hues that symbolize quiet decay and approaching winter.", bullet_style))
    story.append(Paragraph("• <b>Atmosphere of Death & Dormancy:</b> The tree's leaves are turning yellow and all its seeds have already fallen to the ground. There is no sound, no breeze, and no sign of life—the tree appears lifeless and frozen in time.", bullet_style))

    # Section 3
    story.append(Paragraph("3. The Arrival of the Goldfinch & Awakening of the Tree", h1_style))
    story.append(Paragraph(
        "This unbroken silence is suddenly interrupted by the unexpected arrival of a <b>goldfinch</b> (a small, brightly coloured yellow bird). "
        "With a sharp, twitching chirp, she alights at the end of a branch.",
        body_style
    ))
    story.append(Paragraph(
        "The poet vividly details her movement and the profound transformation that follows:",
        body_style
    ))
    story.append(Paragraph("• <b>Lizard-like Agility:</b> The mother bird is described as <i>'sleek as a lizard, and alert, and abrupt'</i>. She moves with cautious, rapid grace into the thick cluster of leaves and branches to protect her nest from predators.", bullet_style))
    story.append(Paragraph("• <b>The Machine Starts Up:</b> As soon as she enters the inner canopy, the nest of young chicks awakens instantly. The air erupts with a frenzy of chitterings, wing tremors, and joyful piping sounds.", bullet_style))
    story.append(Paragraph("• <b>The Tree Trembles and Thrills:</b> The poet observes that the entire laburnum tree begins to shake and thrill with newly infused life. The tree, previously silent and somnolent, now pulses with energy.", bullet_style))
    story.append(Paragraph("• <b>The Engine of Her Family:</b> The poet employs a striking metaphor—the mother bird is the vital spark or fuel that fires the <i>'engine'</i> of her family. She feeds her hungry chicks fully, stoking the machine into vibrant life.", bullet_style))

    # Section 4
    story.append(Paragraph("4. The Departure & Return to Infinite Solitude", h1_style))
    story.append(Paragraph(
        "Having nourished and tended to her brood, the mother goldfinch emerges to the branch end once more, briefly revealing her "
        "<b>barred face</b>—which acts as an <i>'identity mask'</i> recognizable to her offspring.",
        body_style
    ))
    story.append(Paragraph(
        "With an eerie, delicate whistle-chirp whisper, she launches herself into the infinite, unbounded sky. "
        "As soon as she takes flight, the commotion evaporates immediately. The poem closes with the haunting, memorable line: "
        "<i>'and the laburnum subsides to empty'</i>. The tree collapses back into its original silence, stillness, and solitude.",
        body_style
    ))

    # Section 5
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & POETIC DEVICES</b>", box_title_style)],
        [Paragraph(
            "• <b>Simile:</b> <i>'Sleek as a lizard'</i> — compares the swift, agile, and cautious movements of the goldfinch to a lizard entering the thick foliage.<br/>"
            "• <b>Metaphor:</b> <i>'A machine starts up'</i> & <i>'She stokes the engine of her family'</i> — the young chicks and nest are compared to an engine/machine, and the mother bird is the fuel/driver that makes it roar to life.<br/>"
            "• <b>Alliteration:</b> Repetition of consonant sounds to create musical rhythm: <i>'September sunlight'</i> ('s' sound), <i>'tree trembles and thrills'</i> ('t' & 'th' sounds), <i>'whistle-chirrup whisperings'</i> ('w' sound).<br/>"
            "• <b>Transferred Epithet:</b> <i>'Barred face identity mask'</i> — the shadowy striped markings across the bird's face act like an identification card for her chicks.<br/>"
            "• <b>Symbolism of Yellow:</b> The poem relies on yellow (yellow laburnum flowers, yellow leaves, yellow September sunlight, and yellow goldfinch plumage) symbolizing warmth, autumn beauty, and camouflage.<br/>"
            "• <b>Contrast:</b> The poem's central architecture is built upon the contrast between absolute death-like stillness (beginning & end) and exuberant, pulsating life (middle).",
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
