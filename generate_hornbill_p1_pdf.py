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
PDF_PATH = 'cyqs/class-11-english-hornbill-a-photograph-summary.pdf'

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
        canvas_obj.drawRightString(w - 48, h - 77, "POEM 1: DETAILED REVISION NOTES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Poem 1: A Photograph — Shirley Toulson")

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
    story.append(Paragraph("A Photograph", ch_title_style))
    story.append(Paragraph("Poet: Shirley Toulson &nbsp;|&nbsp; Genre: Elegiac Lyric Poetry", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Poem Overview & Core Theme", h1_style))
    story.append(Paragraph(
        "<b><i>A Photograph</i></b> by <b>Shirley Toulson</b> is a deeply moving, elegiac tribute to the poet's deceased mother. "
        "Triggered by glancing at a faded cardboard photograph frame, the poem contemplates the inexorable flight of time, "
        "the fleeting, ephemeral nature of mortal human life, and the heavy, all-encompassing sorrow of losing a loved one.",
        body_style
    ))
    story.append(Paragraph(
        "The poem is structured around <b>three distinct temporal stages</b> spanning nearly half a century: "
        "the mother's carefree childhood holiday, her nostalgic middle-aged laughter at the photograph, and the poet's "
        "present state of desolate silence following her mother's death.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Stage I: The Cardboard Snapshot & The Beach Holiday", h1_style))
    story.append(Paragraph(
        "The poem opens with the poet gazing at an old snapshot mounted on cardboard. The photograph depicts three young girls "
        "paddling along the seashore. In the centre stands the poet's mother as a vibrant girl of about twelve years, holding hands with "
        "her two younger maternal cousins, <b>Betty</b> and <b>Dolly</b>, who flank her on either side.",
        body_style
    ))
    story.append(Paragraph(
        "Key observations from this opening stanza include:",
        body_style
    ))
    story.append(Paragraph("• <b>Frozen Joy:</b> The three young girls stood still, their wet hair blowing across their faces as they smiled sweetly into the camera held by their uncle.", bullet_style))
    story.append(Paragraph("• <b>The Mother's Sweet Face:</b> The poet lovingly notes her mother's charming youthful countenance, captured long before the poet was even born.", bullet_style))
    story.append(Paragraph("• <b>The Great Philosophical Contrast:</b> The poet reflects profoundly upon the sea, which has remained virtually unchanged through decades (<i>'the sea, which appears to have changed less'</i>), while it washed the girls' <i>'terribly transient feet'</i>. Here, the eternal, immortal nature of the ocean starkly highlights the fragile, mortal transience of human life.", bullet_style))

    # Section 3
    story.append(Paragraph("3. Stage II: Middle-Aged Reminiscence & The Mother's Laughter", h1_style))
    story.append(Paragraph(
        "About twenty to thirty years later, the mother would look back at the snapshot with amusement. She would laugh affectionately, "
        "pointing out: <i>'See Betty and Dolly, and look how they dressed us for the beach!'</i>",
        body_style
    ))
    story.append(Paragraph(
        "For the mother, that coastal holiday had become a cherished relic of a bygone childhood. However, with the mother now dead, "
        "it is her joyous laughter that has become the poet's own sacred, aching past:",
        body_style
    ))
    story.append(Paragraph("• <b>The Sea Holiday was Her Past, Mine is Her Laughter:</b> The mother's past was the innocent sea holiday; the poet's past is the musical sound of her mother's laughter.", bullet_style))
    story.append(Paragraph("• <b>The Laboured Ease of Loss:</b> Both mother and daughter suffered profound losses—the mother lost the irrecoverable innocence of her youth, while the daughter lost her mother. Both attempted to reconcile with their grief through <i>'the laboured ease of loss'</i>—a poignant oxymoron emphasizing how hard it is to bear loss, even though time forces an outward acceptance.", bullet_style))

    # Section 4
    story.append(Paragraph("4. Stage III: Present Grief & The All-Pervading Silence", h1_style))
    story.append(Paragraph(
        "In the final section of the poem, the tone deepens into sombre, sorrowful silence. The poet remarks that her mother has now "
        "been dead for almost as many years as the young girl in the photograph had lived—about twelve years.",
        body_style
    ))
    story.append(Paragraph(
        "Faced with the utter finality of mortality, the poet finds herself completely drained of words. The anguish is so intense, "
        "hollow, and complete that language fails entirely:",
        body_style
    ))
    story.append(Paragraph("• <b>'There is nothing to say at all':</b> Human eloquence collapses in the face of death's eternal separation.", bullet_style))
    story.append(Paragraph("• <b>'Its silence silences':</b> The grim, absolute silence of death swallows all words, leaving the grieving poet totally speechless, resigned, and helpless in her solitary sorrow.", bullet_style))

    # Section 5
    story.append(Spacer(1, 6))

    exam_box_content = [
        [Paragraph("<b>KEY EXAMINATION TAKEAWAYS & POETIC DEVICES</b>", box_title_style)],
        [Paragraph(
            "• <b>Central Theme:</b> The inexorable passage of time, the cruel transience of human existence compared to eternal nature, and the speechless agony of mourning.<br/>"
            "• <b>Transferred Epithet & Alliteration:</b> <i>'Terribly transient feet'</i> — the adjective 'transient' (temporary) transfers the mortal nature of human life to the feet; the repetitive 't' sound creates poignant rhythm.<br/>"
            "• <b>Alliteration:</b> <i>'Stood still to smile'</i> (repetition of 's' sound); <i>'silence silences'</i> (repetition of 's' sound expressing deadening quiet).<br/>"
            "• <b>Oxymoron:</b> <i>'Laboured ease of loss'</i> — joins two contradictory concepts: 'laboured' (painstaking effort) and 'ease' (comfortable acceptance), showing how painfully difficult it is to come to terms with losing someone.<br/>"
            "• <b>Symbolism:</b> The <b>Cardboard</b> symbolizes how fragile human memory carriers are; the <b>Sea</b> represents timeless permanence; the <b>Photograph</b> freezes a singular instant of joy in amber.",
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
