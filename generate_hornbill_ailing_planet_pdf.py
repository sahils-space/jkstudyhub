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
PDF_PATH = 'cyqs/class-11-english-hornbill-the-ailing-planet-summary.pdf'

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
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  PROSE ESSAY SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "THE AILING PLANET: DETAILED REVISION")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "The Ailing Planet — Nani Palkhivala")

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
        fontSize=17,
        leading=21,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=4,
        spaceBefore=0
    )

    author_style = ParagraphStyle(
        'AuthorMeta',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
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
    story.append(Paragraph("The Ailing Planet: The Green Movement’s Role", ch_title_style))
    story.append(Paragraph("Author: Nani Palkhivala &nbsp;|&nbsp; Landmark Essay published in The Indian Express (1994)", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=11, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Chapter Overview & The Planetary Diagnosis", h1_style))
    story.append(Paragraph(
        "<b><i>The Ailing Planet: The Green Movement’s Role</i></b>, written by eminent jurist and constitutional expert <b>Nani Palkhivala</b>, "
        "is a stirring call to environmental conscience. Originally published on 24 November 1994, the essay diagnoses Earth not merely as "
        "a physical quarry of raw commodities, but as an ailing patient whose vital metabolic signs are in catastrophic decline. "
        "Palkhivala urges mankind to abandon its reckless exploitation of nature and adopt an ethical, holistic worldview rooted in "
        "sustainable development and collective planetary survival.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. The Green Movement & The Paradigm Shift", h1_style))
    story.append(Paragraph(
        "The Green Movement emerged worldwide in 1972 with the establishment of the first national Green Party in New Zealand. "
        "The author observes that this movement introduced a revolutionary shift in human consciousness—a paradigm shift comparable "
        "to the <b>Copernican revolution</b> in the 16th century, which proved that the Earth revolves around the Sun.",
        body_style
    ))
    story.append(Paragraph("• <b>From Mechanistic to Holistic:</b> Mankind has historically treated Earth mechanistically, viewing it as an inanimate storehouse. The Green Movement initiated an ecological, holistic worldview, perceiving the planet as an interconnected living organism.", bullet_style))
    story.append(Paragraph("• <b>Metabolic Needs:</b> Just like any living biological body, the Earth possesses vital organs and metabolic processes that require nurturing, balance, and protection.", bullet_style))

    # Section 3
    story.append(Paragraph("3. Sustainable Development: Safeguarding Tomorrow", h1_style))
    story.append(Paragraph(
        "The essay emphasizes the landmark definition of <b>Sustainable Development</b> formulated in 1987 by the <b>World Commission on Environment and Development (WCED)</b>: "
        "<i>'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.'</i>",
        body_style
    ))
    story.append(Paragraph(
        "Palkhivala stresses that true progress must never strip the natural world of resources that our descendants will need to survive. "
        "Humanity must live on nature's biological interest rather than devouring its natural capital.",
        body_style
    ))

    # Section 4
    story.append(Paragraph("4. 'The World’s Most Dangerous Animal' & Planetary Partnership", h1_style))
    story.append(Paragraph(
        "To highlight human arrogance, Palkhivala cites a famous exhibit at the zoo in <b>Lusaka, Zambia</b>. A cage bears the chilling notice: "
        "<i>'The world’s most dangerous animal.'</i> Inside the cage hangs only a mirror. Every visitor who looks in confronts their own reflection.",
        body_style
    ))
    story.append(Paragraph(
        "This brilliant allegory underscores that mankind poses the single greatest threat to biodiversity. Fortunately, growing environmental awareness "
        "has begun shifting human attitudes away from a system based on <b>domination</b> to one based on <b>partnership</b> with the 1.4 million catalogued species "
        "and millions of unnamed organisms languishing in what the author terms <i>'ignominious darkness'</i>.",
        body_style
    ))

    # Section 5
    story.append(Paragraph("5. The Four Principal Biological Systems (Lester R. Brown)", h1_style))
    story.append(Paragraph(
        "Drawing upon the pioneering ecological research of <b>Mr. Lester R. Brown</b> (author of <i>The Global Economic Prospect</i>), "
        "the essay outlines the <b>four primary biological systems</b> that underpin the entire global economy:",
        body_style
    ))
    story.append(Paragraph("1. <b>Fisheries:</b> The world's primary source of protein. Protein-hungry nations are decimating marine fish stocks through relentless overfishing.", bullet_style))
    story.append(Paragraph("2. <b>Forests:</b> The lungs of the planet and habitat for countless species. They are cleared for timber and cooking firewood.", bullet_style))
    story.append(Paragraph("3. <b>Grasslands:</b> Vast pastures that nourish livestock, now being degraded into arid, barren wastelands through overgrazing.", bullet_style))
    story.append(Paragraph("4. <b>Croplands:</b> Farmlands providing the grain supply, increasingly exhausted by excessive chemical usage and soil depletion.", bullet_style))
    story.append(Paragraph(
        "When human consumption outstrips the regenerative capacity of these four systems, productivity collapses: fisheries crash, "
        "forests vanish, grasslands turn into deserts, and crop harvests plummet.",
        body_style
    ))

    # Section 6
    story.append(Paragraph("6. The Deforestation Crisis & India’s Article 48A", h1_style))
    story.append(Paragraph(
        "Palkhivala cites the poignant ancient observation: <i>'Forests precede mankind; deserts follow.'</i> "
        "Tropical forests, the very powerhouses of evolution, are disappearing at an alarming rate of 40 to 50 million acres a year. "
        "Furthermore, burning cattle dung for fuel robs the soil of crucial organic manure.",
        body_style
    ))
    story.append(Paragraph(
        "Turning to India, the author expresses severe anguish over the gap between constitutional legislation and practical reality. "
        "<b>Article 48A</b> of the Constitution of India explicitly mandates that <i>'the State shall endeavour to protect and improve the environment "
        "and to safeguard the forests and wild life of the country.'</i> Yet, in India, laws are neither respected nor enforced. "
        "Parliament's Estimates Committee reported catastrophic forest loss, with satellite data confirming that vast recorded forest reserves "
        "have been reduced to virtual treeless wastelands.",
        body_style
    ))

    # Section 7
    story.append(Paragraph("7. The Population Explosion: The Distortion of Mankind’s Future", h1_style))
    story.append(Paragraph(
        "Palkhivala identifies <b>unchecked population growth</b> as the single most dangerous factor distorting the future of human society. "
        "Humanity took thousands of years to reach the first billion around 1800. The second billion took just a century (1900), and by the late 20th century, "
        "the world population exploded beyond six billion. Every four days, global population surges by one million.",
        body_style
    ))
    story.append(Paragraph("• <b>Development as the Best Contraceptive:</b> As living standards rise, education spreads, and health improves, fertility naturally declines. Therefore, genuine social development is the most effective contraceptive.", bullet_style))
    story.append(Paragraph("• <b>The Vicious Cycle:</b> However, development is rendered impossible if population increases unchecked. More children do not mean more workers; they merely mean more people without work. The stark choice facing humanity is between voluntary family planning or the perpetuation of crushing poverty.", bullet_style))

    # Section 8
    story.append(Paragraph("8. The Era of Responsibility: A Life Tenancy on Earth", h1_style))
    story.append(Paragraph(
        "The essay concludes on a note of moral awakening. Palkhivala notes that environmental concern does not necessarily signal our demise, "
        "but rather our <b>passport for the future</b>. We are entering the <b>Era of Responsibility</b>, in which corporate leaders, governments, "
        "and citizens must act as trustees of the biosphere.",
        body_style
    ))
    story.append(Paragraph(
        "The author immortalizes two profound quotes that define modern ecological ethics:",
        body_style
    ))
    story.append(Paragraph("• <b>Margaret Thatcher:</b> <i>'No generation has a freehold on this earth. All we have is a life tenancy — with a full repairing lease.'</i>", bullet_style))
    story.append(Paragraph("• <b>Lester R. Brown:</b> <i>'We have not inherited this earth from our forefathers; we have borrowed it from our children.'</i>", bullet_style))

    # Section 9
    story.append(Spacer(1, 4))

    exam_box_content = [
        [Paragraph("<b>BOARD EXAMINATION CAPSULE & HIGH-YIELD HIGHLIGHTS</b>", box_title_style)],
        [Paragraph(
            "• <b>Author & Origin:</b> Nani Palkhivala, published on 24 November 1994 in <i>The Indian Express</i>.<br/>"
            "• <b>Key Shift:</b> Shift from a mechanistic view of Earth to a holistic, ecological worldview (compared to the Copernican revolution).<br/>"
            "• <b>Sustainable Development (WCED 1987):</b> Meeting current human needs without compromising the ability of future generations.<br/>"
            "• <b>Lusaka Zoo (Zambia):</b> Cage mirror labelled <i>'The world's most dangerous animal'</i> highlighting human destructive potential.<br/>"
            "• <b>Lester R. Brown's 4 Biological Systems:</b> Fisheries, Forests, Grasslands, and Croplands.<br/>"
            "• <b>Article 48A of Indian Constitution:</b> Directs the state to protect the environment, forests, and wildlife (often neglected in enforcement).<br/>"
            "• <b>Golden Rule of Conservation:</b> <i>'We have not inherited this earth from our forefathers; we have borrowed it from our children.'</i>",
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
