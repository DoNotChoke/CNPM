from flask import Blueprint, render_template, request, jsonify
from app.models.medicine import Medicine
medicine_bp = Blueprint('medicine', __name__, template_folder='templates')


@medicine_bp.route('/medicine')
def medicine_index():
    medicines = Medicine.get_all_medicine()
    if medicines is None:
        return jsonify({'message': 'No medicines found'}), 404
    return render_template('/medicine/medicine.html', medicines=medicines)


@medicine_bp.route('/medicine', methods=['POST'])
def add_medicine():
    data = request.json
    medicine = Medicine.add_medicine(data)
    if medicine is None:
        return jsonify({'success': False}), 500
    medicine_data = {
        'id': medicine.id,
        'date_in': medicine.date_in.strftime('%Y-%m-%d'),
        'name': medicine.name,
        'price_buy': medicine.price_buy,
        'price_sell': medicine.price_sell,
        'usage_': medicine.usage_,
        'effect': medicine.effect,
        'expiry_date': medicine.expiry_date.strftime('%Y-%m-%d'),
        'unit': medicine.unit,
        'quantity': medicine.quantity,
        'ghi_chu': medicine.note
    }
    return jsonify({'success': True, 'medicine': medicine_data}), 201


@medicine_bp.route('/medicine/<int:medicine_id>', methods=['PUT'])
def update_medicine(medicine_id):
    data = request.json
    medicine = Medicine.update_medicine(medicine_id, data)
    if medicine is None:
        return jsonify({'success': False}), 500
    medicine_data = {
        'id': medicine.id,
        'date_in': medicine.date_in.strftime('%Y-%m-%d'),
        'name': medicine.name,
        'price_buy': medicine.price_buy,
        'price_sell': medicine.price_sell,
        'usage_': medicine.usage_,
        'effect': medicine.effect,
        'expiry_date': medicine.expiry_date.strftime('%Y-%m-%d'),
        'unit': medicine.unit,
        'quantity': medicine.quantity,
        'ghi_chu': medicine.note
    }
    return jsonify({'success': True, 'medicine': medicine_data}), 200


@medicine_bp.route('/medicine/<int:medicine_id>', methods=['DELETE'])
def delete_medicine(medicine_id):
    success = Medicine.delete_medicine(medicine_id)
    if not success:
        return jsonify({'message': 'Failed to delete medicine'}), 500
    return jsonify({'message': 'Medicine deleted successfully'}), 200