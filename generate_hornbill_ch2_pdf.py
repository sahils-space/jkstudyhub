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
PDF_PATH = 'cyqs/class-11-english-hornbill-were-not-afraid-to-die-summary.pdf'

class CYQNumberedCanvas(canvas.Canvas):
    """
    Saves page states and only draws the dynamic 'Page X of Y' string at the bottom,
    leaving all background decorations and watermark in the true background.
    """
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
    """
    Drawn BEFORE any flowable text is placed onto the page,
    ensuring the watermark is placed underneath the text in the true background.
    """
    w, h = A4
    page_num = canvas_obj._pageNumber

    # ----------------------------------------------------
    # 1. True Background Watermark (Faint 5% Opacity, Centered)
    # ----------------------------------------------------
    canvas_obj.saveState()
    canvas_obj.setFont('Helvetica-Bold', 44)
    canvas_obj.setFillAlpha(0.05)  # Very faint so it never interferes with text
    canvas_obj.setFillColor(colors.HexColor('#0f172a'))
    canvas_obj.translate(w / 2.0, h / 2.0)
    canvas_obj.rotate(45)
    canvas_obj.drawCentredString(0, 0, "JKSTUDYHUB.ONLINE")
    canvas_obj.restoreState()

    # ----------------------------------------------------
    # 2. Header Block
    # ----------------------------------------------------
    if page_num == 1:
        # Full Navy Header Block
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 58, w, 58, fill=True, stroke=False)

        # Left Branding Text
        canvas_obj.setFont('Helvetica-Bold', 16)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 28, "JK STUDY HUB")

        canvas_obj.setFont('Helvetica', 8)
        canvas_obj.setFillColor(colors.HexColor('#93c5fd'))
        canvas_obj.drawString(38, h - 44, "JAMMU & KASHMIR BOARD EXAMINATION PORTAL  |  SESSION 2025-26")

        # Right Portal URL
        canvas_obj.setFont('Helvetica-Bold', 11)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 30, "jkstudyhub.online")

        # Secondary Banner Bar
        canvas_obj.setFillColor(colors.HexColor('#047857'))
        canvas_obj.rect(38, h - 90, w - 76, 26, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 9.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  COMPLETE CHAPTER SUMMARY")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "NCERT / JKBOSE BOARD SYLLABUS")
    else:
        # Compact Top Header for Subsequent Pages
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Ch 2: We're Not Afraid to Die... — Cook & East")

        # Thin accent line below runner
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

    # Custom Paragraph Styles with large, crisp, legible typography
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
        alignment=4  # Justified
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

    # -----------------------------------------------------------------
    # Document Header Title Block
    # -----------------------------------------------------------------
    story.append(Paragraph("We’re Not Afraid to Die… if We Can All Be Together", ch_title_style))
    story.append(Paragraph("Authors: Gordon Cook and Alan East &nbsp;|&nbsp; Genre: Maritime Travelogue & Survival Memoir", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    # Decorative HR Divider
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # -----------------------------------------------------------------
    # Section 1: Overview & Introduction
    # -----------------------------------------------------------------
    story.append(Paragraph("1. Chapter Overview & Introduction", h1_style))
    story.append(Paragraph(
        "<b><i>We’re Not Afraid to Die… if We Can All Be Together</i></b> is a gripping, true-life narrative of adventure, "
        "indomitable human spirit, determination, and family solidarity in the face of imminent death. Written by <b>Gordon Cook</b> "
        "and <b>Alan East</b>, the story chronicles how a courageous family survived one of the most perilous storms ever recorded in the "
        "turbulent waters of the southern Indian Ocean through relentless teamwork, technical expertise, and boundless hope.",
        body_style
    ))
    story.append(Paragraph(
        "The story emphasizes that in moments of extreme catastrophe, panic guarantees destruction, whereas collective courage, "
        "calm decision-making, and unwavering love can overcome seemingly insurmountable odds.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section 2: The Dream & Preparation
    # -----------------------------------------------------------------
    story.append(Paragraph("2. The Dream, Preparation & Voyage Commencement", h1_style))
    story.append(Paragraph(
        "In July 1976, the narrator (a 37-year-old businessman), accompanied by his wife <b>Mary</b>, their six-year-old son <b>Jonathan</b>, "
        "and seven-year-old daughter <b>Suzanne (Sue)</b>, set sail from Plymouth, England. Their ambitious aspiration was to replicate the historic "
        "round-the-world circumnavigation achieved by the celebrated English explorer <b>Captain James Cook</b> exactly 200 years prior.",
        body_style
    ))
    story.append(Paragraph(
        "Key aspects of their rigorous 16-year preparation included:",
        body_style
    ))
    story.append(Paragraph("• <b>Extensive Maritime Training:</b> For sixteen years, the narrator and his wife devoted all their leisure hours to honing and mastering seafaring skills in treacherous British coastal waters.", bullet_style))
    story.append(Paragraph("• <b>The Wavewalker:</b> Their specially crafted vessel, named <i>Wavewalker</i>, was a 23-metre-long, 30-ton wooden-hulled beauty. It had been professionally built by expert shipwrights and rigorously tested for months in the roughest sea conditions.", bullet_style))
    story.append(Paragraph("• <b>Initial Leg & Crew Enlistment:</b> The first leg of their planned 105,000-kilometre, three-year voyage was pleasant, sailing smoothly down the western coast of Africa to Cape Town. Before heading into the treacherous southern Indian Ocean—famed as one of the world's roughest seas—they hired two seasoned crewmen: <b>Larry Vigil</b> (an American) and <b>Herb Seigler</b> (a Swiss sailor) to help tackle the turbulent waters.", bullet_style))

    # -----------------------------------------------------------------
    # Section 3: The Terrible Storm & The Giant Wave
    # -----------------------------------------------------------------
    story.append(Paragraph("3. Encountering the Storm & The Monstrous Wave (January 2)", h1_style))
    story.append(Paragraph(
        "On the second day after departing Cape Town, ferocious gales began to buffet the vessel, continuing relentlessly for weeks. "
        "While the wind itself did not intimidate the narrator, the terrifying height of the waves—reaching up to 15 metres (equal to the "
        "height of the main mast)—filled him with foreboding.",
        body_style
    ))
    story.append(Paragraph(
        "Despite horrific weather, they joyfully celebrated Christmas 3,500 km east of Cape Town, hoping for better weather with the New Year. "
        "Instead, on the dawn of <b>January 2</b>, the ocean turned catastrophically violent:",
        body_style
    ))
    story.append(Paragraph("• <b>Storm Precautions:</b> Sailing under only a tiny storm jib, the crew dropped the main sail, lashed heavy mooring ropes across the stern, double-tied all equipment, practiced life-raft drills, donned oilskins, fastened lifelines, and slipped into life jackets.", bullet_style))
    story.append(Paragraph("• <b>The Ominous Silence & The Vertical Wave:</b> At around 6:00 PM, the wind abruptly ceased, producing an eerie, terrifying silence. Minutes later, an enormous, roaring vertical wave appeared directly behind them. It was almost twice the height of any wave seen before, capped by a monstrous breaking crest.", bullet_style))
    story.append(Paragraph("• <b>The Impact & Overboard Trauma:</b> The colossal wave slammed into <i>Wavewalker</i> with volcanic fury. A torrent of green and white water smashed across the deck. The narrator's head struck the steering wheel violently, and he was hurled overboard into the churning sea. Accepting his imminent death, he lost consciousness briefly before popping back to the surface. His lifeline snapped taut, dragging him back toward the ship where he managed to grab the guardrails and somersault onto the deck.", bullet_style))
    story.append(Paragraph("• <b>Severe Injuries:</b> His left ribs cracked, his mouth filled with blood, and several teeth were smashed. Despite agonizing pain, he immediately seized the steering wheel to navigate through each succeeding wave.", bullet_style))

    # -----------------------------------------------------------------
    # Section 4: Severe Structural Damage & Pumping Crisis
    # -----------------------------------------------------------------
    story.append(Paragraph("4. Structural Catastrophe & Desperate Survival Battle", h1_style))
    story.append(Paragraph(
        "Mary burst onto the deck screaming that the boat was sinking, as lower compartments flooded rapidly. "
        "Larry and Herb pumped water out furiously like madmen. The narrator rushed below to check on the children in their bunk. "
        "Both children affirmed they were fine, though Suzanne had sustained a large bump above her eyes, which the father had no time to inspect.",
        body_style
    ))
    story.append(Paragraph(
        "A series of critical technical crises followed throughout the freezing night:",
        body_style
    ))
    story.append(Paragraph("• <b>Canvas Repairs:</b> Gathering a hammer, screws, and canvas sheets, the narrator crawled across the listing deck and stretched waterproof canvas over the gaping starboard openings, deflecting the majority of the surging seawater overboard.", bullet_style))
    story.append(Paragraph("• <b>Pump Failures:</b> Floating debris in the flooded cabins clogged the hand pumps, while the electric pump short-circuited. Furthermore, the two spare hand pumps had been torn away overboard along with the forestay sail, jibs, dinghies, and the main anchor.", bullet_style))
    story.append(Paragraph("• <b>The Miracle Electric Pump:</b> In a stroke of desperate luck, the narrator remembered a second electric pump stored beneath the chartroom floor. Connecting it to an exterior discharge pipe, it started pumping water out successfully.", bullet_style))
    story.append(Paragraph("• <b>Unanswered Mayday Calls:</b> Throughout the bitter cold night of January 2–3, they transmitted continuous Mayday distress signals on the radio, but received no response because they were isolated in the most remote corner of the Indian Ocean.", bullet_style))
    story.append(Paragraph("• <b>Suzanne's Stoic Silence:</b> By morning, Sue's head had swollen alarmingly, her eyes were blackened slits, and a deep gash marked her arm. When asked why she had concealed her painful injuries, the brave seven-year-old replied that she didn't want to worry her parents while they were battling to save everyone's lives.", bullet_style))

    # -----------------------------------------------------------------
    # Section 5: The Search for Ile Amsterdam
    # -----------------------------------------------------------------
    story.append(Paragraph("5. Structural Ruin & The Search for Ile Amsterdam", h1_style))
    story.append(Paragraph(
        "By January 3, 36 hours of non-stop pumping had brought water levels under control. However, the narrator's inspection "
        "revealed devastating damage: nearly all the main rib frames had shattered down to the keel. The vessel was so structurally "
        "weakened that it could never survive the remaining distance to Australia.",
        body_style
    ))
    story.append(Paragraph(
        "Consulting navigation charts, the narrator identified two pinprick islands hundreds of kilometres to the east. "
        "The most viable destination was <b>Ile Amsterdam</b>, a bleak French scientific research station. Reaching this tiny speck "
        "in the boundless ocean was their solitary chance of survival.",
        body_style
    ))
    story.append(Paragraph(
        "On January 4, they hoisted the storm jib and consumed their first meal in nearly two days (corned beef and crackers). "
        "However, respite was short-lived: by 4:00 PM black clouds massed again, and by the morning of January 5, their situation "
        "became desperate once more.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section 6: Children's Heroism & Sue's Card
    # -----------------------------------------------------------------
    story.append(Paragraph("6. The Children's Fearless Courage & Sue's Card", h1_style))
    story.append(Paragraph(
        "When the narrator went below to comfort his children on January 5, his six-year-old son Jonathan asked: "
        "<i>'Daddy, are we going to die?'</i> The narrator attempted to reassure him that they would pull through.",
        body_style
    ))
    story.append(Paragraph(
        "Jonathan then uttered the historic words that became the story's title:<br/>"
        "<b><i>'We aren’t afraid of dying if we can all be together—you and Mummy, Sue and I.'</i></b><br/>"
        "These fearless words moved the narrator to tears and infused him with renewed determination to fight the ocean with every ounce of his being.",
        body_style
    ))
    story.append(Paragraph(
        "He rigged a sea anchor using heavy nylon mooring ropes and two 22-litre plastic barrels of paraffin to hold the damaged "
        "boat into the oncoming swells. That evening, as water kept seeping in, the narrator and Mary held hands in silence, believing the end was close.",
        body_style
    ))
    story.append(Paragraph(
        "On the morning of January 6, while the narrator struggled with complex calculations using a faulty spare compass, Suzanne approached "
        "him despite her terribly disfigured, swollen face. She presented him with a handmade greeting card. On the cover, she had sketched funny "
        "caricatures of her parents, writing affectionate, humorous words, and inside expressing profound love and optimism. The card rekindled "
        "their fighting spirit.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section 7: Discovery of Ile Amsterdam & Safe Arrival
    # -----------------------------------------------------------------
    story.append(Paragraph("7. Precision Navigation, Discovery & Triumph", h1_style))
    story.append(Paragraph(
        "Calculating wind drift, magnetic variation, and ocean currents, the narrator instructed Larry at 2:00 PM to steer an exact heading of "
        "<b>185 degrees</b>, predicting they would sight the island by 5:00 PM. Exhausted, the narrator collapsed onto his bunk and fell into a deep sleep.",
        body_style
    ))
    story.append(Paragraph(
        "Waking at 6:00 PM, he was devastated, assuming they had missed the island and that their fragile storm jib could not beat back against "
        "the wind. Suddenly, Jonathan and Sue burst in, hugging him. Jonathan exclaimed: <i>'You are the best daddy in the whole world, and the best captain!'</i> "
        "Suzanne announced that the island was lying right before them.",
        body_style
    ))
    story.append(Paragraph(
        "Rushing onto deck, the narrator beheld the magnificent sight of <b>Ile Amsterdam</b>—a barren volcanic rock with scarce vegetation, "
        "yet to their eyes the most glorious island on earth. They anchored offshore for the night. The next morning, the island's <b>28 French inhabitants</b> "
        "greeted them warmly and escorted them safely ashore.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section 8: Key Themes & Examination Takeaways Box
    # -----------------------------------------------------------------
    story.append(Spacer(1, 6))

    exam_box_content = [
        [
            Paragraph("<b>KEY EXAMINATION TAKEAWAYS & CRITICAL ANALYSIS</b>", box_title_style)
        ],
        [
            Paragraph(
                "• <b>Central Theme:</b> Celebrates human fortitude, resilience in catastrophe, presence of mind, and the transformative strength derived from family love and unity.<br/>"
                "• <b>The Power of Optimism:</b> The unwavering cheerfulness of crewmen Larry Vigil and Herb Seigler prevented mass panic; Mary's steady hand on the wheel saved the vessel during peak impact.<br/>"
                "• <b>Courage of the Children:</b> Seven-year-old Suzanne hid a severe skull fracture and black eye to spare her parents anxiety; six-year-old Jonathan exhibited mature fearlessness, proving that hope can conquer the dread of death.<br/>"
                "• <b>Captain's Leadership:</b> Highlights the narrator's technical knowledge (jury-rigging electric pumps, sea anchor, compass drift corrections) and relentless refusal to surrender.",
                box_body_style
            )
        ]
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

    # Build document with draw_page_background callback
    doc.build(
        story,
        canvasmaker=CYQNumberedCanvas,
        onFirstPage=draw_page_background,
        onLaterPages=draw_page_background
    )
    print(f"Successfully generated {PDF_PATH} ({os.path.getsize(PDF_PATH)} bytes)")

if __name__ == '__main__':
    build_pdf()
