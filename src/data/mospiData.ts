import {
  Competency,
  TrainingDocument,
  MCQQuestion,
  Assessment,
  QuizAttempt,
  IGOTCourse,
  DepartmentMetric,
  NotificationItem,
} from '../types';

export const MOSPI_COMPETENCIES: Competency[] = [
  {
    id: 'c1',
    name: 'Sampling Techniques & Frame Verification',
    category: 'Statistical Theory',
    description: 'Multi-stage stratified sampling, First Stage Unit (FSU) selection, circular systematic sampling, and sampling variance estimation.',
    targetBenchmark: 70,
    targetDepartment: 'Survey Design and Research Division (SDRD)',
    fracRole: 'Statistical Investigator Grade II / Field Officer',
  },
  {
    id: 'c2',
    name: 'Price Statistics & Index Number Calculations',
    category: 'Macroeconomics',
    description: 'Laspeyres aggregation formula, geometric price relatives, CPI basket weighting, and quality adjustment imputation.',
    targetBenchmark: 70,
    targetDepartment: 'Price Statistics Division (PSD)',
    fracRole: 'Assistant Director (Price Statistics)',
  },
  {
    id: 'c3',
    name: 'National Accounts & GVA Estimation (SNA 2008)',
    category: 'Macroeconomics',
    description: 'System of National Accounts compilation, Gross Value Added at basic prices, production vs. product taxes, and institutional sector accounts.',
    targetBenchmark: 75,
    targetDepartment: 'National Accounts Division (NAD)',
    fracRole: 'Deputy Director / Senior Statistical Officer',
  },
  {
    id: 'c4',
    name: 'CAPI Validation & Field Enumeration Protocols',
    category: 'Field Operations',
    description: 'Computer Assisted Personal Interviewing rules, geo-coordinate validation, skip-pattern logic, and field consistency audits.',
    targetBenchmark: 65,
    targetDepartment: 'Field Operations Division (FOD)',
    fracRole: 'Field Investigator / Supervisor',
  },
  {
    id: 'c5',
    name: 'Industrial Statistics & IIP Compilation',
    category: 'Statistical Theory',
    description: 'Annual Survey of Industries schedule auditing, NIC 2008 industry classifications, and month-on-month production index weights.',
    targetBenchmark: 70,
    targetDepartment: 'Economic Statistics Division (ESD)',
    fracRole: 'Statistical Officer (Industrial Statistics)',
  },
  {
    id: 'c6',
    name: 'Data Quality Assurance & Outlier Treatment',
    category: 'Digital & CAPI',
    description: 'Winsorization, Mahalanobis distance checks, automated data imputation algorithms, and administrative registry cross-validation.',
    targetBenchmark: 75,
    targetDepartment: 'Data Informatics and Innovation Division (DIID)',
    fracRole: 'Data Scientist / Informatics Officer',
  },
];

