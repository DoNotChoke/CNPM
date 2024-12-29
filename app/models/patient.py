from app import db
from datetime import datetime
from app.models.history import History


class Patient(db.Model):
    __tablename__ = 'patient'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    cccd = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(255), nullable=True)

    @staticmethod
    def get_all_patients():
        try:
            patients = Patient.query.all()
            return patients if patients else None
        except Exception as e:
            print(f"Error fetching patients: {e}")
            return None

    @staticmethod
    def add_patient(data):
        try:
            patient = Patient(
                name=data.get('name'),
                gender=data.get('gender'),
                dob=datetime.strptime(data.get('dob'), '%Y-%m-%d').date(),
                phone=data.get('phone'),
                email=data.get('email'),
                cccd=data.get('cccd'),
                address=data.get('address')
            )
            db.session.add(patient)
            db.session.commit()
            return patient
        except Exception as e:
            db.session.rollback()
            print(f"Error adding new patient: {e}")
            return None

    @staticmethod
    def update_patient(patient_id, data):
        try:
            patient = Patient.query.get(patient_id)
            if not patient:
                print('Patient does not exist')
                return False
            patient.name = data.get('name')
            patient.gender = data.get('gender')
            patient.dob = datetime.strptime(data.get('dob'), '%Y-%m-%d').date()
            patient.phone = data.get('phone')
            patient.email = data.get('email')
            patient.cccd = data.get('cccd')
            patient.address = data.get('address')
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error updating patient : {e}")
            db.session.rollback()
            return False

    @staticmethod
    def delete_patient(patient_id):
        try:
            patient = Patient.query.get(patient_id)
            if not patient:
                print(f"Patient with ID {patient_id} not found.")
                return False
            if History.delete_history_by_patient_id(patient_id):
                db.session.delete(patient)
                db.session.commit()
                return True
            else:
                print(f"Error deleting patient's history")
                return False
        except Exception as e:
            print(f"Error deleting patient: {e}")
            db.session.rollback()
            return False

    @staticmethod
    def get_patient_by_id(patient_id):
        try:
            patient = Patient.query.get(patient_id)
            if patient:
                return patient
            return None
        except Exception as e:
            print(f"Error fetching patient by ID: {e}")
            return None
