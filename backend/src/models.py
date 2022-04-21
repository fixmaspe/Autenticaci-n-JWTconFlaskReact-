from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='users'
    id = db.Column (db.Integer,primary_key=True)
    email = db.Column(db.String(100),unique=True)
    password = db.Column(db.String(100))

    def serialize(self):
        return {
            "id":self.id,
            "email":self.email
        }

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update():
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()