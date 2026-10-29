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
PDF_PATH = 'cyqs/class-11-english-writing-skills-complete-formats-and-samples.pdf'

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

    # 1. True Background Watermark (Soft Faint Silver, Under Text)
    canvas_obj.saveState()
    canvas_obj.setFont('Helvetica-Bold', 48)
    canvas_obj.setFillColor(colors.HexColor('#edf2f7'))  # Soft light silver gray
    canvas_obj.translate(w / 2.0, h / 2.0)
    canvas_obj.rotate(45)
    canvas_obj.drawCentredString(0, 0, "JK STUDY HUB")
    canvas_obj.restoreState()

    # 2. Header Block
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
        canvas_obj.drawString(48, h - 77, "CLASS 11TH GENERAL ENGLISH  •  WRITING SKILLS MASTER GUIDE")

        canvas_obj.setFont('Helvetica-Bold', 8)
        canvas_obj.setFillColor(colors.HexColor('#a7f3d0'))
        canvas_obj.drawRightString(w - 48, h - 77, "OFFICIAL FORMATS, MARKING SCHEMES & SOLVED SAMPLES")
    else:
        canvas_obj.setFillColor(colors.HexColor('#091e42'))
        canvas_obj.rect(0, h - 42, w, 42, fill=True, stroke=False)

        canvas_obj.setFont('Helvetica-Bold', 10.5)
        canvas_obj.setFillColor(colors.white)
        canvas_obj.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English Writing Skills Guide")

        canvas_obj.setFont('Helvetica-Bold', 9)
        canvas_obj.setFillColor(colors.HexColor('#38bdf8'))
        canvas_obj.drawRightString(w - 38, h - 26, "Section B: Complete Formats & Model Samples")

        canvas_obj.setStrokeColor(colors.HexColor('#047857'))
        canvas_obj.setLineWidth(2)
        canvas_obj.line(0, h - 44, w, h - 44)

    # 3. Footer Base Line & Branding
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

    doc_title_style = ParagraphStyle(
        'DocTitle',
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

    sec_heading_style = ParagraphStyle(
        'SecHeading',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    subsec_heading_style = ParagraphStyle(
        'SubSecHeading',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#0369a1'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6,
        alignment=4
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=14,
        firstLineIndent=-9,
        spaceAfter=3
    )

    box_title_style = ParagraphStyle(
        'BoxTitle',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14.5,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=4
    )

    box_body_style = ParagraphStyle(
        'BoxBody',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=2
    )

    sample_box_style = ParagraphStyle(
        'SampleBox',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    story = []

    # Title Block
    story.append(Paragraph("Class 11th English Writing Skills: Complete Compendium", doc_title_style))
    story.append(Paragraph("Syllabus: JKBOSE & CBSE Board Examination Standards &nbsp;|&nbsp; Section B: Advanced Writing Skills", author_style))
    story.append(Paragraph("Prescribed Curriculum: <b>Core General English (Class XI)</b> &nbsp;•&nbsp; 100% Comprehensive Coverage", meta_tag_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=11, spaceBefore=0))

    # Blueprint Table
    story.append(Paragraph("SECTION B: WRITING SKILLS SYLLABUS OVERVIEW", sec_heading_style))
    story.append(Paragraph(
        "The Writing Section of Class 11th General English evaluates the student's ability to communicate clearly, logically, "
        "and persuasively using standard grammatical structures and prescribed board formats. Below is the blueprint of writing tasks:",
        body_style
    ))

    blueprint_data = [
        [Paragraph("<b>Category</b>", box_title_style), Paragraph("<b>Writing Tasks Included</b>", box_title_style), Paragraph("<b>Word Limit</b>", box_title_style), Paragraph("<b>Marks</b>", box_title_style)],
        [Paragraph("<b>Short Writing Tasks</b>", box_body_style), Paragraph("Notice Writing, Classified Advertisements, Poster Making", box_body_style), Paragraph("50 words", box_body_style), Paragraph("3 – 4 Marks", box_body_style)],
        [Paragraph("<b>Formal Letter Writing</b>", box_body_style), Paragraph("Letter to the Editor, Official Complaints, Business Enquiries, Job Application with Bio-Data / Resume", box_body_style), Paragraph("120 – 150 words", box_body_style), Paragraph("5 Marks", box_body_style)],
        [Paragraph("<b>Long Composition Tasks</b>", box_body_style), Paragraph("Article Writing, Speech Writing, Debate Writing, School Magazine / Newspaper Report Writing", box_body_style), Paragraph("150 – 200 words", box_body_style), Paragraph("5 – 6 Marks", box_body_style)]
    ]
    t_blueprint = Table(blueprint_data, colWidths=[120, 240, 85, 74])
    t_blueprint.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f1f5f9')),
        ('GRID', (0, 0), (-1, -1), 0.75, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_blueprint)
    story.append(Spacer(1, 10))

    # ----------------------------------------------------
    # 1. NOTICE WRITING
    # ----------------------------------------------------
    story.append(Paragraph("1. Notice Writing (Short Writing Task)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Notice</b> is a formal printed or written announcement meant to disseminate information to a large group of people. "
        "It must always be enclosed inside a ruled rectangular box and restricted to a strict limit of <b>50 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Key Elements:</b> Name of Issuing Authority/School (Top, Centred) &rarr; The word <b>NOTICE</b> in capital letters &rarr; Date of issuance (e.g., <i>25th March 2026</i> on the left) &rarr; Catchy, informative Heading/Subject (Centred) &rarr; Body (What, When, Where, Who, Whom to contact) &rarr; Signatory (Name & Designation on the bottom-left).", bullet_style))
    story.append(Paragraph("• <b>Marking Scheme:</b> Format = 1 Mark (Box, Name, Date, Heading, Signature) | Content = 2 Marks | Expression/Grammar = 1 Mark.", bullet_style))

    notice_sample = [
        [Paragraph(
            "<b>GOVERNMENT HIGHER SECONDARY SCHOOL, SRINAGAR</b><br/>"
            "<b>NOTICE</b><br/><br/>"
            "<b>25th March 2026</b><br/><br/>"
            "<b>INTER-SCHOOL DEBATE COMPETITION</b><br/><br/>"
            "This is to notify all students of Classes IX to XII that our school is organizing the <b>Annual Inter-School English Debate Competition</b> "
            "on <b>10th April 2026</b> at 10:00 AM in the Main School Auditorium.<br/><br/>"
            "<b>Topic:</b> <i>'Artificial Intelligence: A Threat to Human Intellect or an Engine of Progress?'</i><br/>"
            "Interested students must submit their names to the undersigned along with their preferred stand (For/Against the Motion) "
            "latest by <b>2nd April 2026</b>. Selection trials will be conducted on 4th April.<br/><br/>"
            "<b>Sahil Zahoor</b><br/>"
            "Cultural Secretary",
            sample_box_style
        )]
    ]
    t_notice = Table(notice_sample, colWidths=[519])
    t_notice.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#0f172a')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_notice)
    story.append(Spacer(1, 12))

    # ----------------------------------------------------
    # 2. CLASSIFIED ADVERTISEMENTS
    # ----------------------------------------------------
    story.append(Paragraph("2. Classified Advertisements (Short Writing Task)", sec_heading_style))
    story.append(Paragraph(
        "<b>Classified Advertisements</b> are short, cost-effective newspaper announcements categorized by purpose. "
        "They do not use full prose sentences; instead, they employ concise, telegraphic language, keywords, and commas. "
        "Always enclosed in a box with a prominent capitalized category heading. Maximum word limit: <b>50 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Common Categories:</b> <i>SITUATION VACANT</i> (offering a job), <i>SITUATION WANTED</i> (seeking a job), <i>FOR SALE / PURCHASE</i> (property, vehicles, household items), <i>TO-LET</i> (rental properties), <i>LOST &amp; FOUND</i>.", bullet_style))

    ad_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>SITUATION VACANT</b></div><br/>"
            "WANTED urgently a dynamic, convent-educated Post Graduate Teacher (PGT) in English for Kashmir Public School, Baramulla. "
            "<b>Qualifications:</b> M.A. in English with B.Ed. from a recognized university. Minimum 3 years teaching experience in CBSE/JKBOSE senior secondary classes. "
            "Fluency in spoken English and sound IT proficiency essential. Age below 40 years. Attractive salary package commensurate with experience.<br/>"
            "Apply within 7 days with complete CV, attested credentials, and recent passport-size photograph to the <b>Secretary, Kashmir Public School, Baramulla</b> "
            "or email to <i>careers@kashmirpublicschool.org</i>. Phone: +91-94190XXXXX.",
            sample_box_style
        )]
    ]
    t_ad = Table(ad_sample, colWidths=[519])
    t_ad.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#0284c7')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_ad)
    story.append(Spacer(1, 12))

    # ----------------------------------------------------
    # 3. POSTER MAKING
    # ----------------------------------------------------
    story.append(Paragraph("3. Poster Making (Visual & Verbal Design)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Poster</b> is an eye-catching visual and verbal medium used to create public awareness regarding social issues, "
        "health campaigns, or upcoming events. Must be enclosed inside a box, containing bold slogans, bullet points, and the issuing body.",
        body_style
    ))
    story.append(Paragraph("• <b>Essential Features:</b> Catchy Title/Slogan in bold &rarr; Creative visual lettering &rarr; Bulleted key messages/benefits &rarr; Date, time, venue (for events) &rarr; Mandatory <b>'Issued in public interest by: [Name/Agency]'</b>.", bullet_style))

    poster_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>SAVE WATER — SECURE THE FUTURE!</b><br/>"
            "<font color='#0369a1'><b>WATER IS LIFE: EVERY DROP YOU SAVE HELPS THE EARTH BREATHE</b></font></div><br/>"
            "<b>ARE YOU AWARE?</b><br/>"
            "• Ground water levels in India are depleting at an alarming rate.<br/>"
            "• By 2030, millions may face severe acute drinking water shortages.<br/><br/>"
            "<b>SIMPLE DAILY STEPS TO SAVE PRECIOUS WATER:</b><br/>"
            "&#10004; Turn off taps while brushing teeth and washing dishes.<br/>"
            "&#10004; Repair leaking pipes and faulty cisterns immediately.<br/>"
            "&#10004; Adopt Rainwater Harvesting in homes and school premises.<br/>"
            "&#10004; Reuse kitchen wastewater for garden watering.<br/><br/>"
            "<div style='text-align: center;'><b>DON'T LET THE WATER RUN WHEN THERE'S NO ONE TO DRINK IT!</b><br/><br/>"
            "<i>Issued in Public Interest by: Eco Club &amp; Ministry of Jal Shakti, UT of Jammu &amp; Kashmir</i></div>",
            sample_box_style
        )]
    ]
    t_poster = Table(poster_sample, colWidths=[519])
    t_poster.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0fdf4')),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#16a34a')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_poster)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 4. FORMAL LETTER WRITING
    # ----------------------------------------------------
    story.append(Paragraph("4. Formal Letter Writing (Letter to Editor & Official Complaints)", sec_heading_style))
    story.append(Paragraph(
        "Formal letters follow a standardized layout. Marks are heavily deducted if sender's address, date, receiver's designation, "
        "and subject line are missing or misplaced. Word limit: <b>120 – 150 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Standard Structure:</b><br/>"
                           "1. <b>Sender's Address:</b> 2-3 lines (no comma at end of line).<br/>"
                           "2. <b>Date:</b> In expanded format (e.g., <i>28th March 2026</i>).<br/>"
                           "3. <b>Receiver's Designation &amp; Office:</b> The Editor, The Commissioner, etc.<br/>"
                           "4. <b>Subject:</b> Brief, underlined or bold (4-8 words summarizing purpose).<br/>"
                           "5. <b>Salutation:</b> Sir / Madam (no comma).<br/>"
                           "6. <b>Body Paragraphs:</b> Para 1 (Introduction/Purpose), Para 2 (Detailed causes &amp; impacts), Para 3 (Requested remedy/suggestions).<br/>"
                           "7. <b>Complimentary Close:</b> <i>Yours faithfully</i> or <i>Yours sincerely</i> (never write <i>Your's</i> with an apostrophe!).<br/>"
                           "8. <b>Sender's Signature &amp; Full Name</b>.", bullet_style))

    letter_sample = [
        [Paragraph(
            "<b>MODEL LETTER TO THE EDITOR (CIVIC CONCERN)</b><br/><br/>"
            "House No. 42, Rajbagh Extension<br/>"
            "Srinagar, Kashmir – 190008<br/><br/>"
            "28th March 2026<br/><br/>"
            "The Editor<br/>"
            "The Greater Kashmir<br/>"
            "Press Enclave, Srinagar<br/><br/>"
            "<b>Subject: Growing Menace of Reckless Driving and Underage Motorcyclists in Srinagar</b><br/><br/>"
            "Sir,<br/><br/>"
            "Through the columns of your esteemed newspaper, I wish to draw the urgent attention of the traffic authorities "
            "and the general public towards the alarming surge in reckless driving and stunt-biking by teenagers on the city roads of Srinagar.<br/><br/>"
            "It is deeply distressing that young teenagers, many without valid driving licences or safety helmets, zip through narrow roads and "
            "bustling market lanes at breakneck speeds. The Boulevard Road and Residency Road have become notorious hotspots for dangerous races. "
            "This rash behaviour has not only led to tragic road fatalities but also poses a grave daily threat to innocent pedestrians, schoolchildren, and senior citizens.<br/><br/>"
            "Despite repeated complaints, police checkpoints remain sporadic. The Traffic Department must urgently install high-definition CCTV speed cameras, "
            "conduct unannounced breathalyzer and licence checks, and impose strict financial penalties along with vehicle impoundment on negligent parents. "
            "Additionally, schools and civil societies must organize road-safety awareness seminars.<br/><br/>"
            "I earnestly hope the concerned authorities will act decisively before more precious young lives are needlessly lost.<br/><br/>"
            "Yours faithfully,<br/>"
            "<b>Sahil Zahoor</b><br/>"
            "Concerned Resident",
            sample_box_style
        )]
    ]
    t_letter = Table(letter_sample, colWidths=[519])
    t_letter.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ffffff')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#047857')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_letter)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 5. JOB APPLICATION WITH BIO-DATA / RESUME
    # ----------------------------------------------------
    story.append(Paragraph("5. Job Application with Bio-Data / CV (High-Yield Board Question)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Job Application</b> consists of two distinct components: a <b>Covering Letter</b> applying for the advertised vacancy, "
        "followed by a detailed tabular <b>Bio-Data (Curriculum Vitae / Resume)</b> enclosed in a box.",
        body_style
    ))

    job_sample = [
        [Paragraph(
            "<b>PART A: COVERING LETTER</b><br/><br/>"
            "74, Jawahar Nagar, Srinagar<br/>"
            "28th March 2026<br/><br/>"
            "The Principal<br/>"
            "Delhi Public School, Athwajan, Srinagar<br/><br/>"
            "<b>Subject: Application for the Post of PGT English</b><br/><br/>"
            "Sir/Madam,<br/><br/>"
            "In response to your advertisement published in <i>The Daily Excelsior</i> dated 24th March 2026 inviting applications for the post of "
            "<b>Post Graduate Teacher in English</b>, I wish to offer my candidature for the said position.<br/><br/>"
            "I possess an M.A. in English Literature from the University of Kashmir with first division, along with a B.Ed. degree. "
            "I have four years of teaching experience at the senior secondary level. I am confident that my passion for literature and dedication "
            "to student excellence will make a meaningful contribution to your prestigious institution.<br/><br/>"
            "My detailed Bio-Data is enclosed herewith for your perusal. I look forward to the opportunity of a personal interview.<br/><br/>"
            "Yours faithfully,<br/>"
            "<b>Sahil Zahoor</b><br/>"
            "Encl: Bio-Data and Testimonials<br/><br/>"
            "<hr color='#cbd5e1'/>"
            "<b>PART B: BIO-DATA (RESUME)</b><br/><br/>"
            "<b>1. Full Name:</b> Sahil Zahoor<br/>"
            "<b>2. Father's Name:</b> Zahoor Ahmad<br/>"
            "<b>3. Date of Birth:</b> 15th October 1996<br/>"
            "<b>4. Permanent Address:</b> 74, Jawahar Nagar, Srinagar, J&amp;K – 190008<br/>"
            "<b>5. Contact Number:</b> +91-94190XXXXX &nbsp;|&nbsp; <b>Email:</b> sahil.zahoor@email.com<br/>"
            "<b>6. Educational Qualifications:</b><br/>"
            "&nbsp;&nbsp;• <b>M.A. English:</b> University of Kashmir (2020) — 74% (First Class)<br/>"
            "&nbsp;&nbsp;• <b>B.Ed.:</b> University of Kashmir (2022) — 78% (First Class with Distinction)<br/>"
            "&nbsp;&nbsp;• <b>B.A. (Honours):</b> Amar Singh College (2018) — 71%<br/>"
            "&nbsp;&nbsp;• <b>Class XII:</b> JKBOSE (2015) — 88%<br/>"
            "<b>7. Work Experience:</b> 4 years as PGT English at Valley Model Higher Secondary School (2022 – Present)<br/>"
            "<b>8. Languages Known:</b> English, Urdu, Kashmiri, Hindi<br/>"
            "<b>9. References:</b><br/>"
            "&nbsp;&nbsp;1. Dr. Farooq Ahmad, Professor of English, University of Kashmir (Ph: 94191XXXXX)<br/>"
            "&nbsp;&nbsp;2. Mrs. Shazia Khan, Principal, Valley Model HSS, Srinagar (Ph: 94192XXXXX)",
            sample_box_style
        )]
    ]
    t_job = Table(job_sample, colWidths=[519])
    t_job.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#0f172a')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_job)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 6. ARTICLE WRITING
    # ----------------------------------------------------
    story.append(Paragraph("6. Article Writing (Long Composition Task)", sec_heading_style))
    story.append(Paragraph(
        "An <b>Article</b> is an analytical, non-fiction piece written for a newspaper or magazine. It requires a formal tone, "
        "persuasive reasoning, statistical references, and constructive recommendations. Word limit: <b>150 – 200 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Structural Blueprint:</b><br/>"
                           "1. <b>Title / Heading:</b> Short, eye-catching, capitalized (3–7 words).<br/>"
                           "2. <b>Byline:</b> <i>'By [Name / Designation]'</i> immediately below the title.<br/>"
                           "3. <b>Introductory Paragraph:</b> Introduce the topic, hook the reader, state gravity of the issue.<br/>"
                           "4. <b>Body Paragraph(s):</b> Analyze underlying causes, negative consequences, real-world examples.<br/>"
                           "5. <b>Concluding Paragraph:</b> Offer practical remedial measures, solutions, and a strong closing statement.", bullet_style))

    article_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>DIGITAL DETOX: RESTORING BALANCE IN A HYPER-CONNECTED WORLD</b><br/>"
            "<i>By Sahil Zahoor, Class XI</i></div><br/>"
            "In an age governed by algorithms and touchscreens, our lives have become inexorably tethered to digital devices. "
            "From the moment our morning smartphone alarm buzzes until the late-night blue glare strains our eyes, we are engulfed in a perpetual "
            "deluge of notifications, reels, and feeds. While technology has revolutionized education and communication, it has extracted a devastating "
            "toll on our psychological wellbeing, physical fitness, and interpersonal relationships.<br/><br/>"
            "Medical research indicates that excessive screen time triggers chronic attention deficits, sleep deprivation, and severe social isolation. "
            "Students are trading real-life outdoor athletics and intimate conversations for dopamine-driven validation on virtual networks. "
            "The boundary between productive virtual learning and compulsive digital dependency has blurred into oblivion.<br/><br/>"
            "The only viable remedy is a conscious, structured <b>Digital Detox</b>. Families must designate <i>'device-free dinner tables'</i> and "
            "strictly enforce screen curfews before bedtime. Educational institutions should promote reading physical books and organizing sports leagues. "
            "We must rediscover the beauty of unplugging and reconnecting with real human experiences. Ultimately, technology must serve as a tool to "
            "enrich our existence, not as a master that enslaves our mind.",
            sample_box_style
        )]
    ]
    t_article = Table(article_sample, colWidths=[519])
    t_article.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ffffff')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#0284c7')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_article)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 7. REPORT WRITING
    # ----------------------------------------------------
    story.append(Paragraph("7. Report Writing (School Magazine & Newspaper Reports)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Report</b> is a factual, objective, chronological account of an event that has already occurred. "
        "It is always written in the <b>past tense</b> and predominantly using the <b>passive voice</b>. "
        "Avoid emotional bias or first-person pronouns ('I', 'we'). Word limit: <b>150 – 200 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Magazine Report Format:</b> Heading &rarr; Byline (Name of student/staff reporter) &rarr; Paragraph 1 (What, When, Where, Chief Guest) &rarr; Paragraph 2 (Details of proceedings, performances, exhibits) &rarr; Paragraph 3 (Principal's address, prize distribution, national anthem).", bullet_style))
    story.append(Paragraph("• <b>Newspaper Report Format:</b> Headline &rarr; Byline &rarr; <b>Dateline (Place, Date):</b> e.g., <i>Srinagar, 28th March:</i> &rarr; Factual reporting in inverted pyramid structure.", bullet_style))

    report_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>ANNUAL SCIENCE AND INNOVATION EXHIBITION 2026</b><br/>"
            "<i>Reported by Aiman Bashir, Student Editor</i></div><br/>"
            "<b>Srinagar, 28th March:</b> Government Higher Secondary School, Srinagar, hosted its grand Annual Science and Innovation Exhibition "
            "on 26th March 2026 in the school campus. The event was inaugurated by the Director of School Education, Kashmir, Dr. M. A. Shah, "
            "who graced the occasion as the Chief Guest.<br/><br/>"
            "Over 120 working models and research prototypes were displayed by students from Classes IX to XII. The exhibits spanned cutting-edge "
            "domains including solar irrigation systems, automated flood warning sensors for the Jhelum river basin, biodegradable plastic alternatives, "
            "and AI-assisted plant disease detectors. A special interactive corner demonstrated principles of hydro-power and organic compost processing.<br/><br/>"
            "The Chief Guest inspected each stall with keen interest, questioning students on their scientific methodologies. In his address, he lauded the "
            "exceptional innovative spirit of Kashmiri youth and urged educators to cultivate hands-on experiential science learning. Cash awards and trophies "
            "were presented to the top three winning models, with the Solar Flood Alert system bagging the prestigious rolling trophy. The event concluded "
            "with a formal vote of thanks by Principal Zahoor Ahmad and the singing of the National Anthem.",
            sample_box_style
        )]
    ]
    t_report = Table(report_sample, colWidths=[519])
    t_report.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#047857')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_report)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 8. SPEECH WRITING
    # ----------------------------------------------------
    story.append(Paragraph("8. Speech Writing (Oral Delivery on Paper)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Speech</b> is written to be delivered orally before an assembled gathering. It must engage the listeners directly through "
        "rhetorical questions, dynamic punctuation, persuasive examples, and a formal salutation. Word limit: <b>150 – 200 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Mandatory Parts:</b><br/>"
                           "1. <b>Salutation:</b> <i>'Respected Principal, worthy teachers, and my dear fellow students, a very warm morning to one and all.'</i><br/>"
                           "2. <b>Topic Announcement:</b> <i>'I, [Name], stand before you today to share my views on [Topic]...'</i><br/>"
                           "3. <b>Interactive Body:</b> Rhetorical questions (<i>'Have we ever paused to consider...?'</i>), statistical realities, call to action.<br/>"
                           "4. <b>Formal Closure:</b> Summarizing thought &rarr; <i>'Thank you all for your patient listening.'</i>", bullet_style))

    speech_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>TOPIC: THE CRUCIAL ROLE OF YOUTH IN NATIONAL NATION-BUILDING</b></div><br/>"
            "Respected Principal, esteemed jury, worthy teachers, and my vibrant fellow friends, a very warm good morning to you all.<br/><br/>"
            "I, Sahil Zahoor of Class XI, feel deeply privileged to stand before this august gathering today to voice my thoughts on "
            "<i>'The Crucial Role of Youth in National Nation-Building'</i>.<br/><br/>"
            "Swami Vivekananda once proclaimed: <i>'Give me one hundred energetic young men, and I shall transform the face of India.'</i> "
            "Today, India is proud to possess the world's largest young population. But friends, does demographic numbers alone guarantee national greatness? "
            "Certainly not! The real strength of youth lies not in their numbers, but in their character, vision, and dedication.<br/><br/>"
            "Youth are the torchbearers of societal transformation. When young minds channel their energies into scientific research, digital entrepreneurship, "
            "environmental conservation, and community upliftment, nations ascend to unprecedented heights. Conversely, when youth succumb to substance abuse, "
            "cynicism, or lethargy, the future of the nation withers into despair.<br/><br/>"
            "Let us break free from passive spectator roles. Let us take pride in ethical leadership, champion social justice, and work untiringly "
            "for an inclusive, developed India. The nation's destiny is written in our determination today.<br/><br/>"
            "Thank you very much for your patient listening!",
            sample_box_style
        )]
    ]
    t_speech = Table(speech_sample, colWidths=[519])
    t_speech.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ffffff')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#b45309')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_speech)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 9. DEBATE WRITING
    # ----------------------------------------------------
    story.append(Paragraph("9. Debate Writing (Arguing For or Against a Motion)", sec_heading_style))
    story.append(Paragraph(
        "A <b>Debate</b> requires taking a definitive, uncompromising stand—either strictly <b>FOR</b> or strictly <b>AGAINST</b> the proposed motion. "
        "It features persuasive arguments, strong rebuttals against the opposing bench, and rhetorical emphasis. Word limit: <b>150 – 200 words</b>.",
        body_style
    ))
    story.append(Paragraph("• <b>Format Requirements:</b> Salutation to the Chairperson, Judges &amp; Audience &rarr; Bold statement of the motion and your explicit stand &rarr; 3-4 logical arguments with facts &rarr; Effective rebuttal counter-punch &rarr; Resounding conclusion &amp; <i>'Thank you'</i>.", bullet_style))

    debate_sample = [
        [Paragraph(
            "<div style='text-align: center;'><b>MOTION: 'HOMEWORK SHOULD BE ABOLISHED IN SCHOOLS'</b><br/>"
            "<b>STAND: STRONGLY AGAINST THE MOTION</b></div><br/>"
            "Respected Chairperson, honourable members of the jury, worthy opponents, and dear audience, a pleasant morning to all.<br/><br/>"
            "I, Farhan Ahmad, stand before you today to <b>strongly oppose</b> the motion: <i>'Homework Should Be Abolished in Schools'</i>.<br/><br/>"
            "My esteemed opponents have painted a melodramatic picture, claiming that homework is a medieval instrument of mental torture. "
            "May I politely remind my worthy friends that without reinforcement and consistent self-study, learning is ephemeral and shallow? "
            "School hours are strictly limited; a teacher can introduce mathematical concepts or chemical equations, but true mastery is achieved "
            "only when the student practices independently in the quiet of their room.<br/><br/>"
            "Homework instills irreplaceable virtues: self-discipline, time management, research habits, and academic accountability. "
            "Abolishing homework would simply leave students vulnerable to hours of mindless social media scrolling and video gaming. "
            "Instead of abolishing homework, we should advocate for <i>smart, creative, and project-based assignments</i> that spark intellectual curiosity.<br/><br/>"
            "To abolish homework is to dismantle the very scaffolding of academic excellence. Therefore, I urge this house to reject this ill-conceived motion.<br/><br/>"
            "Thank you!",
            sample_box_style
        )]
    ]
    t_debate = Table(debate_sample, colWidths=[519])
    t_debate.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 1.25, colors.HexColor('#0f172a')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_debate)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # 10. GOLDEN BOARD RULES & CHECKLIST
    # ----------------------------------------------------
    story.append(Paragraph("10. Golden Board Examination Rules for 100% Marks", sec_heading_style))

    checklist_content = [
        [Paragraph("<b>BOARD EXAM EVALUATION CRITERIA & TOPPERS' CHECKLIST</b>", box_title_style)],
        [Paragraph(
            "• <b>Always Draw Boxes with a Pencil:</b> Notices, Classified Ads, and Posters <b>must</b> be enclosed in ruled boxes. Forgetting the box costs a flat 1 mark penalty.<br/>"
            "• <b>Respect the Word Limit:</b> Do not exceed the prescribed limit (e.g., 50 words for short tasks). Board examiners penalize verbosity.<br/>"
            "• <b>Date Formatting:</b> Always write dates in expanded alphanumeric style (e.g., <i>28th March 2026</i>). Avoid abbreviations like <i>28/3/26</i>.<br/>"
            "• <b>Never Write 'Your's':</b> In formal letters, the complimentary close is strictly <i>Yours faithfully</i> or <i>Yours sincerely</i>. The apostrophe in <i>'Your's'</i> is grammatically wrong.<br/>"
            "• <b>Paragraph Splitting:</b> Long compositions (Articles, Speeches, Letters) must always be split into a minimum of <b>3 clean paragraphs</b>: Introduction &rarr; Content/Analysis &rarr; Remedial/Conclusion.<br/>"
            "• <b>Active vs. Passive Voice:</b> Use active, persuasive voice for Speeches and Articles; use formal, objective passive past-tense for Reports.",
            box_body_style
        )]
    ]
    t_checklist = Table(checklist_content, colWidths=[519])
    t_checklist.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0fdf4')),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#16a34a')),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 11),
        ('RIGHTPADDING', (0, 0), (-1, -1), 11),
    ]))
    story.append(t_checklist)

    doc.build(
        story,
        canvasmaker=CYQNumberedCanvas,
        onFirstPage=draw_page_background,
        onLaterPages=draw_page_background
    )
    print(f"Successfully generated {PDF_PATH} ({os.path.getsize(PDF_PATH)} bytes)")

if __name__ == '__main__':
    build_pdf()
