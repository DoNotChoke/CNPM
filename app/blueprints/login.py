from flask import Blueprint, request, jsonify, render_template, session, redirect, url_for
from app.models.account import Account

# Định nghĩa Blueprint cho login
login_bp = Blueprint('login', __name__, template_folder='templates')


@login_bp.route('/')
def login_index():
    session.clear()
    return render_template('login.html')


@login_bp.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = Account.validate_user(username, password)

    if user:
        session['user_id'] = user.id
        session['username'] = user.username
        session['user_role'] = user.user_role
        return jsonify({'success': True, 'message': 'Đăng nhập thành công!'})

    return jsonify({'success': False, 'message': 'Sai tên đăng nhập hoặc mật khẩu!'})


@login_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login.login_index'))
