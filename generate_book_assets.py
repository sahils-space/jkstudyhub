#!/usr/bin/env python3
import os

os.makedirs("images/books", exist_ok=True)

books = [
    {
        "id": "atomic-habits",
        "title": "Atomic Habits",
        "author": "James Clear",
        "subtitle": "Tiny Changes, Remarkable Results",
        "blurb": "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        "badge": "Bestseller #1",
        "bg_top": "#fffdfa",
        "bg_bot": "#f7f3ec",
        "accent": "#d97706",
        "dark": "#18181b",
        "spine_color": "#e4dfd5",
        "height": "19.8 cm",
        "width": "12.9 cm",
        "thickness": "2.4 cm",
        "pages": "320 pgs",
        "paper": "70 GSM Cream Paper",
        "key_takeaways": ["The 1% Rule of Compounding", "Identity-Based Habits", "Habit Stacking Blueprint", "Overcoming Procrastination"]
    },
    {
        "id": "psychology-of-money",
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "subtitle": "Timeless Lessons on Wealth, Greed & Happiness",
        "blurb": "Doing well with money isn't necessarily about what you know. It's about how you behave.",
        "badge": "Youth Favorite",
        "bg_top": "#ffffff",
        "bg_bot": "#f4f4f5",
        "accent": "#059669",
        "dark": "#09090b",
        "spine_color": "#e4e4e7",
        "height": "19.8 cm",
        "width": "12.9 cm",
        "thickness": "2.0 cm",
        "pages": "256 pgs",
        "paper": "70 GSM Cream Paper",
        "key_takeaways": ["Compounding & Patience", "Freedom > Luxury", "Risk vs. Luck Reality", "Staying Wealthy Mindset"]
    },
    {
        "id": "deep-work",
        "title": "Deep Work",
        "author": "Cal Newport",
        "subtitle": "Rules for Focused Success in a Distracted World",
        "blurb": "The ability to focus without distraction on a cognitively demanding task is the superpower of our economy.",
        "badge": "Exam Prep Must-Have",
        "bg_top": "#fef08a",
        "bg_bot": "#fde047",
        "accent": "#2563eb",
        "dark": "#0f172a",
        "spine_color": "#eab308",
        "height": "19.8 cm",
        "width": "12.8 cm",
        "thickness": "2.2 cm",
        "pages": "304 pgs",
        "paper": "70 GSM Natural Paper",
        "key_takeaways": ["4-Hour Deep Study Blocks", "Quit Low-Value Social Media", "Drain the Shallows Routine", "Master Hard Concepts Fast"]
    },
    {
        "id": "the-alchemist",
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "subtitle": "A Fable About Following Your Dream",
        "blurb": "When you want something, all the universe conspires in helping you to achieve it.",
        "badge": "Inspiring Classic",
        "bg_top": "#1e1b4b",
        "bg_bot": "#0f172a",
        "accent": "#f59e0b",
        "dark": "#ffffff",
        "spine_color": "#172554",
        "height": "19.8 cm",
        "width": "12.9 cm",
        "thickness": "1.6 cm",
        "pages": "208 pgs",
        "paper": "70 GSM Soft White",
        "key_takeaways": ["Listening to Your Heart", "Reading Omen Signs", "Overcoming Fear of Failure", "The Personal Legend Path"]
    },
    {
        "id": "the-kite-runner",
        "title": "The Kite Runner",
        "author": "Khaled Hosseini",
        "subtitle": "The Unforgettable #1 International Bestseller",
        "blurb": "For you, a thousand times over. A heart-wrenching story of friendship, betrayal, and redemption.",
        "badge": "Epic Masterpiece",
        "bg_top": "#7c2d12",
        "bg_bot": "#431407",
        "accent": "#fbbf24",
        "dark": "#ffffff",
        "spine_color": "#9a3412",
        "height": "19.8 cm",
        "width": "12.9 cm",
        "thickness": "2.6 cm",
        "pages": "384 pgs",
        "paper": "70 GSM Cream Paper",
        "key_takeaways": ["True Brotherhood Bond", "Courage to Face the Past", "Redemption & Forgiveness", "Rich Afghan Culture"]
    },
    {
        "id": "thousand-splendid-suns",
        "title": "A Thousand Splendid Suns",
        "author": "Khaled Hosseini",
        "subtitle": "Breathtaking Story of Love & Sacrifice",
        "blurb": "One could not count the moons that shimmer on her roofs, or the thousand splendid suns that hide behind her walls.",
        "badge": "Emotional Journey",
        "bg_top": "#1e3a8a",
        "bg_bot": "#0f172a",
        "accent": "#f59e0b",
        "dark": "#ffffff",
        "spine_color": "#172554",
        "height": "19.8 cm",
        "width": "12.9 cm",
        "thickness": "2.8 cm",
        "pages": "432 pgs",
        "paper": "70 GSM Cream Paper",
        "key_takeaways": ["Strength of Women", "Enduring Hope in Hardship", "Family Ties & Loyalty", "Unmatched Storytelling"]
    },
    {
        "id": "secrets-of-divine-love",
        "title": "Secrets of Divine Love",
        "author": "A. Helwa",
        "subtitle": "A Spiritual Journey into the Heart of Islam",
        "blurb": "Connecting deeply with God through the infinite mercy and love at the core of the Quran.",
        "badge": "Spiritual Bestseller",
        "bg_top": "#064e3b",
        "bg_bot": "#022c22",
        "accent": "#fbbf24",
        "dark": "#ffffff",
        "spine_color": "#047857",
        "height": "21.6 cm",
        "width": "14.0 cm",
        "thickness": "2.6 cm",
        "pages": "400 pgs",
        "paper": "80 GSM Royal White",
        "key_takeaways": ["God's Unconditional Mercy", "Spiritual Healing & Tawbah", "Deeper Understanding of Salah", "Heartfelt Peace"]
    },
    {
        "id": "reclaim-your-heart",
        "title": "Reclaim Your Heart",
        "author": "Yasmin Mogahed",
        "subtitle": "Personal Growth, Healing & Freedom",
        "blurb": "How to protect your heart from life's deepest disappointments and attach only to what is permanent.",
        "badge": "Mental Peace Guide",
        "bg_top": "#4c1d95",
        "bg_bot": "#2e1065",
        "accent": "#f472b6",
        "dark": "#ffffff",
        "spine_color": "#581c87",
        "height": "20.3 cm",
        "width": "13.3 cm",
        "thickness": "1.8 cm",
        "pages": "240 pgs",
        "paper": "70 GSM Cream Paper",
        "key_takeaways": ["Freeing from Attachments", "Dealing with Heartbreak", "Spiritual Resilience", "Mindset Shift for Students"]
    },
    {
        "id": "wings-of-fire",
        "title": "Wings of Fire",
        "author": "A.P.J. Abdul Kalam",
        "subtitle": "An Autobiography of India's Missile Man",
        "blurb": "Dreams are not that which you see while sleeping, dreams are that which do not let you sleep.",
        "badge": "National Inspiration",
        "bg_top": "#9a3412",
        "bg_bot": "#14532d",
        "accent": "#fde047",
        "dark": "#ffffff",
        "spine_color": "#c2410c",
        "height": "19.8 cm",
        "width": "13.0 cm",
        "thickness": "1.5 cm",
        "pages": "180 pgs",
        "paper": "70 GSM Soft White",
        "key_takeaways": ["Humble Roots to ISRO Chief", "Perseverance Through Failures", "Scientific Leadership", "Youth Empowerment"]
    },
    {
        "id": "lucent-gk",
        "title": "Lucent's General Knowledge",
        "author": "Lucent Publication",
        "subtitle": "New Comprehensive Edition for Competitive Exams",
        "blurb": "History, Geography, Indian Polity, Economy, Science & GK. Top pick for JKSSB, SSC, Railways & State Exams.",
        "badge": "Exam Rank Booster",
        "bg_top": "#f59e0b",
        "bg_bot": "#b45309",
        "accent": "#1e3a8a",
        "dark": "#0f172a",
        "spine_color": "#d97706",
        "height": "24.0 cm",
        "width": "18.0 cm",
        "thickness": "2.8 cm",
        "pages": "450 pgs",
        "paper": "65 GSM Crisp White",
        "key_takeaways": ["JKSSB Syllabus Aligned", "Quick Revision Tables", "Science & Polity Highlights", "Latest Solved Trends"]
    },
    {
        "id": "wren-martin",
        "title": "Wren & Martin English Grammar",
        "author": "P.C. Wren & H. Martin",
        "subtitle": "High School English Grammar & Composition",
        "blurb": "The gold standard of English grammar for students, competitive exam aspirants, and fluency building.",
        "badge": "Grammar Foundation",
        "bg_top": "#991b1b",
        "bg_bot": "#450a0a",
        "accent": "#38bdf8",
        "dark": "#ffffff",
        "spine_color": "#7f1d1d",
        "height": "24.0 cm",
        "width": "18.0 cm",
        "thickness": "3.2 cm",
        "pages": "520 pgs",
        "paper": "70 GSM Natural White",
        "key_takeaways": ["Tenses & Active/Passive Rules", "Punctuation & Direct Speech", "Composition & Essay Guide", "Exercise Solutions"]
    }
]