export const INITIAL_DOCUMENTS: TrainingDocument[] = [
  {
    id: 'doc-1',
    title: 'NSS 79th Round: Field Operational Manual & Sample Verification',
    division: 'Field Operations Division (FOD)',
    filename: 'NSS_79_Field_Manual_Vol_1.pdf',
    uploadedAt: '12 Sep 2026, 09:30 AM',
    pagesCount: 84,
    textContent: `The National Sample Survey (NSS) follows a multi-stage stratified sampling design. The First Stage Units (FSUs) are the 2011 Census villages in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector. The Ultimate Stage Units (USUs) are households in both sectors. 

In case of large FSUs having an approximate present population of 1200 or more, Hamlet-Group (hg)/Sub-Block (sb) formation is carried out. The investigator divides the FSU into two or more equal parts having equal population content.

Listing and Selection of Households: Within each selected FSU/hg/sb, households are stratified into three Second Stage Strata (SSS) based on household consumer expenditure and occupation. Circular Systematic Sampling (CSS) with a random start is implemented to select the prescribed number of sample households without replacement.

Field CAPI Guidelines: All canvassing is executed on official CAPI tablets. The system performs real-time checks on respondent age consistency, expenditure sub-total matching, and GPS validation within a 50-meter radius of the registered FSU boundary.`,
    status: 'ready',
    questionsCount: 4,
  },
  {
    id: 'doc-2',
    title: 'Consumer Price Index (CPI): Manual of Compilation & Price Relatives',
    division: 'Price Statistics Division (PSD)',
    filename: 'CPI_Rural_Urban_Methodology_v4.pdf',
    uploadedAt: '11 Sep 2026, 02:15 PM',
    pagesCount: 112,
    textContent: `The Consumer Price Index (CPI) numbers for Rural, Urban, and Combined are compiled on a monthly basis by MoSPI with Base Year 2012=100.

The formula adopted is the modified Laspeyres formula:
I = sum( (Pn / P0) * W0 ) / sum(W0)
where Pn is the current month price, P0 is the base period price, and W0 is the expenditure weight derived from the Household Consumer Expenditure Survey.

Price collection is conducted across 1,181 selected village markets in rural areas and 1,114 quotations from urban markets every week.
Treatment of missing prices: If an item quote is temporarily absent for up to 3 consecutive months, the price relative is imputed using the average price movement of similar items in the elementary subgroup. If an item becomes permanently unavailable, a close substitute is selected and base price is spliced using chaining techniques.`,
    status: 'ready',
    questionsCount: 3,
  },
  {
    id: 'doc-3',
    title: 'National Accounts: Estimation of Gross Value Added (GVA) Under SNA 2008',
    division: 'National Accounts Division (NAD)',
    filename: 'NAS_Methodology_SNA2008_GVA.pdf',
    uploadedAt: '10 Sep 2026, 11:00 AM',
    pagesCount: 145,
    textContent: `The National Accounts Division compiles Gross Value Added (GVA) at basic prices adhering to the System of National Accounts (SNA 2008). 

Fundamental Identity:
GVA at basic prices = GVA at factor cost + Net production taxes
(where Net production taxes = Production taxes - Production subsidies).

GDP at market prices = GVA at basic prices + Net product taxes
(where Net product taxes = Product taxes like GST, Customs - Product subsidies like Food, Petroleum, Fertilizer).

Production taxes/subsidies are paid or received with respect to the production activity (e.g. land revenues, stamp duty, factory license fees, pollution cess) independent of the actual volume of goods produced. Conversely, product taxes/subsidies depend strictly on the quantity or value of goods sold.

In the corporate financial sector, Ministry of Corporate Affairs (MCA-21) electronic database filings are utilized to compute enterprise-level value addition.`,
    status: 'ready',
    questionsCount: 3,
  },
];

