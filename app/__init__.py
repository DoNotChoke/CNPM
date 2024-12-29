# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import cloudinary
from dotenv import load_dotenv
# Khởi tạo đối tượng db
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or os.urandom(24)
    print("SECRET_KEY:", app.config['SECRET_KEY'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    db.init_app(app)
    cloudinary.config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET'),
        secure=True
    )

    from app.blueprints.login import login_bp
    from app.blueprints.homepage import homepage_bp
    from app.blueprints.employee.employee import employee_bp
    from app.blueprints.medicine.medicine import medicine_bp
    from app.blueprints.patient.patient import patient_bp
    app.register_blueprint(login_bp)
    app.register_blueprint(homepage_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(medicine_bp)
    app.register_blueprint(patient_bp)

    return app
