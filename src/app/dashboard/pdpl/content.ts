import { EntityType } from "@prisma/client";

export interface PDPLSection {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    weight: number;
    example?: string;
  }[];
}

export const pdplTemplates: Record<EntityType, PDPLSection[]> = {
  ECOMMERCE: [
    {
      id: "customer-data",
      title: "بيانات العملاء والمدفوعات",
      items: [
        { id: "ec_1", label: "حماية بيانات الدفع والبطاقات الائتمانية", weight: 20 },
        { id: "ec_2", label: "سياسة واضحة لجمع عناوين التوصيل", weight: 10 },
        { id: "ec_3", label: "إدارة موافقة ملفات تعريف الارتباط (Cookies)", weight: 15 },
        { id: "ec_4", label: "اتفاقيات حماية البيانات مع شركات التوصيل", weight: 10 },
      ]
    },
    {
      id: "marketing",
      title: "التسويق والموافقة",
      items: [
        { id: "ec_5", label: "خيار إلغاء الاشتراك في الرسائل التسويقية", weight: 15 },
        { id: "ec_6", label: "الحصول على موافقة صريحة قبل إرسال العروض", weight: 15 },
      ]
    }
  ],
  SME: [
    {
      id: "internal-data",
      title: "البيانات الداخلية والموظفين",
      items: [
        { id: "sme_1", label: "حماية سجلات الموظفين والملفات الشخصية", weight: 20 },
        { id: "sme_2", label: "تأمين بيانات العملاء والموردين", weight: 15 },
        { id: "sme_3", label: "سياسة الوصول للأنظمة الداخلية", weight: 10 },
      ]
    },
    {
      id: "vendors",
      title: "الموردين والأنظمة",
      items: [
        { id: "sme_4", label: "مراجعة بنود الخصوصية في عقود الموردين", weight: 15 },
        { id: "sme_5", label: "إدارة الدخول للأجهزة المكتبية والأنظمة", weight: 10 },
      ]
    }
  ],
  NGO: [
    {
      id: "stakeholders",
      title: "المستفيدين والمانحين",
      items: [
        { id: "ngo_1", label: "حماية خصوصية بيانات المتبرعين والمانحين", weight: 20 },
        { id: "ngo_2", label: "تأمين بيانات المستفيدين من الخدمات الرعوية", weight: 20 },
        { id: "ngo_3", label: "إدارة بيانات المتطوعين وسجلات مشاركتهم", weight: 10 },
      ]
    },
    {
      id: "campaigns",
      title: "الحملات والسجلات",
      items: [
        { id: "ngo_4", label: "ضوابط الخصوصية في الحملات الإعلامية", weight: 15 },
        { id: "ngo_5", label: "حفظ السجلات الإدارية بطريقة آمنة", weight: 10 },
      ]
    }
  ]
};
