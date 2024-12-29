from app import db
from datetime import datetime


class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    doctor_id = db.Column(db.Integer, nullable=False)  # Assuming no doctor table exists
    visit_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    symptom = db.Column(db.Text, nullable=True)
    diagnosis = db.Column(db.String(255), nullable=True)
    treatment = db.Column(db.String(500), nullable=True)

    @staticmethod
    def get_histories_by_id(patient_id):
        try:
            histories = History.query.filter_by(patient_id=patient_id).all()
            return histories if histories else []
        except Exception as e:
            print(f"Error fetching histories for patient {patient_id}: {e}")
            return None

    @staticmethod
    def add_history(patient_id, data):
        try:
            history = History(
                patient_id=patient_id,
                doctor_id=data.get('doctor_id'),
                visit_date=data.get('visit_date'),
                symptom=data.get('symptom'),
                diagnosis=data.get('diagnosis'),
                treatment=data.get('treatment')
            )
            db.session.add(history)
            db.session.commit()
            return history
        except Exception as e:
            db.session.rollback()
            print(f"Error adding new history : {e}")
            return None

    @staticmethod
    def delete_history_by_patient_id(patient_id):
        try:
            histories = History.query.filter_by(patient_id=patient_id).all()
            for history in histories:
                db.session.delete(history)
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error deleting history : {e}")
            db.session.rollback()
            return False

