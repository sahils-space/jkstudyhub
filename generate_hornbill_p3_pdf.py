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
PDF_PATH = 'cyqs/class-11-english-hornbill-the-voice-of-the-rain-summary.pdf'

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
        canvas_obj.drawRightString(w - 48, h - 77, "POEM 3: DETAILED REVISION NOTES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Poem 3: The Voice of the Rain — Walt Whitman")

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
    story.append(Paragraph("The Voice of the Rain", ch_title_style))
    story.append(Paragraph("Poet: Walt Whitman &nbsp;|&nbsp; Core Theme: Nature's Eternal Cycle & Artistic Creation", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Poem Overview & Central Theme", h1_style))
    story.append(Paragraph(
        "<b><i>The Voice of the Rain</i></b> by celebrated American poet <b>Walt Whitman</b> presents an imaginative conversation "
        "between the poet and a gentle shower of rain. The poem personifies rain as a conscious, speaking entity that celebrates "
        "its cyclical journey of continuous rejuvenation and life-giving service to Mother Earth.",
        body_style
    ))
    story.append(Paragraph(
        "Whitman masterfully weaves two profound ideas together: the scientific <b>hydrological water cycle</b> (evaporation, condensation, "
        "and precipitation) and a sublime philosophical parallel with the journey of a <b>song or poetry</b>, showing how both art and nature "
        "originate from an inner source, spread love and enrichment, and eventually return to beautify their birthplace.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. The Dialogue Between Poet & The Rain", h1_style))
    story.append(Paragraph(
        "The poem opens with a casual question posed by the poet to the gentle shower: <i>'And who art thou? said I to the soft-falling shower'</i>. "
        "To the poet's delightful amazement, the shower answers him in words which the poet translates into verse.",
        body_style
    ))
    story.append(Paragraph(
        "The rain introduces itself with extraordinary majesty:",
        body_style
    ))
    story.append(Paragraph("• <b>'I am the Poem of Earth':</b> The rain proclaims itself as the earth's living poetry, because just as poetry expresses joy, beauty, emotion, and rhythm in words, rain manifests the life-giving rhythm, melody, and vibrancy of the planet.", bullet_style))
    story.append(Paragraph("• <b>Eternal and Impalpable Ascent:</b> It describes its origin as <i>'eternal'</i> and <i>'impalpable'</i> (incapable of being touched or felt). It rises invisibly from the land and the vast, bottomless ocean as water vapour into the upper atmosphere.", bullet_style))

    # Section 3
    story.append(Paragraph("3. The Cyclical Journey: Transformation & Continuity", h1_style))
    story.append(Paragraph(
        "Ascending upwards into the heavens (<i>'Upward to heaven, whence, vaguely form'd, altogether changed, and yet the same'</i>), "
        "the vapour condenses into dark, amorphous clouds. Whitman highlights a profound scientific and philosophical truth here:",
        body_style
    ))
    story.append(Paragraph("• <b>Changed Form, Constant Essence:</b> Though its outward appearance changes completely—from invisible vapour into visible clouds—its essential atomic identity remains fundamentally unaltered.", bullet_style))
    story.append(Paragraph("• <b>The Descent of Salvation:</b> Once transformed, the rain descends back down to bathe the parch'd continents, washing away droughts, microscopic dust motes (<i>'atomies'</i>), and all layers of impurities across the globe.", bullet_style))

    # Section 4
    story.append(Paragraph("4. Life-Giving Purpose: Germination & Purification", h1_style))
    story.append(Paragraph(
        "The rain explains that without its vital touch, the seeds sleeping beneath the soil would remain dormant, dry, and unborn. "
        "By saturating the earth, it triggers germination, causing dormant life to sprout and flourish.",
        body_style
    ))
    story.append(Paragraph(
        "Day and night, without pause or fatigue, rain perpetually completes this cyclic mission: "
        "<i>'And forever, by day and night, I give back life to my own origin, and make pure and beautify it'</i>.",
        body_style
    ))

    # Section 5
    story.append(Paragraph("5. The Poetic Parallel: Rain vs. Song (The Bracketed Epilogue)", h1_style))
    story.append(Paragraph(
        "In the final two lines, enclosed within parentheses, Whitman provides his personal philosophical synthesis comparing "
        "the cyclical journey of rain with that of a song (art and poetry):",
        body_style
    ))
    story.append(Paragraph("• <b>Birthplace:</b> A song originates deep within the soul/heart of the singer, just as rain originates in the earth and sea.", bullet_style))
    story.append(Paragraph("• <b>Wandering:</b> After its birth, the song wanders through the wide world, heard by varied audiences, fulfilling its purpose.", bullet_style))
    story.append(Paragraph("• <b>Unconditional Return:</b> <i>'reck'd or unreck'd, duly with love returns'</i> — whether appreciated, understood, or ignored (reck'd or unreck'd) by mankind, both rain and song complete their cycle and return to their creator/origin with reciprocal love and joy.", bullet_style))

    # Section 6
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & POETIC DEVICES</b>", box_title_style)],
        [Paragraph(
            "• <b>Personification:</b> The rain is given human consciousness, voice, and speech (<i>'said the voice of the rain'</i>, <i>'I am the Poem of Earth'</i>).<br/>"
            "• <b>Metaphor:</b> <i>'I am the Poem of Earth'</i> — compares the biological water cycle directly to a work of poetic art that bestows aesthetic life.<br/>"
            "• <b>Hyperbole:</b> <i>'Bottomless sea'</i> — poetic exaggeration describing the unfathomable depth of the world's oceans.<br/>"
            "• <b>Imagery:</b> Auditory and visual imagery like <i>'soft-falling shower'</i>, <i>'atomies, dust-layers of the globe'</i>.<br/>"
            "• <b>Parallelism / Analogy:</b> The cyclical journey of rain and the journey of human art/song mirror each other perfectly—both bestow eternal beauty unconditionally.<br/>"
            "• <b>Key Vocabulary:</b> <b>Impalpable</b> (unable to be felt or touched); <b>Lave</b> (wash or bathe); <b>Atomies</b> (tiny microscopic particles); <b>Reck'd or unreck'd</b> (heeded or unheeded, cared for or ignored).",
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
