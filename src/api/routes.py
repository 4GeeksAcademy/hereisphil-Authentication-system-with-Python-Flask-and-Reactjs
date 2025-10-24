"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import email
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def handle_login():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    if email is None or password is None:
        return jsonify(dict(message="Missing Credentials")), 400
    user = db.session.scalars(select(User).where(
        User.email == email)).one_or_none()
    if user is None:
        return jsonify(dict(message="User doesn't exist")), 400
    if user.password != password:
        return jsonify(dict(message="Bad Credentials")), 400
    # user has been authenticated
    # create the token
    user_token = create_access_token(identity=str(user.id))
    response_body = dict(
        token=user_token,
        user=user.serialize()
    )
    return jsonify(response_body), 201


@api.route("/signup", methods=["POST"])
def handle_signup():
    body = request.json or {}
    email = body.get("email")
    password = body.get("password")

    if not email:
        return jsonify({"message": "Missing email"}), 400
    if not password:
        return jsonify({"message": "Missing password"}), 400

    # only check by email for existence
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists, please login!"}), 400

    # create & persist the mapped instance
    newUser = User(email=email, password=password, is_active=True)
    db.session.add(newUser)
    db.session.commit()              # newUser.id is now available

    token = create_access_token(identity=str(newUser.id))
    return jsonify({"token": token, "user": newUser.serialize()}), 201


@api.route("private-content", methods=["GET"])
@jwt_required()
def deliver_private_content():
    content = """https://avatars.githubusercontent.com/u/28765343?v=4"""
    response_body = dict(
        content=content
    )
    return jsonify(response_body), 200


@api.route("/logout", methods=["POST"])
def handle_logout():
    body = request.json
    return jsonify(body), 201
