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
PDF_PATH = 'cyqs/class-11-english-hornbill-silk-road-summary.pdf'

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
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  PROSE TRAVELOGUE SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "SILK ROAD: DETAILED REVISION")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Silk Road — Nick Middleton")

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
    story.append(Paragraph("Silk Road", ch_title_style))
    story.append(Paragraph("Author: Nick Middleton &nbsp;|&nbsp; Genre: Travelogue / Pilgrimage Memoir", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=11, spaceBefore=0))

    # Section 1
    story.append(Paragraph("1. Chapter Overview: The Sacred Pilgrimage (Kora)", h1_style))
    story.append(Paragraph(
        "<b><i>Silk Road</i></b> is a captivating travel narrative by Oxford geographer and explorer <b>Nick Middleton</b>. "
        "It recounts his adventurous expedition across the rugged Tibetan plateau toward <b>Mount Kailash</b> to undertake the <b><i>kora</i></b>—the "
        "revered Buddhist circumambulation around the holy mountain. The travelogue vividly portrays high-altitude hazards, treacherous ice-blocked passes, "
        "ancient geological remnants, local nomadic life, severe altitude sickness, and the unexpected companionship that redeems the trek.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Departure from Ravu & Lhamo's Gift", h1_style))
    story.append(Paragraph(
        "The narrative opens on a crisp, luminous morning as the author prepares to depart from the hamlet of <b>Ravu</b>. "
        "A delicate crescent moon still glows in a cloudless sky, and the sunrise bathes distant mountain summits in rose-tinted hues.",
        body_style
    ))
    story.append(Paragraph(
        "Before setting off, <b>Lhamo</b>, the woman with whom he had stayed, presents him with a thoughtful farewell gift: a long-sleeved, "
        "thick sheepskin coat (traditional attire for Tibetan nomads). When his local driver and guide, <b>Tsetan</b>, sees him wearing it, "
        "he playfully remarks that the author now looks like a genuine <b><i>drokba</i></b> (Tibetan nomad/shepherd). Along with <b>Daniel</b>, "
        "a translator travelling as far as Lhasa, they embark in Tsetan's four-wheel-drive vehicle.",
        body_style
    ))

    # Section 3
    story.append(Paragraph("3. The Changtang Plateau: Kyang & Tibetan Mastiffs", h1_style))
    story.append(Paragraph(
        "Tsetan takes a south-westerly shortcut across the vast, undulating <b>Changtang plateau</b>. Along the arid plains, Middleton "
        "observes fascinating wildlife and nomadic settlements:",
        body_style
    ))
    story.append(Paragraph("• <b>Wild Asses (Kyang):</b> The travellers encounter herds of wild asses called <i>kyang</i> gallop across dry gravel plains in synchronized, military precision, kicking up billowing plumes of golden dust.", bullet_style))
    story.append(Paragraph("• <b>Nomad Tents & Fierce Mastiffs:</b> Isolated black yak-hair tents of <i>drokbas</i> dot the horizon. Guarding each encampment are ferocious <b>Tibetan Mastiffs</b>—massive, shaggy beasts with bright red collars. As the car approaches, these fierce guard dogs charge at ferocious speed like bullets, barking with cavernous roars and chasing the vehicle until it clears their territorial boundaries. Middleton notes that these mastiffs were once prized tribute gifts for Chinese imperial courts.", bullet_style))

    # Section 4
    story.append(Paragraph("4. Crossing Treacherous Mountain Passes at 5,210m", h1_style))
    story.append(Paragraph(
        "As the road ascends steeply along a glacial river valley, the terrain grows hostile and rocky. At an altitude of <b>5,210 metres</b>, "
        "a formidable obstacle confronts them: a 15-metre bank of solid, slippery snow completely blocks the narrow track.",
        body_style
    ))
    story.append(Paragraph(
        "Tsetan demonstrates brilliant desert and mountain driving expertise:",
        body_style
    ))
    story.append(Paragraph("• <b>Throwing Dirt on Snow:</b> To prevent the four-wheel vehicle from sliding over the icy precipice, Tsetan, Middleton, and Daniel shovel handfuls of dry soil and stones over the frozen snow to generate traction.", bullet_style))
    story.append(Paragraph("• <b>Lightening the Load:</b> The passengers walk ahead on foot to minimize the car's weight, allowing Tsetan to carefully inch the vehicle across the treacherous snowy ledge.", bullet_style))

    # Section 5
    story.append(Paragraph("5. The Summit Pass (5,515m) & The Salt Lake", h1_style))
    story.append(Paragraph(
        "Climbing further, the author suffers a pounding, altitude-induced headache. Eventually, they crest the highest pass at a breathtaking "
        "elevation of <b>5,515 metres</b>. At the summit stands a traditional <b><i>cairn</i></b> (a ceremonial heap of rocks adorned with prayer flags "
        "and white silk scarves). Respecting local custom, they circumambulate the cairn clockwise.",
        body_style
    ))
    story.append(Paragraph(
        "Descending into the valley, they stop for lunch by a dry salt flat. Middleton observes salt labourers shovelling mineral crusts in the blinding "
        "glare. Geologically, these vast salt basins are remnants of the prehistoric <b>Tethys Ocean</b>, which covered the region before tectonic plate collisions "
        "thrust the Himalayas and the Tibetan plateau into the skies.",
        body_style
    ))

    # Section 6
    story.append(Paragraph("6. Hor & The Disillusioning Contrast", h1_style))
    story.append(Paragraph(
        "By late afternoon, they reach <b>Hor</b>, a bleak town situated along the ancient trade artery on the shore of sacred <b>Lake Manasarovar</b>. "
        "Here, Daniel catches a truck heading back to Lhasa, while Tsetan repairs two punctured tyres.",
        body_style
    ))
    story.append(Paragraph(
        "Middleton feels deep aesthetic disillusionment with Hor:",
        body_style
    ))
    story.append(Paragraph("• <b>Squalor vs. Spiritual Glory:</b> Instead of pristine beauty, Hor is a desolate, rubbish-strewn settlement devoid of greenery, covered with heaps of refuse and rusted metal. Middleton contrasts this grim reality with the ecstatic descriptions written by historical travellers like Japanese monk <b>Ekai Kawaguchi</b> (who wept at the lake's sanctity in 1900) and Swedish explorer <b>Sven Hedin</b>.", bullet_style))
    story.append(Paragraph("• <b>The Four Rivers:</b> Ancient scriptures revere Lake Manasarovar as the source of four great rivers—the Indus, Ganges, Sutlej, and Brahmaputra. In physical geography, only the Sutlej issues directly from the lake, while the others originate nearby on Kailash's slopes.", bullet_style))

    # Section 7
    story.append(Paragraph("7. Midnight Crisis in Darchen & Tibetan Medicine", h1_style))
    story.append(Paragraph(
        "Driving into the night, they arrive after 10:30 p.m. at <b>Darchen</b>, the starting base for the Kailash <i>kora</i>. "
        "Middleton's severe cold and blocked sinuses worsen dramatically in the dry, thin air:",
        body_style
    ))
    story.append(Paragraph("• <b>Sleep Deprivation & High-Altitude Terror:</b> Lying flat on his bed, he feels his chest constrict with insufficient oxygen. Whenever he attempts to doze off, he jerks awake gasping for breath, fearing that falling asleep might prove fatal. He passes a sleepless, agonizing night sitting upright.", bullet_style))
    story.append(Paragraph("• <b>The Tibetan Medical College:</b> The next morning, Tsetan escorts him to Darchen's medical college, resembling a monastery. A Tibetan doctor in traditional attire checks his pulse and diagnoses high-altitude sickness combined with a cold. He prescribes a five-day course of herbal powders and brown pellets that taste of cinnamon. The remedy works wonders—that night, Middleton sleeps soundly and wakes fully revitalized. Satisfied with his recovery, Tsetan departs back for Lhasa.", bullet_style))

    # Section 8
    story.append(Paragraph("8. Waiting for Pilgrims & Meeting Norbu", h1_style))
    story.append(Paragraph(
        "Although rejuvenated, Middleton faces a frustrating dilemma in Darchen. Having arrived prematurely before the official pilgrimage season, "
        "the town is deserted of pilgrims. He has no desire to undertake the arduous 54-kilometre trek around Kailash entirely alone, "
        "and none of the local shopkeepers speak English.",
        body_style
    ))
    story.append(Paragraph(
        "His fortunes change unexpectedly inside Darchen's sole café when he meets <b>Norbu</b>:",
        body_style
    ))
    story.append(Paragraph("• <b>The Scholarly Companion:</b> Norbu is an English-speaking Tibetan academic from the Chinese Academy of Social Sciences in Beijing. He has written scholarly papers on the sacred literature of the <i>kora</i>, but has never personally performed the trek.", bullet_style))
    story.append(Paragraph("• <b>The Ideal Partnership:</b> Norbu shares Middleton's secular, non-fanatical perspective. Because Norbu is plump and unaccustomed to physical exertion, he suggests hiring pack yaks to transport their gear. Middleton eagerly agrees, delighted to find an intelligent, enthusiastic companion with whom to conquer the sacred Silk Road pilgrimage.", bullet_style))

    # Section 9
    story.append(Spacer(1, 4))

    exam_box_content = [
        [Paragraph("<b>BOARD EXAMINATION CAPSULE & KEY TERMINOLOGY</b>", box_title_style)],
        [Paragraph(
            "• <b>Kora:</b> Sacred circular pilgrimage circumambulating Mount Kailash in Tibetan Buddhist and Hindu tradition.<br/>"
            "• <b>Drokba:</b> Nomadic Tibetan shepherds living in black yak-hair tents on the Changtang plateau.<br/>"
            "• <b>Kyang:</b> Wild asses of Tibet that gallop in disciplined, unified herds across dusty plains.<br/>"
            "• <b>Tibetan Mastiff:</b> Fierce guard dogs with bright red collars, historically used as imperial court hunting dogs.<br/>"
            "• <b>Tethys Ocean:</b> Ancient geological ocean whose evaporation left the salt flats and lakes of modern Tibet.<br/>"
            "• <b>Key Figures:</b> <b>Nick Middleton</b> (author/geographer), <b>Tsetan</b> (skilled driver/guide), <b>Lhamo</b> (gifted sheepskin coat), <b>Daniel</b> (translator), and <b>Norbu</b> (Tibetan academic companion from Beijing).<br/>"
            "• <b>Altitude Milestones:</b> Snow blockage (5,210m); Summit Cairn pass (5,515m).",
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
