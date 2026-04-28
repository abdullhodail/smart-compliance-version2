export default function GovernanceLitePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">مسار الحوكمة (Governance Lite)</h1>
        <p className="text-gray-500 text-right">أهلاً بك في مسار الحوكمة المخصص للجمعيات الأهلية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <p className="text-sm text-primary font-bold mb-1">نقاط الجاهزية</p>
            <p className="text-3xl font-black text-primary">--</p>
         </div>
      </div>
    </div>
  );
}
