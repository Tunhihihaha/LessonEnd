# Ứng dụng Dự đoán & Dashboard Giá Nhà Bằng Flask

Dự án này là một ứng dụng web nhẹ được xây dựng bằng **Flask** (Python) và giao diện người dùng hiện đại sử dụng **HTML/Tailwind CSS/Chart.js**. Ứng dụng cung cấp chức năng dự đoán giá nhà dựa trên các thuộc tính đầu vào và hiển thị một dashboard phân tích dữ liệu trực quan.

---

## ✨ Tính năng (Features)

* **Giao diện Dự đoán Tương tác:** Cung cấp một biểu mẫu thân thiện để người dùng nhập 6 thuộc tính quan trọng của ngôi nhà (`OverallQual`, `GrLivArea`, `GarageCars`, `TotalBsmtSF`, `FullBath`, `YearBuilt`) và nhận kết quả dự đoán giá nhà ngay lập tức.
* **Dashboard Phân tích:** Hiển thị 3 biểu đồ trực quan (sử dụng dữ liệu mô phỏng từ endpoint `/data`):
    * Phân bố Giá Bán (Biểu đồ cột).
    * Giá Trung vị theo Chất lượng (Biểu đồ đường).
    * Diện tích Sống Trung bình theo Kiểu nhà (Biểu đồ thanh ngang).
* **Công nghệ Hiện đại:** Sử dụng **Tailwind CSS** cho giao diện responsive và **Chart.js** để vẽ biểu đồ động ở phía Frontend.
* **Backend API Đơn giản:** Sử dụng **Flask** để phục vụ trang web và xử lý các yêu cầu dự đoán qua API.

---

## 🛠️ Cài đặt (Installation)

### Yêu cầu (Requirements)

Bạn cần cài đặt:
* **Python 3.x**
* **pip** (Trình quản lý gói của Python)

### Các bước cài đặt (Installation Steps)

1.  **Sao chép mã nguồn** (Clone Repository):
    ```bash
    git clone <URL_repository_của_bạn>
    cd <tên_thư_mục_dự_án>
    ```

2.  **Tạo và Kích hoạt Môi trường Ảo** (Khuyến nghị):
    ```bash
    python -m venv venv
    # Trên Windows:
    # venv\Scripts\activate
    # Trên macOS/Linux:
    # source venv/bin/activate
    ```

3.  **Cài đặt Thư viện Python** (Flask):
    ```bash
    pip install Flask
    ```

4.  **Chạy Ứng dụng:**
    ```bash
    python app.py
    ```
    Ứng dụng sẽ chạy tại địa chỉ: `http://127.0.0.1:5000/`.

### Cấu trúc thư mục (Directory Structure)

Dự án yêu cầu cấu trúc thư mục tiêu chuẩn của Flask để hoạt động:
