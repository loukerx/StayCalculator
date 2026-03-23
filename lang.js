const TRANSLATIONS = {
  zh: {
    // 页面标题
    pageTitle: '澳大利亚签证停留计算器',
    subtitle: '计算本次入境最晚可停留至哪一天',

    // 规则说明
    ruleTitle: 'Condition 8558',
    ruleText: '澳大利亚签证持有者在任意连续 18 个月内，累计在澳停留时间不得超过 12 个月（365 天）。该规则采用滚动窗口计算，即从任一天往回推 18 个月，这段时间内的总停留天数都不能超过 365 天。计算停留天数时，入境日和离境日都计入。',

    // 签证信息
    visaInfo: '签证信息',
    lastArrivalLabel: '签证最晚入境日期（Must not arrive after）',

    // 出入境记录
    tripHistory: '历史出入境记录',
    addTrip: '+ 添加一条记录',
    entryDate: '入境日期',
    exitDate: '离境日期',
    days: '天',
    deleteTrip: '删除',

    // 本次入境
    currentEntry: '本次入境',
    currentEntryLabel: '入境日期',

    // 按钮
    showResult: '展示结果',

    // 错误信息
    errorFillAll: '请填写签证最晚入境日期和本次入境日期。',
    errorArrivalExceeded: '本次入境日期已超过签证最晚入境日期（Must not arrive after）。',
    errorFillTrip: '请完整填写每条出入境记录的入境和离境日期。',
    errorExitBeforeEntry: '出入境记录中离境日期不得早于入境日期。',
    errorNoStay: '根据 18 个月内最多停留 12 个月的规则，本次入境已无法停留。',

    // 结果
    resultLabel: '本次最晚可停留至',
    constraintText: '受 18 个月内最多停留 12 个月规则限制',
    historicalDays: '历史停留总天数',
    thisStayDays: '本次可停留天数',
    windowTotal: '18 个月窗口内总天数',
    windowRemaining: '18 个月窗口内剩余天数',
    warningFewDays: '可停留天数较少，请注意安排行程。',
    reminderLabel: '添加离境提醒到日历',
    remindBefore: '提前',
    daysBefore: '天提醒',
    calendarEventTitle: '澳大利亚签证 - 最晚离境日',
    calendarEventDesc: '根据 Condition 8558 规则计算，您本次入境最晚需在此日期离开澳大利亚。',
    fullYearLabel: '下次最早可住满一年的入境日期',
    fullYearNote: '从该日入境，可连续停留 365 天不违反 Condition 8558 规则',
    fullYearVisaExpired: '⚠️ 该日期已超过签证最晚入境日期，需续签或申请新签证后方可入境',
  },

  'zh-TW': {
    pageTitle: '澳洲簽證停留計算器',
    subtitle: '計算本次入境最晚可停留至哪一天',

    ruleTitle: 'Condition 8558',
    ruleText: '澳洲簽證持有者在任意連續 18 個月內，累計在澳停留時間不得超過 12 個月（365 天）。該規則採用滾動窗口計算，即從任一天往回推 18 個月，這段時間內的總停留天數都不能超過 365 天。計算停留天數時，入境日和離境日都計入。',

    visaInfo: '簽證資訊',
    lastArrivalLabel: '簽證最晚入境日期（Must not arrive after）',

    tripHistory: '歷史出入境紀錄',
    addTrip: '+ 新增一筆紀錄',
    entryDate: '入境日期',
    exitDate: '離境日期',
    days: '天',
    deleteTrip: '刪除',

    currentEntry: '本次入境',
    currentEntryLabel: '入境日期',

    showResult: '顯示結果',

    errorFillAll: '請填寫簽證最晚入境日期和本次入境日期。',
    errorArrivalExceeded: '本次入境日期已超過簽證最晚入境日期（Must not arrive after）。',
    errorFillTrip: '請完整填寫每筆出入境紀錄的入境和離境日期。',
    errorExitBeforeEntry: '出入境紀錄中離境日期不得早於入境日期。',
    errorNoStay: '根據 18 個月內最多停留 12 個月的規則，本次入境已無法停留。',

    resultLabel: '本次最晚可停留至',
    constraintText: '受 18 個月內最多停留 12 個月規則限制',
    historicalDays: '歷史停留總天數',
    thisStayDays: '本次可停留天數',
    windowTotal: '18 個月窗口內總天數',
    windowRemaining: '18 個月窗口內剩餘天數',
    warningFewDays: '可停留天數較少，請注意安排行程。',
    reminderLabel: '新增離境提醒至日曆',
    remindBefore: '提前',
    daysBefore: '天提醒',
    calendarEventTitle: '澳洲簽證 - 最晚離境日',
    calendarEventDesc: '根據 Condition 8558 規則計算，您本次入境最晚需在此日期離開澳洲。',
    fullYearLabel: '下次最早可住滿一年的入境日期',
    fullYearNote: '從該日入境，可連續停留 365 天不違反 Condition 8558 規則',
    fullYearVisaExpired: '⚠️ 該日期已超過簽證最晚入境日期，需續簽或申請新簽證後方可入境',
  },

  ja: {
    pageTitle: 'オーストラリアビザ滞在計算ツール',
    subtitle: '今回の入国で最長いつまで滞在できるかを計算します',

    ruleTitle: 'Condition 8558',
    ruleText: 'オーストラリアのビザ保持者は、連続する18ヶ月間のうち、オーストラリアでの滞在日数が12ヶ月（365日）を超えてはなりません。この規則はスライディングウィンドウ方式で計算されます。任意の日から18ヶ月遡り、その期間内の合計滞在日数が365日を超えないようにする必要があります。滞在日数の計算では、入国日と出国日の両方を含みます。',

    visaInfo: 'ビザ情報',
    lastArrivalLabel: 'ビザ最終入国期限（Must not arrive after）',

    tripHistory: '過去の出入国記録',
    addTrip: '+ 記録を追加',
    entryDate: '入国日',
    exitDate: '出国日',
    days: '日',
    deleteTrip: '削除',

    currentEntry: '今回の入国',
    currentEntryLabel: '入国日',

    showResult: '結果を表示',

    errorFillAll: 'ビザ最終入国期限と今回の入国日を入力してください。',
    errorArrivalExceeded: '今回の入国日がビザ最終入国期限（Must not arrive after）を超えています。',
    errorFillTrip: 'すべての出入国記録の入国日と出国日を入力してください。',
    errorExitBeforeEntry: '出入国記録の出国日は入国日より前であってはなりません。',
    errorNoStay: '18ヶ月間で最大12ヶ月の滞在規則により、今回の入国では滞在できません。',

    resultLabel: '最長滞在可能日',
    constraintText: '18ヶ月間で最大12ヶ月の滞在規則による制限',
    historicalDays: '過去の滞在日数合計',
    thisStayDays: '今回の滞在可能日数',
    windowTotal: '18ヶ月期間内の合計日数',
    windowRemaining: '18ヶ月期間内の残り日数',
    warningFewDays: '滞在可能日数が残りわずかです。旅程の計画にご注意ください。',
    reminderLabel: 'カレンダーに出国リマインダーを追加',
    remindBefore: '',
    daysBefore: '日前にリマインド',
    calendarEventTitle: 'オーストラリアビザ - 最終出国日',
    calendarEventDesc: 'Condition 8558 の規則に基づき、この入国での最終出国日です。',
    fullYearLabel: '次回最短で丸1年滞在可能な入国日',
    fullYearNote: 'この日から入国すれば、365日間連続滞在してもCondition 8558に違反しません',
    fullYearVisaExpired: '⚠️ この日付はビザの最終入国日を過ぎています。入国にはビザの更新または新規申請が必要です',
  },

  hi: {
    pageTitle: 'ऑस्ट्रेलिया वीज़ा ठहरने की अवधि कैलकुलेटर',
    subtitle: 'इस प्रवेश पर आप अधिकतम कब तक रह सकते हैं, यह गणना करें',
    ruleTitle: 'Condition 8558',
    ruleText: 'ऑस्ट्रेलियाई वीज़ा धारकों को किसी भी लगातार 18 महीने की अवधि में 12 महीने (365 दिन) से अधिक ऑस्ट्रेलिया में नहीं रहना चाहिए। इसकी गणना स्लाइडिंग विंडो पद्धति से की जाती है — किसी भी दिन से 18 महीने पीछे देखने पर, ऑस्ट्रेलिया में बिताए गए कुल दिन 365 से अधिक नहीं होने चाहिए। ठहरने के दिनों की गणना में प्रवेश और प्रस्थान, दोनों दिन शामिल होते हैं।',
    visaInfo: 'वीज़ा जानकारी',
    lastArrivalLabel: 'वीज़ा अंतिम प्रवेश तिथि (Must not arrive after)',
    tripHistory: 'पिछला यात्रा इतिहास',
    addTrip: '+ एक रिकॉर्ड जोड़ें',
    entryDate: 'प्रवेश तिथि',
    exitDate: 'प्रस्थान तिथि',
    days: 'दिन',
    deleteTrip: 'हटाएं',
    currentEntry: 'इस बार का प्रवेश',
    currentEntryLabel: 'प्रवेश तिथि',
    showResult: 'परिणाम दिखाएं',
    errorFillAll: 'कृपया वीज़ा अंतिम प्रवेश तिथि और इस बार की प्रवेश तिथि भरें।',
    errorArrivalExceeded: 'इस बार की प्रवेश तिथि वीज़ा अंतिम प्रवेश तिथि (Must not arrive after) से अधिक है।',
    errorFillTrip: 'कृपया प्रत्येक यात्रा रिकॉर्ड की प्रवेश और प्रस्थान तिथि भरें।',
    errorExitBeforeEntry: 'यात्रा रिकॉर्ड में प्रस्थान तिथि प्रवेश तिथि से पहले नहीं होनी चाहिए।',
    errorNoStay: '18 महीने में अधिकतम 12 महीने के नियम के अनुसार, इस प्रवेश पर ठहरना संभव नहीं है।',
    resultLabel: 'अधिकतम ठहरने की तिथि',
    constraintText: '18 महीने में अधिकतम 12 महीने ठहरने के नियम द्वारा सीमित',
    historicalDays: 'पिछले ठहरने के कुल दिन',
    thisStayDays: 'इस बार ठहरने के दिन',
    windowTotal: '18 महीने की विंडो में कुल दिन',
    windowRemaining: '18 महीने की विंडो में शेष दिन',
    warningFewDays: 'ठहरने के दिन बहुत कम बचे हैं। कृपया अपनी यात्रा की योजना बनाएं।',
    reminderLabel: 'कैलेंडर में प्रस्थान अनुस्मारक जोड़ें',
    remindBefore: '',
    daysBefore: 'दिन पहले याद दिलाएं',
    calendarEventTitle: 'ऑस्ट्रेलिया वीज़ा - अंतिम प्रस्थान तिथि',
    calendarEventDesc: 'Condition 8558 नियम के अनुसार, इस प्रवेश के लिए आपको इस तिथि तक ऑस्ट्रेलिया छोड़ना होगा।',
    fullYearLabel: 'अगली बार पूरे एक साल रहने के लिए सबसे पहली प्रवेश तिथि',
    fullYearNote: 'इस तिथि से प्रवेश करने पर Condition 8558 का उल्लंघन किए बिना 365 दिन लगातार रह सकते हैं',
    fullYearVisaExpired: '⚠️ यह तिथि वीज़ा की अंतिम प्रवेश तिथि से आगे है, प्रवेश के लिए वीज़ा नवीनीकरण या नया आवेदन आवश्यक है',
  },

  id: {
    pageTitle: 'Kalkulator Masa Tinggal Visa Australia',
    subtitle: 'Hitung tanggal terakhir Anda dapat tinggal untuk kedatangan ini',
    ruleTitle: 'Condition 8558',
    ruleText: 'Pemegang visa Australia tidak boleh tinggal di Australia lebih dari 12 bulan (365 hari) dalam periode 18 bulan berturut-turut. Perhitungan ini menggunakan metode sliding window — dari hari mana pun, melihat 18 bulan ke belakang, total hari tinggal di Australia tidak boleh melebihi 365 hari. Dalam perhitungan hari tinggal, hari kedatangan dan hari keberangkatan sama-sama dihitung.',
    visaInfo: 'Informasi Visa',
    lastArrivalLabel: 'Tanggal kedatangan terakhir visa (Must not arrive after)',
    tripHistory: 'Riwayat Perjalanan',
    addTrip: '+ Tambah catatan',
    entryDate: 'Tanggal masuk',
    exitDate: 'Tanggal keluar',
    days: 'hari',
    deleteTrip: 'Hapus',
    currentEntry: 'Kedatangan Saat Ini',
    currentEntryLabel: 'Tanggal masuk',
    showResult: 'Tampilkan Hasil',
    errorFillAll: 'Silakan isi tanggal kedatangan terakhir visa dan tanggal masuk saat ini.',
    errorArrivalExceeded: 'Tanggal masuk saat ini melewati tanggal kedatangan terakhir visa (Must not arrive after).',
    errorFillTrip: 'Silakan lengkapi tanggal masuk dan keluar untuk setiap catatan perjalanan.',
    errorExitBeforeEntry: 'Tanggal keluar tidak boleh lebih awal dari tanggal masuk dalam catatan perjalanan.',
    errorNoStay: 'Berdasarkan aturan maksimal 12 bulan dalam 18 bulan, Anda tidak dapat tinggal untuk kedatangan ini.',
    resultLabel: 'Dapat tinggal hingga',
    constraintText: 'Dibatasi oleh aturan tinggal maksimal 12 bulan dalam 18 bulan',
    historicalDays: 'Total hari tinggal sebelumnya',
    thisStayDays: 'Hari tinggal kali ini',
    windowTotal: 'Total dalam jendela 18 bulan',
    windowRemaining: 'Sisa dalam jendela 18 bulan',
    warningFewDays: 'Sisa hari tinggal sangat sedikit. Harap rencanakan perjalanan Anda.',
    reminderLabel: 'Tambahkan pengingat keberangkatan ke kalender',
    remindBefore: '',
    daysBefore: 'hari sebelumnya',
    calendarEventTitle: 'Visa Australia - Tanggal keberangkatan terakhir',
    calendarEventDesc: 'Berdasarkan aturan Condition 8558, Anda harus meninggalkan Australia sebelum tanggal ini untuk kedatangan ini.',
    fullYearLabel: 'Tanggal masuk berikutnya paling awal untuk tinggal penuh 1 tahun',
    fullYearNote: 'Masuk dari tanggal ini memungkinkan tinggal 365 hari berturut-turut tanpa melanggar Condition 8558',
    fullYearVisaExpired: '⚠️ Tanggal ini melewati batas kedatangan terakhir visa, perlu perpanjangan atau visa baru untuk masuk',
  },

  vi: {
    pageTitle: 'Công cụ tính thời gian lưu trú Visa Úc',
    subtitle: 'Tính ngày cuối cùng bạn có thể ở lại cho lần nhập cảnh này',
    ruleTitle: 'Condition 8558',
    ruleText: 'Người sở hữu visa Úc không được ở lại Úc quá 12 tháng (365 ngày) trong bất kỳ giai đoạn 18 tháng liên tục nào. Quy tắc này được tính bằng phương pháp cửa sổ trượt — nhìn lại 18 tháng từ bất kỳ ngày nào, tổng số ngày ở Úc không được vượt quá 365 ngày. Khi tính số ngày lưu trú, cả ngày nhập cảnh và ngày xuất cảnh đều được tính.',
    visaInfo: 'Thông tin Visa',
    lastArrivalLabel: 'Ngày nhập cảnh cuối cùng của visa (Must not arrive after)',
    tripHistory: 'Lịch sử xuất nhập cảnh',
    addTrip: '+ Thêm một bản ghi',
    entryDate: 'Ngày nhập cảnh',
    exitDate: 'Ngày xuất cảnh',
    days: 'ngày',
    deleteTrip: 'Xóa',
    currentEntry: 'Lần nhập cảnh này',
    currentEntryLabel: 'Ngày nhập cảnh',
    showResult: 'Hiển thị kết quả',
    errorFillAll: 'Vui lòng điền ngày nhập cảnh cuối cùng của visa và ngày nhập cảnh lần này.',
    errorArrivalExceeded: 'Ngày nhập cảnh lần này đã vượt quá ngày nhập cảnh cuối cùng của visa (Must not arrive after).',
    errorFillTrip: 'Vui lòng điền đầy đủ ngày nhập cảnh và xuất cảnh cho mỗi bản ghi.',
    errorExitBeforeEntry: 'Ngày xuất cảnh không được sớm hơn ngày nhập cảnh trong bản ghi xuất nhập cảnh.',
    errorNoStay: 'Theo quy tắc tối đa 12 tháng trong 18 tháng, bạn không thể lưu trú cho lần nhập cảnh này.',
    resultLabel: 'Có thể ở lại đến',
    constraintText: 'Bị giới hạn bởi quy tắc lưu trú tối đa 12 tháng trong 18 tháng',
    historicalDays: 'Tổng số ngày lưu trú trước đây',
    thisStayDays: 'Số ngày lưu trú lần này',
    windowTotal: 'Tổng trong cửa sổ 18 tháng',
    windowRemaining: 'Còn lại trong cửa sổ 18 tháng',
    warningFewDays: 'Số ngày lưu trú còn lại rất ít. Vui lòng lên kế hoạch chuyến đi.',
    reminderLabel: 'Thêm nhắc nhở xuất cảnh vào lịch',
    remindBefore: 'Trước',
    daysBefore: 'ngày',
    calendarEventTitle: 'Visa Úc - Ngày xuất cảnh cuối cùng',
    calendarEventDesc: 'Theo quy tắc Condition 8558, bạn cần rời khỏi Úc trước ngày này cho lần nhập cảnh này.',
    fullYearLabel: 'Ngày nhập cảnh sớm nhất lần tới để ở đủ 1 năm',
    fullYearNote: 'Nhập cảnh từ ngày này có thể ở liên tục 365 ngày mà không vi phạm Condition 8558',
    fullYearVisaExpired: '⚠️ Ngày này đã vượt quá ngày nhập cảnh cuối cùng của visa, cần gia hạn hoặc xin visa mới để nhập cảnh',
  },

  fil: {
    pageTitle: 'Kalkulator ng Pananatili sa Visa ng Australia',
    subtitle: 'Kalkulahin ang pinakamahuli na petsa na maaari kang manatili para sa pagpasok na ito',
    ruleTitle: 'Condition 8558',
    ruleText: 'Ang mga may hawak ng visa sa Australia ay hindi dapat manatili sa Australia nang higit sa 12 buwan (365 araw) sa anumang tuloy-tuloy na 18 buwang panahon. Kinakalkula ito gamit ang sliding window — mula sa anumang araw, kung titingnan ang 18 buwan pabalik, ang kabuuang araw na nasa Australia ay hindi dapat lumampas sa 365 araw. Sa pagbilang ng mga araw ng pananatili, kasama ang araw ng pagpasok at araw ng pag-alis.',
    visaInfo: 'Impormasyon ng Visa',
    lastArrivalLabel: 'Huling petsa ng pagdating ng visa (Must not arrive after)',
    tripHistory: 'Kasaysayan ng Paglalakbay',
    addTrip: '+ Magdagdag ng tala',
    entryDate: 'Petsa ng pagpasok',
    exitDate: 'Petsa ng pag-alis',
    days: 'araw',
    deleteTrip: 'Tanggalin',
    currentEntry: 'Kasalukuyang Pagpasok',
    currentEntryLabel: 'Petsa ng pagpasok',
    showResult: 'Ipakita ang Resulta',
    errorFillAll: 'Pakipunan ang huling petsa ng pagdating ng visa at petsa ng kasalukuyang pagpasok.',
    errorArrivalExceeded: 'Ang petsa ng kasalukuyang pagpasok ay lumampas sa huling petsa ng pagdating ng visa (Must not arrive after).',
    errorFillTrip: 'Pakikumpleto ang petsa ng pagpasok at pag-alis para sa bawat tala ng paglalakbay.',
    errorExitBeforeEntry: 'Ang petsa ng pag-alis ay hindi dapat mas maaga kaysa petsa ng pagpasok sa mga tala ng paglalakbay.',
    errorNoStay: 'Batay sa panuntunang 12 buwan sa 18 buwan, hindi ka na maaaring manatili para sa pagpasok na ito.',
    resultLabel: 'Maaaring manatili hanggang',
    constraintText: 'Limitado ng panuntunang 12 buwang pananatili sa 18 buwan',
    historicalDays: 'Kabuuang nakaraang araw ng pananatili',
    thisStayDays: 'Araw ng pananatili sa pagkakataong ito',
    windowTotal: 'Kabuuan sa 18 buwang window',
    windowRemaining: 'Natitira sa 18 buwang window',
    warningFewDays: 'Napakakaunting araw na lang ang natitira. Pakiplano ang iyong biyahe.',
    reminderLabel: 'Magdagdag ng paalala sa pag-alis sa kalendaryo',
    remindBefore: '',
    daysBefore: 'araw bago mag-remind',
    calendarEventTitle: 'Visa ng Australia - Huling araw ng pag-alis',
    calendarEventDesc: 'Batay sa panuntunang Condition 8558, kailangan mong umalis sa Australia bago ang petsang ito para sa pagpasok na ito.',
    fullYearLabel: 'Susunod na pinakamaagang petsa ng pagpasok para manatili ng buong 1 taon',
    fullYearNote: 'Mula sa petsang ito, maaaring manatili nang 365 araw nang tuloy-tuloy nang hindi lumalabag sa Condition 8558',
    fullYearVisaExpired: '⚠️ Ang petsang ito ay lampas na sa huling araw ng pagdating ng visa, kailangan ng renewal o bagong visa para makapasok',
  },

  th: {
    pageTitle: 'เครื่องคำนวณระยะเวลาพำนักวีซ่าออสเตรเลีย',
    subtitle: 'คำนวณวันสุดท้ายที่สามารถพำนักได้สำหรับการเข้าประเทศครั้งนี้',
    ruleTitle: 'Condition 8558',
    ruleText: 'ผู้ถือวีซ่าออสเตรเลียต้องไม่พำนักในออสเตรเลียเกิน 12 เดือน (365 วัน) ในช่วงเวลา 18 เดือนต่อเนื่องใดๆ กฎนี้คำนวณโดยใช้วิธี sliding window — จากวันใดก็ตาม ย้อนหลังไป 18 เดือน จำนวนวันที่อยู่ในออสเตรเลียทั้งหมดต้องไม่เกิน 365 วัน โดยในการคำนวณวันพำนัก จะนับทั้งวันเข้าประเทศและวันออกจากประเทศ',
    visaInfo: 'ข้อมูลวีซ่า',
    lastArrivalLabel: 'วันที่เข้าประเทศครั้งสุดท้ายของวีซ่า (Must not arrive after)',
    tripHistory: 'ประวัติการเดินทาง',
    addTrip: '+ เพิ่มรายการ',
    entryDate: 'วันที่เข้าประเทศ',
    exitDate: 'วันที่ออกจากประเทศ',
    days: 'วัน',
    deleteTrip: 'ลบ',
    currentEntry: 'การเข้าประเทศครั้งนี้',
    currentEntryLabel: 'วันที่เข้าประเทศ',
    showResult: 'แสดงผลลัพธ์',
    errorFillAll: 'กรุณากรอกวันที่เข้าประเทศครั้งสุดท้ายของวีซ่าและวันที่เข้าประเทศครั้งนี้',
    errorArrivalExceeded: 'วันที่เข้าประเทศครั้งนี้เกินกว่าวันที่เข้าประเทศครั้งสุดท้ายของวีซ่า (Must not arrive after)',
    errorFillTrip: 'กรุณากรอกวันที่เข้าและออกจากประเทศให้ครบทุกรายการ',
    errorExitBeforeEntry: 'วันที่ออกจากประเทศต้องไม่เร็วกว่าวันที่เข้าประเทศในรายการเดินทาง',
    errorNoStay: 'ตามกฎพำนักสูงสุด 12 เดือนใน 18 เดือน ไม่สามารถพำนักได้สำหรับการเข้าประเทศครั้งนี้',
    resultLabel: 'สามารถพำนักได้ถึง',
    constraintText: 'จำกัดโดยกฎพำนักสูงสุด 12 เดือนใน 18 เดือน',
    historicalDays: 'จำนวนวันพำนักในอดีตทั้งหมด',
    thisStayDays: 'จำนวนวันที่พำนักได้ครั้งนี้',
    windowTotal: 'รวมในหน้าต่าง 18 เดือน',
    windowRemaining: 'เหลือในหน้าต่าง 18 เดือน',
    warningFewDays: 'จำนวนวันที่เหลือน้อยมาก กรุณาวางแผนการเดินทาง',
    reminderLabel: 'เพิ่มการแจ้งเตือนการเดินทางออกในปฏิทิน',
    remindBefore: 'ก่อน',
    daysBefore: 'วัน',
    calendarEventTitle: 'วีซ่าออสเตรเลีย - วันสุดท้ายที่ต้องออกจากประเทศ',
    calendarEventDesc: 'ตามกฎ Condition 8558 คุณต้องออกจากออสเตรเลียก่อนวันนี้สำหรับการเข้าประเทศครั้งนี้',
    fullYearLabel: 'วันเข้าประเทศครั้งถัดไปที่เร็วที่สุดเพื่อพำนักครบ 1 ปี',
    fullYearNote: 'เข้าประเทศตั้งแต่วันนี้สามารถพำนักต่อเนื่อง 365 วันโดยไม่ละเมิด Condition 8558',
    fullYearVisaExpired: '⚠️ วันที่นี้เกินวันเข้าประเทศครั้งสุดท้ายของวีซ่าแล้ว ต้องต่ออายุหรือสมัครวีซ่าใหม่เพื่อเข้าประเทศ',
  },

  ko: {
    pageTitle: '호주 비자 체류 기간 계산기',
    subtitle: '이번 입국에서 최대 체류 가능 날짜를 계산합니다',
    ruleTitle: 'Condition 8558',
    ruleText: '호주 비자 소지자는 연속되는 18개월 중 12개월(365일)을 초과하여 호주에 체류할 수 없습니다. 이 규칙은 슬라이딩 윈도우 방식으로 계산됩니다 — 임의의 날로부터 18개월을 거슬러 올라가, 해당 기간 내 호주 체류 총 일수가 365일을 초과하지 않아야 합니다. 체류 일수 계산에는 입국일과 출국일이 모두 포함됩니다.',
    visaInfo: '비자 정보',
    lastArrivalLabel: '비자 최종 입국 기한 (Must not arrive after)',
    tripHistory: '과거 출입국 기록',
    addTrip: '+ 기록 추가',
    entryDate: '입국일',
    exitDate: '출국일',
    days: '일',
    deleteTrip: '삭제',
    currentEntry: '이번 입국',
    currentEntryLabel: '입국일',
    showResult: '결과 보기',
    errorFillAll: '비자 최종 입국 기한과 이번 입국일을 입력해 주세요.',
    errorArrivalExceeded: '이번 입국일이 비자 최종 입국 기한(Must not arrive after)을 초과했습니다.',
    errorFillTrip: '모든 출입국 기록의 입국일과 출국일을 입력해 주세요.',
    errorExitBeforeEntry: '출입국 기록에서 출국일은 입국일보다 빠를 수 없습니다.',
    errorNoStay: '18개월 내 최대 12개월 체류 규칙에 따라, 이번 입국에서는 체류할 수 없습니다.',
    resultLabel: '최대 체류 가능일',
    constraintText: '18개월 내 최대 12개월 체류 규칙에 의한 제한',
    historicalDays: '과거 체류 총 일수',
    thisStayDays: '이번 체류 가능 일수',
    windowTotal: '18개월 윈도우 내 총 일수',
    windowRemaining: '18개월 윈도우 내 잔여 일수',
    warningFewDays: '체류 가능 일수가 매우 적습니다. 여행 계획에 유의하세요.',
    reminderLabel: '캘린더에 출국 알림 추가',
    remindBefore: '',
    daysBefore: '일 전에 알림',
    calendarEventTitle: '호주 비자 - 최종 출국일',
    calendarEventDesc: 'Condition 8558 규칙에 따라, 이번 입국에서 이 날짜까지 호주를 떠나야 합니다.',
    fullYearLabel: '다음 만 1년 체류 가능한 최초 입국일',
    fullYearNote: '이 날짜부터 입국하면 Condition 8558을 위반하지 않고 365일 연속 체류 가능',
    fullYearVisaExpired: '⚠️ 이 날짜는 비자 최종 입국일을 초과했습니다. 입국하려면 비자 갱신 또는 새 비자 신청이 필요합니다',
  },

  en: {
    pageTitle: 'Australia Visa Stay Calculator',
    subtitle: 'Calculate the latest date you can stay for this entry',

    ruleTitle: 'Condition 8558',
    ruleText: 'Australian visa holders must not stay in Australia for more than 12 months (365 days) in any rolling 18-month period. This is calculated using a sliding window — looking back 18 months from any given day, the total days spent in Australia must not exceed 365. Both the arrival day and the departure day are counted as days in Australia.',

    visaInfo: 'Visa Information',
    lastArrivalLabel: 'Must not arrive after',

    tripHistory: 'Travel History',
    addTrip: '+ Add a record',
    entryDate: 'Entry date',
    exitDate: 'Exit date',
    days: 'days',
    deleteTrip: 'Delete',

    currentEntry: 'Current Entry',
    currentEntryLabel: 'Entry date',

    showResult: 'Show Result',

    errorFillAll: 'Please fill in the last arrival date and current entry date.',
    errorArrivalExceeded: 'Current entry date exceeds the visa last arrival date (Must not arrive after).',
    errorFillTrip: 'Please fill in both entry and exit dates for each travel record.',
    errorExitBeforeEntry: 'Exit date must not be earlier than entry date in travel records.',
    errorNoStay: 'Based on the 12-month in 18-month rule, you cannot stay for this entry.',

    resultLabel: 'You can stay until',
    constraintText: 'Limited by the 12-month stay in 18-month rule',
    historicalDays: 'Historical stay (days)',
    thisStayDays: 'This stay (days)',
    windowTotal: 'Total in 18-month window',
    windowRemaining: 'Remaining in 18-month window',
    warningFewDays: 'Very few days remaining. Please plan your trip accordingly.',
    reminderLabel: 'Add departure reminder to calendar',
    remindBefore: 'Remind me',
    daysBefore: 'days before',
    calendarEventTitle: 'Australia Visa - Last day to depart',
    calendarEventDesc: 'Based on Condition 8558, you must leave Australia by this date for this entry.',
    fullYearLabel: 'Next earliest entry date for a full year stay',
    fullYearNote: 'Entering from this date allows 365 consecutive days without violating Condition 8558',
    fullYearVisaExpired: '⚠️ This date is beyond your visa last arrival date. Visa renewal or a new visa is required to enter',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['zh'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const langMap = { zh: 'zh-CN', 'zh-TW': 'zh-TW', ja: 'ja', hi: 'hi', id: 'id', vi: 'vi', fil: 'fil', th: 'th', ko: 'ko', en: 'en' };
  document.documentElement.lang = langMap[lang] || lang;
  document.getElementById('langSelect').value = lang;
  applyTranslations();
}

function applyTranslations() {
  // 静态文本
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // 标签属性
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  // 页面 title
  document.title = t('pageTitle');

  // 重新渲染动态生成的行程记录标签
  document.querySelectorAll('.trip-item').forEach(item => {
    const labels = item.querySelectorAll('label');
    if (labels[0]) labels[0].textContent = t('entryDate');
    if (labels[1]) labels[1].textContent = t('exitDate');
    const removeBtn = item.querySelector('.btn-remove');
    if (removeBtn) removeBtn.title = t('deleteTrip');
    // 更新天数显示
    const daysSpan = item.querySelector('.trip-days');
    if (daysSpan && daysSpan.textContent) {
      const match = daysSpan.textContent.match(/\d+/);
      if (match) daysSpan.textContent = match[0] + ' ' + t('days');
    }
  });
}
