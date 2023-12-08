# Hướng Dẫn Sử Dụng và Cài Đặt Mã Nguồn

## Bước 1: Cài Đặt Node.js
1. Truy cập trang web chính thức của Node.js tại [https://nodejs.org](https://nodejs.org).
2. Tải xuống phiên bản Node.js phù hợp với hệ điều hành của bạn (thường là phiên bản LTS - Long-Term Support).
3. Mở tệp cài đặt đã tải xuống và làm theo hướng dẫn cài đặt trên màn hình.
4. Hoàn tất quá trình cài đặt Node.js.

## Bước 2: Cài Đặt LibreOffice
1. Mở terminal hoặc command prompt trên máy chủ.
2. Chạy lệnh `$ soffice` để kiểm tra xem LibreOffice đã được cài đặt hay chưa.
3. Nếu LibreOffice chưa được cài đặt, hãy cài đặt trước khi tiếp tục.
4. Cài đặt biến môi trường để hệ thống có thể tìm thấy đường dẫn của LibreOffice.

## Bước 3: Thiết Lập Oracle Cloud
### Cách 1: Sử Dụng Oracle Cloud Trực Tiếp Trong Mã Nguồn
### Cách 2: Tạo Một Oracle Cloud Riêng Của Bạn
1. Truy cập trang web chính thức của Oracle tại [https://cloud.oracle.com/](https://cloud.oracle.com/) và đăng nhập hoặc tạo một tài khoản nếu chưa có.
2. Điều hướng đến trang "Oracle Database" và chọn "Autonomous Databases".
3. Tạo một "Autonomous Database" (ghi nhớ lưu lại username và password).
4. Sau khi tạo xong, chọn "Database connection", tải về "Instance Wallet" và sao chép một "Connection string" bất kỳ.
5. Giải nén "Instance Wallet" đã tải về và lưu tất cả trong thư mục "admin" (Lưu ý giữ lại "Instance Wallet" dạng .zip).
6. Xoá thư mục "admin" trong mã nguồn "umms\SourceCode\server\src\database\instantclient_21_10\network".
7. Sao chép thư mục "admin" vào mã nguồn "umms\SourceCode\server\src\database\instantclient_21_10\network".
8. Chỉnh sửa thông tin kết nối trong "umms\SourceCode\server\src\database\knex.ts".

## Bước 4: Cài Đặt Oracle SQL Developer
1. Truy cập trang web chính thức của Oracle để tải về ứng dụng Oracle SQL Developer [https://www.oracle.com/database/sqldeveloper/](https://www.oracle.com/database/sqldeveloper/) và đăng nhập hoặc tạo một tài khoản nếu bạn chưa có.
2. Cài đặt ứng dụng và chọn "New Connection".
3. Nhập username và password. Nếu sử dụng Oracle cloud trực tiếp trong mã nguồn thì username là “ADMIN” và password là “Thuctap2023*”.
4. Chọn Cloud Wallet tại Connection Type.
5. Browse đến file Wallet.zip đã tải về. Nếu sử dụng Oracle cloud trực tiếp trong mã nguồn thì chọn file Wallet.zip tại “umms\SQL\Wallet_KNUM984WSLT3BMIX.zip”.
6. Chọn Connect để kết nối đến Oracle Cloud.
7. Mở file Table_Script.txt tại “umms\SQL\Table_Script.txt” và chạy toàn bộ lệnh tạo bảng và thêm dữ liệu.

## Bước 5: Cài Đặt và Khởi Chạy Máy Chủ (Server)
1. Mở terminal hoặc command prompt trên máy chủ.
2. Di chuyển đến thư mục chứa mã dự án của máy chủ.
3. Chạy lệnh `$ npm i` để cài đặt các phụ thuộc của dự án.
4. Sau khi quá trình cài đặt hoàn tất, chạy lệnh `$ npm start` để khởi chạy máy chủ.

## Bước 6: Cài Đặt và Chạy Giao Diện Người Dùng (UI)
1. Mở terminal hoặc command prompt trên máy tính.
2. Di chuyển đến thư mục chứa mã dự án của giao diện người dùng.
3. Chạy lệnh `$ npm i` để cài đặt các phụ thuộc của dự án.
4. Sau khi quá trình cài đặt hoàn tất, chạy lệnh `$ npm run dev` để khởi chạy giao diện người dùng.