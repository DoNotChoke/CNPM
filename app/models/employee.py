from app import db
import os
from werkzeug.utils import secure_filename
from app.models.account import Account

class Employee(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.Date, nullable=False)  # Giả sử dob là ngày sinh (DATE)
    gender = db.Column(db.String(50), nullable=False)
    major = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255), nullable=True)
    is_admin = db.Column(db.Boolean, default=False)
    photo = db.Column(db.String(255), nullable=True)

    @staticmethod
    def get_all_employees():
        try:
            employees = Employee.query.all()
            return employees if employees else None
        except Exception as e:
            print(f"Error fetching users: {e}")
            return None

    @staticmethod
    def get_employee_by_id(user_id):
        try:
            employee = Employee.query.get(user_id)
            if employee:
                return employee
            return None
        except Exception as e:
            print(f"Error fetching employee by ID: {e}")
            return None

    @staticmethod
    def add_employee(data):
        try:
            is_admin = data.get('is_admin', 'false').lower() == 'true'
            employee = Employee(
                name=data.get('name'),
                major=data.get('major'),
                position=data.get('position'),
                dob=data.get('dob'),
                gender=data.get('gender'),
                phone=data.get('phone'),
                email=data.get('email'),
                address=data.get('address'),
                photo=data.get('image_url'),
                is_admin=is_admin
            )
            db.session.add(employee)
            db.session.commit()
            Account.create_user(employee.id, username=employee.email, password='123', is_admin=is_admin)
            return employee
        except Exception as e:
            db.session.rollback()
            print(f"Error adding new employee : {e}")
            return None

    @staticmethod
    def update_employee(employee_id, data):
        try:
            employee = Employee.query.get(employee_id)
            if not employee:
                print("Not exist")
                return False
            employee.name = data.get('name')
            employee.major = data.get('major')
            employee.position = data.get('position')
            employee.dob = data.get('dob')
            employee.gender = data.get('gender')
            employee.phone = data.get('phone')
            employee.email = data.get('email')
            employee.address = data.get('address')
            employee.is_admin = data.get('is_admin', 'false').lower() == 'true'
            if data.get('image_url') is not None:
                employee.photo = data.get('image_url')
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error updating employee : {e}")
            db.session.rollback()
            return False

    @staticmethod
    def delete_employee(employee_id):
        try:
            employee = Employee.query.get(employee_id)
            if not employee:
                print(f"Employee with ID {employee_id} not found.")
                return False
            db.session.delete(employee)
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error deleting employee : {e}")
            db.session.rollback()
            return False

