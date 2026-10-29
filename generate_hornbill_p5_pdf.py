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
PDF_PATH = 'cyqs/class-11-english-hornbill-father-to-son-summary.pdf'

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
        canvas_obj.drawRightString(w - 48, h - 77, "POEM 5: DETAILED REVISION NOTES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Poem 5: Father to Son — Elizabeth Jennings")

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
    story.append(Paragraph("Father to Son", ch_title_style))
    story.append(Paragraph("Poet: Elizabeth Jennings &nbsp;|&nbsp; Core Theme: Generation Gap, Emotional Alienation & Reconciliation", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Poem Overview & The Generation Gap", h1_style))
    story.append(Paragraph(
        "<b><i>Father to Son</i></b> by acclaimed English poet <b>Elizabeth Jennings</b> is an agonizingly honest, autobiographical monologue "
        "that explores the universal tragedy of the <b>generation gap</b>. It portrays the emotional chasm, breakdown of communication, "
        "and mutual alienation that develop between an ageing father and his grown-up son. Despite sharing biological lineage and living under "
        "the same roof for decades, they coexist as complete strangers, yearning for connection yet trapped behind walls of silence.",
        body_style
    ))
    story.append(Paragraph(
        "Jennings sensitively portrays the paradox of parental love: the father seeks to possess and understand his offspring, "
        "yet cannot reconcile with the independent individuality the young man has cultivated.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Stanza I: Strangers Under One Roof", h1_style))
    story.append(Paragraph(
        "The poem opens with a stark admission of emotional helplessness: <i>'I do not understand this child / Though we have lived together now / "
        "In the same house for years.'</i> The father confesses that he knows nothing of his son's inner world, dreams, or emotional life.",
        body_style
    ))
    story.append(Paragraph(
        "He desperately attempts to build a bridge across time:",
        body_style
    ))
    story.append(Paragraph("• <b>Tracing Childhood Memories:</b> The father tries to recall what his son was like when small, hoping to revive that lost tenderness and intimacy.", bullet_style))
    story.append(Paragraph("• <b>The Agony of Failure:</b> His efforts prove futile. He feels utterly baffled, wondering whether he personally destroyed the seed he planted or nurtured it into a soil he can neither cultivate nor comprehend.", bullet_style))

    # Section 3
    story.append(Paragraph("3. Stanza II: The Sown Seed & The Wall of Silence", h1_style))
    story.append(Paragraph(
        "In the second stanza, the father employs an evocative agricultural metaphor: <i>'The seed I spent or sown it where / The land is his and none of mine?'</i> "
        "He wonders if all the values, lessons, and affection he invested were scattered in a foreign terrain where he holds no claim.",
        body_style
    ))
    story.append(Paragraph(
        "The tragedy of their daily co-existence deepens:",
        body_style
    ))
    story.append(Paragraph("• <b>Speaking Like Strangers:</b> They exchange formal, hollow words like passing acquaintances. There is no warmth, no spontaneous banter, and no sign of shared understanding.", bullet_style))
    story.append(Paragraph("• <b>Unshared Passions:</b> Physically, the boy resembles his father, but emotionally, their temperaments are completely divergent: <i>'This child is built to my design / Yet what he loves I cannot share'</i>.", bullet_style))
    story.append(Paragraph("• <b>Chilling Silence:</b> The stanza culminates in the haunting line: <i>'Silence surrounds us'</i>, highlighting the suffocating quietude that replaces affectionate family dialogue.", bullet_style))

    # Section 4
    story.append(Paragraph("4. Stanza III: The Prodigal Son & The Father's Forgiveness", h1_style))
    story.append(Paragraph(
        "In the third stanza, the father makes a profound biblical reference to <b>the Parable of the Prodigal Son</b>: "
        "<i>'I would have him prodigal, returning to / His father's house, the home he knew'</i>.",
        body_style
    ))
    story.append(Paragraph(
        "Rather than watching his son break away and establish a distant, alienated world of his own, the father would joyfully welcome "
        "him back even if he returned broken, wayward, or repentant:",
        body_style
    ))
    story.append(Paragraph("• <b>Unconditional Pardon:</b> The father declares: <i>'I would forgive him too, / Shaping from sorrow a new love.'</i> He is ready to bury all past grievances, misunderstandings, and ego, transmuting their shared grief into a revitalized bond of mutual affection.", bullet_style))

    # Section 5
    story.append(Paragraph("5. Stanza IV: Mutual Heartache & Empty Hands", h1_style))
    story.append(Paragraph(
        "In the final stanza, the son's voice emerges, revealing that the pain is mutual: <i>'Father and son, we both must live / On the same globe and the same land'</i>. "
        "Both are prisoners of the same emotional gridlock:",
        body_style
    ))
    story.append(Paragraph("• <b>The Son's Dilemma:</b> The son confesses that he does not understand himself either. When he tries to express sorrow or affection, it inexplicably erupts as defensive anger.", bullet_style))
    story.append(Paragraph("• <b>The Tragedy of Empty Hands:</b> The poem concludes with a powerful, heartbreaking image: <i>'We each put out an empty hand, / Longing for something to forgive.'</i> Both father and son reach out towards each other with empty, open palms. They yearn desperately for reconciliation, mutual forgiveness, and love, yet neither knows how to take the first step, leaving their hands aching and ungrasped in the void.", bullet_style))

    # Section 6
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & POETIC DEVICES</b>", box_title_style)],
        [Paragraph(
            "• <b>Central Theme:</b> The generation gap, breakdown of parental communication, psychological barriers, and the mutual agony of emotional estrangement.<br/>"
            "• <b>Biblical Allusion:</b> <i>'Prodigal'</i> — references the Parable of the Prodigal Son (Luke 15), symbolizing unconditional parental forgiveness and welcoming home a wandering child.<br/>"
            "• <b>Metaphor:</b> <i>'The seed I spent or sown it where / The land is his and none of mine'</i> — compares the upbringing of a child to sowing seeds in a land that ultimately belongs to another owner.<br/>"
            "• <b>Irony:</b> The father and son share physical resemblance, ancestry, and the same house, yet share zero emotional intimacy (<i>'We speak like strangers'</i>).<br/>"
            "• <b>Symbolism of 'Empty Hands':</b> Represents helplessness, emotional barrenness, and an unfulfilled longing for love, reconciliation, and forgiveness.<br/>"
            "• <b>Tone:</b> Melancholic, reflective, pensive, and deeply remorseful.",
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
