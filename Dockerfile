
FROM node:20

# تعيين دليل العمل داخل الحاوية
WORKDIR /app

# نسخ ملف package.json و package-lock.json إلى دليل العمل
COPY package*.json ./

# تثبيت تبعيات المشروع
RUN npm install

# نسخ باقي ملفات المشروع إلى دليل العمل
COPY . .

# تعيين متغيرات البيئة داخل الحاوية
ENV NEXT_PUBLIC_API_CRUD="https://lsn3dfkd35.execute-api.us-east-1.amazonaws.com/prop/notes"
ENV NEXT_PUBLIC_API_CRUD_COGNITO_ID="us-east-1_FrzTZQcj9"
ENV NEXT_PUBLIC_API_CRUD_CLIENT_ID="gd72t94is1qodhkr963ofcqp6"
ENV NEXT_PUBLIC_API_CRUD_REGINO="us-east-1"

# بناء تطبيق Next.js
RUN npm run build

# فتح المنفذ 3000 لاستخدام التطبيق
EXPOSE 3000

# الأمر الافتراضي لتشغيل التطبيق
CMD ["npm", "start"]