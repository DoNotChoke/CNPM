from app import db


class Account(db.Model):
    __tablename__ = 'account'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    user_role = db.Column(db.Integer)

    @staticmethod
    def get_user_by_name(username):
        user = Account.query.filter_by(username=username).first()
        return user

    @staticmethod
    def validate_user(username, password):
        user = Account.get_user_by_name(username)
        if user:
            if password == user.password:
                return user
        return None

    @staticmethod
    def create_user(user_id, username, password, is_admin):
        try:
            account = Account(
                id=user_id,
                username=username,
                password=password,
                user_role=1 if is_admin else 0
            )
            db.session.add(account)
            db.session.commit()
            return account
        except Exception as e:
            db.session.rollback()
            print(f"Error adding new user : {e}")
            return None
