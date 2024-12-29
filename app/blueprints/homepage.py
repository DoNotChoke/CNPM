from flask import render_template, Blueprint,session

homepage_bp = Blueprint('homepage', __name__, template_folder="templates")


@homepage_bp.route('/homepage')
def homepage_index():
    return render_template('homepage.html')
