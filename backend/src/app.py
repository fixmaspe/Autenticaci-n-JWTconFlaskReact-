from flask import Flask, jsonify,render_template,request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from models import db, User
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.url_map.slashes = False
app.config['DEBUG'] = True
app.config['ENV']='development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database.db'
app.config['JWT_SECRET_KEY']='5c2bf15004e661d7b7c9394617143d07' #alfredo
db.init_app(app)
Migrate(app,db)
jwt = JWTManager(app)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')

    if email == "":return jsonify({"msg":"debe ingresar un email"}),400
    if password == "":return jsonify({"msg":"debe ingresar una constaseña"}),400

    #BUEN CODIGO PARA VERIFICAR SI EL USUARIO ESTA REGISTRADO

    user = User.query.filter_by(email=email).first()    
    if user: return jsonify({"msg":"El email ya esta en uso"}),400

    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    return jsonify({'msg':'usuario registrado'}),200

    #CREAR RUTA DE LOGIN Y CREAR TOKEN AL INICIAR SESION

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()
    if not user: return jsonify({"msg":"Usuario o contraseña invalidos"}), 400

    if not check_password_hash(user.password,password): return jsonify({"msg":"Usuario o contraseña invalidos"}),400

    access_token = create_access_token(identity=user.email)#que use de identificador el id, en cada solicitud el user debera pasar el token

    data_user ={
        "access_token":access_token,
        "user": user.serialize()
    }

    return jsonify(data_user),200

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    identity = get_jwt_identity()
    user = User.query.filter_by(email=identity).first()
    return jsonify(user.serialize()),200






    """ user=User()
    user.email = email
    user.password = password """

    #CREAR RUTAS PRIVADA CON SOLICITUD DE TOKEN JWT

if __name__=='__main__':
    app.run()