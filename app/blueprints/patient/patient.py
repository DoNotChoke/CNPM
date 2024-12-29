from flask import Blueprint, render_template, request, jsonify
from app.models.patient import Patient
from app.models.history import History
patient_bp = Blueprint('patient', __name__, template_folder='templates')


@patient_bp.route('/patients_list')
def patient_list_index():
    patients = Patient.get_all_patients()
    return render_template('/patient/patients_list.html', patients=patients)


@patient_bp.route('/add_patient')
def add_patient_index():
    return render_template('/patient/patient_add.html')


@patient_bp.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.json
    patient = Patient.add_patient(data)
    if patient is None:
        return jsonify({'success': False}), 500
    return jsonify({'success': True}), 200


@patient_bp.route('/patient_info/<int:patient_id>')
def patient_info_index(patient_id):
    patient = Patient.get_patient_by_id(patient_id)
    histories = History.get_histories_by_id(patient_id)
    if patient:
        return render_template('/patient/patient_info.html', patient=patient, histories=histories)
    return "Không tìm thấy bệnh nhân", 404


@patient_bp.route('/patient_info/<int:patient_id>',methods=['DELETE'])
def delete_patient(patient_id):
    success = Patient.delete_patient(patient_id)
    if not success:
        return jsonify({'success': False}), 500
    return jsonify({'success': True}), 200


@patient_bp.route('/update_patient/<int:patient_id>')
def update_patient_index(patient_id):
    patient = Patient.get_patient_by_id(patient_id)
    return render_template('/patient/patient_update.html', patient=patient)


@patient_bp.route('/update_patient/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.json
    if Patient.update_patient(patient_id, data):
        return jsonify({'success': True}), 200
    return jsonify({'success': False}), 500


@patient_bp.route('/add_history/<int:patient_id>')
def add_history_index(patient_id):
    patient = Patient.get_patient_by_id(patient_id)
    return render_template('/patient/patient_history.html', patient=patient)


@patient_bp.route('/add_history/<int:patient_id>', methods=['POST'])
def add_history(patient_id):
    data = request.json
    history = History.add_history(patient_id, data)
    if history is None:
        return jsonify({'success': False}), 500
    return jsonify({'success': True}), 200









