from app import db
from datetime import datetime


class Medicine(db.Model):
    __tablename__ = 'Thuoc'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_in = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price_buy = db.Column(db.Float, nullable=False)
    price_sell = db.Column(db.Float, nullable=False)
    usage_ = db.Column(db.String(255), nullable=False)
    effect = db.Column(db.Text, nullable=False)
    expiry_date = db.Column(db.Date, nullable=False)
    unit = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    note = db.Column(db.Text, nullable=True)

    @staticmethod
    def get_all_medicine():
        try:
            medicines = Medicine.query.all()
            return medicines if medicines else None
        except Exception as e:
            print(f"Error fetching medicines: {e}")
            return None

    @staticmethod
    def add_medicine(data):
        try:
            medicine = Medicine(
                date_in=data.get('date_in'),
                name=data.get('name'),
                price_buy=data.get('price_buy'),
                price_sell=data.get('price_sell'),
                usage_=data.get('usage_'),
                effect=data.get('effect'),
                expiry_date=data.get('expiry_date'),
                unit=data.get('unit'),
                quantity=data.get('quantity'),
                note=data.get('note')
            )
            db.session.add(medicine)
            db.session.commit()
            return medicine
        except Exception as e:
            db.session.rollback()
            print(f"Error adding new medicine : {e}")
            return None

    @staticmethod
    def update_medicine(medicine_id, data):
        try:
            medicine = Medicine.query.get(medicine_id)
            if not medicine:
                print("Not exist")
                return False
            medicine.date_in = data.get('date_in')
            medicine.name = data.get('name')
            medicine.price_buy = data.get('price_buy')
            medicine.price_sell = data.get('price_sell')
            medicine.usage_ = data.get('usage_')
            medicine.effect = data.get('effect')
            medicine.expiry_date = data.get('expiry_date')
            medicine.unit = data.get('unit')
            medicine.quantity = data.get('quantity')
            medicine.note = data.get('note')
            db.session.commit()
            return medicine
        except Exception as e:
            print(f"Error updating medicine: {e}")
            db.session.rollback()
            return None

    @staticmethod
    def delete_medicine(medicine_id):
        try:
            medicine = Medicine.query.get(medicine_id)
            if not medicine:
                print(f"Medicine with ID {medicine_id} not found.")
                return False

            db.session.delete(medicine)
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error deleting medicine: {e}")
            db.session.rollback()
            return False