for b in books:
    # 1. FRONT COVER SVG
    # Crisp 3D book cover resting on a clean white backdrop
    cover_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="500" height="620">
  <defs>
    <linearGradient id="bg_{b['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{b['bg_top']}"/>
      <stop offset="100%" stop-color="{b['bg_bot']}"/>
    </linearGradient>
    <linearGradient id="spine_shading_{b['id']}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="book_shadow_{b['id']}" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="8" dy="16" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.18"/>
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.10"/>
    </filter>
  </defs>

  <!-- Clean Transparent Canvas -->
  
  <!-- Physical 3D Book Cover -->
  <g transform="translate(60, 30)" filter="url(#book_shadow_{b['id']})">
    <!-- Back Page Edge / Thickness Preview -->
    <path d="M 370 15 L 382 25 L 382 545 L 370 535 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="0.5"/>
    <path d="M 12 525 L 370 525 L 382 535 L 24 535 Z" fill="#cbd5e1"/>
    
    <!-- Main Cover Front -->
    <rect x="10" y="10" width="360" height="520" rx="8" fill="url(#bg_{b['id']})" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <!-- Spine Lighting Crease -->
    <rect x="10" y="10" width="28" height="520" rx="4" fill="url(#spine_shading_{b['id']})"/>
    <line x1="38" y1="10" x2="38" y2="530" stroke="#000000" stroke-opacity="0.1" stroke-width="1"/>

    <!-- Quality Badge -->
    <rect x="42" y="36" width="130" height="26" rx="13" fill="{b['accent']}" opacity="0.95"/>
    <text x="107" y="53" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle" letter-spacing="0.5">★ {b['badge'].upper()}</text>

    <!-- Student Edition Tag -->
    <rect x="250" y="36" width="105" height="26" rx="6" fill="#000000" fill-opacity="0.08"/>
    <text x="302" y="53" fill="{b['dark']}" opacity="0.8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" text-anchor="middle">VERIFIED COPY</text>

    <!-- Book Title -->
    <g transform="translate(42, 130)">
      <text x="0" y="35" fill="{b['dark']}" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-weight="bold" letter-spacing="-0.5">
        {b['title']}
      </text>
    </g>

    <!-- Subtitle / Hook -->
    <g transform="translate(42, 225)">
      <text x="0" y="20" fill="{b['dark']}" opacity="0.85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="600" width="290">
        {b['subtitle'][:38]}
      </text>
      <text x="0" y="42" fill="{b['dark']}" opacity="0.85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="600" width="290">
        {b['subtitle'][38:75]}
      </text>
    </g>

    <!-- Decorative Central Seal / Art Accent -->
    <circle cx="190" cy="330" r="42" fill="{b['accent']}" opacity="0.12"/>
    <circle cx="190" cy="330" r="34" fill="none" stroke="{b['accent']}" stroke-width="2" stroke-dasharray="4,3"/>
    <text x="190" y="335" fill="{b['accent']}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">ORIGINAL</text>
    <text x="190" y="348" fill="{b['dark']}" opacity="0.7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" text-anchor="middle">STUDENT PRINT</text>

    <!-- Author Name -->
    <line x1="42" y1="415" x2="335" y2="415" stroke="{b['dark']}" stroke-opacity="0.15" stroke-width="1"/>
    <text x="42" y="445" fill="{b['dark']}" opacity="0.65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1">AUTHOR</text>
    <text x="42" y="475" fill="{b['dark']}" font-family="Georgia, serif" font-size="22" font-weight="bold">
      {b['author']}
    </text>

    <!-- Footer Bar -->
    <rect x="10" y="505" width="360" height="25" fill="{b['dark']}" fill-opacity="0.04"/>
    <text x="190" y="521" fill="{b['dark']}" opacity="0.6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="middle">JK Study Hub Verified Edition • Fast Delivery in Pattan</text>
  </g>
</svg>"""

    with open(f"images/books/{b['id']}-cover.svg", "w") as f:
        f.write(cover_svg)

    # 2. 3D SPINE & ANGLE VIEW SVG
    spine_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="500" height="620">
  <defs>
    <linearGradient id="spine_grad_{b['id']}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{b['spine_color']}"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="{b['bg_bot']}"/>
    </linearGradient>
    <linearGradient id="page_lines_{b['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="angle_sh_{b['id']}" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="12" dy="20" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>

  <g transform="translate(80, 40)" filter="url(#angle_sh_{b['id']})">
    <!-- Pages Block Depth (Right side perspective) -->
    <polygon points="120,40 320,10 320,480 120,530" fill="url(#page_lines_{b['id']})" stroke="#cbd5e1" stroke-width="1"/>
    
    <!-- Fine Page Lines -->
    <line x1="140" y1="42" x2="140" y2="520" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="180" y1="36" x2="180" y2="508" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="220" y1="30" x2="220" y2="498" stroke="#e2e8f0" stroke-width="1"/>
    <line x1="260" y1="22" x2="260" y2="490" stroke="#e2e8f0" stroke-width="1"/>

    <!-- Spine (Left 3D Facing) -->
    <polygon points="40,60 120,40 120,530 40,555" fill="url(#spine_grad_{b['id']})" stroke="#cbd5e1" stroke-width="1"/>

    <!-- Spine Title (Rotated 90 degrees) -->
    <g transform="translate(85, 290) rotate(-90)">
      <text x="0" y="5" fill="{b['dark']}" font-family="Georgia, serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="1">
        {b['title'].upper()}
      </text>
      <text x="0" y="24" fill="{b['dark']}" opacity="0.75" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle">
        {b['author']}
      </text>
    </g>

    <!-- Spine Badges -->
    <circle cx="80" cy="90" r="16" fill="{b['accent']}"/>
    <text x="80" y="94" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">JK</text>

    <!-- Thickness Measurement Callout -->
    <g transform="translate(0, 565)">
      <line x1="40" y1="10" x2="120" y2="-5" stroke="#2563eb" stroke-width="2"/>
      <rect x="50" y="16" width="90" height="28" rx="6" fill="#1e293b"/>
      <text x="95" y="34" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Spine: {b['thickness']}</text>
    </g>

    <!-- Pages Callout -->
    <g transform="translate(230, 240)">
      <rect x="0" y="0" width="100" height="48" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
      <text x="50" y="20" fill="#64748b" font-family="-apple-system, sans-serif" font-size="10" font-weight="700" text-anchor="middle">AUTHENTIC</text>
      <text x="50" y="38" fill="#059669" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" text-anchor="middle">{b['pages']}</text>
    </g>
  </g>
</svg>"""

    with open(f"images/books/{b['id']}-spine.svg", "w") as f:
        f.write(spine_svg)

    # 3. BACK COVER & INSIDE TAKEAWAYS SVG
    takeaways_items = "".join([f"""
      <g transform="translate(0, {i * 44})">
        <circle cx="12" cy="12" r="10" fill="#eff6ff"/>
        <text x="12" y="16" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
        <text x="32" y="16" fill="#1e293b" font-family="-apple-system, sans-serif" font-size="13.5" font-weight="600">{item}</text>
      </g>
    """ for i, item in enumerate(b["key_takeaways"])])

    back_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="500" height="620">
  <defs>
    <filter id="back_sh_{b['id']}" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="6" dy="14" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g transform="translate(60, 30)" filter="url(#back_sh_{b['id']})">
    <rect x="10" y="10" width="360" height="520" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <!-- Top Bar -->
    <rect x="10" y="10" width="360" height="65" rx="8" fill="#f8fafc"/>
    <text x="35" y="40" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">What Students Learn</text>
    <text x="35" y="58" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11" font-weight="600">Essential Takeaways &amp; Chapter Highlights</text>

    <!-- Synopsis Box -->
    <rect x="30" y="90" width="320" height="95" rx="8" fill="#f1f5f9" stroke="#e2e8f0"/>
    <text x="45" y="115" fill="#334155" font-family="Georgia, serif" font-size="12.5" font-style="italic">
      "{b['blurb'][:52]}"
    </text>
    <text x="45" y="135" fill="#334155" font-family="Georgia, serif" font-size="12.5" font-style="italic">
      "{b['blurb'][52:108]}"
    </text>
    <text x="45" y="155" fill="#334155" font-family="Georgia, serif" font-size="12.5" font-style="italic">
      "{b['blurb'][108:160]}..."
    </text>

    <!-- Key Takeaways Checklist -->
    <g transform="translate(35, 210)">
      {takeaways_items}
    </g>

    <!-- Quality Assurance Box -->
    <rect x="30" y="405" width="320" height="55" rx="8" fill="#f0fdf4" stroke="#bbf7d0"/>
    <text x="45" y="426" fill="#166534" font-family="-apple-system, sans-serif" font-size="12" font-weight="700">✓ Verified Quality Checked</text>
    <text x="45" y="445" fill="#15803d" font-family="-apple-system, sans-serif" font-size="11">Crisp dark font print • No missing or blurry pages • Sturdy binding</text>

    <!-- Barcode & Stamp -->
    <g transform="translate(35, 475)">
      <rect x="0" y="0" width="120" height="40" fill="#f8fafc" stroke="#cbd5e1"/>
      <!-- Barcode Lines -->
      <line x1="10" y1="6" x2="10" y2="34" stroke="#000" stroke-width="2"/>
      <line x1="16" y1="6" x2="16" y2="34" stroke="#000" stroke-width="1"/>
      <line x1="22" y1="6" x2="22" y2="34" stroke="#000" stroke-width="3"/>
      <line x1="30" y1="6" x2="30" y2="34" stroke="#000" stroke-width="1.5"/>
      <line x1="38" y1="6" x2="38" y2="34" stroke="#000" stroke-width="2"/>
      <line x1="46" y1="6" x2="46" y2="34" stroke="#000" stroke-width="1"/>
      <line x1="55" y1="6" x2="55" y2="34" stroke="#000" stroke-width="3"/>
      <line x1="68" y1="6" x2="68" y2="34" stroke="#000" stroke-width="1.5"/>
      <line x1="78" y1="6" x2="78" y2="34" stroke="#000" stroke-width="2"/>
      <line x1="88" y1="6" x2="88" y2="34" stroke="#000" stroke-width="1"/>
      <line x1="98" y1="6" x2="98" y2="34" stroke="#000" stroke-width="2.5"/>
      <line x1="108" y1="6" x2="108" y2="34" stroke="#000" stroke-width="1"/>
      
      <text x="150" y="18" fill="#64748b" font-family="-apple-system, sans-serif" font-size="10" font-weight="700">PRINTED IN INDIA</text>
      <text x="150" y="34" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="12" font-weight="800">100% Authentic Edition</text>
    </g>
  </g>
