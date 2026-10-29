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
PDF_PATH = 'cyqs/class-11-english-hornbill-childhood-summary.pdf'

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
        canvas_obj.drawRightString(w - 48, h - 77, "POEM 4: DETAILED REVISION NOTES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Poem 4: Childhood — Markus Natten")

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
    story.append(Paragraph("Childhood", ch_title_style))
    story.append(Paragraph("Poet: Markus Natten &nbsp;|&nbsp; Core Theme: Loss of Innocence, Rationalism & Individuality", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Poem Overview & Philosophical Inquiry", h1_style))
    story.append(Paragraph(
        "<b><i>Childhood</i></b> by <b>Markus Natten</b> is a poignant introspective poem that investigates the elusive transition "
        "from childhood innocence into mature adulthood. The poet embarks on a reflective quest to identify the precise moment "
        "and developmental milestone when he ceased being a carefree child and crossed into the complex, disillusioned world of adults.",
        body_style
    ))
    story.append(Paragraph(
        "The poem's structure is defined by an engaging progression: the first three stanzas repeatedly ask <i>'When did my childhood go?'</i> "
        "and identify three distinct stages of maturation—<b>Rationalism</b>, <b>Disillusionment with Adult Hypocrisy</b>, and <b>Individuality</b>. "
        "The final stanza shifts the inquiry from <i>'When'</i> to <i>'Where did my childhood go?'</i>, culminating in a bittersweet revelation.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Stanza I: The Dawn of Rationalism & Logic", h1_style))
    story.append(Paragraph(
        "In the opening stanza, the poet wonders if his childhood vanished on the day he completed eleven years of age: "
        "<i>'Was it the day I ceased to be eleven?'</i>",
        body_style
    ))
    story.append(Paragraph(
        "During this period, his cognitive faculties matured into logical and rational inquiry:",
        body_style
    ))
    story.append(Paragraph("• <b>Geography vs. Myth:</b> As a young boy, he had unquestioningly believed in mythological concepts of <b>Hell and Heaven</b>. However, when studying geography, he realised that neither Hell nor Heaven could be found on maps, globes, or atlases.", bullet_style))
    story.append(Paragraph("• <b>Logical Deduction:</b> Since these places had no geographical existence, he deduced rationally that they were merely imaginary fairy tales (<i>'could not be, / Was that the day!'</i>). The awakening of scientific curiosity and analytical reasoning marked the initial fracture of unquestioning childhood simplicity.", bullet_style))

    # Section 3
    story.append(Paragraph("3. Stanza II: Discovering Adult Hypocrisy", h1_style))
    story.append(Paragraph(
        "In the second stanza, Natten considers whether his childhood ended when he unmasked the dual nature of grown-ups: "
        "<i>'Was it the time I realised that adults were not / All they seemed to be?'</i>",
        body_style
    ))
    story.append(Paragraph(
        "He noticed a glaring contradiction between adult preachings and adult actions:",
        body_style
    ))
    story.append(Paragraph("• <b>Preach Love, Act Cruelly:</b> Grown-ups constantly spoke about universal love, kindness, and moral duty, urging children to be affectionate. Yet, their own daily lives were rife with selfishness, deceit, petty quarrels, and anger.", bullet_style))
    story.append(Paragraph("• <b>Disillusionment:</b> Realizing that adults wear moral masks shattered the poet's blind trust. Understanding human hypocrisy is an unmistakable hallmark of losing naive childhood innocence.", bullet_style))

    # Section 4
    story.append(Paragraph("4. Stanza III: The Birth of Individuality & Independent Mind", h1_style))
    story.append(Paragraph(
        "In the third stanza, the poet examines another crucial rite of passage: the discovery of personal autonomy and independent intellect: "
        "<i>'Was it when I found my mind was really mine, / To use whichever way I choose?'</i>",
        body_style
    ))
    story.append(Paragraph(
        "This stanza celebrates the emergence of self-identity:",
        body_style
    ))
    story.append(Paragraph("• <b>Original Thought:</b> The poet realized that he did not have to passively inherit opinions, prejudices, or ideas dictated by others (<i>'Producing thoughts that were not those of other people, / But my own, and mine alone'</i>).", bullet_style))
    story.append(Paragraph("• <b>Individuality:</b> The moment a child develops independent judgment and asserts unique identity, the unthinking submission of childhood ceases forever.", bullet_style))

    # Section 5
    story.append(Paragraph("5. Stanza IV: Where Has Childhood Gone? (The Final Revelation)", h1_style))
    story.append(Paragraph(
        "Having examined <i>when</i> childhood slipped away, the poet changes his question in the fourth stanza to: "
        "<i>'Where did my childhood go?'</i>",
        body_style
    ))
    story.append(Paragraph(
        "He answers his own question with gentle, poignant closure:",
        body_style
    ))
    story.append(Paragraph("• <b>A Forgotten Realm:</b> Childhood has retreated into <i>'some forgotten place'</i> that adults can never physically re-enter.", bullet_style))
    story.append(Paragraph("• <b>Hidden in an Infant’s Face:</b> The lost purity, uncorrupted innocence, and simplicity of childhood continue to live on, clearly visible and preserved in the pristine, smiling face of a newborn infant (<i>'That’s all I know'</i>). While an individual inevitably loses their childhood to the demands of maturity, childhood as an immortal state of purity is continually reborn in every new infant.", bullet_style))

    # Section 6
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & POETIC DEVICES</b>", box_title_style)],
        [Paragraph(
            "• <b>Refrain:</b> The repeated questions <i>'When did my childhood go?'</i> (stanzas 1–3) and the concluding exclamation <i>'Was that the day!'</i> emphasize the poet's relentless inner quest.<br/>"
            "• <b>Shift in Inquiry:</b> Stanzas 1–3 focus on time (<i>'When'</i>); Stanza 4 shifts focus to space and preservation (<i>'Where'</i>).<br/>"
            "• <b>Three Stages of Maturation:</b><br/>"
            "&nbsp;&nbsp;1. <i>Rationalism:</i> Looking for Hell and Heaven in Geography.<br/>"
            "&nbsp;&nbsp;2. <i>Hypocrisy Awareness:</i> Recognizing adults' double standards.<br/>"
            "&nbsp;&nbsp;3. <i>Individuality:</i> Realizing <i>'my mind was really mine'</i>.<br/>"
            "• <b>Antithesis:</b> Contrast between opposites: <i>'Hell and Heaven'</i>; <i>'talked of love'</i> vs. <i>'did not act so lovingly'</i>.<br/>"
            "• <b>Symbolism:</b> The <b>Infant's Face</b> symbolizes untainted innocence, untouched by societal hypocrisy or cynical logic.",
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
