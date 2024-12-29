from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    load_dotenv()

    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS') == 'True'

    # Cấu hình SSL cho SQLAlchemy
    ssl_ca_path = os.getenv('SSL_CA_PATH')
    if ssl_ca_path:
        app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
            'connect_args': {
                'ssl': {
                    'ca': ssl_ca_path,
                    'check_hostname': True,
                    'verify_cert': True,
                    'verify_identity': True,
                }
            }
        }
    # Khởi tạo db
    db.init_app(app)
    migrate.init_app(app, db)
    from app.blueprints.login import login_bp
    from app import models
    app.register_blueprint(login_bp)

    return app