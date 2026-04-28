export interface GovernanceSection {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    weight: number;
    helpText?: string;
  }[];
}

export const governanceStandards: GovernanceSection[] = [
  {
    id: "compliance",
    title: "الامتثال والالتزام",
    items: [
      { id: "gov_c1", label: "وجود لائحة أساسية معتمدة ومحدثة للجمعية", weight: 10 },
      { id: "gov_c2", label: "عقد اجتماعات الجمعية العمومية في مواعيدها النظامية", weight: 10 },
      { id: "gov_c3", label: "الالتزام بتجديد التراخيص والشهادات النظامية", weight: 10 },
      { id: "gov_c4", label: "تطبيق سياسة تعارض المصالح لجميع أعضاء المجلس", weight: 15 },
      { id: "gov_c5", label: "توثيق محاضر اجتماعات مجلس الإدارة بدقة", weight: 5 },
      { id: "gov_c6", label: "الالتزام برفع التقارير الدورية للمركز الوطني", weight: 10 },
    ]
  },
  {
    id: "transparency",
    title: "الشفافية والإفصاح",
    items: [
      { id: "gov_t1", label: "نشر القوائم المالية المدققة على الموقع الإلكتروني", weight: 15 },
      { id: "gov_t2", label: "الإفصاح عن أسماء أعضاء مجلس الإدارة وهيكل الإدارة", weight: 5 },
      { id: "gov_t3", label: "توفير آلية واضحة لاستقبال ومعالجة الشكاوى", weight: 10 },
      { id: "gov_t4", label: "نشر التقارير السنوية لإنجازات ومشاريع الجمعية", weight: 10 },
      { id: "gov_t5", label: "وضوح قنوات التواصل الرسمية للجمعية", weight: 5 },
      { id: "gov_t6", label: "الإفصاح عن المبالغ المصروفة على البرامج والأنشطة", weight: 15 },
    ]
  },
  {
    id: "financial",
    title: "السلامة المالية والمساءلة",
    items: [
      { id: "gov_f1", label: "وجود محاسب قانوني معتمد لمراجعة الحسابات", weight: 15 },
      { id: "gov_f2", label: "تطبيق ضوابط الرقابة الداخلية على الصرف", weight: 15 },
      { id: "gov_f3", label: "اعتماد الموازنة التقديرية السنوية من الجمعية العمومية", weight: 10 },
      { id: "gov_f4", label: "الالتزام بضوابط جمع التبرعات والموارد المالية", weight: 15 },
      { id: "gov_f5", label: "توفر نظام محاسبي آلي يسجل كافة العمليات", weight: 10 },
      { id: "gov_f6", label: "تطابق الأرصدة البنكية مع السجلات المحاسبية", weight: 10 },
    ]
  }
];
