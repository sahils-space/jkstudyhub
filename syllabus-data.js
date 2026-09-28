// JK STUDY HUB - Official Class 11th JKBOSE Digital Syllabus Dataset
// Strictly categorized by Faculty / Stream (No mixing between streams)

const SYLLABUS_DATA = {
  medical: {
    streamTitle: "Faculty of Science (Medical)",
    streamBadge: "Medical Stream",
    streamDesc: "Curated syllabus for aspiring Doctors, Healthcare & Life Science Professionals (JKBOSE Class 11th).",
    subjects: [
      {
        id: "med-bio",
        code: "BI",
        name: "Biology (Botany & Zoology)",
        type: "Compulsory",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["A Textbook of Biology for Class XI published by NCERT / JKBOSE"],
        sections: [
          {
            sectionTitle: "Section A: Botany (35 Marks)",
            units: [
              {
                unitNumber: "Unit I",
                title: "Diversity of Life",
                marks: 9,
                topics: [
                  "Variety of living organisms; Need and history of classification (Artificial, Natural and Phylogenetic).",
                  "Biosystematics: Taxonomy and Systematics; Concept of species & Taxonomical hierarchy; Binomial nomenclature; Herbarium.",
                  "Two Kingdom & Five Kingdom classifications, merits and demerits.",
                  "General characters & classification of Monera, Protista and Fungi; Lichens; Status of Viruses and Viroids."
                ]
              },
              {
                unitNumber: "Unit II",
                title: "Kingdom Plantae & Plant Morphology",
                marks: 9,
                topics: [
                  "Classification of plants into major groups; General characters of Algae, Bryophyta, Pteridophyta and Gymnosperms.",
                  "Morphology of Flowering plants and functions: Root, stem, leaf (without modifications).",
                  "Morphology of Inflorescence, flower, fruit and seed; Detailed description of family Solanaceae."
                ]
              },
              {
                unitNumber: "Unit III",
                title: "Plant Anatomy",
                marks: 5,
                topics: [
                  "Tissue systems in plants: Epidermal, ground and vascular tissue systems.",
                  "Anatomy and functions of dicot and monocot root, stem and leaves."
                ]
              },
              {
                unitNumber: "Unit IV",
                title: "Plant Physiology & Development",
                marks: 12,
                topics: [
                  "Respiration: Cellular respiration, Glycolysis, Kreb's cycle, Electron Transport System, ATP energetics, Respiratory Quotient.",
                  "Photosynthesis: Pigments, Light reaction (Photosystems I & II, cyclic/non-cyclic photophosphorylation), Dark reaction (C3 & C4 cycles), Photorespiration.",
                  "Plant Growth & Regulators: Auxins, Gibberellins, Cytokinins, Ethylene, Abscisic Acid (ABA)."
                ]
              }
            ]
          },
          {
            sectionTitle: "Section B: Zoology (35 Marks)",
            units: [
              {
                unitNumber: "Unit I",
                title: "Diversity in Living World (Animal Kingdom)",
                marks: 8,
                topics: [
                  "General characters and classification of animals (Non-chordates up to phyla, chordates up to class level).",
                  "National Parks with special reference to J&K: Dachigam, Kishtwar, Salim Ali, Kazinag and Hemis.",
                  "Sanctuaries and Biosphere reserves."
                ]
              },
              {
                unitNumber: "Unit II",
                title: "Structural Organisation & Animal Biomolecules",
                marks: 7,
                topics: [
                  "Morphology, Anatomy and organ systems of Frog (digestive, circulatory, respiratory, nervous, reproductive).",
                  "Biomolecules: Structure and function of Carbohydrates, Proteins, Lipids, Nucleic Acids; Primary & secondary metabolites.",
                  "Enzymes: Types, properties, mechanism of action and factors affecting."
                ]
              },
              {
                unitNumber: "Unit III",
                title: "Cell Structure and Function",
                marks: 8,
                topics: [
                  "Cell theory; Prokaryotic and Eukaryotic cell structure; Cell wall, Cell membrane.",
                  "Cell Organelles: Mitochondria, ER, Golgi, Ribosomes, Lysosomes, Plastids, Nucleus, Cytoskeleton, Cilia & Flagella.",
                  "Cell Division: Cell cycle phases, Mitosis and Meiosis with significance."
                ]
              },
              {
                unitNumber: "Unit IV",
                title: "Human Physiology",
                marks: 12,
                topics: [
                  "Breathing & Respiration: Respiratory organs, mechanism of breathing, gas exchange and transport, respiratory disorders.",
                  "Body Fluids & Circulation: Blood groups, Rh factor, Lymph, Cardiac cycle, ECG, double circulation, disorders.",
                  "Excretory Products & Elimination: Nephron function, urine formation, osmoregulation, kidney regulation.",
                  "Locomotion & Movement: Muscle contraction mechanism, skeletal framework, joints.",
                  "Neural & Chemical Coordination: Neuron impulse conduction, Central nervous system, Endocrine hormones and disorders."
                ]
              }
            ]
          }
        ],
        practicals: [
          "Compound microscope parts and handling.",
          "Specimen identification: Algae, Fungi, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms.",
          "Osmosis by potato osmoscope, Plasmolysis in epidermal peel.",
          "Test for urea, sugar, albumin in urine sample; Preparation of blood smear.",
          "Dissection models of Frog organ systems; Herbarium preservation."
        ]
      },
      {
        id: "med-phy",
        code: "PH",
        name: "Physics",
        type: "Compulsory",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Physics Part-I & Part-II for Class XI published by NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I", title: "Physical World and Measurement", marks: 5, topics: ["SI units, fundamental and derived units", "Significant figures, Dimensions of physical quantities, dimensional analysis and applications."] },
          { unitNumber: "Unit II", title: "Kinematics", marks: 9, topics: ["Motion in a straight line, differentiation and integration in kinematics, v-t and x-t graphs, equations of motion.", "Vectors (dot and cross products), Projectile motion, uniform circular motion."] },
          { unitNumber: "Unit III", title: "Laws of Motion", marks: 7, topics: ["Newton's three laws of motion, momentum, impulse, conservation of linear momentum.", "Friction (static & kinetic, laws, lubrication), Dynamics of circular motion (banking of roads)."] },
          { unitNumber: "Unit IV", title: "Work, Energy and Power", marks: 6, topics: ["Work done by constant & variable force, kinetic energy, Work-Energy theorem.", "Potential energy of a spring, conservative forces, elastic and inelastic collisions in 1D and 2D."] },
          { unitNumber: "Unit V", title: "Motion of System of Particles & Rigid Body", marks: 6, topics: ["Centre of mass of 2-particle system & rigid body, conservation of angular momentum and torque.", "Moment of inertia, radius of gyration, rotational equations of motion."] },
          { unitNumber: "Unit VI", title: "Gravitation", marks: 6, topics: ["Kepler's laws, Universal law of gravitation, variation of 'g' with altitude and depth.", "Gravitational potential energy, escape speed, orbital velocity of satellites."] },
          { unitNumber: "Unit VII", title: "Properties of Bulk Matter", marks: 9, topics: ["Elasticity, Hooke's law, Young's modulus, Poisson's ratio.", "Fluid pressure, Pascal's law, Stokes' law, terminal velocity, Bernoulli's theorem, Surface tension.", "Thermal expansion, calorimetry, heat transfer (conduction, convection, radiation), Newton's law of cooling."] },
          { unitNumber: "Unit VIII", title: "Thermodynamics", marks: 6, topics: ["Thermal equilibrium, Zeroth law, First Law of thermodynamics, isothermal and adiabatic processes.", "Second law of thermodynamics, reversible & irreversible processes."] },
          { unitNumber: "Unit IX", title: "Behaviour of Perfect Gases & Kinetic Theory", marks: 6, topics: ["Equation of state, Kinetic theory assumptions, concept of pressure, RMS speed.", "Degrees of freedom, law of equipartition of energy, specific heat capacities."] },
          { unitNumber: "Unit X", title: "Oscillations and Waves", marks: 10, topics: ["Simple Harmonic Motion (SHM), equations of motion, loaded spring, simple pendulum period.", "Wave motion: Transverse & longitudinal waves, speed of sound, standing waves, organ pipes, beats."] }
        ],
        practicals: [
          "Vernier Callipers: Internal/external diameter and volume.",
          "Screw Gauge: Diameter of wire and thickness of sheet.",
          "Spherometer: Radius of curvature of spherical surface.",
          "Simple Pendulum: L-T and L-T² graphs, second's pendulum length.",
          "Young's modulus of wire material, Helical spring constant.",
          "Surface tension by capillary rise, Viscosity by terminal velocity, Sonometer and Resonance tube."
        ]
      },
      {
        id: "med-chem",
        code: "CH",
        name: "Chemistry",
        type: "Compulsory",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["A Textbook of Chemistry for Class XI published by NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I", title: "Some Basic Concepts of Chemistry", marks: 7, topics: ["Laws of chemical combination, Dalton's atomic theory, Mole concept, molar mass.", "Percentage composition, empirical & molecular formula, stoichiometry calculations."] },
          { unitNumber: "Unit II", title: "Structure of Atom", marks: 9, topics: ["Bohr's model & limitations, de-Broglie relation, Heisenberg's uncertainty principle.", "Quantum numbers, orbitals (s, p, d shapes), Aufbau principle, Pauli exclusion, Hund's rule, electronic configuration."] },
          { unitNumber: "Unit III", title: "Classification of Elements & Periodicity", marks: 6, topics: ["Modern periodic law, periodic trends in atomic radii, ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity."] },
          { unitNumber: "Unit IV", title: "Chemical Bonding and Molecular Structure", marks: 7, topics: ["Ionic & covalent bonds, Lewis structures, polar character, VSEPR theory.", "Hybridization (sp, sp2, sp3, d-orbitals), Molecular Orbital Theory of homonuclear molecules, Hydrogen bonding."] },
          { unitNumber: "Unit V", title: "Thermodynamics", marks: 9, topics: ["First Law of Thermodynamics, internal energy, enthalpy, heat capacity, Hess's Law of constant heat summation.", "Entropy as a state function, Gibbs free energy change, spontaneity criteria."] },
          { unitNumber: "Unit VI", title: "Equilibrium", marks: 7, topics: ["Dynamic equilibrium, Law of mass action, Le-Chatelier's principle.", "Ionic equilibrium: ionization of acids/bases, pH scale, buffer solutions, solubility product."] },
          { unitNumber: "Unit VII", title: "Redox Reactions", marks: 4, topics: ["Oxidation and reduction concepts, oxidation number, balancing redox reactions."] },
          { unitNumber: "Unit VIII", title: "Organic Chemistry - Principles & Techniques", marks: 11, topics: ["IUPAC nomenclature, electronic displacement (inductive, electromeric, resonance, hyperconjugation).", "Homolytic & heterolytic fission, carbocations, carbanions, free radicals, electrophiles & nucleophiles."] },
          { unitNumber: "Unit IX", title: "Hydrocarbons", marks: 10, topics: ["Alkanes: Conformations (ethane), free radical halogenation mechanism.", "Alkenes: Geometrical isomerism, Markovnikov's addition, peroxide effect, ozonolysis.", "Alkynes: Acidic character, addition reactions; Aromatic: Benzene resonance, electrophilic substitution."] }
        ],
        practicals: [
          "Volumetric Analysis: Oxalic acid vs NaOH, Sodium carbonate vs HCl titration.",
          "Qualitative Salt Analysis: Detection of 1 cation and 1 anion.",
          "pH determination of acids, bases, and fruit juices using universal indicator.",
          "Preparation of standard solutions, chemical balance calibration."
        ]
      },
      {
        id: "med-eng",
        code: "EN",
        name: "General English",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Hornbill (Textbook) & Snapshots (Supplementary Reader) - NCERT/JKBOSE"],
        units: [
          { unitNumber: "Section A", title: "Reading Comprehension", marks: 20, topics: ["Unseen passage for note-making (5m), summarizing (4m) and title (1m).", "Unseen prose passage (400-500 words) with 10 comprehension & vocabulary MCQs (10m)."] },
          { unitNumber: "Section B", title: "Writing Skills & Grammar", marks: 30, topics: ["Notice / Poster / Advertisement drafting (4m).", "Official / Business Letter writing (6m).", "Personal Email writing (4m).", "Article / Speech / Report / Debate writing (8m).", "Grammar Error correction passage: tenses, modals, determiners, prepositions (8m)."] },
          { unitNumber: "Section C", title: "Literature Textbooks", marks: 30, topics: ["Hornbill Poetry: Poetic devices, reference-to-context questions, themes (10m).", "Hornbill Prose: Short answer inferential questions (9m).", "Snapshots: Long answer evaluation and creative interpretation (6m).", "Play / Drama: Character analysis and critical thinking (5m)."] },
          { unitNumber: "Section D", title: "Internal Assessment", marks: 20, topics: ["Listening Skills assessment (05 Marks).", "Speaking Skills assessment (05 Marks).", "Project Work & Portfolio (10 Marks)."] }
        ]
      },
      {
        id: "med-bt",
        code: "BT",
        name: "Biotechnology (Elective)",
        type: "Stream Elective",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["A Textbook of Biotechnology for Class XI - NCERT"],
        units: [
          { unitNumber: "Unit I", title: "Introduction to Biotechnology", marks: 4, topics: ["Definitions, historical perspectives, applications in healthcare, agriculture and industry."] },
          { unitNumber: "Unit II", title: "Cells and Organisms", marks: 18, topics: ["Unit of life, organelle functions, cell division, cell communication, programmed cell death."] },
          { unitNumber: "Unit III", title: "Biomolecules & Biochemical Transformations", marks: 16, topics: ["Carbohydrates, lipids, proteins, amino acids, glycolysis, fermentation, Krebs cycle."] },
          { unitNumber: "Unit IV", title: "Genetics & Molecular Biology", marks: 20, topics: ["Mendel's laws, DNA as genetic material, replication, transcription, translation."] },
          { unitNumber: "Unit V", title: "Bioanalytical Techniques", marks: 4, topics: ["Microscopy, centrifugation, chromatography, electrophoresis, colorimetry."] }
        ],
        practicals: ["Lab safety rules, sterilization techniques, bacterial slide preparation, carbohydrate Molisch's test, onion root tip mitosis."]
      },
      {
        id: "med-evs",
        code: "ES",
        name: "Environmental Science (Elective)",
        type: "Stream Elective",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Environmental Science for Class XI - JKBOSE"],
        units: [
          { unitNumber: "Unit 1", title: "Understanding Environment", marks: 7, topics: ["Lithosphere, Hydrosphere, Atmosphere, Biosphere; Origin of Earth."] },
          { unitNumber: "Unit 2", title: "Ecology & Ecosystems", marks: 7, topics: ["Food chain, food web, ecological pyramids, ecological succession."] },
          { unitNumber: "Unit 3", title: "Ecological Interactions", marks: 7, topics: ["Mutualism, commensalism, predation, parasitism, environmental adaptations."] },
          { unitNumber: "Unit 4", title: "Population Ecology", marks: 7, topics: ["Population dynamics, density, natality, mortality, Malthusian theory."] },
          { unitNumber: "Unit 5", title: "Energy Resources", marks: 7, topics: ["Coal, petroleum, solar, wind, hydro, nuclear energy, biofuels."] },
          { unitNumber: "Unit 6-10", title: "Disasters, Health & Agriculture", marks: 35, topics: ["Natural disasters (earthquakes, floods), environmental movements (Chipko), water/air-borne diseases, organic agriculture."] }
        ],
        practicals: ["Study of plant species abundance using quadrat, soil/water temperature testing, local herbarium collection."]
      }
    ]
  },

  nonmedical: {
    streamTitle: "Faculty of Science (Non-Medical)",
    streamBadge: "Engineering Stream",
    streamDesc: "Curated syllabus for Engineering, Pure Sciences, Architecture & Technology aspirants (JKBOSE Class 11th).",
    subjects: [
      {
        id: "nonmed-math",
        code: "MA",
        name: "Mathematics",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Mathematics Textbook for Class XI published by NCERT / JKBOSE"],
        units: [
          {
            unitNumber: "Unit I",
            title: "Sets and Functions",
            marks: 23,
            topics: [
              "Sets: Representations, subsets, intervals, Venn diagrams, union, intersection, complement of sets.",
              "Relations & Functions: Ordered pairs, Cartesian product, domain, co-domain, range; polynomial, rational, modulus, signum, exponential, logarithmic functions.",
              "Trigonometric Functions: Angles in radians & degrees, unit circle, compound angle formulas: sin(x±y), cos(x±y), tan(x±y), transformations."
            ]
          },
          {
            unitNumber: "Unit II",
            title: "Algebra",
            marks: 25,
            topics: [
              "Complex Numbers & Quadratic Equations: Need for √-1, Argand plane, algebraic properties.",
              "Linear Inequalities: Algebraic solutions in one variable and representation on number line.",
              "Permutations & Combinations: Fundamental principle of counting, factorial n!, nPr and nCr formulas and applications.",
              "Binomial Theorem: Statement and proof for positive integral indices, Pascal's triangle.",
              "Sequence & Series: Arithmetic Progression (AP), Geometric Progression (GP), infinite GP, relation between AM and GM."
            ]
          },
          {
            unitNumber: "Unit III",
            title: "Coordinate Geometry",
            marks: 12,
            topics: [
              "Straight Lines: Slope of lines, various forms of line equations (point-slope, slope-intercept, intercept form), distance of point from line.",
              "Conic Sections: Circles, parabola, ellipse, hyperbola standard equations and properties.",
              "Three-Dimensional Geometry: Coordinate axes, planes, distance formula between two points."
            ]
          },
          {
            unitNumber: "Unit IV",
            title: "Calculus",
            marks: 8,
            topics: [
              "Limits and Derivatives: Intuitive idea of limits, limits of polynomials, rational, trigonometric, exponential and logarithmic functions.",
              "Derivatives: Rate of change, derivative of sum, difference, product and quotient of functions, derivatives of polynomials & trig functions."
            ]
          },
          {
            unitNumber: "Unit V",
            title: "Statistics & Probability",
            marks: 12,
            topics: [
              "Statistics: Measures of dispersion (range, mean deviation, variance, standard deviation of grouped/ungrouped data).",
              "Probability: Random experiments, sample space, mutually exclusive & exhaustive events, axiomatic probability."
            ]
          }
        ],
        practicals: [
          "Periodic Tests: Best 2 out of 3 conducted across the year (10 Marks).",
          "Mathematics Activities: Laboratory manual activities, record keeping and viva-voce (10 Marks)."
        ]
      },
      {
        id: "nonmed-phy",
        code: "PH",
        name: "Physics",
        type: "Compulsory",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Physics Part-I & Part-II for Class XI - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I", title: "Physical World & Measurement", marks: 5, topics: ["SI units, dimensional analysis and applications."] },
          { unitNumber: "Unit II", title: "Kinematics", marks: 9, topics: ["Uniform/accelerated motion, calculus in kinematics, vectors, projectile motion."] },
          { unitNumber: "Unit III", title: "Laws of Motion", marks: 7, topics: ["Newton's laws, conservation of momentum, friction, centripetal force."] },
          { unitNumber: "Unit IV", title: "Work, Energy & Power", marks: 6, topics: ["Work-Energy theorem, conservative forces, spring potential energy, collisions."] },
          { unitNumber: "Unit V", title: "System of Particles & Rotational Motion", marks: 6, topics: ["Centre of mass, torque, angular momentum, moment of inertia."] },
          { unitNumber: "Unit VI", title: "Gravitation", marks: 6, topics: ["Kepler's laws, universal gravitation, 'g' variation, orbital velocity, escape speed."] },
          { unitNumber: "Unit VII", title: "Properties of Bulk Matter", marks: 9, topics: ["Elasticity, Hooke's law, fluids pressure, Bernoulli's theorem, thermal expansion."] },
          { unitNumber: "Unit VIII", title: "Thermodynamics", marks: 6, topics: ["1st & 2nd Laws, isothermal, adiabatic, cyclic processes."] },
          { unitNumber: "Unit IX", title: "Kinetic Theory of Gases", marks: 6, topics: ["Gas laws, RMS speed, degrees of freedom, law of equipartition of energy."] },
          { unitNumber: "Unit X", title: "Oscillations & Waves", marks: 10, topics: ["SHM, spring oscillations, simple pendulum, wave superposition, organ pipes, beats."] }
        ],
        practicals: [
          "Vernier Callipers, Screw Gauge, Spherometer measurements.",
          "Simple Pendulum, Force constant of spring, Parallelogram law of vectors.",
          "Surface tension, Viscosity, Sonometer, Resonance tube experiments."
        ]
      },
      {
        id: "nonmed-chem",
        code: "CH",
        name: "Chemistry",
        type: "Compulsory",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["A Textbook of Chemistry for Class XI - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I", title: "Some Basic Concepts of Chemistry", marks: 7, topics: ["Mole concept, molar mass, empirical/molecular formula, stoichiometry."] },
          { unitNumber: "Unit II", title: "Structure of Atom", marks: 9, topics: ["Bohr model, quantum numbers, electronic configuration, Aufbau principle."] },
          { unitNumber: "Unit III", title: "Periodic Classification", marks: 6, topics: ["Modern periodic trends in ionization enthalpy, electronegativity, radii."] },
          { unitNumber: "Unit IV", title: "Chemical Bonding", marks: 7, topics: ["VSEPR theory, hybridization (sp, sp2, sp3, d-orbitals), Molecular Orbital theory."] },
          { unitNumber: "Unit V", title: "Thermodynamics", marks: 9, topics: ["Internal energy, enthalpy, Hess's Law, entropy, Gibbs energy spontaneity."] },
          { unitNumber: "Unit VI", title: "Equilibrium", marks: 7, topics: ["Le-Chatelier principle, ionic equilibrium, pH scale, buffer solutions."] },
          { unitNumber: "Unit VII", title: "Redox Reactions", marks: 4, topics: ["Oxidation numbers, balancing redox reactions."] },
          { unitNumber: "Unit VIII-IX", title: "Organic Chemistry & Hydrocarbons", marks: 21, topics: ["IUPAC nomenclature, carbocations, alkanes, alkenes, alkynes, benzene electrophilic substitution."] }
        ],
        practicals: [
          "Volumetric analysis titrations, Qualitative salt detection, pH studies."
        ]
      },
      {
        id: "nonmed-cs",
        code: "CS",
        name: "Computer Science (Elective)",
        type: "Stream Elective",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Computer Science with Python for Class XI - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit 1", title: "Computer Fundamentals", marks: 10, topics: ["History, generations, CPU, ALU, memory hierarchy, RAM/ROM, PROM, EPROM, EEPROM."] },
          { unitNumber: "Unit 2", title: "Software Concepts", marks: 10, topics: ["System, application & utility software; OS functions, compilers vs interpreters."] },
          { unitNumber: "Unit 3", title: "Number Systems", marks: 10, topics: ["Binary, Octal, Decimal, Hexadecimal conversions; shortcut conversion methods."] },
          { unitNumber: "Unit 4", title: "Programming Methodology", marks: 10, topics: ["Modular approach, program maintenance, debugging, syntax vs logical vs runtime errors."] },
          { unitNumber: "Unit 5", title: "Introduction to Python", marks: 10, topics: ["Features of Python, tokens, identifiers, keywords, print() & input() statements, variables."] },
          { unitNumber: "Unit 6", title: "Data Types & Operators", marks: 10, topics: ["int, float, str, list, bool; arithmetic, relational, logical, assignment, membership operators."] },
          { unitNumber: "Unit 7", title: "Strings in Python", marks: 10, topics: ["String slicing, indexing, immutability, methods: len(), upper(), lower(), replace()."] }
        ],
        practicals: [
          "Python programs: Temperature conversion, string manipulation, area calculations, number checks.",
          "Practical file & external viva-voce."
        ]
      },
      {
        id: "nonmed-eng",
        code: "EN",
        name: "General English",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Hornbill & Snapshots - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Section A", title: "Reading Comprehension", marks: 20, topics: ["Note-making, summarizing, unseen factual and literary passages."] },
          { unitNumber: "Section B", title: "Writing Skills & Grammar", marks: 30, topics: ["Official letters, notices, advertisements, personal emails, articles, grammar syntax."] },
          { unitNumber: "Section C", title: "Literature Textbooks", marks: 30, topics: ["Hornbill prose & poetry chapters, Snapshots supplementary stories, drama analysis."] },
          { unitNumber: "Section D", title: "Internal Assessment", marks: 20, topics: ["Listening, speaking, project work portfolio."] }
        ]
      }
    ]
  },

  commerce: {
    streamTitle: "Faculty of Commerce",
    streamBadge: "Commerce Stream",
    streamDesc: "Curated syllabus for Finance, Accounting, Corporate Management & Business Leadership (JKBOSE Class 11th).",
    subjects: [
      {
        id: "comm-acc",
        code: "AY",
        name: "Accountancy",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Accountancy Financial Accounting Part-I & Part-II - NCERT / JKBOSE"],
        units: [
          {
            unitNumber: "Unit 1",
            title: "Introduction to Accounting",
            marks: 6,
            topics: [
              "Meaning, objectives, difference between Book-keeping and Accounting.",
              "Users of accounting info (internal/external), qualitative characteristics.",
              "Basic terms: capital, drawings, assets, liabilities, revenue, expense, trade receivables/payables."
            ]
          },
          {
            unitNumber: "Unit 2",
            title: "Theory Base of Accounting",
            marks: 6,
            topics: [
              "Accounting principles: Entity, Money measurement, Going concern, Accounting period, Cost concept, Dual aspect.",
              "Accrual concept, Full disclosure, Consistency, Conservatism, Materiality.",
              "Bases of accounting: Cash basis vs Accrual basis."
            ]
          },
          {
            unitNumber: "Unit 3",
            title: "Recording of Business Transactions",
            marks: 26,
            topics: [
              "Accounting equation approach: rules of Debit & Credit (traditional & modern).",
              "Books of original entry: Journal, Special purpose cash books (Simple, double column, petty cash).",
              "Subsidiary books: Purchase book, sales book, returns books, journal proper.",
              "Ledger posting and balancing of accounts.",
              "Bank Reconciliation Statement (BRS): need, causes of difference, preparation."
            ]
          },
          {
            unitNumber: "Unit 4",
            title: "Trial Balance & Rectification of Errors",
            marks: 6,
            topics: [
              "Trial balance: meaning, objectives, preparation by balance method.",
              "Types of errors: omission, commission, principles, compensating errors.",
              "Detection & rectification of errors, use of Suspense Account."
            ]
          },
          {
            unitNumber: "Unit 5",
            title: "Depreciation, Provisions & Reserves",
            marks: 10,
            topics: [
              "Depreciation: Straight Line method (SLM) & Written Down Value (WDV) method.",
              "Accounting treatment of depreciation, provision for depreciation, asset disposal.",
              "Provisions vs Reserves: Revenue reserve, capital reserve, general and secret reserves."
            ]
          },
          {
            unitNumber: "Unit 6",
            title: "Financial Statements of Sole Proprietorship",
            marks: 26,
            topics: [
              "Trading and Profit & Loss Account: Gross profit, operating profit, net profit.",
              "Balance Sheet: Marshalling of assets and liabilities.",
              "Adjustments: Closing stock, outstanding expenses, prepaid expenses, accrued income, bad debts, provision for doubtful debts."
            ]
          }
        ],
        practicals: [
          "Comprehensive Sole Proprietorship Accounting Project (Journal to Balance Sheet).",
          "Bank Reconciliation Statement case study with 20-25 transactions.",
          "Collection and verification of business vouchers and source documents.",
          "Project file (03m), Written Test (09m), Viva-Voce (03m)."
        ]
      },
      {
        id: "comm-bst",
        code: "BS",
        name: "Business Studies",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Business Studies Textbook for Class XI - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I", title: "Nature and Purpose of Business", marks: 8, topics: ["Concept, characteristics, business vs profession vs employment, economic & social objectives, classification of industries, business risks."] },
          { unitNumber: "Unit II", title: "Forms of Business Organisation", marks: 8, topics: ["Sole proprietorship, Joint Hindu Family, Partnership (types, registration), Co-operative societies, Joint stock company."] },
          { unitNumber: "Unit III", title: "Private, Public and Global Enterprises", marks: 7, topics: ["Departmental undertakings, Statutory corporations, Government companies, Multinational corporations (MNCs)."] },
          { unitNumber: "Unit IV", title: "Business Services", marks: 7, topics: ["Banking services (types, e-banking), Insurance (life, fire, marine principles), Warehousing, Communication."] },
          { unitNumber: "Unit V", title: "Emerging Modes of Business", marks: 5, topics: ["E-Business scope, benefits, online transactions, security & payment mechanisms, outsourcing (BPO)."] },
          { unitNumber: "Unit VI", title: "Social Responsibility & Business Ethics", marks: 5, topics: ["Responsibility to shareholders, employees, consumers, government, environment; Business ethics elements."] },
          { unitNumber: "Unit VII", title: "Formation of a Company", marks: 7, topics: ["Promotion, Incorporation, Capital subscription, Certificate of Commencement of business."] },
          { unitNumber: "Unit VIII", title: "Sources of Business Finance", marks: 10, topics: ["Equity & preference shares, debentures, retained earnings, public deposits, bank loans, trade credit."] },
          { unitNumber: "Unit IX", title: "Small Business & Enterprises", marks: 6, topics: ["Role of small businesses in rural India, MSME schemes, government assistance in hilly areas."] },
          { unitNumber: "Unit X", title: "Internal Trade", marks: 12, topics: ["Wholesale and retail trade, departmental stores, supermarkets, malls, vending machines, chambers of commerce."] },
          { unitNumber: "Unit XI", title: "International Business", marks: 5, topics: ["Export-import procedures, documentation, WTO, UNCTAD, World Bank, IMF."] }
        ],
        practicals: [
          "Field visit project (Handicraft unit, Wholesale market, Mall, or Industry).",
          "Case study on local product supply chain (Apples of Kashmir, Walnuts, Handicrafts).",
          "Project report presentation & viva-voce."
        ]
      },
      {
        id: "comm-eco",
        code: "EO",
        name: "Economics (Commerce)",
        type: "Compulsory",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Statistics for Economics & Indian Economic Development - NCERT / JKBOSE"],
        sections: [
          {
            sectionTitle: "Part A: Statistics for Economics (40 Marks)",
            units: [
              { unitNumber: "Unit 1", title: "Introduction to Statistics", marks: 5, topics: ["Concept, scope, functions and importance of statistics in economics."] },
              { unitNumber: "Unit 2", title: "Collection & Presentation of Data", marks: 10, topics: ["Primary & secondary data, Census & NSSO, frequency distribution, bar diagrams, histograms, ogives."] },
              { unitNumber: "Unit 3", title: "Statistical Tools & Interpretation", marks: 25, topics: ["Mean, Median, Mode; Karl Pearson & Spearman's rank correlation; Index numbers (CPI, WPI)."] }
            ]
          },
          {
            sectionTitle: "Part B: Indian Economic Development (40 Marks)",
            units: [
              { unitNumber: "Unit 4", title: "Development Experience (1947-90) & LPG", marks: 12, topics: ["Five year plans, NITI Aayog, agriculture & industry policies, 1991 LPG reforms, GST & Demonetization."] },
              { unitNumber: "Unit 5", title: "Current Challenges of Indian Economy", marks: 20, topics: ["Human capital formation, rural development & credit, employment growth, sustainable development."] },
              { unitNumber: "Unit 6", title: "Comparative Development with Neighbours", marks: 8, topics: ["India, Pakistan & China economic comparisons, HDI indicators."] }
            ]
          }
        ],
        practicals: [
          "Economics project work (J&K Tourism sector, Horticulture/Apple farming, Rural credit schemes)."
        ]
      },
      {
        id: "comm-ep",
        code: "EP",
        name: "Entrepreneurship (Elective)",
        type: "Stream Elective",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Entrepreneurship for Class XI - CBSE / JKBOSE"],
        units: [
          { unitNumber: "Unit I-II", title: "Entrepreneurship & Entrepreneur", marks: 18, topics: ["Concept, functions, role in economic growth, types of entrepreneurs, women entrepreneurship."] },
          { unitNumber: "Unit III-IV", title: "Values, Motivation & Skills", marks: 15, topics: ["Six C's of motivation, skill development programmes, problem-solving abilities."] },
          { unitNumber: "Unit V-VI", title: "Market Dynamics & Small Enterprises", marks: 15, topics: ["Market analysis, competition, micro enterprise objectives and governmental support."] },
          { unitNumber: "Unit VII-VIII", title: "Project Selection & Appraisal", marks: 16, topics: ["Identification of business idea, project report preparation, financial & economic feasibility."] },
          { unitNumber: "Unit IX-X", title: "Financing & Ownership Structure", marks: 16, topics: ["Capital planning, sources of short/long term finance, proprietorship, partnership, company setup."] }
        ],
        practicals: ["Business plan report for local enterprise, Market survey analysis, viva-voce."]
      },
      {
        id: "comm-bm",
        code: "BM",
        name: "Business Mathematics (Elective)",
        type: "Stream Elective",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Mathematics for Class XI - NCERT"],
        units: [
          { unitNumber: "Unit 1", title: "Sets, Relations & Functions", marks: 10, topics: ["Set algebra, functions, domain, range."] },
          { unitNumber: "Unit 2", title: "Sequences & Series", marks: 10, topics: ["Geometric progressions, arithmetic & geometric means."] },
          { unitNumber: "Unit 3", title: "Trigonometry", marks: 10, topics: ["Trigonometric ratios, compound formulas."] },
          { unitNumber: "Unit 4", title: "Permutations & Combinations", marks: 10, topics: ["Counting principle, nPr, nCr business applications."] },
          { unitNumber: "Unit 5", title: "Binomial Theorem", marks: 8, topics: ["Expansion for positive index."] },
          { unitNumber: "Unit 6-7", title: "Statistics & Probability", marks: 24, topics: ["Dispersion, mean deviation, variance, probability rules."] },
          { unitNumber: "Unit 8", title: "Linear Inequations", marks: 8, topics: ["One and two variable linear inequation graphical solutions."] }
        ]
      }
    ]
  },

  humanities: {
    streamTitle: "Faculty of Arts & Humanities",
    streamBadge: "Humanities Stream",
    streamDesc: "Curated syllabus for Civil Services, Law, Social Sciences, History, Literature & Governance aspirants (JKBOSE Class 11th).",
    subjects: [
      {
        id: "arts-pol",
        code: "PS",
        name: "Political Science",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Indian Constitution at Work & Political Theory - NCERT / JKBOSE"],
        sections: [
          {
            sectionTitle: "Part A: Indian Constitution at Work (40 Marks)",
            units: [
              { unitNumber: "Unit I", title: "Constitution & Democracy", marks: 14, topics: ["Making of Constitution (3m), Fundamental Rights & Duties (5m), System of representation & elections (6m)."] },
              { unitNumber: "Unit II", title: "Organs of Government", marks: 12, topics: ["Executive: PM, President, Governor (4m), Legislature: Lok Sabha & Rajya Sabha (4m), Judiciary: Rule of Law, Supreme Court (4m)."] },
              { unitNumber: "Unit III", title: "Federalism & Local Government", marks: 10, topics: ["Federalism: Center-state relations, diversity accommodation (6m), Local Government: Panchayati Raj, Urban local bodies (4m)."] },
              { unitNumber: "Unit IV", title: "Constitutional Philosophy", marks: 4, topics: ["Core political philosophy of Constitution (2m), Constitution as a living document (2m)."] }
            ]
          },
          {
            sectionTitle: "Part B: Political Theory (40 Marks)",
            units: [
              { unitNumber: "Unit V", title: "Political Concepts: Freedom & Equality", marks: 16, topics: ["Introduction to Political Theory (4m), Freedom and constraints (6m), Equality and forms of inequality (6m)."] },
              { unitNumber: "Unit VI", title: "Justice, Rights & Citizenship", marks: 14, topics: ["Social Justice (6m), Nature and kinds of Rights (4m), Citizenship & global citizenship (4m)."] },
              { unitNumber: "Unit VII", title: "Nationalism & Secularism", marks: 10, topics: ["Nationalism & self-determination (4m), Secularism in modern states & Indian model (6m)."] }
            ]
          }
        ],
        practicals: ["Project on Constitution making, Election analysis, or Judicial review in India."]
      },
      {
        id: "arts-hist",
        code: "HY",
        name: "History",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Themes in World History published by NCERT / JKBOSE"],
        units: [
          { unitNumber: "Section A", title: "Early Societies", marks: 10, topics: ["Early Cities: Iraq (Mesopotamia) 3rd millennium BC, growth of towns, early urban societies, uses of writing."] },
          { unitNumber: "Section B", title: "Empires", marks: 20, topics: ["An Empire Across Three Continents: Roman Empire (27 BC - AD 600), slavery debates, religion.", "Nomadic Empires: The Mongols (13th-14th Century), Genghis Khan, nomadism & state formation."] },
          { unitNumber: "Section C", title: "Changing Traditions", marks: 20, topics: ["The Three Orders: Western Europe (13th-16th Century), Feudal economy, Church & decline of feudalism.", "Changing Cultural Traditions: Renaissance in Europe (14th-17th Century), Humanism, printing press, science."] },
          { unitNumber: "Section D", title: "Paths to Modernization", marks: 25, topics: ["Displacing Indigenous People: European settlement in North America & Australia (18th-20th Century).", "Paths to Modernization: East Asia (Japan militarization & growth, China communist revolution)."] },
          { unitNumber: "Section E", title: "Map Work", marks: 5, topics: ["Identification and location of significant historical places on the world map."] }
        ],
        practicals: [
          "Project on Archaeological sites or Historical monuments of Jammu & Kashmir (Parihaspora, Martand, Dogra Dynasty, Arts & Crafts)."
        ]
      },
      {
        id: "arts-soc",
        code: "SO",
        name: "Sociology",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Introducing Sociology & Understanding Society - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I-II", title: "Introduction & Basic Concepts", marks: 16, topics: ["Nature and scope of Sociology, Enlightenment influence, Social groups, Stratification (Caste & Class), Social control."] },
          { unitNumber: "Unit III", title: "Social Institutions", marks: 12, topics: ["Family, Marriage, Kinship, Religion, Education, Polity and Economy."] },
          { unitNumber: "Unit IV-V", title: "Culture & Doing Sociology", marks: 14, topics: ["Values, norms, customs, socialization, research methods (qualitative/quantitative, survey, observation)."] },
          { unitNumber: "Unit VI-VII", title: "Sociological Thought (Classical & Indian)", marks: 14, topics: ["Auguste Comte, Karl Marx, Emile Durkheim, Max Weber; G.S. Ghurye, M.N. Srinivas, D.P. Mukherjee."] },
          { unitNumber: "Unit VIII-X", title: "Structure, Change & Environment", marks: 24, topics: ["Social processes, social change in rural/urban society, ecology & society (Dal Lake, Wullar, Jhelum conservation)."] }
        ],
        practicals: ["Sociological research project, field observation report, and viva-voce."]
      },
      {
        id: "arts-psy",
        code: "PY",
        name: "Psychology",
        type: "Stream Core",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Introduction to Psychology - NCERT / JKBOSE"],
        units: [
          { unitNumber: "Unit I-II", title: "Introduction & Methods", marks: 18, topics: ["Scope of Psychology, schools of thought, observation, experiment, survey, psychological testing."] },
          { unitNumber: "Unit III-IV", title: "Human Development & Perception", marks: 17, topics: ["Development stages (infancy to old age), sensation, attention, perception laws, illusions."] },
          { unitNumber: "Unit V-VI", title: "Learning, Memory & Forgetting", marks: 18, topics: ["Classical & operant conditioning, levels of processing, theories of forgetting."] },
          { unitNumber: "Unit VII-IX", title: "Thinking, Motivation & Emotions", marks: 17, topics: ["Creative thinking, problem solving, cycle of motivation, Maslow's hierarchy, theories of emotion."] }
        ],
        practicals: ["Experiments on Attention, Memory/STM, Achievement motivation, survey method, practical record file."]
      },
      {
        id: "arts-geo",
        code: "GG",
        name: "Geography",
        type: "Stream Core",
        theoryMarks: 70,
        practicalMarks: 30,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Fundamentals of Physical Geography & India Physical Environment - NCERT"],
        units: [
          { unitNumber: "Part A", title: "Fundamentals of Physical Geography", marks: 35, topics: ["Geography as discipline (5m), Earth & Continental drift (5m), Landforms & Geomorphic processes (7m), Climate & Heat budget (13m), Oceans & Hydrology (5m)."] },
          { unitNumber: "Part B", title: "India: Physical Environment", marks: 35, topics: ["Location & Space relations (5m), Physiography & Drainage (7m), Climate, Vegetation & Soil (14m), Natural Hazards & Disasters in India (9m)."] }
        ],
        practicals: ["Fundamentals of Maps (scales, projections), Topographic maps contour analysis, weather maps, practical record."]
      },
      {
        id: "arts-edu",
        code: "ED",
        name: "Education",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Education for Class XI - JKBOSE"],
        units: [
          { unitNumber: "Unit 1-2", title: "Concept & Aims of Education", marks: 20, topics: ["Etymology, definitions (Gandhiji, Dewey, Rousseau, Iqbal, Vivekananda); Individual, social, economic & moral aims."] },
          { unitNumber: "Unit 3-4", title: "Psychological & Sociological Foundations", marks: 20, topics: ["Learning factors, educational sociology, culture & education, social change."] },
          { unitNumber: "Unit 5-6", title: "Guidance, Counseling & NEP 2020", marks: 20, topics: ["Principles of guidance, role of counselors; National Education Policy 2020 foundational & secondary stages."] },
          { unitNumber: "Unit 7-8", title: "Statistics in Education & Value Education", marks: 20, topics: ["Mean, Median, Mode in education, graphical charts, peace education & values."] }
        ],
        practicals: ["Internal assessment: Quizzes, group projects on NEP 2020, seminar presentations."]
      },
      {
        id: "arts-is",
        code: "IS",
        name: "Islamic Studies",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Islamic Studies for Class XI - JKBOSE"],
        units: [
          { unitNumber: "Units 1-5", title: "Faith, Prophethood & Practice", marks: 40, topics: ["Definition & scope, Articles of Faith, Risalah (Prophethood), Man's place in universe, Five pillars in practice."] },
          { unitNumber: "Units 6-10", title: "Seerah & Contemporary Relations", marks: 40, topics: ["Life of Prophet Muhammad (SAW) at Makkah, Life at Madinah, Relations with other communities, Da'wah principles, Daily routine of the Prophet (SAW)."] }
        ],
        practicals: ["Field trip to historic Islamic monuments, assignments on contemporary challenges in the Muslim world."]
      },
      {
        id: "arts-phil",
        code: "PL",
        name: "Philosophy",
        type: "Stream Core",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Introduction to Philosophy - JKBOSE / Standard Texts"],
        units: [
          { unitNumber: "Units I-V", title: "Epistemology, Metaphysics & Logic", marks: 40, topics: ["Nature & scope, Rationalism, Empiricism, Concepts of God (Deism, Pantheism, Theism), Deductive & Inductive logic."] },
          { unitNumber: "Units VI-X", title: "Ethics, Social Philosophy & Terms", marks: 40, topics: ["Ethics scope, Hedonism & Utilitarianism, Theories of Punishment, Ahimsa (Gandhi), Buddha's 4 Noble Truths, Propositions."] }
        ]
      },
      {
        id: "arts-urdu",
        code: "UR",
        name: "Urdu (Elective / Core)",
        type: "Language",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Prescribed Urdu Textbook for Class XI - JKBOSE"],
        units: [
          { unitNumber: "Hissa Alif", title: "Nasr (Prose)", marks: 20, topics: ["Detailed textual comprehension, author life sketches (Mir Amman, Sir Syed, Abul Kalam Azad), prose summary."] },
          { unitNumber: "Hissa Ba", title: "Shairi (Poetry)", marks: 20, topics: ["Ghazals (Mir, Ghalib, Dard), Nazms (Iqbal, Nazeer Akbarabadi, Josh), poetic explanation & rhyming schemes."] },
          { unitNumber: "Hissa Jeem", title: "Takhleeqi Hissa (Creative Writing)", marks: 20, topics: ["Essays on scientific, social, literary & sports topics (200 words), official & personal letter writing, reports."] },
          { unitNumber: "Hissa Daal", title: "Adabi Tareekh & Qawaid (Grammar)", marks: 20, topics: ["Literary movements, figures of speech (Sanaye Bada'ye), Urdu grammar."] }
        ]
      },
      {
        id: "arts-englit",
        code: "EL",
        name: "English Literature (Elective)",
        type: "Language / Elective",
        theoryMarks: 80,
        practicalMarks: 20,
        totalMarks: 100,
        duration: "3 Hours",
        books: ["Glory: Textbook of English Literature - JKBOSE"],
        units: [
          { unitNumber: "Section A", title: "Reading Comprehension", marks: 15, topics: ["Unseen prose analysis, unseen poem critical appreciation."] },
          { unitNumber: "Section B", title: "Creative Writing Skills", marks: 15, topics: ["Contemporary issue essay, autobiographical reflection."] },
          { unitNumber: "Section C", title: "Literature (Poems, Stories, Essays)", marks: 50, topics: ["Poetic devices (metaphor, imagery, paradox), short stories characterization, prose themes."] }
        ]
      }
    ]
  }
};

