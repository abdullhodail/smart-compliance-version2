export default function PDPLPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">مسار حماية البيانات (PDPL)</h1>
        <p className="text-gray-500 text-right">أهلاً بك في مسار الامتثال لنظام حماية البيانات الشخصية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
            <p className="text-sm text-secondary-dark font-bold mb-1">نسبة الامتثال</p>
            <p className="text-3xl font-black text-secondary-dark">--</p>
         </div>
      </div>
    </div>
  );
}
