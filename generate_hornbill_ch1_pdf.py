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
PDF_PATH = 'cyqs/class-11-english-hornbill-the-portrait-of-a-lady-summary.pdf'

class CYQBrandedCanvas(canvas.Canvas):
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
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, total_pages):
        page_num = self._pageNumber
        w, h = A4

        # ----------------------------------------------------
        # 1. Subtle Diagonal Watermark
        # ----------------------------------------------------
        self.saveState()
        self.setFont('Helvetica-Bold', 46)
        self.setFillColor(colors.HexColor('#f1f5f9'))
        self.translate(w / 2.0, h / 2.0)
        self.rotate(45)
        self.drawCentredString(0, 0, "JKSTUDYHUB.ONLINE")
        self.restoreState()

        # ----------------------------------------------------
        # 2. Header
        # ----------------------------------------------------
        if page_num == 1:
            # Full Navy Header Block
            self.setFillColor(colors.HexColor('#091e42'))  # deep navy
            self.rect(0, h - 58, w, 58, fill=True, stroke=False)

            # Left Branding Text
            self.setFont('Helvetica-Bold', 16)
            self.setFillColor(colors.white)
            self.drawString(38, h - 28, "JK STUDY HUB")

            self.setFont('Helvetica', 8)
            self.setFillColor(colors.HexColor('#93c5fd'))
            self.drawString(38, h - 44, "JAMMU & KASHMIR BOARD EXAMINATION PORTAL  |  SESSION 2025-26")

            # Right Portal URL
            self.setFont('Helvetica-Bold', 11)
            self.setFillColor(colors.HexColor('#38bdf8'))
            self.drawRightString(w - 38, h - 30, "jkstudyhub.online")

            # Secondary Banner Bar
            self.setFillColor(colors.HexColor('#047857'))  # rich emerald green
            self.rect(38, h - 90, w - 76, 26, fill=True, stroke=False)

            self.setFont('Helvetica-Bold', 9.5)
            self.setFillColor(colors.white)
            self.drawString(48, h - 77, "CLASS 11TH ENGLISH (HORNBILL)  •  COMPLETE CHAPTER SUMMARY")

            self.setFont('Helvetica-Bold', 8)
            self.setFillColor(colors.HexColor('#a7f3d0'))
            self.drawRightString(w - 48, h - 77, "NCERT / JKBOSE BOARD SYLLABUS")
        else:
            # Compact Top Header for Subsequent Pages
            self.setFillColor(colors.HexColor('#091e42'))
            self.rect(0, h - 42, w, 42, fill=True, stroke=False)

            self.setFont('Helvetica-Bold', 10.5)
            self.setFillColor(colors.white)
            self.drawString(38, h - 26, "JK STUDY HUB  |  Class 11th English (Hornbill)")

            self.setFont('Helvetica-Bold', 9.5)
            self.setFillColor(colors.HexColor('#38bdf8'))
            self.drawRightString(w - 38, h - 26, "Ch 1: The Portrait of a Lady — Khushwant Singh")

            # Thin accent line below runner
            self.setStrokeColor(colors.HexColor('#047857'))
            self.setLineWidth(2)
            self.line(0, h - 44, w, h - 44)

        # ----------------------------------------------------
        # 3. Footer
        # ----------------------------------------------------
        self.setStrokeColor(colors.HexColor('#cbd5e1'))
        self.setLineWidth(0.75)
        self.line(38, 38, w - 38, 38)

        self.setFont('Helvetica', 7.5)
        self.setFillColor(colors.HexColor('#64748b'))
        self.drawString(38, 24, "JK STUDY HUB | OFFICIAL EDUCATIONAL & BOARD RESOURCE PORTAL | HTTPS://JKSTUDYHUB.ONLINE/")

        self.setFont('Helvetica-Bold', 8.5)
        self.setFillColor(colors.HexColor('#1e293b'))
        self.drawRightString(w - 38, 24, f"Page {page_num} of {total_pages}")


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

    # Custom Paragraph Styles with larger, comfortable typography
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

    h2_style = ParagraphStyle(
        'Heading2Custom',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#065f46'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=11,
        leading=16,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=8,
        alignment=4 # Justified
    )

    quote_style = ParagraphStyle(
        'QuoteStyle',
        fontName='Helvetica-Oblique',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor('#1e3a8a'),
        spaceBefore=4,
        spaceAfter=6
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
    story.append(Paragraph("The Portrait of a Lady", ch_title_style))
    story.append(Paragraph("Author: Khushwant Singh &nbsp;|&nbsp; Genre: Autobiographical Memoir", author_style))
    story.append(Paragraph("Prescribed Textbook: <b>Hornbill</b> (Class 11th Core English) &nbsp;•&nbsp; Board: <b>JKBOSE / CBSE</b>", meta_tag_style))

    # Decorative HR Divider
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#047857'), spaceAfter=12, spaceBefore=0))

    # -----------------------------------------------------------------
    # Section: Overview & Introduction
    # -----------------------------------------------------------------
    story.append(Paragraph("1. Chapter Overview & Introduction", h1_style))
    story.append(Paragraph(
        "<b><i>The Portrait of a Lady</i></b> is an affectionate, autobiographical tribute written by renowned author "
        "and journalist <b>Khushwant Singh</b>. In this poignant story, the author draws a pen-portrait of his beloved "
        "grandmother, detailing her unwavering religious faith, quiet dignity, motherly love, and the gradual evolution "
        "of their relationship as time and modernization distanced them physically.",
        body_style
    ))
    story.append(Paragraph(
        "The author portrays his grandmother as an elderly woman—short, plump, and slightly stooped with age. Her face was "
        "crisscrossed with wrinkles, and her silvery-white hair spilled over her pale face. She dressed impeccably in spotless "
        "white garments, always counting the beads of her rosary while her lips moved in silent, ceaseless prayers. Although she "
        "lacked outward youthful glamour, the author describes her as possessing profound inner grace, comparing her serene demeanor "
        "to a <i>'peaceful winter landscape in the mountains'</i>—an expanse of pure white stillness breathing contentment.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section: Childhood in the Village
    # -----------------------------------------------------------------
    story.append(Paragraph("2. Phase I: Childhood Days in the Village", h1_style))
    story.append(Paragraph(
        "During Khushwant Singh's early childhood, he lived alone with his grandmother in their ancestral village after his "
        "parents relocated to the city to establish their livelihood. During this period, the grandmother and grandson were "
        "inseparable companions.",
        body_style
    ))
    story.append(Paragraph(
        "Her daily routine was deeply intertwined with his education and care:",
        body_style
    ))
    story.append(Paragraph("• <b>Morning Routine:</b> She woke him at dawn, bathed him, dressed him, and recited her morning prayers in a monotonous sing-song cadence. She hoped he would learn the prayers by heart; however, he simply loved listening to her sweet, melodious voice.", bullet_style))
    story.append(Paragraph("• <b>School Kit Preparation:</b> She lovingly cleaned and yellow-chalked his wooden slate (<i>takhti</i>), prepared a tiny earthen inkpot, tied a reed pen together, and packed a thick, stale chapatti spread with butter and sugar for breakfast.", bullet_style))
    story.append(Paragraph("• <b>Village Temple School:</b> She accompanied him on foot to the village school, which was attached to a local temple. While the village priest taught the alphabet and prayers to the children in the veranda, she sat peacefully inside the temple reading sacred scriptures.", bullet_style))
    story.append(Paragraph("• <b>Feeding Village Dogs:</b> On their walk back home, stray village dogs gathered at the temple door. The grandmother fed them pieces of stale chapattis, and the dogs growled and fought among themselves as they followed them home.", bullet_style))

    # -----------------------------------------------------------------
    # Section: Turning Point - City Life
    # -----------------------------------------------------------------
    story.append(Paragraph("3. Phase II: Shift to the City — The Turning Point", h1_style))
    story.append(Paragraph(
        "When the author's parents settled comfortably in the city, they sent for both Khushwant and his grandmother. "
        "The author explicitly notes that this shift marked a major <b>'turning point'</b> in their cherished friendship.",
        body_style
    ))
    story.append(Paragraph(
        "Although they still shared a common bedroom, the daily bond began to fray due to the modern lifestyle:",
        body_style
    ))
    story.append(Paragraph("• <b>Loss of School Companionship:</b> The author enrolled in an English-medium convent school and commuted daily by motor bus. His grandmother could no longer walk him to school.", bullet_style))
    story.append(Paragraph("• <b>Feeding Courtyard Sparrows:</b> Because there were no street dogs in the city lanes, she redirected her affection toward sparrows that visited the inner courtyard.", bullet_style))
    story.append(Paragraph("• <b>The Academic & Ideological Gulf:</b> When the author returned from school and shared his lessons—English vocabulary, Western science, Archimedes' Principle, and the Law of Gravity—she felt helpless and unhappy because she could not assist him with his studies.", bullet_style))
    story.append(Paragraph("• <b>Distress Over Lack of Religious Instruction:</b> She was deeply dismayed that the modern school provided no teaching about God, scriptures, or moral values.", bullet_style))
    story.append(Paragraph("• <b>The Disapproval of Music:</b> When the author announced that he was taking music lessons at school, she was deeply distressed. To her orthodox mindset, music was the monopoly of beggars and harlots, unsuitable for gentlemen. She rarely spoke to him after that, expressing her disapproval through dignified silence.", bullet_style))

    # -----------------------------------------------------------------
    # Section: University & Separation
    # -----------------------------------------------------------------
    story.append(Paragraph("4. Phase III: University Days, Seclusion & Loneliness", h1_style))
    story.append(Paragraph(
        "When Khushwant Singh entered university, he was allocated an independent room of his own. This physical separation "
        "snapped the last common link of their companionship. His grandmother accepted her solitude with quiet resignation "
        "(<i>'she accepted her seclusion with resignation'</i>).",
        body_style
    ))
    story.append(Paragraph(
        "She structured her solitary days around two sacred activities:",
        body_style
    ))
    story.append(Paragraph("1. <b>Spinning-Wheel:</b> From morning till evening, she sat by her spinning-wheel spinning yarn and silently reciting her prayers, rarely leaving her seat to converse with anyone.", bullet_style))
    story.append(Paragraph("2. <b>The Happiest Half-Hour (Sparrow Feeding):</b> In the afternoon, she broke bread into tiny crumbs and scattered them in the veranda. Hundreds of sparrows flocked around her—perching on her feet, sitting on her lap, shoulders, and even resting on her head. She never shooed them away; instead, she smiled and softly talked to them. This peaceful ritual was without doubt the happiest half-hour of her entire day.", bullet_style))

    # -----------------------------------------------------------------
    # Section: Departure Abroad & Reunion
    # -----------------------------------------------------------------
    story.append(Paragraph("5. Author's Departure Abroad & Return After 5 Years", h1_style))
    story.append(Paragraph(
        "When the author decided to proceed abroad for higher studies for five years, he anticipated that his grandmother "
        "would be sentimental and overcome with grief. Instead, she displayed extraordinary composure. She went to the "
        "railway station to see him off, but her fingers remained occupied with her rosary and her lips continuously moved "
        "in silent prayer. Before he boarded, she silently kissed his forehead. The author cherished the moist imprint of her "
        "kiss, fearing it might be their final physical contact on earth.",
        body_style
    ))
    story.append(Paragraph(
        "However, when he returned after five years, she was at the railway station to receive him, looking not a single day "
        "older. She clasped him tightly in her arms while continuing her prayers. That afternoon, she celebrated his homecoming "
        "by feeding her beloved sparrows with even greater affection, playfully scolding them with gentle remarks.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section: The Unusual Evening & The Demise
    # -----------------------------------------------------------------
    story.append(Paragraph("6. The Unusual Evening & The Peaceful Demise", h1_style))
    story.append(Paragraph(
        "On the evening of his arrival, a startling change occurred in her behavior—<b>the only time in her life she omitted her prayers</b>. "
        "She gathered women from the neighborhood, retrieved an old dilapidated drum, and sang joyous ballads celebrating "
        "the homecoming of triumphant warriors for hours. The family had to plead with her to stop to avoid overexertion.",
        body_style
    ))
    story.append(Paragraph(
        "The following morning, she came down with a mild fever. Although the attending physician assured the family that "
        "she would recover quickly, she intuitively knew her life was concluding. She announced that having wasted precious "
        "hours the previous evening without praying, she would not squander her remaining moments in idle conversation. "
        "She lay serenely in bed, praying and fingering her rosary. Suddenly, her lips froze, the rosary slipped from her "
        "lifeless fingers, and she passed away peacefully.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section: The Sparrows' Silent Mourning
    # -----------------------------------------------------------------
    story.append(Paragraph("7. The Sparrows' Silent Mourning", h1_style))
    story.append(Paragraph(
        "When the family entered the grandmother's room to prepare her body for cremation, they witnessed an unforgettable, "
        "awe-inspiring sight. Her body lay wrapped in a red shroud on the floor bathed in the golden light of the setting sun.",
        body_style
    ))
    story.append(Paragraph(
        "Thousands of sparrows flew into the courtyard and perched silently on the floor all around her body. "
        "<b>There was not a single chirp or sound.</b> In a gesture of sympathy, the author's mother scattered bread crumbs "
        "for them, but the birds did not take the slightest notice of the food. When the grandmother's mortal remains "
        "were carried away, the sparrows flew away quietly. The next morning, the untouched bread crumbs were swept into the dustbin.",
        body_style
    ))

    # -----------------------------------------------------------------
    # Section: Key Themes & Examination Takeaways Box
    # -----------------------------------------------------------------
    story.append(Spacer(1, 8))
    
    exam_box_content = [
        [
            Paragraph("<b>KEY EXAMINATION TAKEAWAYS & CRITICAL ANALYSIS</b>", box_title_style)
        ],
        [
            Paragraph(
                "• <b>Central Theme:</b> Explores the emotional bond between generations, the inevitable changes caused by urbanization and modern education, and the dignity of an aging matriarch who finds solace in faith.<br/>"
                "• <b>Symbolism of Winter Landscape:</b> Represents the grandmother's spiritual purity, calmness, spotless white clothes, and peaceful detachment from worldly chaos.<br/>"
                "• <b>Symbolism of the Sparrows:</b> Demonstrates true communion between human beings and nature; their silent mourning reflects genuine, non-verbal grief and unconditional animal empathy.<br/>"
                "• <b>Character Sketch of Grandmother:</b> Pious, strong-willed, orthodox yet profoundly loving, disciplined, and possessing extraordinary inner strength and quiet resilience.",
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

    doc.build(story, canvasmaker=CYQBrandedCanvas)
    print(f"Successfully generated {PDF_PATH} ({os.path.getsize(PDF_PATH)} bytes)")

if __name__ == '__main__':
    build_pdf()