export const INITIAL_QUESTIONS: MCQQuestion[] = [
  {
    id: 'q-101',
    documentId: 'doc-1',
    question: 'In the National Sample Survey (NSS) design, what serves as the First Stage Unit (FSU) in the rural sector?',
    options: [
      '2011 Census Villages',
      'Gram Panchayat Wards',
      'Tehsil Revenue Circles',
      'Individual Agricultural Holdings',
    ],
    correctIndex: 0,
    explanation: 'As stipulated in the NSS Operational Guidelines, Census villages (as per Census 2011) serve as the First Stage Units (FSUs) in the rural sector, while UFS blocks serve the urban sector.',
    competency: 'Sampling Techniques & Frame Verification',
    difficulty: 'Beginner',
    fracRole: 'Statistical Investigator Grade II / Field Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Evaluation Committee (FOD)',
  },
  {
    id: 'q-102',
    documentId: 'doc-1',
    question: 'When is Hamlet-Group (hg) or Sub-Block (sb) formation mandatory for an investigator during field listing?',
    options: [
      'When the FSU has an approximate present population of 1200 or more',
      'When the terrain has more than 5 kilometers elevation',
      'Only if less than 50 households reside in the village',
      'Whenever the local Sarpanch requests an audit',
    ],
    correctIndex: 0,
    explanation: 'Hamlet-group (rural) or sub-block (urban) division is executed when the approximate population reaches 1200 or more to maintain listing manageable and reduce non-sampling errors.',
    competency: 'Sampling Techniques & Frame Verification',
    difficulty: 'Intermediate',
    fracRole: 'Statistical Investigator Grade II / Field Officer',
    status: 'approved',
    reviewedBy: 'MoSPI Evaluation Committee (FOD)',
  },
  {
    id: 'q-103',
    documentId: 'doc-2',
    question: 'Which index formulation is officially utilized by MoSPI to compile the All-India Consumer Price Index (CPI)?',
    options: [
      'Modified Laspeyres Price Index Formula',
      'Paasche Current-Weighted Aggregative Index',
      'Fisher Ideal Geometric Cross Formula',
      'Marshall-Edgeworth Harmonic Average',
    ],
    correctIndex: 0,
    explanation: 'MoSPI calculates CPI using the modified Laspeyres formula, utilizing expenditure proportions from the Consumer Expenditure Survey as fixed base period weights.',
    competency: 'Price Statistics & Index Number Calculations',
    difficulty: 'Intermediate',
    fracRole: 'Assistant Director (Price Statistics)',
    status: 'approved',
    reviewedBy: 'Price Statistics Division (PSD Evaluation Cell)',
  },
  {
    id: 'q-104',
    documentId: 'doc-2',
    question: 'Under CPI price collection protocols, how should an investigator treat a quotation temporarily missing for up to 3 months?',
    options: [
      'Impute using the average price movement of related items in the elementary subgroup',
      'Permanently delete the item and rescale all weights to zero',
      'Substitute with the highest price item available in another state',
      'Carry forward the base year price without adjustment',
    ],
    correctIndex: 0,
    explanation: 'Temporary non-availability (up to 3 months) requires imputation using the relative price trajectory of comparable goods in the corresponding sub-category.',
    competency: 'Price Statistics & Index Number Calculations',
    difficulty: 'Advanced',
    fracRole: 'Assistant Director (Price Statistics)',
    status: 'approved',
    reviewedBy: 'Price Statistics Division (PSD Evaluation Cell)',
  },
  {
    id: 'q-105',
    documentId: 'doc-3',
    question: 'Under the System of National Accounts (SNA 2008), what distinguishes "Production Taxes" from "Product Taxes"?',
    options: [
      'Production taxes are levied irrespective of output volume (e.g. stamp duty, land revenue), whereas product taxes depend on quantity or value sold (e.g. GST, excise)',
      'Production taxes apply exclusively to foreign direct investment',
      'Product taxes are paid directly to local Panchayats while production taxes go to international bodies',
      'There is zero mathematical or economic difference in national accounting',
    ],
    correctIndex: 0,
    explanation: 'Production taxes (such as land tax, pollution cess, license fees) are incurred irrespective of the quantum produced, whereas product taxes (like GST) vary directly with the quantity or value of commodities.',
    competency: 'National Accounts & GVA Estimation (SNA 2008)',
    difficulty: 'Advanced',
    fracRole: 'Deputy Director / Senior Statistical Officer',
    status: 'approved',
    reviewedBy: 'National Accounts Division (NAD Evaluation Cell)',
  },
  {
    id: 'q-106',
    documentId: 'doc-1',
    question: 'During CAPI field data entry, what happens if the tablet GPS reading exceeds 50 meters from the registered FSU centroid boundary?',
    options: [
      'The CAPI validation engine flags an out-of-boundary audit violation requiring supervisory override code and explanation',
      'The device automatically deletes all survey schedules silently',
      'The schedule is automatically forwarded to the Census Commissioner',
      'The investigator receives a cash penalty automatically',
    ],
    correctIndex: 0,
    explanation: 'Geo-fencing validation on CAPI triggers an audit warning whenever interviews occur outside the designated boundary tolerance, ensuring authenticity of field visits.',
    competency: 'CAPI Validation & Field Enumeration Protocols',
    difficulty: 'Intermediate',
    fracRole: 'Field Investigator / Supervisor',
    status: 'approved',
    reviewedBy: 'MoSPI Evaluation Committee (FOD)',
  },
  // Pending review question generated by AI
  {
    id: 'q-107-pending',
    documentId: 'doc-3',
    question: 'How is Gross Domestic Product (GDP) at market prices derived from Gross Value Added (GVA) at basic prices in the National Accounts?',
    options: [
      'GDP = GVA at basic prices + Net Product Taxes (Product Taxes - Product Subsidies)',
      'GDP = GVA at basic prices - Depreciation allowance',
      'GDP = GVA at basic prices + Net Factor Income from Abroad',
      'GDP = GVA at basic prices * Wholesale Price Index Deflator',
    ],
    correctIndex: 0,
    explanation: 'GDP at market prices incorporates net product taxes (product taxes minus product subsidies) onto the aggregate GVA at basic prices.',
    competency: 'National Accounts & GVA Estimation (SNA 2008)',
    difficulty: 'Intermediate',
    fracRole: 'Statistical Officer (National Accounts)',
    status: 'pending_review',
  },
  {
    id: 'q-108-pending',
    documentId: 'doc-2',
    question: 'Which survey serves as the primary empirical basis for constructing expenditure weighting diagrams for the CPI basket?',
    options: [
      'Household Consumer Expenditure Survey (HCES)',
      'Periodic Labour Force Survey (PLFS)',
      'Annual Survey of Industries (ASI)',
      'All India Debt and Investment Survey (AIDIS)',
    ],
    correctIndex: 0,
    explanation: 'HCES data captures household consumption item shares, determining the representative weight allocated to each commodity in the CPI index basket.',
    competency: 'Price Statistics & Index Number Calculations',
    difficulty: 'Beginner',
    fracRole: 'Statistical Investigator Grade II',
    status: 'pending_review',
  },
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'asst-1',
    title: 'MoSPI Annual Statistical Competency Benchmark (Cadre 2026)',
    division: 'Pan-MoSPI Capacity Building Unit',
    competenciesCovered: [
      'Sampling Techniques & Frame Verification',
      'Price Statistics & Index Number Calculations',
      'National Accounts & GVA Estimation (SNA 2008)',
      'CAPI Validation & Field Enumeration Protocols',
    ],
    questionIds: ['q-101', 'q-102', 'q-103', 'q-104', 'q-105', 'q-106'],
    durationMinutes: 15,
    passPercentage: 70,
    targetCadre: 'Statistical Investigator (Grades I & II) & Assistant Directors',
    active: true,
  },
  {
    id: 'asst-2',
    title: 'Field Operations & CAPI Data Validation Specialist Exam',
    division: 'Field Operations Division (FOD)',
    competenciesCovered: [
      'Sampling Techniques & Frame Verification',
      'CAPI Validation & Field Enumeration Protocols',
    ],
    questionIds: ['q-101', 'q-102', 'q-106'],
    durationMinutes: 10,
    passPercentage: 75,
    targetCadre: 'Field Investigators, SSOs, and Regional Supervisors',
    active: true,
  },
  {
    id: 'asst-3',
    title: 'Macroeconomic Aggregates & Price Statistics Certification',
    division: 'National Accounts Division & Price Statistics Division',
    competenciesCovered: [
      'Price Statistics & Index Number Calculations',
      'National Accounts & GVA Estimation (SNA 2008)',
    ],
    questionIds: ['q-103', 'q-104', 'q-105'],
    durationMinutes: 12,
    passPercentage: 75,
    targetCadre: 'Assistant Directors & Senior Statistical Officers (NAD/PSD)',
    active: true,
  },
];

