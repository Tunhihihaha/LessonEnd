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

## 🚀 Sử dụng (Usage)

1.  Mở trình duyệt và truy cập vào địa chỉ `http://127.0.0.1:5000/`.
2.  **Dự đoán Giá Nhà:**
    * Nhập 6 giá trị thuộc tính tương ứng vào biểu mẫu.
    * Nhấn nút **"Dự đoán Giá Nhà"**.
    * Kết quả dự đoán sẽ hiển thị ngay phía trên biểu mẫu.
3.  **Xem Dashboard:** Kéo xuống phần **"Phân tích Dữ liệu"** để xem các biểu đồ trực quan hóa dữ liệu được tải tự động.

---

## 🌐 API Endpoints

| Phương thức | Endpoint | Mô tả | Chi tiết |
| :---: | :--- | :--- | :--- |
| **GET** | `/` | Trang chủ của ứng dụng. | Trả về file `index.html`. |
| **POST** | `/predict` | **Dự đoán giá nhà** (Housing Price Prediction). | **Yêu cầu (JSON):** 6 thuộc tính. **Phản hồi (JSON):** `{"prediction": <giá_dự_đoán>}`. |
| **GET** | `/data` | Cung cấp dữ liệu mô phỏng cho dashboard. | **Phản hồi (JSON):** Dữ liệu cho 3 biểu đồ dashboard. |

---

## 📌 Ghi chú (Notes)

* **Mô hình Dự đoán:** Hàm `predict_house_price` trong `app.py` hiện tại là một **công thức tuyến tính mô phỏng** (placeholder), không phải là mô hình Machine Learning được huấn luyện thực tế.
* **Dữ liệu Phân tích:** Dashboard hiển thị dữ liệu **mô phỏng cứng** từ hàm `get_data` trong `app.py`, không đọc trực tiếp từ các file CSV.
* **Phát triển Tiềm năng:** Các file CSV đã cung cấp là cơ sở để bạn có thể tích hợp một mô hình Machine Learning thực tế vào endpoint `/predict` và sử dụng dữ liệu thực để vẽ biểu đồ trên dashboard.