</svg>"""

    with open(f"images/books/{b['id']}-back.svg", "w") as f:
        f.write(back_svg)

    # 4. DIMENSIONS & SPECIFICATIONS INFOGRAPHIC SVG (Amazon/Flipkart Style)
    dim_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="dim_bg_{b['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="dim_sh_{b['id']}" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Clean Card Background -->
  <rect width="600" height="600" rx="16" fill="url(#dim_bg_{b['id']})"/>
  <rect x="15" y="15" width="570" height="570" rx="14" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Header Pill -->
  <rect x="35" y="32" width="230" height="32" rx="16" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>
  <text x="50" y="53" fill="#2563eb" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="800">📏 OFFICIAL SIZE &amp; SPECS</text>

  <!-- Book Header -->
  <text x="35" y="96" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800">{b['title']}</text>
  <text x="35" y="118" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Physical Dimensions &amp; Quality Measurement Chart</text>

  <!-- 3D Perspective Isometric Book Diagram -->
  <g transform="translate(130, 160)" filter="url(#dim_sh_{b['id']})">
    <!-- Cover Face -->
    <path d="M 30 35 L 180 15 L 210 240 L 60 270 Z" fill="{b['accent']}" opacity="0.9"/>
    <!-- Spine Edge -->
    <path d="M 10 47 L 30 35 L 60 270 L 38 283 Z" fill="#1e3a8a"/>
    <!-- Top Pages Edge -->
    <path d="M 30 35 L 180 15 L 165 27 L 17 47 Z" fill="#e2e8f0"/>
    <text x="75" y="155" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="15" font-weight="800" transform="rotate(9, 75, 155)">VERIFIED</text>
    <text x="82" y="177" fill="#dbeafe" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" transform="rotate(9, 82, 177)">STUDENT EDITION</text>
  </g>

  <!-- Height Marker Left -->
  <g stroke="#2563eb" stroke-width="2">
    <line x1="85" y1="200" x2="85" y2="455"/>
    <polyline points="79,212 85,200 91,212" fill="none"/>
    <polyline points="79,443 85,455 91,443" fill="none"/>
  </g>
  <rect x="25" y="310" width="82" height="32" rx="8" fill="#1e293b"/>
  <text x="35" y="331" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="12.5" font-weight="800">{b['height']}</text>
  <text x="30" y="356" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11" font-weight="600">Height / Length</text>

  <!-- Width Marker Bottom -->
  <g stroke="#2563eb" stroke-width="2">
    <line x1="190" y1="475" x2="350" y2="450"/>
    <polyline points="199,467 190,475 201,482" fill="none"/>
    <polyline points="340,443 350,450 342,458" fill="none"/>
  </g>
  <rect x="235" y="475" width="82" height="32" rx="8" fill="#1e293b"/>
  <text x="245" y="496" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="12.5" font-weight="800">{b['width']}</text>
  <text x="260" y="522" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11" font-weight="600">Width</text>

  <!-- Spec Cards Right Side -->
  <!-- 1. Spine -->
  <rect x="410" y="175" width="155" height="68" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#dim_sh_{b['id']})"/>
  <text x="425" y="198" fill="#64748b" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700">SPINE THICKNESS</text>
  <text x="425" y="228" fill="#d97706" font-family="-apple-system, sans-serif" font-size="18" font-weight="800">{b['thickness']}</text>

  <!-- 2. Pages -->
  <rect x="410" y="258" width="155" height="68" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#dim_sh_{b['id']})"/>
  <text x="425" y="281" fill="#64748b" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700">TOTAL PAGES</text>
  <text x="425" y="311" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="18" font-weight="800">{b['pages']}</text>

  <!-- 3. Paper Quality -->
  <rect x="410" y="341" width="155" height="68" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#dim_sh_{b['id']})"/>
  <text x="425" y="364" fill="#64748b" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700">PAPER QUALITY</text>
  <text x="425" y="394" fill="#16a34a" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">{b['paper']}</text>

  <!-- Footer Guaranteed Delivery Info -->
  <line x1="35" y1="540" x2="565" y2="540" stroke="#e2e8f0" stroke-width="1"/>
  <text x="35" y="565" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">Format: Standard Paperback • Verified Crisp Font • Fast Delivery in Pattan</text>
</svg>"""

    with open(f"images/books/{b['id']}-dim.svg", "w") as f:
        f.write(dim_svg)

print("Generated all 44 book vector assets successfully in images/books/!")