// =========================================================
// JKBOSE CLASS 10TH OFFICIAL DIGITAL SYLLABUS DATASET
// Core Main Subjects (Digital Format)
// =========================================================
const SYLLABUS_10_DATA = [
  {
    id: "c10-sci",
    code: "SC-10",
    name: "Science (Physics, Chemistry, Biology)",
    type: "Compulsory",
    theoryMarks: 80,
    practicalMarks: 20,
    totalMarks: 100,
    duration: "3 Hours",
    books: ["A Textbook of Science for Class X Published by JKBOSE / NCERT"],
    sections: [
      {
        sectionTitle: "Section I: Physics (26 Marks)",
        units: [
          {
            unitNumber: "Unit 1",
            title: "Light - Reflection and Refraction",
            marks: 8,
            topics: [
              "Reflection of light by spherical mirrors; image formation; mirror formula and magnification with numericals.",
              "Refraction through a glass slab, refractive index, conditions for no refraction.",
              "Spherical lenses: image formation, lens formula, magnification, and power of a lens."
            ]
          },
          {
            unitNumber: "Unit 2",
            title: "The Human Eye and the Colorful World",
            marks: 5,
            topics: [
              "Structure and accommodation of the human eye; defects of vision (myopia, hypermetropia, presbyopia) and corrections.",
              "Refraction and dispersion of light through a glass prism.",
              "Atmospheric refraction: twinkling of stars, advanced sunrise and delayed sunset."
            ]
          },
          {
            unitNumber: "Unit 3",
            title: "Electricity",
            marks: 6,
            topics: [
              "Electric current, potential difference, Ohm's law and experimental verification.",
              "Resistance and its dependence on factors; combination of resistors in series and parallel.",
              "Joule's heating effect of current and applications; electric power and energy calculations."
            ]
          },
          {
            unitNumber: "Unit 4",
            title: "Magnetic Effects of Current",
            marks: 7,
            topics: [
              "Oersted's experiment; magnetic field and field lines around straight conductor, circular loop, and solenoid.",
              "Force on a current-carrying conductor in a magnetic field; Fleming's left-hand rule.",
              "Domestic electric circuits, earthing, short circuit, and safety fuses."
            ]
          }
        ]
      },
      {
        sectionTitle: "Section II: Chemistry (26 Marks)",
        units: [
          {
            unitNumber: "Unit 1",
            title: "Chemical Reactions and Equations",
            marks: 6,
            topics: [
              "Writing and balancing chemical equations.",
              "Types of reactions: combination, decomposition, displacement, double displacement, precipitation, neutralization, oxidation and reduction.",
              "Corrosion and rancidity: effects and everyday prevention."
            ]
          },
          {
            unitNumber: "Unit 2",
            title: "Carbon and its Compounds",
            marks: 8,
            topics: [
              "Covalent bonding in carbon, allotropes (diamond, graphite, fullerenes), versatile nature of carbon.",
              "Saturated and unsaturated hydrocarbons, chains, branches, rings, homologous series and IUPAC nomenclature.",
              "Chemical properties: combustion, oxidation, addition and substitution reactions.",
              "Ethanol and Ethanoic acid properties; Soaps and synthetic detergents (micelle formation)."
            ]
          },
          {
            unitNumber: "Unit 3",
            title: "Metals and Non-metals",
            marks: 7,
            topics: [
              "Physical and chemical properties of metals and non-metals; reactivity series.",
              "Ionic bonding and properties of ionic compounds.",
              "Occurrence of metals, concentration of ores, extraction methods according to activity series, refining.",
              "Corrosion of metals and methods of prevention."
            ]
          },
          {
            unitNumber: "Unit 4",
            title: "Acids, Bases and Salts",
            marks: 5,
            topics: [
              "Chemical properties of acids and bases; reactions with metals, carbonates, and oxides.",
              "Concept of pH scale, importance of pH in everyday life, tooth decay, digestive system, soil.",
              "Preparation and uses of Sodium Hydroxide, Bleaching Powder, Baking Soda, Washing Soda, and Plaster of Paris."
            ]
          }
        ]
      },
      {
        sectionTitle: "Section III: Biology (28 Marks)",
        units: [
          {
            unitNumber: "Unit 1",
            title: "Life Processes",
            marks: 8,
            topics: [
              "Autotrophic and heterotrophic nutrition; human digestive system and nutrition.",
              "Respiration in plants and animals; aerobic and anaerobic breakdown of glucose.",
              "Transportation in human beings (heart structure, blood circulation) and plants (xylem & phloem).",
              "Excretion in human beings (nephron structure and urine formation) and plants."
            ]
          },
          {
            unitNumber: "Unit 2",
            title: "Control and Co-ordination",
            marks: 6,
            topics: [
              "Nervous system in animals: neuron structure, reflex arc, human brain structure and functions.",
              "Co-ordination in plants: tropic movements (phototropism, geotropism), plant growth hormones.",
              "Endocrine glands and hormones in animals (thyroid, pituitary, adrenal, pancreas)."
            ]
          },
          {
            unitNumber: "Unit 3",
            title: "How do Organisms Reproduce",
            marks: 6,
            topics: [
              "Asexual reproduction: fission, fragmentation, regeneration, budding, vegetative propagation, spore formation.",
              "Sexual reproduction in flowering plants: flower parts, pollination, fertilization.",
              "Human reproduction: male and female reproductive systems, menstrual cycle, reproductive health and contraception."
            ]
          },
          {
            unitNumber: "Unit 4",
            title: "Heredity",
            marks: 3,
            topics: [
              "Accumulation of variation, Mendel's laws of inheritance (monohybrid and dihybrid crosses).",
              "Mechanism of sex determination in human beings."
            ]
          },
          {
            unitNumber: "Unit 5",
            title: "Our Environment",
            marks: 5,
            topics: [
              "Ecosystem and its components; trophic levels, food chains, and food webs.",
              "Biological magnification; ozone layer depletion and its causes.",
              "Solid waste management and biodegradable vs non-biodegradable wastes."
            ]
          }
        ]
      }
    ],
    practicals: [
      "Physics: Verification of laws of reflection using mirror strips; Verification of laws of refraction with glass slab; Ohm's law verification; Magnetic field lines mapping.",
      "Chemistry: Finding pH of water and fruit juices; Simple volumetric acid-base titrations; Preparation of soap; Action of acids on metals.",
      "Biology: Temporary mount of leaf peel to observe stomata; Studying reproduction in yeast/amoeba slides; Identification of human organ models.",
      "Internal School Assessment: Pen paper tests (10m), Portfolio (5m), Lab Practical / Project (5m)."
    ]
  },

  {
    id: "c10-math",
    code: "MA-10",
    name: "Mathematics",
    type: "Compulsory",
    theoryMarks: 80,
    practicalMarks: 20,
    totalMarks: 100,
    duration: "3 Hours",
    books: ["Mathematics Textbook for Class X published by NCERT / JKBOSE"],
    units: [
      {
        unitNumber: "Unit I",
        title: "Number Systems: Real Numbers",
        marks: 6,
        topics: [
          "Fundamental Theorem of Arithmetic - statements after reviewing work done earlier.",
          "Proofs of irrationality of √2, √3, √5; Decimal expansions of rational numbers."
        ]
      },
      {
        unitNumber: "Unit II",
        title: "Algebra (Polynomials, Linear & Quadratic Equations, AP)",
        marks: 20,
        topics: [
          "Polynomials: Zeros of a polynomial, relationship between zeros and coefficients of quadratic polynomials.",
          "Pair of Linear Equations in Two Variables: Graphical solution, algebraic methods (substitution, elimination), conditions for consistency.",
          "Quadratic Equations: Standard form ax² + bx + c = 0, solutions by factorization and quadratic formula, discriminant and nature of roots.",
          "Arithmetic Progressions (AP): Derivation of nth term and sum of first n terms, practical life word problems."
        ]
      },
      {
        unitNumber: "Unit III",
        title: "Coordinate Geometry",
        marks: 6,
        topics: [
          "Distance formula between two points, Section formula (internal division), verification of collinearity."
        ]
      },
      {
        unitNumber: "Unit IV",
        title: "Geometry (Triangles & Circles)",
        marks: 15,
        topics: [
          "Triangles: Similar triangles definitions, proofs of Basic Proportionality Theorem (BPT/Thales), AAA, SAS, SSS similarity criteria.",
          "Circles: Tangent at any point of a circle is perpendicular to the radius through the point of contact; Tangents from an external point to a circle are equal in length."
        ]
      },
      {
        unitNumber: "Unit V",
        title: "Trigonometry & Heights and Distances",
        marks: 12,
        topics: [
          "Introduction to Trigonometry: Trigonometric ratios of an acute angle (0°, 30°, 45°, 60°, 90°), relationship between ratios.",
          "Trigonometric Identities: Proof and applications of sin²A + cos²A = 1.",
          "Heights and Distances: Angles of elevation and depression (30°, 45°, 60°), two right-angled triangle word problems."
        ]
      },
      {
        unitNumber: "Unit VI",
        title: "Mensuration (Circles, Surface Areas & Volumes)",
        marks: 10,
        topics: [
          "Areas Related to Circles: Area of sectors and segments of a circle (central angles 60°, 90°, 120°).",
          "Surface Areas and Volumes: Combinations of two solids among cubes, cuboids, spheres, hemispheres, right circular cylinders/cones."
        ]
      },
      {
        unitNumber: "Unit VII",
        title: "Statistics and Probability",
        marks: 11,
        topics: [
          "Statistics: Mean, median and mode of grouped data (bimodal situation avoided).",
          "Probability: Classical definition of probability, simple problems on finding event probabilities."
        ]
      }
    ],
    practicals: [
      "Pen Paper Tests and Multiple Assessments (10 Marks).",
      "Student Portfolio and notebook submission (05 Marks).",
      "Mathematics Laboratory Activities from NCERT Lab Manual (05 Marks)."
    ]
  },

  {
    id: "c10-sst",
    code: "SS-10",
    name: "Social Science",
    type: "Compulsory",
    theoryMarks: 80,
    practicalMarks: 20,
    totalMarks: 100,
    duration: "3 Hours",
    books: [
      "India and the Contemporary World-II (History)",
      "Contemporary India-II (Geography)",
      "Democratic Politics-II (Political Science)",
      "Economics, Disaster Management and Road Safety Education for Class 10th - JKBOSE"
    ],
    sections: [
      {
        sectionTitle: "Part 1: History - India & Contemporary World II (25 Marks)",
        units: [
          { unitNumber: "Theme 1", title: "The Rise of Nationalism in Europe", marks: 6, topics: ["French Revolution, Romanticism, Revolutions of 1830-1848, Unification of Germany and Italy, Visualizing the Nation."] },
          { unitNumber: "Theme 2", title: "Nationalism in India & J&K Region", marks: 5, topics: ["First World War, Non-Cooperation, Civil Disobedience, Cultural awakening & Non-Cooperation movement in Jammu and Kashmir."] },
          { unitNumber: "Theme 3", title: "Global World / Age of Industrialization", marks: 6, topics: ["The pre-modern world, Begar (forced labour) in Kashmir, early factory systems, growth of industries in Jammu & Kashmir."] },
          { unitNumber: "Theme 4", title: "Print Culture & the Modern World", marks: 5, topics: ["Print revolution, manuscript culture under Dogra ruler Maharaja Ranbir Singh, portrayal of women in J&K, growth of press."] },
          { unitNumber: "Theme 5", title: "Post Independence Era: J&K on Path of Modernisation", marks: 3, topics: ["First phase (1947-1965), Second phase (1965-1982), developmental initiatives and socio-economic transformation."] }
        ]
      },
      {
        sectionTitle: "Part 2: Geography - Contemporary India II (20 Marks)",
        units: [
          { unitNumber: "Theme 1", title: "Resources and Development", marks: 5, topics: ["Resource planning, land use in India, land degradation, soil classification and conservation."] },
          { unitNumber: "Theme 2", title: "Agriculture", marks: 5, topics: ["Types of farming (subsistence, commercial), cropping patterns, major food and cash crops, institutional reforms."] },
          { unitNumber: "Theme 3", title: "Minerals and Energy Resources", marks: 4, topics: ["Ferrous & non-ferrous minerals, conventional and non-conventional energy (solar, wind, biogas), conservation."] },
          { unitNumber: "Theme 4", title: "Manufacturing Industries", marks: 3, topics: ["Industrial location, agro-based and mineral-based industries, industrial pollution and control."] },
          { unitNumber: "Theme 5", title: "Life Lines of National Economy", marks: 3, topics: ["Roadways, railways, waterways, airways, communication networks, international trade, tourism as a trade."] }
        ]
      },
      {
        sectionTitle: "Part 3: Political Science - Democratic Politics II (20 Marks)",
        units: [
          { unitNumber: "Theme 1", title: "Power Sharing", marks: 5, topics: ["Case studies of Belgium and Sri Lanka, why power sharing is desirable, horizontal & vertical forms."] },
          { unitNumber: "Theme 2", title: "Federalism", marks: 5, topics: ["Federalism principles, what makes India federal, linguistic states, decentralization in India (Panchayats & Municipalities)."] },
          { unitNumber: "Theme 3", title: "Gender, Religion and Caste", marks: 3, topics: ["Women's representation in politics, secularism in India, role of caste and communalism in politics."] },
          { unitNumber: "Theme 4", title: "Political Parties", marks: 3, topics: ["Need for political parties, National and State parties, challenges to parties and proposed reforms."] },
          { unitNumber: "Theme 5", title: "Outcomes of Democracy & J&K Reorganization", marks: 4, topics: ["Evaluating democracy outcomes (economic growth, dignity), Addendum: J&K Reorganization Act 2019 provisions (2 Marks)."] }
        ]
      },
      {
        sectionTitle: "Part 4: Economics, Disaster Management & Road Safety (15 Marks)",
        units: [
          { unitNumber: "Theme 1", title: "Understanding J&K Economy", marks: 5, topics: ["Contribution of primary, secondary and tertiary sectors to J&K GDP, horticulture, handicrafts, tourism."] },
          { unitNumber: "Theme 2", title: "Employment Generation in J&K", marks: 5, topics: ["Potential sectors, Special Industry Initiative (SII J&K), government self-employment schemes."] },
          { unitNumber: "Theme 3", title: "Protecting Ourselves from Disasters", marks: 5, topics: ["Search and rescue skills, safe construction practices against earthquakes/floods in J&K, role of NGOs & community."] },
          { unitNumber: "Theme 4", title: "Road Safety Education (Assessed in PT)", marks: 0, topics: ["Motor Vehicle Amendment Act, traffic rules, 4Es to prevent road accidents."] }
        ]
      }
    ],
    practicals: [
      "Project work on J&K historical monuments, women freedom fighters, roadways challenges, or disaster management interviews.",
      "Internal Assessment (20 Marks): Pen paper test (10m), Portfolio (5m), Subject Enrichment Activity (5m)."
    ]
  },

  {
    id: "c10-eng",
    code: "EN-10",
    name: "General English",
    type: "Compulsory",
    theoryMarks: 80,
    practicalMarks: 20,
    totalMarks: 100,
    duration: "3 Hours",
    books: ["Tulip Series Book X, A Textbook of English for Class X - JKBOSE"],
    units: [
      {
        unitNumber: "Section A",
        title: "Reading Comprehension",
        marks: 15,
        topics: [
          "One seen poetic stanza followed by 5 MCQs on comprehension and poetic devices (5 Marks).",
          "One unseen prose passage (400-500 words) with MCQs, short answers, vocabulary & title (5 Marks).",
          "One question based on charts, pictures, or data analysis followed by 5 MCQs/SA (5 Marks)."
        ]
      },
      {
        unitNumber: "Section B",
        title: "Grammar",
        marks: 10,
        topics: [
          "Passage with blanks testing articles, modals, relative pronouns (3 Marks).",
          "Direct/Indirect speech sentence conversion (3 Marks).",
          "Editing passage testing tenses, punctuation, pronouns, and spellings (4 Marks)."
        ]
      },
      {
        unitNumber: "Section C",
        title: "Writing Skills",
        marks: 25,
        topics: [
          "Dialogue writing on given situation with hints (4 Marks).",
          "Notice writing (50 words) (3 Marks) & Message writing (50 words) (2 Marks).",
          "Letter writing: formal or informal letters (5 Marks).",
          "Speech / Article / Paragraph writing (80-100 words) (5 Marks).",
          "Creative story development with title from given hints (6 Marks)."
        ]
      },
      {
        unitNumber: "Section D",
        title: "Literature (Tulip Series Book X)",
        marks: 30,
        topics: [
          "Prose: Short competency-based questions on chapters (Footprints without Feet, Diary of Anne Frank, Long Walk to Freedom, Sermon at Benares, Merchant of Venice) (9 Marks).",
          "Poetry: Questions based on central idea & literary devices (Prayer, Miracles, When You Are Old, Snowdrop, My Mother at Sixty-six, Tale of Custard the Dragon) (9 Marks).",
          "Short Stories: Character, scene, theme analysis (The Necklace, Abhiley, The Servant, Dusk) (6 Marks).",
          "Play: Characterization and plot analysis of Anton Chekhov's 'The Proposal' (6 Marks)."
        ]
      }
    ],
    practicals: [
      "Assessment of Listening and Speaking Skills (LSRW) (20 Marks).",
      "Group discussions, role plays, interview simulations, project portfolio."
    ]
  },

  {
    id: "c10-urdu",
    code: "UR-10",
    name: "Urdu (Compulsory Language)",
    type: "Compulsory Language",
    theoryMarks: 80,
    practicalMarks: 20,
    totalMarks: 100,
    duration: "3 Hours",
    books: ["Baharistan-e-Urdu for Class 10th - JKBOSE"],
    units: [
      { unitNumber: "Hissa Alif", title: "Darsi Iqtibaas & Sawaalaat (Prose)", marks: 20, topics: ["Darsi asbaaq ke khulase, Meer Amman, Deputy Nazir Ahmad, Premchand, Sir Syed Ahmad Khan ke asbaaq."] },
      { unitNumber: "Hissa Ba", title: "Shairi & Tashreeh (Poetry)", marks: 20, topics: ["Ghazliyat: Mir Taqi Mir, Atish, Ghalib, Shad Azimabadi, Fani Badayuni, Hasrat Mohani; Qasida, Naat, Marsiya."] },
      { unitNumber: "Hissa Jeem", title: "Qawaid & Grammar", marks: 20, topics: ["Ism, Zameer, Sifat, Fail, Muhavare, Tarkeeb-e-Nahvi, Asnaf-e-Adab (Dastan, Novel, Afsana, Khaka, Inshaiya)."] },
      { unitNumber: "Hissa Daal", title: "Takhleeqi Tahreer (Writing)", marks: 20, topics: ["Mazmoon Nigari (200 words) on scientific, social, literary issues; Khutoot Nigari (Daftari & Karobari)."] }
    ],
    practicals: ["Zabani & Tehreeri Imtehan, Listening & Speaking activities, Portfolio & Attendance (20 Marks)."]
  },

  {
    id: "c10-cs",
    code: "CS-10",
    name: "Computer Science (Elective)",
    type: "Elective",
    theoryMarks: 60,
    practicalMarks: 40,
    totalMarks: 100,
    duration: "2 Hours",
    books: ["Computer Science for Class X - JKBOSE"],
    units: [
      { unitNumber: "Unit I", title: "IT Basics", marks: 10, topics: ["Internet, WWW, Web servers, browsers, URLs, e-mail, search engines, video conferencing, FTP."] },
      { unitNumber: "Unit II", title: "IT Tools: MS-Access", marks: 10, topics: ["Database concepts, tables, primary keys, records, fields, data validation rules."] },
      { unitNumber: "Unit III", title: "HTML Fundamentals", marks: 20, topics: ["Tags: HEAD, TITLE, BODY, FONT, CENTER, BR, HR, Heading H1-H6, Lists (UL, OL), Images IMG, Links A-element."] },
      { unitNumber: "Unit IV", title: "IT Applications & Web Designing", marks: 20, topics: ["Website designing for school, personal data management, payroll, inventory systems."] }
    ],
    practicals: [
      "Hands-on experience: Internet & MS-Access (10 Marks), HTML Webpage designing (10 Marks).",
      "IT Application Report file with printed outputs (10 Marks), Viva-voce (10 Marks)."
    ]
  }
];

