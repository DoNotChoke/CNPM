from flask import Blueprint, request, jsonify, session, redirect, render_template, url_for, current_app, flash
from app.models.employee import Employee
from werkzeug.utils import secure_filename
import os
import io
import uuid
import cloudinary.uploader
from PIL import Image
employee_bp = Blueprint('employee', __name__, template_folder='templates')


@employee_bp.route('/employee_profile')
def user_profile_index():
    if 'user_id' not in session:
        return redirect(url_for('login.index'))
    user_id = session['user_id']
    employee = Employee.get_employee_by_id(user_id)

    return render_template('/employee/user_profile.html', employee=employee)


@employee_bp.route('/employee_list')
def employee_list_index():
    employees = Employee.get_all_employees()
    return render_template('/employee/employee_list.html', employees=employees)


@employee_bp.route('/employee_add')
def employee_add_index():
    return render_template('/employee/employee_add.html')


@employee_bp.route('/employee_add', methods=['POST'])
def add_employee():
    data = request.form.to_dict()
    file = request.files.get('image')
    file_url = None
    if file and allowed_file(file.filename):
        try:
            img = Image.open(file)
            img.verify()
            file.seek(0)
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4().hex}_{filename}"
            upload_result = cloudinary.uploader.upload(
                file,
                public_id=unique_filename,
                folder="employee_images",
                overwrite=True,
                resource_type="image"
            )
            file_url = upload_result.get('secure_url')
        except (IOError, SyntaxError) as e:
            flash('Tệp ảnh không hợp lệ.', 'danger')
            return redirect(url_for('employee.add_employee'))
    data['image_url'] = file_url
    employee = Employee.add_employee(data)
    if employee is None:
        return jsonify({'success': False}), 500
    return jsonify({"success": True, "message": "User added successfully"})


@employee_bp.route('/employee_update/<int:employee_id>')
def employee_edit_index(employee_id):
    employee = Employee.get_employee_by_id(employee_id)
    return render_template('/employee/employee_update.html', employee=employee)


@employee_bp.route('/employee_update/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    data = request.form.to_dict()
    file = request.files.get('image')
    file_url = None
    if file and allowed_file(file.filename):
        try:
            img = Image.open(file)
            img.verify()
            file.seek(0)
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4().hex}_{filename}"
            upload_result = cloudinary.uploader.upload(
                file,
                public_id=unique_filename,
                folder="employee_images",
                overwrite=True,
                resource_type="image"
            )
            file_url = upload_result.get('secure_url')
        except (IOError, SyntaxError) as e:
            flash('Tệp ảnh không hợp lệ.', 'danger')
            return redirect(url_for('employee.add_employee'))
    data['image_url'] = file_url
    if Employee.update_employee(employee_id, data):
        return jsonify({'success': True}), 200
    return jsonify({'success': False}), 500


@employee_bp.route('/employee_info/<int:employee_id>')
def employee_info_index(employee_id):
    employee = Employee.get_employee_by_id(employee_id)
    if employee:
        return render_template('/employee/employee_info.html', employee=employee)
    else:
        return "Không tìm thấy nhân viên", 404


@employee_bp.route('/employee_info/<int:employee_id>',methods=['DELETE'])
def delete_employee(employee_id):
    success = Employee.delete_employee(employee_id)
    if not success:
        return jsonify({'success': False}), 500
    return jsonify({'success': True}), 200


def allowed_file(filename):
    allowed_extensions = current_app.config.get('ALLOWED_EXTENSIONS', {'png', 'jpg', 'jpeg', 'gif'})
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

