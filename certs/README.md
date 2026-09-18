# Сертификат MAX

`russian_trusted_root_ca.pem` — публичный корневой сертификат Russian Trusted
Root CA, необходимый для TLS-подключения к `platform-api2.max.ru`.

Он используется только командой `npm start` через `NODE_EXTRA_CA_CERTS` и не
устанавливается в системное хранилище macOS.
