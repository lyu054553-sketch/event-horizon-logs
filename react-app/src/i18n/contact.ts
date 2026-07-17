const strings: Record<'en' | 'zh', Record<string, string>> = {
  en: {
    'contact.err.required': 'All fields are required.',
    'contact.err.email': 'Please enter a valid email.',
    'contact.sending': 'TRANSMITTING...',
    'contact.log_title': 'Transmission Log',
    'contact.tel_title': 'Telemetry',
  },
  zh: {
    'contact.err.required': '所有字段均为必填',
    'contact.err.email': '请输入有效的邮箱地址',
    'contact.sending': '发送中...',
    'contact.log_title': '传输日志',
    'contact.tel_title': '遥测',
  },
};

export default strings;
