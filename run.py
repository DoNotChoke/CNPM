from app import create_app

# Tạo ứng dụng và chạy nó
app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
