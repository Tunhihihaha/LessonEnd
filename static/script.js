/**
 * Global variables to hold chart instances for destruction and re-rendering.
 */
let priceDistributionChartInstance;
let avgPriceByQualChartInstance;
let avgAreaByStyleChartInstance;

const predictionForm = document.getElementById('prediction-form');
const predictionOutput = document.getElementById('prediction-output');
const resultBox = document.getElementById('result-box');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const chartContainer = document.getElementById('chart-container');
const loadingDashboard = document.getElementById('loading-dashboard');

/**
 * Helper function to destroy existing chart instances.
 */
function destroyCharts() {
    if (priceDistributionChartInstance) {
        priceDistributionChartInstance.destroy();
    }
    if (avgPriceByQualChartInstance) {
        avgPriceByQualChartInstance.destroy();
    }
    if (avgAreaByStyleChartInstance) {
        avgAreaByStyleChartInstance.destroy();
    }
}

/**
 * Creates a Bar Chart (for Price Distribution).
 * @param {string[]} labels - Labels for the x-axis (price bins).
 * @param {number[]} data - Data points for the bars (counts).
 */
function createBarChart(labels, data) {
    const ctx = document.getElementById('priceDistributionChart').getContext('2d');
    
    priceDistributionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Số lượng Nhà',
                data: data,
                backgroundColor: 'rgba(79, 70, 229, 0.8)', // Indigo 600
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Số lượng: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Phân khúc Giá nhà (USD)'
                    }
                }
            }
        }
    });
}

/**
 * Creates a Line Chart (for Average Price by Quality).
 * @param {string[]} labels - Labels for the x-axis (OverallQual).
 * @param {number[]} data - Data points for the line (average prices).
 */
function createLineChart(labels, data) {
    const ctx = document.getElementById('avgPriceByQualChart').getContext('2d');

    avgPriceByQualChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Giá trung vị (USD)',
                data: data,
                fill: true,
                backgroundColor: 'rgba(244, 63, 94, 0.1)', // Rose 500 light
                borderColor: 'rgba(244, 63, 94, 1)', // Rose 500
                tension: 0.3,
                borderWidth: 3,
                pointBackgroundColor: 'rgba(244, 63, 94, 1)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Giá trung vị: $${Math.round(context.parsed.y).toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Giá Trung vị'
                    },
                    // Định dạng trục Y dưới dạng tiền tệ
                    ticks: {
                        callback: function(value) {
                            // Chia cho 1000 và thêm chữ 'K'
                            if (value >= 1000) {
                                return '$' + (value / 1000).toLocaleString() + 'K';
                            }
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Chất lượng Tổng thể (OverallQual)'
                    }
                }
            }
        }
    });
}

/**
 * Creates a Bar Chart for Average Living Area by House Style (replacing Doughnut Chart).
 * @param {string[]} labels - Labels for the x-axis (House Styles).
 * @param {number[]} data - Data points for the bars (average areas).
 */
function createAreaBarChart(labels, data) {
    const ctx = document.getElementById('avgAreaByStyleChart').getContext('2d');

    // Use a lighter Teal color palette for consistency
    const backgroundColor = 'rgba(20, 184, 166, 0.8)'; // Teal 500
    const borderColor = 'rgba(20, 184, 166, 1)'; 

    avgAreaByStyleChartInstance = new Chart(ctx, {
        type: 'bar', // Biểu đồ cột
        data: {
            labels: labels,
            datasets: [{
                label: 'Diện tích Sống TB (sqft)',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            indexAxis: 'y', // Chuyển thành biểu đồ cột ngang
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Diện tích TB: ${Math.round(context.parsed.x).toLocaleString()} sqft`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Diện tích Sống Trung bình (sqft)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Kiểu nhà'
                    }
                }
            }
        }
    });
}


/**
 * Initializes charts after fetching data from the server.
 */
async function initializeDashboard() {
    loadingDashboard.classList.remove('hidden');
    chartContainer.classList.add('hidden');
    destroyCharts(); // Ensure previous charts are cleaned up

    try {
        const response = await fetch('/data');
        if (!response.ok) {
            // Đọc thông báo lỗi từ response nếu có
            const errorText = await response.text();
            throw new Error(`Lỗi HTTP ${response.status}: ${errorText || 'Không thể kết nối máy chủ.'}`);
        }
        const data = await response.json();
        
        // 1. Phân bố Giá Bán (Bar Chart)
        createBarChart(data.price_distribution.labels, data.price_distribution.data);

        // 2. Giá Trung vị theo Chất lượng (Line Chart)
        createLineChart(data.avg_price_by_qual.labels, data.avg_price_by_qual.data);

        // 3. Diện tích Sống TB theo Kiểu nhà (Bar Chart mới)
        createAreaBarChart(data.avg_area_by_style.labels, data.avg_area_by_style.data);

        loadingDashboard.classList.add('hidden');
        chartContainer.classList.remove('hidden');

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        loadingDashboard.innerHTML = `<p class="text-red-600">Không thể tải dữ liệu phân tích: ${error.message}</p>`;
    }
}


/**
 * Handles the house price prediction form submission.
 */
predictionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset messages and show loading state
    errorMessage.classList.add('hidden');
    resultBox.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    btnText.textContent = 'Đang dự đoán...';
    submitBtn.disabled = true;

    try {
        const formData = {
            OverallQual: parseFloat(document.getElementById('OverallQual').value),
            GrLivArea: parseFloat(document.getElementById('GrLivArea').value),
            GarageCars: parseFloat(document.getElementById('GarageCars').value),
            TotalBsmtSF: parseFloat(document.getElementById('TotalBsmtSF').value),
            FullBath: parseFloat(document.getElementById('FullBath').value),
            YearBuilt: parseFloat(document.getElementById('YearBuilt').value)
        };

        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Lỗi không xác định khi dự đoán.');
        }

        const data = await response.json();
        
        // Display result
        const predictedPrice = Math.round(data.prediction).toLocaleString('en-US');
        predictionOutput.textContent = `$${predictedPrice}`;
        resultBox.classList.remove('hidden');

    } catch (error) {
        console.error('Prediction error:', error);
        errorMessage.textContent = error.message || 'Có lỗi xảy ra trong quá trình dự đoán.';
        errorMessage.classList.remove('hidden');
        resultBox.classList.add('hidden');
    } finally {
        // Hide loading state and enable button
        loadingSpinner.classList.add('hidden');
        btnText.textContent = 'Dự đoán Giá Nhà';
        submitBtn.disabled = false;
    }
});


// Initialize the dashboard when the script loads
document.addEventListener('DOMContentLoaded', initializeDashboard);