export const INITIAL_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-101',
    assessmentId: 'asst-1',
    assessmentTitle: 'MoSPI Annual Statistical Competency Benchmark (Cadre 2026)',
    officialName: 'Statistical Officer (SSO)',
    officialRole: 'Statistical Investigator Grade II',
    division: 'Field Operations Division (Northern Region)',
    attemptedAt: '12 Sep 2026, 11:20 AM',
    answers: {
      'q-101': 0, // correct (Sampling)
      'q-102': 0, // correct (Sampling)
      'q-103': 2, // wrong (CPI - selected Fisher instead of Laspeyres)
      'q-104': 3, // wrong (CPI - selected Carry forward)
      'q-105': 0, // correct (NAD)
      'q-106': 0, // correct (CAPI)
    },
    scorePercentage: 66.7,
    totalQuestions: 6,
    correctAnswersCount: 4,
    competencyBreakdown: {
      'Sampling Techniques & Frame Verification': {
        total: 2,
        correct: 2,
        percentage: 100,
        isGap: false,
      },
      'CAPI Validation & Field Enumeration Protocols': {
        total: 1,
        correct: 1,
        percentage: 100,
        isGap: false,
      },
      'National Accounts & GVA Estimation (SNA 2008)': {
        total: 1,
        correct: 1,
        percentage: 100,
        isGap: false,
      },
      'Price Statistics & Index Number Calculations': {
        total: 2,
        correct: 0,
        percentage: 0,
        isGap: true, // CRITICAL GAP IDENTIFIED!
      },
    },
  },
];

export const IGOT_COURSES: IGOTCourse[] = [
  {
    id: 'igot-201',
    code: 'IGOT-STAT-201',
    title: 'Modern Survey Sampling & Stratified Random Design in Official Statistics',
    mappedCompetency: 'Sampling Techniques & Frame Verification',
    provider: 'National Statistical Systems Training Academy (NSSTA)',
    durationHours: '8.5 Hours',
    modulesCount: 6,
    rating: 4.8,
    enrolledOfficials: 1420,
    description: 'Master First Stage Unit (FSU) demarcation, Circular Systematic Sampling (CSS), Hamlet-group subdivision rules, and variance weighting algorithms.',
    badge: 'FRAC Level 3',
  },
  {
    id: 'igot-302',
    code: 'IGOT-STAT-302',
    title: 'Consumer Price Index (CPI) Methodology & Elementary Price Imputation',
    mappedCompetency: 'Price Statistics & Index Number Calculations',
    provider: 'Price Statistics Division & iGOT Karmayogi',
    durationHours: '12 Hours',
    modulesCount: 8,
    rating: 4.9,
    enrolledOfficials: 980,
    description: 'Deep dive into Laspeyres formulation, geometric mean of price relatives, treatment of non-responses, seasonal item adjustments, and splicing techniques.',
    badge: 'FRAC Level 4 (Recommended)',
    isEnrolled: true,
    progressPercentage: 25,
  },
  {
    id: 'igot-404',
    code: 'IGOT-NAS-404',
    title: 'System of National Accounts (SNA 2008): GVA at Basic Prices & Production Tax Accounting',
    mappedCompetency: 'National Accounts & GVA Estimation (SNA 2008)',
    provider: 'National Accounts Division (NAD) & NSSTA',
    durationHours: '14 Hours',
    modulesCount: 10,
    rating: 4.7,
    enrolledOfficials: 850,
    description: 'Understand macroeconomic accounting boundaries, Gross Value Added versus GDP, product subsidies versus production subsidies, and MCA-21 enterprise analytics.',
    badge: 'FRAC Level 4',
  },
  {
    id: 'igot-105',
    code: 'IGOT-CAPI-105',
    title: 'Computer-Assisted Personal Interviewing (CAPI): GPS Geofencing & Real-Time Audit Checks',
    mappedCompetency: 'CAPI Validation & Field Enumeration Protocols',
    provider: 'Field Operations Division (FOD)',
    durationHours: '6 Hours',
    modulesCount: 4,
    rating: 4.6,
    enrolledOfficials: 2140,
    description: 'Practical training on MoSPI CAPI software: resolving boundary anomalies, skip-pattern verification, and data transmission encryption.',
    badge: 'FRAC Level 2',
  },
  {
    id: 'igot-501',
    code: 'IGOT-DATA-501',
    title: 'Advanced Econometric Modeling & Outlier Detection in Large Survey Data',
    mappedCompetency: 'Data Quality Assurance & Outlier Treatment',
    provider: 'Data Informatics & Innovation Division (DIID)',
    durationHours: '16 Hours',
    modulesCount: 12,
    rating: 4.9,
    enrolledOfficials: 640,
    description: 'Techniques for multivariate outlier detection, automated imputation for survey non-responses, and statistical discrepancy audits.',
    badge: 'FRAC Level 5',
  },
  {
    id: 'igot-202',
    code: 'IGOT-IIP-202',
    title: 'Index of Industrial Production (IIP) & Annual Survey of Industries (ASI) Synthesis',
    mappedCompetency: 'Industrial Statistics & IIP Compilation',
    provider: 'Economic Statistics Division (ESD)',
    durationHours: '9 Hours',
    modulesCount: 7,
    rating: 4.7,
    enrolledOfficials: 780,
    description: 'Factory schedule verification, capital accounting, item basket selection, and growth rate calculations for core sector industries.',
    badge: 'FRAC Level 3',
  },
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  {
    id: 'dep-1',
    departmentName: 'Field Operations Division (FOD)',
    shortCode: 'FOD',
    totalOfficials: 1850,
    assessedCount: 1540,
    averageScore: 78.4,
    criticalGapsCount: 92,
    primaryGapCompetency: 'Sampling Techniques & Frame Verification',
    readinessRate: 83.2,
  },
  {
    id: 'dep-2',
    departmentName: 'Price Statistics Division (PSD)',
    shortCode: 'PSD',
    totalOfficials: 420,
    assessedCount: 395,
    averageScore: 68.2,
    criticalGapsCount: 114,
    primaryGapCompetency: 'Price Statistics & Index Number Calculations',
    readinessRate: 71.0,
  },
  {
    id: 'dep-3',
    departmentName: 'National Accounts Division (NAD)',
    shortCode: 'NAD',
    totalOfficials: 310,
    assessedCount: 290,
    averageScore: 81.5,
    criticalGapsCount: 34,
    primaryGapCompetency: 'National Accounts & GVA Estimation (SNA 2008)',
    readinessRate: 88.3,
  },
  {
    id: 'dep-4',
    departmentName: 'Survey Design & Research Division (SDRD)',
    shortCode: 'SDRD',
    totalOfficials: 280,
    assessedCount: 260,
    averageScore: 84.0,
    criticalGapsCount: 18,
    primaryGapCompetency: 'Sampling Techniques & Frame Verification',
    readinessRate: 93.0,
  },
  {
    id: 'dep-5',
    departmentName: 'Economic Statistics Division (ESD)',
    shortCode: 'ESD',
    totalOfficials: 510,
    assessedCount: 440,
    averageScore: 72.8,
    criticalGapsCount: 78,
    primaryGapCompetency: 'Industrial Statistics & IIP Compilation',
    readinessRate: 77.5,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'gap_alert',
    title: 'Critical Competency Gap Identified',
    message: 'Your recent score in "Price Statistics & Index Number Calculations" was below the 70% threshold. iGOT module IGOT-STAT-302 has been auto-assigned.',
    timestamp: '10 mins ago',
    read: false,
    actionLabel: 'View Gap Analysis',
    actionTab: 'gap-analysis',
  },
  {
    id: 'notif-2',
    type: 'course_recommendation',
    title: 'iGOT Karmayogi Pathway Assigned',
    message: 'Course "Consumer Price Index Methodology" (FRAC Level 4) is now in your active training pathway.',
    timestamp: '15 mins ago',
    read: false,
    actionLabel: 'Go to iGOT Courses',
    actionTab: 'igot-courses',
  },
  {
    id: 'notif-3',
    type: 'assessment',
    title: 'Mandatory Quarterly Assessment Available',
    message: 'MoSPI Annual Statistical Competency Benchmark (Cadre 2026) is ready for your submission.',
    timestamp: '1 hour ago',
    read: true,
    actionLabel: 'Take Assessment',
    actionTab: 'learner-assessments',
  },
  {
    id: 'notif-4',
    type: 'approval',
    title: 'Admin Review Required: 2 AI-Generated MCQs',
    message: 'New questions generated from NSS 79th Round manual are awaiting human-in-the-loop review before publishing.',
    timestamp: '2 hours ago',
    read: true,
    actionLabel: 'Review Questions',
    actionTab: 'admin-review',
  },
];
